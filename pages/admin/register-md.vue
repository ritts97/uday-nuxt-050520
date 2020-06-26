<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-md-12 rounded">
          <div class="w-100 bg-white mb-3 mt-0 px-3 pt-3 pb-3">
            <div class="container">
              <div class="row mt-3">
                <div class="col-md-6">
                  <input type="text" class="w-100 p-2 mb-3" placeholder="Full Name">
                  <input type="text" class="w-100 p-2 mb-3" placeholder="Password">
                  <input type="text" class="w-100 p-2 mb-3" placeholder="Cluster">
                </div>
                <div class="col-md-6">
                  <input type="text" class="w-100 p-2 mb-3" placeholder="Email">
                  <input type="text" class="w-100 p-2 mb-3" placeholder="Confirm Password">
                  <input type="text" class="w-100 p-2 mb-3" placeholder="Current Date">
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
            <button @click="registerMD()" class="w-100 btn btn-dark rounded font-weight-bold py-3 mb-1  text-uppercase">
              Register New Doctor
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
        title: 'Register Doctor',
        url: '/admin/register-new'
      },
    ]

    this.$store.commit('updatePath', path)
  },
  methods: {
    registerMD: function (msg) {
      alert('A new Docotor has been registered.')

      let payload = {
        id: "md003",
        status: "offline",
        demographics: {
          name: "Jamaica Samsung"
        }
      }

      this.$store.commit('registerMD', payload)
    }
  },
  data() {
    return {}
  },
}
</script>

<style>
</style>
