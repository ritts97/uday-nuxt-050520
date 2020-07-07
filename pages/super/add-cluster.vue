<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-md-12 rounded">
          <div class="w-100 bg-white mb-3 mt-0 px-3 pt-3 pb-3">
            <div class="container">
              <div class="row mt-3">
                <div class="col-md-6">
                  <input type="text" class="w-100 p-2 mb-3" placeholder="Cluster ID">
                </div>
                <div class="col-md-6">
                  <input type="text" class="w-100 p-2 mb-3" placeholder="Cluster Code">
                </div>
                <div class="col-md-6">
                  <input type="text" class="w-100 p-2 mb-3" placeholder="Cluster Name">
                </div>
                <div class="col-md-6">
                  <input type="text" class="w-100 p-2 mb-3" placeholder="City/Village">
                </div>
                <div class="col-md-6">
                  <input type="text" class="w-100 p-2 mb-3" placeholder="State ID">
                </div>
                <div class="col-md-6">
                  <input type="text" class="w-100 p-2 mb-3" placeholder="District ID">
                </div>
                <div class="col-md-6">
                  <input type="text" class="w-100 p-2 mb-3" placeholder="PS ID">
                </div>
                <div class="col-md-6">
                  <input type="text" class="w-100 p-2 mb-3" placeholder="Country">
                </div>
                <div class="col-md-6">
                  <input type="text" class="w-100 p-2 mb-3" placeholder="Supervisor">
                </div>
                <div class="col-md-6">
                  <input type="text" class="w-100 p-2 mb-3" placeholder="Services">
                </div>
                <div class="col-md-6">
                  <input type="text" class="w-100 p-2 mb-3" placeholder="Created By">
                </div>
                <div class="col-md-6">
                  <input type="text" class="w-100 p-2 mb-3" placeholder="Date Created">
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
          <nuxt-link to="/super">
            <button @click="registerCluster()" class="w-100 btn btn-dark rounded font-weight-bold py-3 mb-1  text-uppercase">
              Add Cluster
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
        title: 'Add Cluster',
        url: '/admin/register-new'
      },
    ]

    this.$store.commit('updatePath', path)
  },
  methods: {
    registerCluster: function (msg) {
      alert('A new Cluster has been registered.')

      let payload = {
        admins: [],
        mds: [],
        has: [],
        patients: []
      }

      this.$store.commit('registerCluster', payload)
    }
  },
  data() {
    return {}
  },
}
</script>

<style>
</style>
