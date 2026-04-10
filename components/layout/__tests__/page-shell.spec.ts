import { mount } from '@vue/test-utils'
import PageShell from '../PageShell.vue'

describe('page shell', () => {
  it('renders eyebrow, title, description and slot content', () => {
    const wrapper = mount(PageShell, {
      props: {
        eyebrow: 'Section',
        title: 'Page shell title',
        description: 'Page shell description',
      },
      slots: {
        default: '<div data-test="slot-body">slot body</div>',
      },
    })

    expect(wrapper.text()).toContain('Section')
    expect(wrapper.text()).toContain('Page shell title')
    expect(wrapper.text()).toContain('Page shell description')
    expect(wrapper.find('[data-test="slot-body"]').exists()).toBe(true)
  })
})
