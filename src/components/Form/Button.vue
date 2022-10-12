<script setup lang="ts">
const props = defineProps({
  color: {
    type: String,
    default: 'blue'
  },
  loading: Boolean,
  disabled: Boolean,
  fullWidth: Boolean,
  icon: Boolean,
  end: Boolean
})

const emit = defineEmits(['click'])

const button = ref(null)
const hover = ref<boolean>(false)
const focus = ref<boolean>(false)

const tagName = computed<string>(() => 'button')

const buttonClasses = computed(() => {
  const out = []

  // States
  if (focus.value) out.push('focus')
  if (hover.value) out.push('hover')

  out.push('color-' + props.color)
  if (hover.value) out.push('hover')

  return out
})

const hoverStyle = computed(() => {
  if (!hover.value) return {}

  return {
    boxShadow: '0 10px 40px -8px ' + `var(--color-${props.color})`
  }
})

const focusStyle = computed(() => {
  if (!focus.value) return {}

  return {
    borderColor: 'rgba(0,0,0,0.5)'
  }
})

const buttonStyle = computed(() => {
  return {
    ...hoverStyle.value,
    ...focusStyle.value
  }
})

const click = (e: Event) => {
  e.preventDefault()
  emit('click')
}
</script>

<template>
  <div :class="{ 'flex justify-end': end }">
    <component
      :is="tagName"
      ref="button"
      v-ripple
      :class="buttonClasses"
      :style="buttonStyle"
      class="tl-button my-2"
      @focus="focus = true"
      @blur="focus = false"
      @mouseover="hover = true"
      @mouseleave="hover = false"
      @mousedown="(e: Event) => e.preventDefault()"
      @click="(e: Event) => click(e)"
    >
      <span class="tl-button-content">
        <transition mode="out-in" name="fade-slide-y-1">
          <div class="tl-button-text">
            <slot />
          </div>
        </transition>
      </span>
    </component>
  </div>
</template>

<style lang="sass" scoped>
.tl-button
    height: 35px
    border-radius: var(--border-radius)
    //box-sizing: border-box
    display: flex
    justify-content: center
    align-items: center
    cursor: pointer
    transition: background-color 0.3s, box-shadow 0.3s, border-color .1s
    box-shadow: 0 0 0 -10px transparent
    position: relative
    z-index: 3
    letter-spacing: 0.1em
    overflow: hidden
    border: 0px solid transparent
    padding: 0px
    text-decoration: none !important
    color: white
    .tl-button-content
        padding: 0 15px
        transition: all 0.3s
        font-family: var(--font-family-primary)
        font-weight: var(--font-weight-medium)
        font-size: 14px
        user-select: none
        .tl-button-content-loading
            position: relative
            .loading-position
                width: 100%
                height: 100%
                position: absolute
                top: 0
                left: 0
        .arrow
            margin-left: 30px
            font-size: 20px
            transition: var(--transition-default)
        &.has-arrow
            width: 100%
            .tl-button-text
                display: flex
                justify-content: space-between
                align-items: center
                width: 100%
    &:focus
        outline: none
    &.focus:not(.tl-button-outlined)
        padding: 0px
        border-width: 1px
    &.disabled, &.loading
        cursor: not-allowed
    &.hover
        .arrow
            transform: rotate(-45deg)
    &.large
        height: 60px
        .tl-button-content
            padding: 0 25px
            font-size: 18px
        .arrow
            margin-left: 45px
            font-size: 26px
    &.small
        height: 30px
        .tl-button-content
            padding: 0 10px
            font-size: 14px
        .arrow
            margin-left: 15px
            font-size: 14px
    &.tl-button-icon
        height: 45px
        width: 45px
        padding: 0px !important
        .tl-button-content
            padding: 0px !important
            font-size: 22px
        &.large
            height: 60px
            width: 60px
            .tl-button-content
                font-size: 26px
        &.small
            height: 30px
            width: 30px
            .tl-button-content
                font-size: 18px
</style>
