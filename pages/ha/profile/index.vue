<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <small>
            <nuxt-link to="/ha" class="text-muted">
              Dashboard
            </nuxt-link>
             > Patient Profile > Lorem Ipsum
          </small>
        </div>
      </div>
    </div>
    <div class="container mt-3">
      <div class="row">
        <div class="col-md-6">
          <!-- <nuxt-link to="/ha/profile" class="text-decoration-none text-dark"> -->
            <h5 class="d-inline text-decoration-none">Delores Abernathy (29, F)</h5>  
          <!-- </nuxt-link> -->
          [ <div class="d-inline pointer text-muted" @click="showDemographics = !showDemographics">
            <span v-if="!showDemographics">show</span>
            <span v-else>hide</span>
          </div> ]
        </div>
        <div class="col-md-6 text-right">
          <img src="/circle-green.svg" class="shape-status" alt="">
          Registered
        </div>
      </div>
      <transition name="u-fade">
        <div class="row mt-3" v-if="showDemographics">
          <div class="col-md-3 text-left" style="min-height: 200px;">
            <nuxt-link to="/ha/profile" class="text-decoration-none text-dark">
              <img src="/avatar.png">
            </nuxt-link>
          </div>
          <div class="col-md-4">
            Industrial Farmer <br>
            1-415-555-1234 <br>
            Son of Bernard <br><br>
            District, State <br><br>
            <nuxt-link to="/ha/profile/update-history" class="text-muted">
              View Medical History...
            </nuxt-link><br>
            <nuxt-link to="/ha/profile/view-bills" class="text-muted">
              View Billing History...
            </nuxt-link><br>
          </div>
          <div class="col-md-5">
            Address 1 <br>
            Address 2 <br>
            <br><br>
            Police Station<br><br>
            <nuxt-link to="/ha/profile/update-demo" class="text-muted">
              Update Demographics...
            </nuxt-link><br>
            <!-- <nuxt-link to="/ha/profile/update-history" class="text-muted">
              Update Medical History...
            </nuxt-link> -->
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
    }
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
