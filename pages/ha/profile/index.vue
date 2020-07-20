<template>
  <div>
    <div class="container">
      <transition appear name="u-fade">
        <div class="row my-2">
          <div class="col-md-3 text-left" style="min-height: 200px;">
            <nuxt-link to="/md/profile" class="text-decoration-none text-dark">
              <img class="w-100" src="/avatar-man_04.png">
            </nuxt-link>
          </div>
          <div class="col-md-9">
            <div class="row">
              <div class="col-md-6">
                <h5 class="d-inline text-decoration-none">{{ currPatient.demographics.name }} ({{ currPatient.demographics.age }} years old)</h5>  
              </div>
              <div class="col-md-6 text-right text-capitalize">
                <img v-if="currPatient.status == 'registered'" src="/circle-green.svg" class="shape-status" alt="">
                <img v-if="currPatient.status == 'released'" src="/circle-yellow.svg" class="shape-status" alt="">
                <img v-if="currPatient.status == 'allocated'" src="/circle-red.svg" class="shape-status" alt="">
                <img v-if="currPatient.status == 'queued'" src="/circle-orange.svg" class="shape-status" alt="">
                {{ currPatient.status }}
              </div>
            </div>
            <br>
            
            <div class="row">
              <div class="col-md-6">
                {{ currPatient.demographics.occupation }} <br>
                {{ currPatient.demographics.phone }} <br>
                {{ currPatient.demographics.hswd }} <br><br>
                {{ currPatient.demographics.location }}
              </div>
              <div class="col-md-6">
                {{ currPatient.demographics.address }} <br>
                {{ currPatient.demographics.address2 }} <br>
                :: {{ this.$store.state.currPatient.id }}<br>
                <br>
                {{ currPatient.demographics.police }}
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <hr>
              </div>
              <div class="col-md-6">
                <small>
                  Edit Demographics...
                </small>
              </div>
              <div class="col-md-6">
                <small>
                  View Family History... <br>
                  Edit Family History... <br>
                </small>
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
    currPatient: function () {
      return this.$store.state.currPatient
    },
    routerViewKey () {
      return this.$route.fullPath
    }
  },
  data() {
    return {
      showDemographics: true,
      fullPath: [
        {
          title: 'HA\'s Dashboard',
          url: '/ha'
        },
        {
          title: 'Patient\'s Profile',
          url: '/ha'
        },
      ]
    }
  },
  mounted () {
    console.log('Hello')
    this.$store.commit('updatePath', this.fullPath)
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
