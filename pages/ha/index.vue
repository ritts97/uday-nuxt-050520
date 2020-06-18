<template>
  <div>
    <div class="container">
      <div class="row mt-2">
        <div class="col-md-6 text-left">
          Health Assistant's Dashboard 
        </div>
        <div class="col-md-6 text-right">
          Cluster AAA01 
        </div>
        <div class="col-md-12">
          <hr>
        </div>
      </div>
    </div>
    <div class="container">
      <transition name="u-fade">
        <div class="row mt-2">
          <div class="col-md-3 text-left" style="min-height: 200px;">
            <nuxt-link to="/ha/profile" class="text-decoration-none text-dark">
              <img src="/avatar.png">
            </nuxt-link>
          </div>
          <div class="col-md-9">
            <div class="row">
              <div class="col-md-6">
                <h5 class="d-inline text-decoration-none">Jane Doe (RN)</h5>  
              </div>
              <div class="col-md-6 text-right">
                <img src="/circle-green.svg" class="shape-status" alt="">
                Online
              </div>
            </div>
            <br>
            Hello, my name is Jane Doe, and I'm studying to become a nurse! I'm happy help you!<br><br>
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
          <div class="w-100 bg-white mb-3 mt-0 px-3 pt-3 pb-3">
            <!-- <input type="text" class="w-100 p-2" placeholder=":: Search by ID, name or phone number"> -->
            <table class="table table-sm table-hover mt-3">
              <!--  v-if="!tabs[4].isActive" -->
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
                    <nuxt-link :to="'/ha/profile?id=' + patient.id">{{ patient.name }}</nuxt-link>
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
    </div>
  </div>
</template>

<script>
export default {
  layout: 'dashboard',
  computed: {
    // get store values
    patientList () {
      return this.$store.state.patientList
    },
    counter () {
      return this.$store.state.counter
    },
    // 
    filterMyPatients: function () {
      return this.patientList.filter(patient => patient.creator == 'Jane Doe')
    },
    filterAllocated: function () {
      return  this.patientList.filter(patient => patient.status == 'allocated')
    },
    filterReleased: function () {
      return this.patientList.filter(patient => patient.status == 'released')
    },
    filterCluster: function () {
      return this.patientList
    },
    filterGlobal: function () {
      return this.patientList.filter(patient => patient.status == 'global')
    }
  },
  mounted () {
    let path = [
      {
        title: 'Dashboard',
        url: '/ha'
      },
    ]

    this.list = this.patientList.filter(patient => patient.creator == 'Jane Doe')

    this.$store.commit('updatePath', path)
  },
  methods: {
    getList: function (tabName) {
      if (tabName == 'patients') {
        this.list = this.filterMyPatients
      }
      else if (tabName == 'allocated') {
        this.list = this.filterAllocated
      }
      else if (tabName == 'released') {
        this.list = this.filterReleased
      }
      else if (tabName == 'cluster') {
        this.list = this.filterCluster
      }
      else if (tabName == 'global') {
        this.list = this.filterGlobal
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
        return this.filterMyPatients.length
      }
      else if (tabName == 'allocated') {
        return this.filterAllocated.length
      }
      else if (tabName == 'released') {
        return this.filterReleased.length
      }
      else if (tabName == 'cluster') {
        return this.filterCluster.length
      }
      else if (tabName == 'global') {
        return this.filterGlobal.length
      }
    },
    addCounter: function (payload) {
      this.$store.dispatch('increment', payload)
    }
  },
  data() {
    return {
      list: [],
      tabs: [
        {
          name: 'patients',
          title: 'My Patients',
          isActive: true,
        },
        // {
        //   name: 'allocated',
        //   title: 'My Allocated Patients',
        //   isActive: false,
        // },
        // {
        //   name: 'released',
        //   title: 'My Released Patients',
        //   isActive: false,
        // },
        {
          name: 'cluster',
          title: 'My Cluster',
          isActive: false,
        },
        {
          name: 'global',
          title: 'Search Global',
          isActive: false,
        }
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
</style>
