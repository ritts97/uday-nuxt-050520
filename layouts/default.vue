<template>
  <div>
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

    <transition name="u-fade" mode="out-in">
      <nuxt  />
    </transition>
  </div>
</template>

<style>
html, body {
  background-color: #eee;
}

</style>
