<template>
  <div>
    <div class="container" style="margin-top:100px;">
      <div class="row text-center">
        <div class="offset-md-4 col-md-4 bg-white rounded px-4 py-4 mt-4">
          <!-- Login <br> -->
          Forgot Password
          <hr>
          <input type="text" name="" class="w-100 p-2" placeholder="Username or Email" id=""><br>
          <nuxt-link to="/forgot-pass-verify">
            <button class="btn btn-dark my-3 p-2 w-100 text-uppercase">
              Request Reset
            </button>
          </nuxt-link>
          <br>
          <nuxt-link to="/">
            <small class="text-secondary">Go back to login.</small>
          </nuxt-link>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
export default {
  layout: 'default',
}
</script>

<style>
</style>
