<script setup lang="ts"></script>

<template>
  <div id="chat-app">
    <transition mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<style lang="sass">
.v-enter-active,.v-leave-active
  transition: opacity .5s ease

.v-enter-from,.v-leave-to
  opacity: 0

#chat-app
  height: 100vh
  width: 100vw
</style>
