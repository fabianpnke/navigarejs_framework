import provideRouterContext from './../contexts/provideRouterContext'
import DefaultLayout from './DefaultLayout'
import { RouterEventListener, Router } from '@navigare/core'
import {
  defineComponent,
  h,
  PropType,
  DefineComponent,
  ref,
  onUnmounted,
} from 'vue'

export default defineComponent({
  name: 'Root',

  navigare: true,

  props: {
    router: {
      type: Object as PropType<Router<DefineComponent>>,
      required: true,
    },

    layout: {
      type: [String, null, undefined] as PropType<string | null | undefined>,
      required: true,
    },
  },

  setup(props, { slots }) {
    const layout = ref<string | undefined>(props.layout ?? undefined)

    // Handle navigate event to update layout
    // NOTE: for some reason the `onMounted` hook registered
    // the event listener too late so got rid of it
    const handleNavigate: RouterEventListener<'navigate'> = (event) => {
      layout.value = event.detail.page.layout ?? undefined
    }
    props.router.on('navigate', handleNavigate)
    onUnmounted(() => {
      props.router.off('navigate', handleNavigate)
    })

    // Provide router context
    provideRouterContext(props.router)

    return () => {
      if (slots.default) {
        return slots.default?.({
          layout: layout.value,
        })
      }

      return h(DefaultLayout, {
        layout: layout.value,
        router: props.router,
      })
    }
  },
})
