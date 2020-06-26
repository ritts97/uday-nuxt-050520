<template>
  <div>
    <!-- <div class="container">
      <div class="row">
        <div class="col-md-12 mb-0 text-center">
          Cluster Admin's Dashboard
          <hr>
        </div>
      </div>
    </div> -->
    <div class="container">
      <!-- <transition name="u-fade">
        <div class="row mt-2">
          <div class="col-md-3 text-left" style="min-height: 200px;">
            <nuxt-link to="/ha/profile" class="text-decoration-none text-dark">
              <img src="/avatar-admin.png">
            </nuxt-link>
          </div>
          <div class="col-md-9">
            <div class="row">
              <div class="col-md-6">
                <h5 class="d-inline text-decoration-none">Cluster Admin</h5>  
              </div>
              <div class="col-md-6 text-right">
                <img src="/circle-green.svg" class="shape-status" alt="">
                Online
              </div>
            </div>
            <br>
            I'm the Cluster Admin, and I design and build software using Vue.js!<br><br>
            <div class="row">
              <div class="col-md-6">
                1-415-555-1234 <br>
                District, State <br><br>
              </div>
              <div class="col-md-6">
                1-415-555-1234 <br>
                District, State <br><br>
              </div>
            </div>
          </div>
        </div>
      </transition> -->
      <!-- <div class="row">
        <div class="col-md-12">
          <hr>
        </div>
      </div> -->
    </div>
    <div class="container mb-3">
      <div class="row">
        <div class="col-md-6 mt-2">
          <nuxt-link to="/admin/register-ha">
            <button class="w-100 btn btn-dark rounded font-weight-bold py-3 mb-1  text-uppercase">Register a New Health Assistant</button>
          </nuxt-link>
        </div>
        <div class="col-md-6 mt-2">
          <nuxt-link to="/admin/register-md">
            <button class="w-100 btn btn-dark rounded font-weight-bold py-3 mb-1  text-uppercase">Register a New Doctor</button>
          </nuxt-link>
        </div>
        <!-- <div class="col-md-12 mt-2">
          <hr>
        </div> -->
        <!-- <div class="col-md-6 mt-2">
          <nuxt-link to="/admin/medicine">
            <button class="w-100 btn btn-dark rounded font-weight-bold py-3 mb-1  text-uppercase">View Medicine Stock</button>
          </nuxt-link>
        </div>
        <div class="col-md-6 mt-2">
          <nuxt-link to="/admin/mis">
            <button class="w-100 btn btn-dark rounded font-weight-bold py-3 mb-1  text-uppercase">View MIS Reports</button>
          </nuxt-link>
        </div> -->
        <!-- <div class="col-md-6 mt-2">
          <nuxt-link to="/admin/data">
            <button class="w-100 btn btn-dark rounded font-weight-bold py-3 mb-1  text-uppercase">View Cluster Data</button>
          </nuxt-link>
        </div> -->
        <!-- <div class="col-md-6 mt-2">
          <nuxt-link to="/admin/">
            <button class="w-100 btn btn-dark rounded font-weight-bold py-3 mb-1  text-uppercase">Export Data</button>
          </nuxt-link>
        </div> -->
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-md-12 rounded">
          <div class="w-100 bg-white mb-3 mt-0 px-3 pt-2 pb-3">
            <div class="container">
              <div class="row my-3">
                <div class="col-md-12">
                  
                  PAs <br>
                  {{ this.$store.state.udayDb.clusters.cluster001.patients }}
                  <br><br>
                  HAs <br>
                  {{ this.$store.state.udayDb.clusters.cluster001.has }}
                  <br><br>
                  Doctors <br>
                  {{ this.$store.state.udayDb.clusters.cluster001.mds }}

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'dashboard',
  computed: {},
  mounted () {
    let path = [
      {
        title: 'Admin\'s Dashboard',
        url: '/md'
      },
    ]

    this.$store.commit('updatePath', path)
  },
  methods: {},
  data() {
    return {}
  },
  transition: 'u-fade'
}
</script>

<style></style>
