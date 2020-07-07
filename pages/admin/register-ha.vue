<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-md-12 rounded">
          <div class="w-100 bg-white mb-3 mt-0 px-3 pt-3 pb-3" v-if="tabs[0].isActive">
            <div class="container">
              <div class="row">
                <div class="col-md-12 text-center">
                  <img src="/avatar-placeholder.jpg" class="m-3" style="width: 200px;" alt=""><br>
                  <button class="btn btn-dark px-4 mb-3">Upload Photo</button>
                </div>
              </div>
              <div class="row mt-3">
                <div class="col-md-12 mb-3">
                  General Information
                </div>
                <div class="col-md-6">
                  <input type="text" class="w-100 p-2 mb-3" placeholder="HA Name">
                </div>
                <div class="col-md-6">
                  <input type="text" class="w-100 p-2 mb-3" placeholder="Gender">
                </div>
                <div class="col-md-6">
                  <input type="text" class="w-100 p-2 mb-3" placeholder="DOB">
                </div>
                <div class="col-md-6">
                  <input type="text" class="w-100 p-2 mb-3" placeholder="Language">
                </div>
                <div class="col-md-6">
                  <input type="text" class="w-100 p-2 mb-3" placeholder="Emergency Contact">
                </div>
                <div class="col-md-6">
                  <input type="text" class="w-100 p-2 mb-3" placeholder="Courses Completed">
                </div>
                <div class="col-md-12 mb-3">
                  Location Information
                </div>
                <div class="col-md-6">
                  <input type="text" class="w-100 p-2 mb-3" placeholder="City">
                </div>
                <div class="col-md-6">
                  <input type="text" class="w-100 p-2 mb-3" placeholder="State ID">
                </div>
                <div class="col-md-6">
                  <input type="text" class="w-100 p-2 mb-3" placeholder="Country">
                </div>
                <div class="col-md-6">
                  <input type="text" class="w-100 p-2 mb-3" placeholder="Govt. ID Type">
                </div>
                <div class="col-md-6">
                  <input type="text" class="w-100 p-2 mb-3" placeholder="Govt. ID">
                </div>
                <div class="col-md-6">
                  <input type="text" class="w-100 p-2 mb-3" placeholder="Is Verified">
                </div>
                <div class="col-md-12 mb-3">
                  Application Information
                </div>
                <div class="col-md-6">
                  <input type="text" class="w-100 p-2 mb-3" placeholder="HA ID">
                </div>
                <div class="col-md-6">
                  <input type="text" class="w-100 p-2 mb-3" placeholder="Current Cluster">
                </div>
                <div class="col-md-6">
                  <input type="text" class="w-100 p-2 mb-3" placeholder="Registered Cluster">
                </div>
                <div class="col-md-6">
                  <input type="text" class="w-100 p-2 mb-3" placeholder="Direct Supervisor">
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
          <nuxt-link to="/admin">
            <button @click="registerHA()" class="w-100 btn btn-dark rounded font-weight-bold py-3 mb-1  text-uppercase">
              Register New Health Assistant
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
        title: 'Register Health Assistant',
        url: '/admin/register-new'
      },
    ]

    this.$store.commit('updatePath', path)
  },
  methods: {
    showAlert: function (msg) {
      alert(msg)
    },
    registerHA: function (msg) {
      alert('A new Health Assistant has been registered.')

      let payload = {
        name: 'Teresa Mendoza (RN)',
        id: 'ha0001',
        role: 'ha',
        status: 'online',
        cluster: 'cluster0001',
        bio: 'Hello, my name is Teresa Mendoza, and I\'m studying to become a nurse! I\'m happy help you!',
        phone: '1-415-555-1234',
        address: '2222 Market Street',
        location: 'Calcutta, IN',
        email: ''
      }

      this.$store.commit('registerHA', payload)
    }
  },
  data() {
    return {
      list: [],
      tabs: [
        {
          name: 'patients',
          title: 'Demographics',
          isActive: true,
        }
      ]
    }
  },
}
</script>

<style>
</style>
