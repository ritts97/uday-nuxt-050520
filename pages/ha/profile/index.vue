<template>
  <div>
    <div class="container">
      <transition appear name="u-fade">
        <div class="row">
          <div class="col-md-3 text-left responsive-padding-bottom" style="min-height: 200px;">
            <div class="position-relative">
              <div class="position-absolute">
                <nuxt-link to="/ha/profile">
                  <img class="w-100" src="/avatar-man_09.png">
                </nuxt-link>
              </div>
              <div class="w-100" style="padding-bottom: 100%;"></div>
            </div>
          </div>
          <div class="col-md-9">
            <div class="row">
              <div class="col-md-12 text-capitalize">
                <h5 class="d-inline text-decoration-none">{{ currPatient.demographics.name }}</h5>  
                <div class="d-inline float-right">
                  <img v-if="currPatient.status == 'registered'" src="/circle-green.svg" class="shape-status" alt="">
                  <img v-if="currPatient.status == 'released'" src="/circle-yellow.svg" class="shape-status" alt="">
                  <img v-if="currPatient.status == 'allocated'" src="/circle-red.svg" class="shape-status" alt="">
                  <img v-if="currPatient.status == 'queued'" src="/circle-orange.svg" class="shape-status" alt="">
                  {{ currPatient.status }}
                </div>
              </div>
            </div>
            <br>
            
            <div class="row">
              <div class="col-md-6"> 
                {{ currPatient.demographics.occupation }} | 
                {{ currPatient.demographics.age }} years old <br>
                {{ currPatient.demographics.hswd }} <br><br>
                {{ currPatient.demographics.police }}
              </div>
              <div class="col-md-6">
                {{ currPatient.demographics.phone }} <br><br>
                {{ currPatient.demographics.address }} <br>
                {{ currPatient.demographics.location }}
                
                <!-- {{ currPatient.demographics.address2 }} <br> -->
                <!-- :: {{ this.$store.state.currPatient.id }}<br> -->
              </div>
              <div class="col-md-10 mt-4">
                <!-- <hr> -->
              </div>
              <div class="col-md-12">
                <nuxt-link to="/ha/profile/">
                  <button class="btn btn-light py-1 px-3">
                    <small>
                      All Visits
                    </small>
                  </button>
                </nuxt-link>
                <nuxt-link to="/ha/profile/update-demo" class="mr-2">
                  <button class="btn btn-light py-1 px-3">
                    <small>
                      View Demographics
                    </small>
                  </button>
                </nuxt-link>
                <nuxt-link to="/ha/profile/update-history">
                  <button class="btn btn-light py-1 px-3">
                    <small>
                      View Medical History 
                    </small>
                  </button>
                </nuxt-link>
              </div>
              <!-- <div class="col-md-6">
                <nuxt-link to="/ha/profile/update-history">
                  <button class="btn btn-light py-1 px-3">
                    <small>
                      View Family History 
                    </small>
                  </button>
                </nuxt-link>
              </div> -->
            </div>
            <!-- <div class="row">
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
            </div> -->
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
          title: 'Dashboard',
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

@media only screen and (max-width: 600px) {
  .responsive-padding-bottom {
    padding-bottom: 2rem!important;;
  }
}
</style>
