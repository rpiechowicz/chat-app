<script setup lang="ts"></script>

<template>
  <div class="app">
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<style lang="sass" scoped>
.fade-enter-active, .fade-leave-active
  transition: opacity .3s

.fade-enter, .fade-leave-to
  opacity: 0
</style>
