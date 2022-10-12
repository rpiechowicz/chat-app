<script setup lang="ts"></script>

<template>
  <div class="home">
    <NavBar />

    <div class="container overflow-hidden bg-white shadow sm:rounded-md">
      <transition mode="out-in">
        <router-view />
      </transition>
    </div>
  </div>
</template>

<style lang="sass" scoped>
.home
  height: 100%
  width: 100%

  .container
    display: flex
    margin: 20px auto
    padding: 20px
    width: 80%
    height: 89%
</style>
