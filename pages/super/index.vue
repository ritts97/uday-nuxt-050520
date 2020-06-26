<template>
  <div>
    <!-- <div class="container">
      <div class="row">
        <div class="col-md-12 mb-1 text-center">
          Super Admin's Dashboard
          <hr>
        </div>
      </div>
    </div> -->
    <!-- <div class="container">
      <transition name="u-fade">
        <div class="row mt-2">
          <div class="col-md-3 text-left" style="min-height: 200px;">
            <nuxt-link to="/ha/profile" class="text-decoration-none text-dark">
              <img src="/avatar-super.png">
            </nuxt-link>
          </div>
          <div class="col-md-9">
            <div class="row">
              <div class="col-md-6">
                <h5 class="d-inline text-decoration-none">Super Admin</h5>  
              </div>
              <div class="col-md-6 text-right">
                <img src="/circle-green.svg" class="shape-status" alt="">
                Online
              </div>
            </div>
            <br>
            I'm a robot, and uhh... I do things. 🤖<br><br>
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
      </transition>
      <div class="row">
        <div class="col-md-12">
          <hr>
        </div>
      </div>
    </div> -->
    <div class="container mb-3">
      <div class="row">
        <!-- <div class="col-md-6 mt-2">
          <nuxt-link to="/super/register-ha">
            <button class="w-100 btn btn-dark rounded font-weight-bold py-3 mb-1  text-uppercase">Register a New Health Assistant</button>
          </nuxt-link>
        </div>
        <div class="col-md-6 mt-2">
          <nuxt-link to="/super/register-md">
            <button class="w-100 btn btn-dark rounded font-weight-bold py-3 mb-1  text-uppercase">Register a New Doctor</button>
          </nuxt-link>
        </div> -->
        <!-- <div class="col-md-6 mt-2">
          <nuxt-link to="/super/register-admin">
            <button class="w-100 btn btn-dark rounded font-weight-bold py-3 mb-1  text-uppercase">Register a New Admin</button>
          </nuxt-link>
        </div>
        <div class="col-md-6 mt-2">
          <nuxt-link to="/super/register-super">
            <button class="w-100 btn btn-dark rounded font-weight-bold py-3 mb-1  text-uppercase">Register a New Super Admin</button>
          </nuxt-link>
        </div> -->

        <!-- <div class="col-md-12 mt-2">
          <hr>
        </div> -->
<!--         
        <div class="col-md-6 mt-2">
          <nuxt-link to="/super/medicine">
            <button class="w-100 btn btn-dark rounded font-weight-bold py-3 mb-1  text-uppercase">View Medicine Stock</button>
          </nuxt-link>
        </div>
        <div class="col-md-6 mt-2">
          <nuxt-link to="/super/mis">
            <button class="w-100 btn btn-dark rounded font-weight-bold py-3 mb-1  text-uppercase">View MIS Reports</button>
          </nuxt-link>
        </div>
        <div class="col-md-6 mt-2">
          <nuxt-link to="/super/data">
            <button class="w-100 btn btn-dark rounded font-weight-bold py-3 mb-1  text-uppercase">View Data Analysis</button>
          </nuxt-link>
        </div> -->
        <div class="col-md-12 mt-2">
          <nuxt-link to="/super/add-cluster">
            <button class="w-100 btn btn-dark rounded font-weight-bold py-3 mb-1  text-uppercase">Add Clusters</button>
          </nuxt-link>
        </div>
        <!-- <div class="col-md-6 mt-2">
          <nuxt-link to="/admin/">
            <button class="w-100 btn btn-dark rounded font-weight-bold py-3 mb-1  text-uppercase">Export Data</button>
          </nuxt-link>
        </div> -->
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          Cluster Length: {{ Object.keys(this.$store.state.udayDb.clusters).length }}
        </div>
      </div>
    </div>
    <!-- <div class="container mt-3">
      <div class="row">
        <div class="col-md-12 text-center">
          <div class="w-100 rounded bg-white mb-3 mt-0 px-3 pt-3 pb-3">
            You are an super admin.
          </div>
        </div>
      </div>
    </div> -->
    <!-- <div class="container mt-3">
      <div class="row">
        <div class="col-md-12 rounded">
          <ul class="list-inline mb-2">
            <li class="list-inline-item pointer" v-for="(tab, index) in tabs" :key="index">
                <div class="px-2 mr-2 pb-1 mb-1" @click="getList(tab.name)" :class="{ underline: tab.isActive }" role="button">
                  {{ tab.title }} <span v-if="tab.name !== 'global'">({{ getListLength(tab.name) }})</span>
                </div>
            </li>
          </ul>
          <div class="w-100 bg-white mb-3 mt-0 px-3 pt-3 pb-3">
            <input type="text" class="w-100 p-2" placeholder=":: Search by ID, name or phone number">
            <table class="table table-sm table-hover mt-3">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Name</th>
                  <th scope="col">Gender</th>
                  <th scope="col">Age</th>
                  <th scope="col">Phone</th>
                  <th scope="col">Location</th>
                  <th scope="col">Reg. By</th>
                  <th scope="col">Patient Status</th>
                </tr>
              </thead>
              <tbody>
                <tr class="pointer" v-for="(patient, index) in list" :key="index">
                  <th scope="row">{{ patient.id }}</th>
                  <td>
                    <nuxt-link to="/md/profile">{{ patient.name }}
                    </nuxt-link>
                  </td>
                  <td>{{ patient.gender }}</td>
                  <td>{{ patient.age }}</td>
                  <td>{{ patient.phone }}</td>
                  <td>{{ patient.location }}</td>
                  <td>{{ patient.creator }}</td>
                  <td class="text-capitalize">
                    <img v-if="patient.status == 'registered'" src="circle-green.svg" class="shape-status" alt="">
                    <img v-if="patient.status == 'released'" src="circle-yellow.svg" class="shape-status" alt="">
                    <img v-if="patient.status == 'allocated'" src="circle-red.svg" class="shape-status" alt="">
                    <img v-if="patient.status == 'queued'" src="circle-orange.svg" class="shape-status" alt="">
                    {{ patient.status }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
export default {
  layout: 'dashboard',
  mounted () {
    let path = [
      {
        title: 'Super Admin\'s Dashboard',
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
