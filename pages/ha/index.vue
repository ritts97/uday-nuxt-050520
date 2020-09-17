<template>
  <div>
    <div class="container">
      <transition name="u-fade">
        <div class="row">
          <div class="col-md-3 text-left responsive-padding-bottom">
            <div class="position-relative">
              <div class="position-absolute">
                <img class="w-100 pb-2" src="/avatar-girl_04.png">
              </div>
              <div class="w-100" style="padding-bottom: 100%;"></div>
            </div>
          </div>
        <div class="col-md-9">
            <div class="row">
              <div class="col-md-12">
                <h5 class="d-inline text-decoration-none">{{ this.haName }}</h5>  
                <div class="float-right text-capitalize">
                  <img src="/circle-green.svg" class="shape-status" alt="">
                  {{ currUser.status }}
                </div>
              </div>
            </div>
            <br>
            {{ currUser.bio }}<br><br>
            <div class="row">
              <div class="col-md-6">
                Health Assistant | 24 years old
              </div>
              <div class="col-md-6">
                {{ currUser.phone }} <br><br>
                {{ currUser.address }} <br>
                {{ currUser.location }}<br>
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
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <nuxt-link to="/ha/register-new">
            <button class="w-100 btn btn-dark rounded font-weight-bold py-3 mb-1  text-uppercase">Register a New Patient</button>
          </nuxt-link>
        </div>
      </div>
    </div>
    <div class="container mt-3">
      <div class="row">
        <div class="col-md-12 rounded">
          <ul class="list-inline mb-2">
            <li class="list-inline-item pointer" v-for="(tab, index) in tabs" :key="index">
              <!-- <div style="border-bottom: 2px solid #ccc;"> -->
                <div class="px-2 mr-2 pb-1 mb-1" @click="getList(tab.name)" :class="{ underline: tab.isActive }" role="button">
                  {{ tab.title }} <span v-if="tab.name !== 'global'">({{ getListLength(tab.name) }})</span>
                </div>
              <!-- </div> -->
            </li>
          </ul>
          <div class="shadow-sm w-100 bg-white mb-3 mt-0 px-3 py-1">
            <!-- <input type="text" class="w-100 p-2" placeholder=":: Search by ID, name or phone number"> -->
            <table class="table table-sm table-hover mt-2">
              <!--  v-if="!tabs[4].isActive" -->
              <thead>
                <tr>
                  <!-- <th scope="col">ID</th> -->
                  <th scope="col">Patient Status</th>
                  <th scope="col">Patient Name</th>
                  <!-- <th scope="col">Gender</th> -->
                  <!-- <th scope="col">Age</th> -->
                  <th scope="col">Last Visited</th>
                  <th scope="col">Registered Date</th>
                  <th scope="col">Registered By</th>
                </tr>
              </thead>
              <!-- <tbody> -->

              <!-- <transition name="u-fade"  mode="in-out" tag="tbody"> -->
                <tr class="pointer" v-for="i in this.$patientlist" :key="i">
                  <!-- <th class="text-uppercase" scope="row">{{ patient.id }}</th> -->
                  <td class="text-capitalize">
                    <img v-if="i['status'] == 'registered'" src="/circle-green.svg" class="shape-status" alt="">
                    <img v-if="i['status'] == 'released'" src="/circle-yellow.svg" class="shape-status" alt="">
                    <img v-if="i['status'] == 'allocated'" src="/circle-red.svg" class="shape-status" alt="">
                    <img v-if="i['status'] == 'queued'" src="/circle-orange.svg" class="shape-status" alt="">
                    {{ i['status'] }}
                  </td>
                  <td>
                    <nuxt-link :to="'/ha/profile?id=' + i['objectid']">{{ i['name'] }}</nuxt-link>
                  </td>
                  <!-- <td class="text-uppercase">{{ patient.demographics.gender }}</td> -->
                  <!-- <td>{{ patient.demographics.age }}</td> -->
                  <td>{{ i['date'] }}</td>
                  <td>{{ i['date'] }}</td>
                  <td>{{ i['haname'] }}</td>
                </tr>

                <tr v-show="list.length === 0" class="pointer" key="empty" style="height: 40px;">
                  <td class="py-3 px-3 text-center" colspan="9">
                    <small>
                      There are no patients in this list. Register a new patient to get started.
                    </small>
                  </td>
                </tr>
              <!-- </transition-group> -->
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import Vue from 'vue'
import VueCookies from 'vue-cookies'
import getPatientList from '@/pages/index'

export default {
  layout: 'dashboard',
  computed: {
    currUser () {
      return this.$store.state.currUser
    },
    patientList () {
      return this.$store.state.udayDb.clusters['cluster001'].patients
    },
    filterMyPatients: function () {
      return this.patientList.filter(patient => patient.regBy == this.$store.state.currUser.name)
    },
    filterCluster: function () {
      return this.patientList
    },
    filterGlobal: function () {
      return this.patientList.filter(patient => patient.status == 'global')
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
    },
    filterReleased () {
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
        title: 'Dashboard',
        url: '/ha'
      },
    ]
    var l = this.$patientlist.length
    if(l > 0){
    if(Vue.$cookies.get('PID').objectid != this.$patientlist[l-1]['objectid']) {
      this.$patientlist.push(Vue.$cookies.get('PID'))
    }
    }
    if(l == 0){
      this.$patientlist.push(Vue.$cookies.get('PID'))
    }
    this.haName = Vue.$cookies.get('HaId').name
    this.cluster = Vue.$cookies.get('HaId').cluster
    this.list = this.$patientlist.filter(patient => patient.cluster = this.cluster)

    this.$store.commit('updateCurrUser')
    this.$store.commit('updatePath', path)

    
  },
  methods: {
    getList: function (tabName) {
      if (tabName == 'patients') {
        this.list = this.$patientlist
      }
      else if (tabName == 'cluster') {
        this.list = this.filterCluster
      }
      else if (tabName == 'global') {
        this.list = this.filterGlobal
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
      if (tabName == 'patients') {
        return this.$patientlist.length
      }
      else if (tabName == 'cluster') {
        return this.filterCluster.length
      }
      else if (tabName == 'global') {
        return this.filterGlobal.length
      }
      else if (tabName == 'queue') {
        return this.$store.state.udayDb.clusters.cluster001.patientsInQueue.length
      }
      else if (tabName == 'released') {
        return this.filterReleased.length
      }
    }
  },
  data() {
    return {
      list: [],
      tabs: [
        {
          name: 'patients',
          title: 'My Registered Patients',
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
        // {
        //   name: 'global',
        //   title: 'Search Global',
        //   isActive: false,
        // }
      ],
    }
  },
  transition: 'u-fade'
}
</script>

<style>
.list-inline-item {
  margin-right: 16px !important;
}

thead tr th {
  border-top: none !important;
}

.btn-dark {
  background-color: #444f5a;
  border: none;
}

.btn:focus {
  outline: none;
  box-shadow: none;
}

.btn-dark:hover {
  background-color: #5d666e;
  border: none;
}

.btn-light {
  background-color: #e4e4e4;
  border: none;
}

.shape-status {
  width: 12px;
  margin-right: 7px;
  margin-bottom: 4px;
}

.pointer:hover {
  cursor: pointer;
}

.dropdown-menu {
  width: 100%;
}


.dropdown-toggle {
  cursor: pointer;
  text-align: left;
}

.dropdown-toggle::after {
  position: relative;
  float:right; 
  margin-top: 10px;
}

@media only screen and (max-width: 600px) {
  .responsive-padding-bottom {
    padding-bottom: 2rem!important;;
  }
}
</style>
