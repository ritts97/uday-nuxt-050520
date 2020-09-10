<template>
  <div>
    <div class="container mb-3">
      <div class="row px-3">
        <div class="col-md-12 bg-white py-3 rounded">
          <div class="container">
            <div class="row">
              <div class="col-md-6">
                <label for="">New Password</label>
                <input type="text" class="w-100 p-2 mb-3" placeholder="Must be at least 8 letters, and haven't been used before">
                <label for="">Old Password</label>
                <input type="text" class="w-100 p-2 mb-3" placeholder="You current password">
              </div>
              <div class="col-md-6">
                <label for="">Confirm New Password</label>
                <input type="text" class="w-100 p-2 mb-3" placeholder="Must be at least 8 letters, and haven't been used before">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container mb-3">
      <div class="row">
        <div class="col-md-12">
          <nuxt-link to="/ha">
            <button class="w-100 btn btn-dark rounded font-weight-bold py-3 mb-1  text-uppercase">
              Update Password
            </button>
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'dashboard',
  mounted() {
    let path = [
      {
        title: 'Dashboard',
        url: '/ha'
      },
      {
        title: 'View/Edit Profile',
        url: '/ha/register-new'
      },
    ]

    this.$store.commit('updatePath', path)

  },
  data() {
    return {}
  },
}
</script>

<style>
</style>
