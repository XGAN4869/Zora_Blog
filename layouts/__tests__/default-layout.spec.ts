import { mount } from '@vue/test-utils'
import DefaultLayout from '../default.vue'

describe('default layout', () => {
  it('renders the shared layout regions and page slot', () => {
    const wrapper = mount(DefaultLayout, {
      slots: {
        default: '<div data-test="page-slot">page content</div>',
      },
      global: {
        stubs: {
          SiteNavbar: {
            template: '<header data-test="site-navbar" />',
          },
          SiteFooter: {
            template: '<footer data-test="site-footer" />',
          },
        },
      },
    })

    expect(wrapper.find('[data-test="site-navbar"]').exists()).toBe(true)
    expect(wrapper.find('.app-shell__main').exists()).toBe(true)
    expect(wrapper.find('[data-test="page-slot"]').text()).toContain('page content')
    expect(wrapper.find('[data-test="site-footer"]').exists()).toBe(true)
  })
})
