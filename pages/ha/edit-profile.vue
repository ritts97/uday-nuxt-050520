<template>
  <div>
    <div class="container mb-3">
      <div class="row px-3">
        <div class="col-md-12 bg-white rounded py-5 px-5 text-center">
          Edit Profile
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
        title: 'Edit Profile',
        url: '/ha'
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
