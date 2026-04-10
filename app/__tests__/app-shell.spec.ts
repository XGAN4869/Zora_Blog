import { mount } from '@vue/test-utils'
import AppShell from '../app.vue'

describe('app shell', () => {
  it('renders the bootstrap heading', () => {
    const wrapper = mount(AppShell)

    expect(wrapper.text()).toContain('Zora Homepage project foundation is ready.')
  })
})
