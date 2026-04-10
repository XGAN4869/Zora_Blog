---
title: Vue 和 JavaScript 常见知识点速记
description: 记录几个做前端面试和日常开发时都很高频的 Vue 与 JavaScript 基础知识点。
date: 2026-04-10
slug: vue-and-javascript-core-notes
tags:
  - Vue 3
  - JavaScript
  - 前端基础
readingTime: 9 分钟
draft: false
---

这篇文章不追求讲得特别深，而是把几个高频、常用、容易混淆的知识点先整理成一版速记。

## 1. `ref` 和 `reactive` 的区别

在 Vue 3 里，它们都能做响应式，但适用场景不一样。

### `ref`

更适合包裹基础类型，也可以包裹对象。

```ts
const count = ref(0)
count.value++
```

它的特点是：

- 基础类型最常用
- 取值和赋值都要通过 `.value`
- 在模板里会自动解包

### `reactive`

更适合包裹对象和数组。

```ts
const profile = reactive({
  name: 'Linhan',
  role: 'Frontend Developer',
})

profile.role = 'Vue Developer'
```

它的特点是：

- 更适合结构化对象
- 不需要 `.value`
- 不能直接整体替换成一个全新对象而不丢失引用语义

## 2. `computed` 和方法的区别

很多初学者会问：既然方法也能返回值，为什么还要 `computed`？

原因在于缓存。

`computed` 会基于依赖做缓存，只有依赖变化时才重新计算；方法则是模板每次执行都会重新调用。

```ts
const firstName = ref('Gan')
const lastName = ref('Linhan')

const fullName = computed(() => `${firstName.value} ${lastName.value}`)
```

适合用 `computed` 的场景：

- 列表筛选结果
- 标签集合提取
- 展示层格式化结果

这也是为什么博客页里的标签筛选逻辑，适合放到 `computed` 里做。

## 3. `watch` 和 `watchEffect` 怎么选

### `watch`

你知道自己要监听谁，并且希望拿到变化前后值时，用 `watch`。

```ts
watch(searchKeyword, (newValue, oldValue) => {
  console.log('搜索词变化了', oldValue, newValue)
})
```

### `watchEffect`

你只关心“依赖变了就重新执行”，不想手动把依赖一个个列出来时，用 `watchEffect`。

```ts
watchEffect(() => {
  console.log(route.path)
})
```

简单记法：

- 需要精确监听，用 `watch`
- 需要自动收集依赖，用 `watchEffect`

## 4. JavaScript 闭包到底是什么

闭包不是特别玄的概念，你可以先把它理解成：

> 函数可以记住并访问它定义时所在作用域中的变量。

```js
function createCounter() {
  let count = 0

  return function () {
    count++
    return count
  }
}

const counter = createCounter()
console.log(counter()) // 1
console.log(counter()) // 2
```

为什么这在前端里重要？

- 组合式函数里会用到
- 防抖和节流函数里会用到
- 权限、状态缓存、模块封装里会用到

## 5. 原型链要掌握到什么程度

日常 Vue 开发里，不需要天天手写原型链代码，但你最好知道：

- JS 对象查找属性时，会先找自己
- 自己没有，就沿着原型往上找
- 直到找到或到 `null` 为止

这一层理解够你解释：

- `hasOwnProperty`
- 继承
- 构造函数和实例关系
- 为什么数组和对象能调用各自的方法

## 6. `==` 和 `===`

这个知识点很基础，但面试和业务代码里都特别常见。

- `===`：严格相等，类型和值都要相同
- `==`：会做隐式转换后再比较

开发里优先用 `===`，因为它更稳定、可读、可预期。

```js
0 == false // true
0 === false // false
```

## 7. 做 Vue 页面时的一个实践建议

把“数据处理”和“视图展示”分开。

比如博客标签筛选这种功能，更推荐这样拆：

- 原始文章数据来自内容目录
- 标签集合提取放到 composable
- 当前选中状态放到 `ref`
- 筛选结果放到 `computed`
- 页面只负责渲染按钮和列表

这种写法不仅更清楚，也更方便后面写测试。

## 小结

Vue 和 JavaScript 的很多知识点，并不是孤立背诵的面试题。真正把它们放进博客、列表筛选、状态管理、组件拆分这些实际场景里，你会更容易记住，也更容易讲清楚。
