<template>
  <div class="d-flex align-items-center">
    <!-- <div class="w-100 bg-dark text-white mb-3">
      <div class="container bg-dark">
        <div class="row py-2">
          <div class="col-md-6 font-weight-bold py-1" style="font-size: 24px;">
            UD.
          </div>
        </div>
      </div>
    </div> -->
    <div class="container">
      <div class="row text-center">
        <div class="offset-md-4 col-md-4 bg-white rounded px-4 py-4">
          <!-- Login <br> -->
          <img src="/uday-logo-orig.png" class="p-3" alt=""><br>
          <div class="text-secondary mt-1 pb-0">Welcome to Uday. 
            <!-- <br>We are grateful for your support. -->
            </div>
          <hr>
          <input type="text" name="" class="w-100 mb-2 p-2" placeholder="Username or Email" id=""><br>
          <input type="text" name="" class="w-100 p-2" placeholder="Password" id=""><br>
          <!-- <nuxt-link to="/ha">
            <button class="btn btn-dark mt-3 mb-2 p-2 w-100 text-uppercase">
              Login
            </button>
          </nuxt-link> -->
          <nuxt-link to="/ha">
            <button class="btn btn-dark mt-3 mb-2 p-2 w-100 text-uppercase">
              Login (as HA)
            </button>
          </nuxt-link>
          <nuxt-link to="/md">
            <button class="btn btn-dark mb-2 p-2 w-100 text-uppercase">
              Login (as Doct.)
            </button>
          </nuxt-link>
          <nuxt-link to="/admin">
            <button class="btn btn-dark mb-2 p-2 w-100 text-uppercase">
              Login (as Admin)
            </button>
          </nuxt-link>
          <nuxt-link to="/super">
            <button class="btn btn-dark mb-3 p-2 w-100 text-uppercase">
              Login (as Super)
            </button>
          </nuxt-link>

          <button @click="makeRequest()" class="btn btn-dark mb-3 p-2 w-100 text-uppercase">
            Make Request 123
          </button>

          <nuxt-link to="/forgot-pass">
            <small class="text-secondary">Forgot password?</small>
          </nuxt-link>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <!-- <div class="container text-center mb-4 mt-5">
      <div class="row">
        <div class="col-md-12 text-secondary">
          <small>
            UdayHealth.org is a virtual, telemedicine application organized by medical professionals and volunteers worldwide.
          </small>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
import axios from 'axios'

export default {
  layout: 'default',
  methods: {
    makeRequest: function () {
      axios.get('http://localhost:5000/').then(function(res){
        console.log(res)
        console.log('Success 123s')
      })
    }
  }
}
</script>

<style>
/* .no-underline {

} */
</style>
