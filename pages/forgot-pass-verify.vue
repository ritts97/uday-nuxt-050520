<template>
  <div class="d-flex align-items-center">
    <div class="container">
      <div class="row text-left">
        <div class="offset-md-4 col-md-4 bg-white rounded px-4 py-4 mt-4">
          <div class="w-100 text-center">
            Forgot Password
          </div>
          <hr class="mb-4">
          What is the name of your first pet?
          <input type="text" name="" class="w-100 mt-2 mb-3 p-2" placeholder="My dog Spot" id=""><br>
          Who is your favorite super hero?
          <input type="text" name="" class="w-100 mt-2 mb-3 p-2" placeholder="Superman" id=""><br>
          What is 2+2?
          <input type="text" name="" class="w-100 mt-2 mb-2 p-2" placeholder="4" id=""><br>
          <nuxt-link to="/forgot-pass-verify-02">
            <button class="btn btn-dark my-3 p-2 w-100 text-uppercase">
              Request Reset
            </button>
          </nuxt-link>
          <br>
          <div class="w-100 text-center">
            <nuxt-link to="/">
              <small class="text-secondary">Go back to login.</small>
            </nuxt-link>
          </div>
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
