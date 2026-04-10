<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

const props = defineProps<{
  title: string
  content: string
}>()

// AI Provider 配置
interface AIProvider {
  id: string
  name: string
  endpoint: string
  model: string
  docsUrl: string
  keyPlaceholder: string
}

const providers: AIProvider[] = [
  {
    id: 'deepseek',
    name: 'DeepSeek',
    endpoint: 'https://api.deepseek.com/chat/completions',
    model: 'deepseek-chat',
    docsUrl: 'https://platform.deepseek.com/',
    keyPlaceholder: 'sk-...',
  },
  {
    id: 'zhipu',
    name: '智谱 GLM',
    endpoint: 'https://open.bigmodel.cn/api/paas/v4/chat/completions',
    model: 'glm-4-flash',
    docsUrl: 'https://open.bigmodel.cn/',
    keyPlaceholder: '...',
  },
  {
    id: 'minimax',
    name: 'MiniMax',
    endpoint: 'https://api.minimax.chat/v1/text/chatcompletion_v2',
    model: 'MiniMax-Text-01',
    docsUrl: 'https://www.minimax.io/',
    keyPlaceholder: '...',
  },
]

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

const isExpanded = ref(false)
const isLoading = ref(false)
const error = ref('')
const isSettingsOpen = ref(false)

// 对话相关
const messages = ref<ChatMessage[]>([])
const displayedContent = ref('')
const userInput = ref('')
const isStreaming = ref(false)

// API 配置
const selectedProviderId = ref('deepseek')
const apiKey = ref('')
const apiKeyInput = ref('')
const showApiKey = ref(false)

const currentProvider = computed(() => providers.find(p => p.id === selectedProviderId.value) || providers[0])
const hasApiKey = computed(() => !!apiKey.value)
const hasMessages = computed(() => messages.value.length > 0)

// 从 localStorage 读取已保存的配置
onMounted(() => {
  const savedProvider = localStorage.getItem('ai-summarizer-provider')
  const savedKey = localStorage.getItem('ai-summarizer-api-key')
  if (savedProvider) selectedProviderId.value = savedProvider
  if (savedKey) {
    apiKey.value = savedKey
    apiKeyInput.value = savedKey
  }
})

const saveConfig = () => {
  const key = apiKeyInput.value.trim()
  if (!key) {
    error.value = '请输入有效的 API Key'
    return
  }
  selectedProviderId.value = currentProvider.value.id
  apiKey.value = key
  apiKeyInput.value = key
  localStorage.setItem('ai-summarizer-provider', currentProvider.value.id)
  localStorage.setItem('ai-summarizer-api-key', key)
  isSettingsOpen.value = false
  error.value = ''
}

const clearConfig = () => {
  selectedProviderId.value = 'deepseek'
  apiKey.value = ''
  apiKeyInput.value = ''
  localStorage.removeItem('ai-summarizer-provider')
  localStorage.removeItem('ai-summarizer-api-key')
  messages.value = []
  displayedContent.value = ''
}

const toggleAgent = () => {
  isExpanded.value = !isExpanded.value
  if (!isExpanded.value) {
    isSettingsOpen.value = false
  }
}

// 打字机效果
const typeWriter = async (text: string) => {
  isStreaming.value = true
  displayedContent.value = ''

  for (let i = 0; i < text.length; i++) {
    displayedContent.value += text[i]
    // 根据内容长度调整打字速度
    const delay = text[i] === '\n' ? 30 : 15
    await new Promise(resolve => setTimeout(resolve, delay))
  }

  isStreaming.value = false
}

const sendMessage = async () => {
  const input = userInput.value.trim()
  if (!input || isLoading.value) return

  if (!apiKey.value) {
    isSettingsOpen.value = true
    error.value = '请先配置 AI API Key'
    return
  }

  // 提取文章内容
  let textContent = props.content
  try {
    const parsed = JSON.parse(props.content)
    textContent = extractText(parsed)
  } catch {
    // 内容已经是纯文本
  }
  const truncatedContent = textContent.slice(0, 12000)

  // 添加用户消息
  messages.value.push({ role: 'user', content: input })
  userInput.value = ''
  isLoading.value = true
  error.value = ''
  displayedContent.value = ''

  try {
    const provider = currentProvider.value

    // 构建消息列表，包含文章上下文
    const chatMessages: { role: string; content: string }[] = [
      {
        role: 'system',
        content: `你是一个博客文章助手。用户正在阅读一篇名为《${props.title}》的文章。你可以回答关于这篇文章的问题，或者帮助总结、解释文章内容。请用中文回答。`,
      },
      ...messages.value.map(m => ({ role: m.role, content: m.content })),
    ]

    const response = await fetch(provider.endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey.value}`,
      },
      body: JSON.stringify({
        model: provider.model,
        messages: chatMessages,
        max_tokens: 2048,
        stream: true,
      }),
    })

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}))
      throw new Error(errData.error?.message || `API 请求失败: ${response.status}`)
    }

    // 流式读取响应
    const reader = response.body?.getReader()
    if (!reader) throw new Error('无法读取响应流')

    const decoder = new TextDecoder()
    let fullContent = ''

    while (true) {
      const { done, value } = await reader.read()
      if (done) break

      const chunk = decoder.decode(value)
      const lines = chunk.split('\n')

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = line.slice(6)
          if (data === '[DONE]') continue

          try {
            const parsed = JSON.parse(data)
            const content = parsed.choices?.[0]?.delta?.content
            if (content) {
              fullContent += content
              displayedContent.value = fullContent
            }
          } catch {
            // 忽略解析错误
          }
        }
      }
    }

    // 添加助手消息到历史
    messages.value.push({ role: 'assistant', content: fullContent })
  } catch (e: any) {
    console.error('AI Chat Error:', e)
    error.value = e?.message || '生成回答时出错，请稍后重试'
    // 移除最后一条用户消息（因为发送失败了）
    messages.value.pop()
  } finally {
    isLoading.value = false
  }
}

// 递归提取 JSON 中的文本内容
function extractText(obj: any): string {
  if (typeof obj === 'string') return obj
  if (Array.isArray(obj)) return obj.map(extractText).join(' ')
  if (obj && typeof obj === 'object') {
    if (obj.type === 'text') return obj.text || ''
    return Object.values(obj).map(extractText).join(' ')
  }
  return ''
}
</script>

<template>
  <div class="article-summarizer">
    <!-- 展开状态的侧边面板 -->
    <Transition name="slide">
      <div
        v-if="isExpanded"
        class="summarizer-panel"
      >
        <div class="summarizer-header">
          <div class="summarizer-header-left">
            <button
              v-if="!isSettingsOpen"
              class="summarizer-settings-btn"
              @click="isSettingsOpen = true"
              title="设置"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M12 15a3 3 0 100-6 3 3 0 000 6z"
                  stroke="currentColor"
                  stroke-width="1.5"
                />
                <path
                  d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"
                  stroke="currentColor"
                  stroke-width="1.5"
                />
              </svg>
            </button>
            <button
              v-else
              class="summarizer-settings-btn"
              @click="isSettingsOpen = false"
              title="返回"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M19 12H5M12 19l-7-7 7-7"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
            <h3 class="summarizer-title">
              {{ isSettingsOpen ? 'API 设置' : 'AI 助手' }}
            </h3>
          </div>
          <div class="header-right">
            <span
              v-if="!isSettingsOpen && hasApiKey"
              class="provider-badge"
            >
              {{ currentProvider.name }}
            </span>
            <button
              class="summarizer-close"
              @click="toggleAgent"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M12 4L4 12M4 4l8 8"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
              </svg>
            </button>
          </div>
        </div>

        <!-- 设置面板 -->
        <div
          v-if="isSettingsOpen"
          class="summarizer-body"
        >
          <!-- Provider 选择 -->
          <div class="settings-section">
            <label class="settings-label">AI 提供商</label>
            <div class="provider-selector">
              <button
                v-for="provider in providers"
                :key="provider.id"
                class="provider-btn"
                :class="{ 'is-active': currentProvider.id === provider.id }"
                @click="selectedProviderId = provider.id"
              >
                {{ provider.name }}
              </button>
            </div>
          </div>

          <!-- API Key 输入 -->
          <div class="settings-section">
            <label class="settings-label">{{ currentProvider.name }} API Key</label>
            <p class="settings-hint">
              用于调用 AI 生成文章摘要。请前往
              <a
                :href="currentProvider.docsUrl"
                target="_blank"
                rel="noopener"
              > {{ currentProvider.name }} </a>
              获取 API Key。
            </p>
            <div class="api-key-input-wrapper">
              <input
                v-model="apiKeyInput"
                :type="showApiKey ? 'text' : 'password'"
                class="api-key-input"
                :placeholder="currentProvider.keyPlaceholder"
                @keyup.enter="saveConfig"
              >
              <button
                class="api-key-toggle"
                @click="showApiKey = !showApiKey"
              >
                <svg
                  v-if="!showApiKey"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
                    stroke="currentColor"
                    stroke-width="1.5"
                  />
                  <circle
                    cx="12"
                    cy="12"
                    r="3"
                    stroke="currentColor"
                    stroke-width="1.5"
                  />
                </svg>
                <svg
                  v-else
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"
                    stroke="currentColor"
                    stroke-width="1.5"
                  />
                  <line
                    x1="1"
                    y1="1"
                    x2="23"
                    y2="23"
                    stroke="currentColor"
                    stroke-width="1.5"
                  />
                </svg>
              </button>
            </div>

            <div class="settings-status">
              <span
                v-if="hasApiKey"
                class="status-badge status-active"
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M20 6L9 17l-5-5"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                {{ currentProvider.name }} 已配置
              </span>
              <span
                v-else
                class="status-badge status-inactive"
              >
                未配置
              </span>
            </div>
          </div>

          <p
            v-if="error"
            class="summarizer-error"
          >
            {{ error }}
          </p>

          <div class="settings-actions">
            <button
              class="summarizer-button"
              @click="saveConfig"
            >
              保存配置
            </button>
            <button
              v-if="hasApiKey"
              class="summarizer-button secondary"
              @click="clearConfig"
            >
              清除配置
            </button>
          </div>
        </div>

        <!-- 对话面板 -->
        <template v-else>
          <div class="chat-body">
            <!-- 欢迎信息 -->
            <div
              v-if="!hasMessages && !isLoading"
              class="chat-welcome"
            >
              <p class="chat-welcome-title">关于这篇文章</p>
              <p class="chat-welcome-desc">
                你可以问我关于「<strong>{{ title }}</strong>」的问题，比如：</p>
              <ul class="chat-welcome-hints">
                <li @click="userInput = '总结一下这篇文章的主要内容'">总结一下这篇文章的主要内容</li>
                <li @click="userInput = '这篇文章的核心观点是什么？'">这篇文章的核心观点是什么？</li>
                <li @click="userInput = '用简单的话解释这个主题'">用简单的话解释这个主题</li>
              </ul>
            </div>

            <!-- 消息列表 -->
            <div class="chat-messages">
              <div
                v-for="(msg, index) in messages"
                :key="index"
                class="chat-message"
                :class="`message-${msg.role}`"
              >
                <div class="message-avatar">
                  <span v-if="msg.role === 'user'">👤</span>
                  <span v-else>🤖</span>
                </div>
                <div class="message-content">{{ msg.content }}</div>
              </div>

              <!-- 正在输入的消息 -->
              <div
                v-if="displayedContent"
                class="chat-message message-assistant"
              >
                <div class="message-avatar">🤖</div>
                <div class="message-content">
                  {{ displayedContent }}<span
                    v-if="isStreaming"
                    class="typing-cursor"
                  />
                </div>
              </div>
            </div>

            <p
              v-if="error"
              class="summarizer-error"
            >
              {{ error }}
            </p>
          </div>

          <!-- 输入区域 -->
          <div class="chat-footer">
            <div class="chat-input-wrapper">
              <input
                v-model="userInput"
                type="text"
                class="chat-input"
                placeholder="输入你的问题..."
                :disabled="isLoading"
                @keyup.enter="sendMessage"
              >
              <button
                class="chat-send-btn"
                :disabled="isLoading || !userInput.trim()"
                @click="sendMessage"
              >
                <svg
                  v-if="!isLoading"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <span
                  v-else
                  class="summarizer-spinner small"
                />
              </button>
            </div>
          </div>
        </template>
      </div>
    </Transition>

    <!-- 悬浮按钮 -->
    <button
      class="summarizer-fab"
      :class="{ 'is-active': isExpanded, 'has-unread': hasMessages && !isExpanded }"
      @click="toggleAgent"
      :title="isExpanded ? '关闭 AI 助手' : 'AI 文章助手'"
    >
      <svg
        v-if="!isExpanded"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"
          fill="currentColor"
        />
      </svg>
      <svg
        v-else
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
          fill="currentColor"
        />
      </svg>
    </button>
  </div>
</template>

<style scoped>
.article-summarizer {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 1000;
  display: flex;
  align-items: flex-end;
  gap: 12px;
}

.summarizer-panel {
  width: 380px;
  height: 520px;
  background: var(--color-surface, #fff);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.summarizer-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 16px;
  background: var(--color-primary, #6366f1);
  color: white;
  flex-shrink: 0;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 8px;
}

.provider-badge {
  font-size: 11px;
  padding: 2px 8px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 9999px;
}

.summarizer-header-left {
  display: flex;
  align-items: center;
  gap: 10px;
}

.summarizer-settings-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border: none;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  color: white;
  cursor: pointer;
  transition: background 0.2s;
}

.summarizer-settings-btn:hover {
  background: rgba(255, 255, 255, 0.3);
}

.summarizer-title {
  font-size: 15px;
  font-weight: 600;
  margin: 0;
}

.summarizer-close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border: none;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  color: white;
  cursor: pointer;
  transition: background 0.2s;
}

.summarizer-close:hover {
  background: rgba(255, 255, 255, 0.3);
}

.summarizer-body {
  padding: 20px;
  flex: 1;
  overflow-y: auto;
}

/* 对话区域 */
.chat-body {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
}

.chat-welcome {
  padding: 16px;
  background: #f9fafb;
  border-radius: 12px;
  margin-bottom: 16px;
}

.chat-welcome-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text, #1f2937);
  margin: 0 0 8px 0;
}

.chat-welcome-desc {
  font-size: 13px;
  color: var(--color-text-secondary, #6b7280);
  margin: 0 0 12px 0;
  line-height: 1.5;
}

.chat-welcome-hints {
  list-style: none;
  padding: 0;
  margin: 0;
}

.chat-welcome-hints li {
  font-size: 13px;
  color: var(--color-primary, #6366f1);
  padding: 8px 12px;
  background: white;
  border-radius: 8px;
  margin-bottom: 6px;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid #e5e7eb;
}

.chat-welcome-hints li:hover {
  background: var(--color-primary, #6366f1);
  color: white;
  border-color: var(--color-primary, #6366f1);
}

.chat-messages {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.chat-message {
  display: flex;
  gap: 10px;
  align-items: flex-start;
}

.message-user {
  flex-direction: row-reverse;
}

.message-avatar {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  flex-shrink: 0;
}

.message-assistant .message-avatar {
  background: var(--color-primary, #6366f1);
  color: white;
}

.message-content {
  max-width: 75%;
  padding: 10px 14px;
  border-radius: 12px;
  font-size: 14px;
  line-height: 1.6;
  white-space: pre-wrap;
  word-break: break-word;
}

.message-user .message-content {
  background: var(--color-primary, #6366f1);
  color: white;
  border-bottom-right-radius: 4px;
}

.message-assistant .message-content {
  background: #f3f4f6;
  color: var(--color-text, #1f2937);
  border-bottom-left-radius: 4px;
}

.typing-cursor {
  display: inline-block;
  width: 2px;
  height: 14px;
  background: var(--color-primary, #6366f1);
  margin-left: 2px;
  animation: blink 0.8s infinite;
  vertical-align: middle;
}

@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

/* 输入区域 */
.chat-footer {
  padding: 12px 16px;
  border-top: 1px solid var(--color-border, #e5e7eb);
  background: white;
  flex-shrink: 0;
}

.chat-input-wrapper {
  display: flex;
  gap: 8px;
  align-items: center;
}

.chat-input {
  flex: 1;
  padding: 10px 14px;
  font-size: 14px;
  border: 1px solid var(--color-border, #e5e7eb);
  border-radius: 24px;
  outline: none;
  transition: border-color 0.2s;
}

.chat-input:focus {
  border-color: var(--color-primary, #6366f1);
}

.chat-input:disabled {
  background: #f9fafb;
}

.chat-send-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--color-primary, #6366f1);
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  flex-shrink: 0;
}

.chat-send-btn:hover:not(:disabled) {
  background: var(--color-primary-dark, #4f46e5);
  transform: scale(1.05);
}

.chat-send-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* 设置面板样式 */
.settings-section {
  margin-bottom: 16px;
}

.settings-label {
  display: block;
  font-size: 13px;
  font-weight: 600;
  color: var(--color-text, #1f2937);
  margin-bottom: 6px;
}

.settings-hint {
  font-size: 12px;
  color: var(--color-text-secondary, #6b7280);
  margin: 0 0 12px 0;
  line-height: 1.5;
}

.settings-hint a {
  color: var(--color-primary, #6366f1);
  text-decoration: none;
}

.settings-hint a:hover {
  text-decoration: underline;
}

/* Provider 选择器 */
.provider-selector {
  display: flex;
  gap: 8px;
}

.provider-btn {
  flex: 1;
  padding: 8px 12px;
  font-size: 13px;
  font-weight: 500;
  color: var(--color-text, #6b7280);
  background: var(--color-surface, #fff);
  border: 1px solid var(--color-border, #e5e7eb);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
}

.provider-btn:hover {
  border-color: var(--color-primary, #6366f1);
  color: var(--color-primary, #6366f1);
}

.provider-btn.is-active {
  background: var(--color-primary, #6366f1);
  border-color: var(--color-primary, #6366f1);
  color: white;
}

.api-key-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.api-key-input {
  width: 100%;
  padding: 10px 40px 10px 12px;
  font-size: 13px;
  font-family: monospace;
  border: 1px solid var(--color-border, #e5e7eb);
  border-radius: 8px;
  background: var(--color-surface, #fff);
  color: var(--color-text, #1f2937);
  outline: none;
  transition: border-color 0.2s;
}

.api-key-input:focus {
  border-color: var(--color-primary, #6366f1);
}

.api-key-input::placeholder {
  color: #9ca3af;
}

.api-key-toggle {
  position: absolute;
  right: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border: none;
  background: transparent;
  color: var(--color-text-secondary, #6b7280);
  cursor: pointer;
  border-radius: 4px;
}

.api-key-toggle:hover {
  background: var(--color-border, #e5e7eb);
  color: var(--color-text, #1f2937);
}

.settings-status {
  margin-top: 10px;
}

.status-badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 10px;
  font-size: 12px;
  font-weight: 500;
  border-radius: 9999px;
}

.status-active {
  background: #dcfce7;
  color: #16a34a;
}

.status-inactive {
  background: #fee2e2;
  color: #dc2626;
}

.settings-actions {
  margin-top: 16px;
}

.summarizer-error {
  color: #ef4444;
  font-size: 13px;
  margin-top: 12px;
}

.summarizer-button {
  width: 100%;
  padding: 12px 20px;
  font-size: 14px;
  font-weight: 500;
  color: white;
  background: var(--color-primary, #6366f1);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s, transform 0.1s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.summarizer-button:hover:not(:disabled) {
  background: var(--color-primary-dark, #4f46e5);
}

.summarizer-button:active:not(:disabled) {
  transform: scale(0.98);
}

.summarizer-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.summarizer-button.secondary {
  background: var(--color-surface, #fff);
  color: var(--color-text, #6b7280);
  border: 1px solid var(--color-border, #e5e7eb);
  margin-top: 8px;
}

.summarizer-button.secondary:hover:not(:disabled) {
  background: #f3f4f6;
}

.summarizer-spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

.summarizer-spinner.small {
  width: 14px;
  height: 14px;
  border-width: 2px;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* 悬浮按钮 */
.summarizer-fab {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: var(--color-primary, #6366f1);
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 16px rgba(99, 102, 241, 0.4);
  transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
}

.summarizer-fab:hover {
  background: var(--color-primary-dark, #4f46e5);
  transform: scale(1.05);
  box-shadow: 0 6px 20px rgba(99, 102, 241, 0.5);
}

.summarizer-fab.is-active {
  background: var(--color-surface, #fff);
  color: var(--color-text, #1f2937);
  border: 1px solid var(--color-border, #e5e7eb);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.summarizer-fab.has-unread::after {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 12px;
  height: 12px;
  background: #ef4444;
  border-radius: 50%;
  border: 2px solid white;
}

/* 过渡动画 */
.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateX(20px);
}
</style>
