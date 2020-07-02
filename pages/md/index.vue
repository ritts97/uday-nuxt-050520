<template>
  <div>
    <div class="container">
      <transition name="u-fade">
        <div class="row mt-2">
          <div class="col-md-3 text-left" style="min-height: 200px;">
            <nuxt-link to="/md/profile" class="text-decoration-none text-dark">
              <img src="/avatar-man_03.png">
            </nuxt-link>
          </div>
          <div class="col-md-9">
            <div class="row">
              <div class="col-md-6">
                <h5 class="d-inline text-decoration-none">Dr. Akshit Gupta</h5>  
              </div>
              <div class="col-md-6 text-right">
                <img src="/circle-green.svg" class="shape-status" alt="">
                Online
              </div>
            </div>
            <br>
            Hello, my name is Dr. Gupta, and I graduated from John Hopkins in '20. I'm happy help you!<br><br>
            <div class="row">
              <div class="col-md-6">
                4444 Market St. <br>
                San Francisco, Ca, USA <br><br>
              </div>
              <div class="col-md-6">
                1-415-555-1234 <br>
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
    </div>
    <div class="container mt-2">
      <div class="row">
        <div class="col-md-12 rounded">
          <ul class="list-inline mb-2">
            <li class="list-inline-item pointer" v-for="(tab, index) in tabs" :key="index">
              <div class="px-2 mr-2 pb-1 mb-1" @click="getList(tab.name)" :class="{ underline: tab.isActive }" role="button">
                {{ tab.title }} <span v-if="tab.name !== 'global'">({{ getListLength(tab.name) }})</span>
              </div>
            </li>
          </ul>
          <div class="w-100 bg-white mb-3 mt-0 px-3 py-1">
            <!-- <input type="text" class="w-100 p-2" placeholder=":: Search by ID, name or phone number"> -->
            <table class="table table-sm table-hover mt-3">
              <!--  v-if="!tabs[2].isActive" -->
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
                <!-- {{ list }} -->
                <tr class="pointer" v-for="(patient, index) in list.slice().reverse()" :key="index">
                  <td class="text-uppercase">{{ patient.id }}</td>
                  <td>
                    <nuxt-link :to="'/md/profile?id=' + patient.id">{{ patient.demographics.name }}</nuxt-link>
                  </td>
                  <td class="text-uppercase">{{ patient.demographics.gender }}</td>
                  <td>{{ patient.demographics.age }}</td>
                  <td>{{ patient.demographics.phone }}</td>
                  <td>{{ patient.demographics.location }}</td>
                  <td>{{ patient.demographics.creator }}</td>
                  <td class="text-capitalize">
                    <img v-if="patient.status == 'registered'" src="/circle-green.svg" class="shape-status" alt="">
                    <img v-if="patient.status == 'released'" src="/circle-yellow.svg" class="shape-status" alt="">
                    <img v-if="patient.status == 'allocated'" src="/circle-red.svg" class="shape-status" alt="">
                    <img v-if="patient.status == 'queued'" src="/circle-orange.svg" class="shape-status" alt="">
                    {{ patient.status }}
                  </td>
                </tr>
                <tr class="pointer" v-if="list.length === 0" style="height: 40px;">
                  <td class="py-3 px-3 text-center" colspan="9">
                    <small>
                      There are no patients in this list. Register a new patient to get started.
                    </small>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'dashboard',
  computed: {
    filterAllocated: function () {
      return []
      // return  this.list.filter(patient => patient.status == 'allocated')
    },
    filterCluster: function () {
      return this.$store.state.udayDb.clusters.cluster001.patients
    },
    filterQueue () {
      let patientIDs = this.$store.state.udayDb.clusters.cluster001.patientsInQueue
      let patientsInCluster = this.$store.state.udayDb.clusters.cluster001.patients
      const patientsInQueue = []

      for (let x = 0; x < patientIDs.length; x++) {
        for (let y = 0; y < patientsInCluster.length; y++) {
          if (patientIDs[x] === patientsInCluster[y].id) {
            patientsInQueue.push(patientsInCluster[y])
          }
        }
      }

      return patientsInQueue
      // return []
    },
    filterReleased () {
      let patientIDs = this.$store.state.udayDb.clusters.cluster001.patientsInQueue
      let patientsInCluster = this.$store.state.udayDb.clusters.cluster001.patients
      const patientsReleased = []

      for (let y = 0; y < patientsInCluster.length; y++) {
        if (patientsInCluster[y].status === 'released') {
          patientsReleased.push(patientsInCluster[y])
        }
      }

      return patientsReleased
    },
  },
  mounted () {

    let path = [
      {
        title: 'Doctor\'s Dashboard',
        url: '/md'
      },
    ]

    this.$store.commit('updatePath', path)
  },
  methods: {
    getList: function (tabName) {
      if (tabName == 'allocated') {
        this.list = []
      }
      else if (tabName == 'cluster') {
        this.list = this.filterCluster
      }
      else if (tabName == 'queue') {
        this.list = this.filterQueue
      }
      else if (tabName == 'released') {
        this.list = this.filterReleased
      }

      this.tabs.forEach((tab, index) => {
        if (tab.name == tabName) {
          this.tabs[index].isActive = true
        } else {
          this.tabs[index].isActive = false
        }
      })
    },
    getListLength: function (tabName) {
      if (tabName == 'allocated') {
        return 0
        return this.$store.state.udayDb.clusters.cluster001.mds.length
      }
      else if (tabName == 'cluster') {
        return this.$store.state.udayDb.clusters.cluster001.patients.length
      }
      else if (tabName == 'queue') {
        return this.$store.state.udayDb.clusters.cluster001.patientsInQueue.length
      }
      else if (tabName == 'released') {
        return this.filterReleased.length
      }
    },
  },
  data() {
    return {
      list: [],
      tabs: [
        {
          name: 'allocated',
          title: 'My Allocated Patients',
          isActive: true,
        },
        {
          name: 'queue',
          title: 'My Cluster Queue',
          isActive: false,
        },
        {
          name: 'released',
          title: 'Recently Released',
          isActive: false,
        },
        {
          name: 'cluster',
          title: 'All Cluster Patients',
          isActive: false,
        }
      ]
    }
  },
  transition: 'u-fade'
}
</script>

<style>
.shape-status {
  width: 12px;
  margin-right: 7px;
  margin-bottom: 4px;
}

.pointer:hover {
  cursor: pointer;
}
</style>