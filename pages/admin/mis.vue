<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-md-12 rounded">
          <div class="w-100 bg-white mb-3 mt-0 px-3 pt-3 pb-3">
            <div class="container">
              <div class="row my-3">
                <div class="col-md-12">
                  My Cluster <br><br>
                  <img src="/mis-reports.svg" class="w-100" alt="">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container mb-3">
      <div class="row">
        <div class="col-md-12">
          <nuxt-link to="/admin">
            <button @click="showAlert('Your cluster data has been exported.')" class="w-100 btn btn-dark rounded font-weight-bold py-3 mb-1  text-uppercase">
              Export Report to File
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
        title: 'Admin\'s Dashboard',
        url: '/admin'
      },
      {
        title: 'MIS Reports',
        url: '/ha/register-new'
      },
    ]

    this.$store.commit('updatePath', path)
  },
  methods: {
  },
  data() {
    return {
    }
  },
}
</script>