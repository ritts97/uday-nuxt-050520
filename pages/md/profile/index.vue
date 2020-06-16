<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-md-12 mb-1 text-center">
          Patient's Profile
          <hr>
        </div>
      </div>
    </div>
    <div class="container">
      <transition name="u-fade">
        <div class="row mt-2">
          <div class="col-md-3 text-left" style="min-height: 200px;">
            <nuxt-link to="/ha/profile" class="text-decoration-none text-dark">
              <img src="/avatar-woman.png">
            </nuxt-link>
          </div>
          <div class="col-md-9">
            <div class="row">
              <div class="col-md-6">
                <h5 class="d-inline text-decoration-none">Delores Abernathy</h5>  
              </div>
              <div class="col-md-6 text-right">
                <img src="/circle-red.svg" class="shape-status" alt="">
                Allocated To Me
              </div>
            </div>
            <br>
            <!-- Hello, my name is Dr. Gupta, and I graduated from John Hopkins in '20. I'm happy help you!<br><br> -->
            <div class="row">
              <div class="col-md-6">
                Industrial Farmer <br>
                1-415-555-1234 <br>
                Son of Bernard <br><br>
                District, State <br><br>
              </div>
              <div class="col-md-6">
                Address 1 <br>
                Address 2 <br>
                <br><br>
                Police Station<br><br>
              </div>
            </div>
          </div>
        </div>
      </transition>
      <div class="row">
        <div class="col-md-12">
          <hr>
        </div>
      </div>
    </div>

    <transition name="u-fade" :key="routerViewKey">
      <nuxt-child />
    </transition>
  </div>
</template>

<script>
export default {
  layout: 'dashboard',
  computed: {
    routerViewKey () {
      return this.$route.fullPath
    }
  },
  data() {
    return {
      showDemographics: true,
      fullPath: [
        {
          title: 'Dashboard',
          url: '/md'
        },
        {
          title: 'Delores Abernathy',
          url: '/md/profile'
        },
      ]
    }
  },
  created() {
    // this.$store.commit('increment', this.fullPath)
  },
  transition: 'u-fade'
}
</script>

<style>
.u-fade-enter-active, .u-fade-leave-active {
  transition: opacity .4s;
}
.u-fade-enter, .u-fade-leave-active {
  opacity: 0;
}
</style>
