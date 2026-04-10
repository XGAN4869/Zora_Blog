import { config } from '@vue/test-utils'

config.global.stubs = {
  NuxtLink: {
    props: ['to'],
    template: '<a :href="typeof to === \'string\' ? to : \'#\'"><slot /></a>',
  },
  ClientOnly: {
    template: '<div><slot /></div>',
  },
}
