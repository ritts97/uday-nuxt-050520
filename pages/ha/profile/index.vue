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
    <div class="container mt-2">
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
              <div class="col-md-6 text-right text-capitalize">
                <img v-if="this.$store.state.currPatient.status == 'registered'" src="/circle-green.svg" class="shape-status" alt="">
                <img v-if="this.$store.state.currPatient.status == 'released'" src="/circle-yellow.svg" class="shape-status" alt="">
                <img v-if="this.$store.state.currPatient.status == 'allocated'" src="/circle-red.svg" class="shape-status" alt="">
                <img v-if="this.$store.state.currPatient.status == 'queued'" src="/circle-orange.svg" class="shape-status" alt="">
                {{ this.$store.state.currPatient.status }}
              </div>
            </div>
            <br>
            
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
          url: '/ha'
        },
        {
          title: 'Delores Abernathy',
          url: '/ha/profile'
        },
      ]
    }
  },
  mounted () {
    // this.$store.commit('updatePath', this.fullPath)
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
