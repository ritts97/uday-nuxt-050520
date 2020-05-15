<template>
  <div>
    <div class="w-100 bg-dark text-white mb-3">
      <div class="container bg-dark">
        <div class="row py-2">
          <div class="col-md-6 font-weight-bold py-1" style="font-size: 24px;">
            UD.
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row text-center">
        <div class="offset-md-4 col-md-4 bg-white rounded px-4 py-4 mt-4">
          <!-- Login <br> -->
          <img src="/uday-logo-orig.png" class="p-3" alt=""><br>
          <small class="text-secondary">We are grateful for your support.</small><br>
          <hr>
          <input type="text" name="" class="w-100 mb-2 p-2" placeholder="Username or Email" id=""><br>
          <input type="text" name="" class="w-100 p-2" placeholder="Password" id=""><br>
          <nuxt-link to="/ha">
            <button class="btn btn-dark my-3 p-2 w-100 text-uppercase">
              Login
            </button>
          </nuxt-link><br>
          <nuxt-link to="/register-ha">
            <small class="text-secondary">Register a new Health Assistant?</small>
          </nuxt-link><br>
          <nuxt-link to="/forgot-pass">
            <small class="text-secondary">Forgot password?</small>
          </nuxt-link>
        </div>
      </div>
    </div>
    <div class="container text-center pt-5">
      <div class="row">
        <div class="col-md-12 text-secondary">
          <small>
            UdayHealth.org is a virtual, telemedicine application <br> organized by medical professionals and volunteers worldwide.
          </small>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style>
</style>
