import uniqid from 'uniqid'

interface Elements {
  id: string
  dom: HTMLElement
  color: string
}

const state = reactive({
  elements: [] as Elements[],
  color: 'rgba(255,255,255,.3)'
})

const fireRipple = (e: any, element: any) => {
  if (!state.elements.map((i: any) => i.id).includes(element.id)) return

  const rect = element.dom.getBoundingClientRect()
  const x = e.pageX - rect.left - window.scrollX
  const y = e.pageY - rect.top - window.scrollY
  const w = element.dom.offsetWidth * 1.5
  const ripple: HTMLElement = document.createElement('span')

  ripple.style.backgroundColor = state.color

  ripple.className = 'ripple'
  ripple.style.left = x + 'px'
  ripple.style.top = y + 'px'
  ripple.style.setProperty('--scale', w)
  element.dom.appendChild(ripple)
  setTimeout(() => {
    ripple.parentNode.removeChild(ripple)
  }, 500)
}

watchEffect(() => {
  state.elements.forEach((element) => {
    element.dom.classList.add('ripple-parent')
    element.dom.addEventListener('click', (e) => fireRipple(e, element))
  })
})

const addRipple = (element, opt) => {
  const id = uniqid()
  element.dataset.rippleId = id
  let options
  if (!opt) {
    options = {}
  } else {
    options = opt
  }

  state.elements.push({
    id: id,
    dom: element,
    color: state.color
  })
}

export default {
  name: 'ripple',

  logic: {
    mounted: (element, binding) => {
      addRipple(element, binding.value)
    },
    updated: (element, binding) => {
      const id = element.dataset.rippleId
      state.elements = state.elements.filter((e) => e.id !== id)
      addRipple(element, binding.value)
    },
    beforeUnmount(element) {
      const id = element.dataset.rippleId
      state.elements = state.elements.filter((e) => e.id !== id)
    }
  }
}
