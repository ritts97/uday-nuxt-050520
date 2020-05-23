<template>
  <div>    
    <!-- Header -->
    <div class="fixed-top">
      <div class="w-100 bg-dark text-white">
        <div class="container bg-dark">
          <div class="row py-2">
            <div class="col-md-6 font-weight-bold pt-2" style="font-size: 24px;"> 
              <nuxt-link to="/ha" class="text-white text-decoration-none">UD.</nuxt-link>
            </div>
            <div class="col-md-6 py-3 text-right">
              <div class="dropdown d-inline">
                <span class="dropdown-toggle dropdown-no-caret pointer" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  jane.doe@udayhealth.org
                </span>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <nuxt-link to="/ha/mis-reports" class="dropdown-item">MIS Reports</nuxt-link>
                  <div class="dropdown-divider"></div>
                  <nuxt-link to="/ha/edit-profile" class="dropdown-item">Edit Profile</nuxt-link>
                  <nuxt-link to="/ha/edit-profile" class="dropdown-item">Change Password</nuxt-link>
                </div>
              </div>
              | Logout
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="" style="background-color: #fff;">
        <div class="container py-2">
          <div class="row">
            <div class="col-md-12">
              <small>
                <nuxt-link to="/ha" class="text-muted">
                  Dashboard
                </nuxt-link> > 
                <nuxt-link to="/ha/profile" class="text-muted">
                  Patient Profile
                </nuxt-link> > 
                Episode 1
              </small>
            </div>
          </div>
        </div>
      </div> -->
    </div>

    <!-- Start Body -->
    <div style="margin-top: 84px;">
      <transition name="u-fade" mode="out-in">
        <nuxt  />
        <!-- :key="routerViewKey" -->
      </transition>
    </div>

    <!-- Footer -->
    <div class="container text-center mb-4">
      <div class="row">
        <div class="col-md-12 text-secondary">
          <small>
            UdayHealth.org is a virtual, telemedicine application organized by medical professionals and volunteers worldwide.
          </small>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    routerViewKey () {
      return this.$route.fullPath
    }
  },
}
</script>

<style>
html, body {
  background-color: #eee;
}

.u-fade-enter-active, .u-fade-leave-active {
  transition: opacity .4s;
}
.u-fade-enter, .u-fade-leave-active {
  opacity: 0;
}
</style>
