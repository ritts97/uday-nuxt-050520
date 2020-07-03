<template>
  <div id="default-layout">
    <!-- Header -->
    <!-- <div class="fixed-top">
      <div class="w-100 bg-dark text-white">
        <div class="container bg-dark">
          <div class="row py-2">
            <div class="col-md-12 pt-2"> 
              <span class="font-weight-bold" style="font-size: 24px;">
                <nuxt-link to="/" class="text-white text-decoration-none">UD.</nuxt-link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div> -->

    <transition appear name="u-fade" mode="out-in">
      <nuxt  />
    </transition>
  </div>
</template>

<script>
export default {
  mounted() {
    // alert('123')
    document.documentElement.classList.add('h-100')
    document.body.classList.add('h-100')
    document.getElementById('__nuxt').classList.add('h-100')
    document.getElementById('__layout').classList.add('h-100')
  },
  destroyed() {
    document.documentElement.classList.remove('h-100')
    document.body.classList.remove('h-100')
    document.getElementById('__nuxt').classList.remove('h-100')
    document.getElementById('__layout').classList.remove('h-100')
  },
}
</script>
<style>
html, body {
  background-color: #eee;
}

html, #default-layout, #default-layout > div {
  height: 100%;
}
</style>
