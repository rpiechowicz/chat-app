<script setup lang="ts">
const props = defineProps({
  type: {
    type: String,
    default: 'text'
  },
  modelValue: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue'])
const modelState = ref<string>(props.modelValue)

watch(modelState, (val) => emit('update:modelValue', val))
</script>

<template>
  <div class="py-2">
    <label class="block text-sm font-medium text-gray-700">{{ label }}</label>
    <div class="relative mt-1 rounded-md shadow-sm">
      <input
        v-model="modelState"
        :type="type"
        :placeholder="placeholder"
        class="block w-full rounded-md border-gray-300 focus:color-blue focus:color-blue sm:text-sm"
      />
    </div>
  </div>
</template>
