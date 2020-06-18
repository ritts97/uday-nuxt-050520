<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-md-12 mb-1 text-center">
          Doctor's Dashboard
          <hr>
        </div>
      </div>
    </div>
    <div class="container">
      <transition name="u-fade">
        <div class="row mt-2">
          <div class="col-md-3 text-left" style="min-height: 200px;">
            <nuxt-link to="/ha/profile" class="text-decoration-none text-dark">
              <img src="/avatar-md.png">
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
        <!-- <div class="col-md-12">
          <nuxt-link to="/md/register-new">
            <button class="w-100 btn btn-dark rounded font-weight-bold py-3 mb-1  text-uppercase">Register a New Patient</button>
          </nuxt-link>
        </div> -->
        <div class="col-md-6 mt-2">
          <nuxt-link to="/md/register-new">
            <button class="w-100 btn btn-dark rounded font-weight-bold py-3 mb-1  text-uppercase">Register a New Patient</button>
          </nuxt-link>
        </div>
        <div class="col-md-6 mt-2">
          <nuxt-link to="/md/register-ha">
            <button class="w-100 btn btn-dark rounded font-weight-bold py-3 mb-1  text-uppercase">Register a New Health Assistant</button>
          </nuxt-link>
        </div>
      </div>
    </div>
    <!-- <div class="container">
      <div class="row pt-3">
        <div class="col-md-12 rounded">
          <ul class="list-inline mb-2">
            <li class="list-inline-item pointer">
              <div class="px-2 mr-2 pb-1 mb-1" role="button">
                My Allocated Patients (2)
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <div class="w-100 bg-white mb-3 px-3 pt-2 pb-2">
            <table class="table table-sm table-hover">
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
                <tr class="pointer">
                  <td>AAA1</td>
                  <td>Delores Abernathy</td>
                  <td>F</td>
                  <td>29</td>
                  <td>1-415-555-1234</td>
                  <td>Hyperbad, IN</td>
                  <td>Jane Doe</td>
                  <td><img src="circle-orange.svg" class="shape-status" alt=""> Queued</td>
                </tr>
                <tr class="pointer">
                  <td>AAA2</td>
                  <td>Delores Abernathy</td>
                  <td>F</td>
                  <td>29</td>
                  <td>1-415-555-1234</td>
                  <td>Hyperbad, IN</td>
                  <td>Jane Doe</td>
                  <td><img src="circle-orange.svg" class="shape-status" alt=""> Queued</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div> -->
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
            <input type="text" class="w-100 p-2" placeholder=":: Search by ID, name or phone number">
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
    </div>
  </div>
</template>

<script>
export default {
  layout: 'dashboard',
  computed: {
    patientList () {
      return this.$store.state.patientList
    },
    filterMyPatients: function () {
      return this.list
    },
    filterAllocated: function () {
      return  this.list.filter(patient => patient.status == 'allocated')
    },
    filterReleased: function () {
      return this.list.filter(patient => patient.status == 'released')
    },
    filterCluster: function () {
      return this.list
    },
    filterGlobal: function () {
      return this.list.filter(patient => patient.status == 'global')
    }
  },
  mounted () {
    let path = [
      {
        title: 'Dashboard',
        url: '/md'
      },
    ]

    this.list = this.patientList

    this.$store.commit('increment', path)
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
          name: 'patients',
          title: 'Patients in Queue',
          isActive: false,
        },
        {
          name: 'healthAssistants',
          title: 'Health Assistants',
          isActive: false,
        },
        {
          name: 'released',
          title: 'All Patients',
          isActive: false,
        }
      ],
      masterList: [
        {
          id: 'AAA1',
          name: 'Delores Abernathy',
          gender: 'F',
          age: 99,
          phone: '1-415-555-1234',
          location: 'Hyperbad, IN',
          status: 'allocated',
          creator: 'Jane Doe'
        },
        {
          id: 'AAA1',
          name: 'Delores Abernathy',
          gender: 'F',
          age: 99,
          phone: '1-415-555-1234',
          location: 'Hyperbad, IN',
          status: 'allocated',
          creator: 'Jane Doe'
        },
        {
          id: 'AAA1',
          name: 'Delores Abernathy',
          gender: 'F',
          age: 99,
          phone: '1-415-555-1234',
          location: 'Hyperbad, IN',
          status: 'queued',
          creator: 'Jane Doe'
        },
        {
          id: 'AAA1',
          name: 'Delores Abernathy',
          gender: 'F',
          age: 99,
          phone: '1-415-555-1234',
          location: 'Hyperbad, IN',
          status: 'queued',
          creator: 'Jane Doe'
        },
        {
          id: 'AAA1',
          name: 'Delores Abernathy',
          gender: 'F',
          age: 99,
          phone: '1-415-555-1234',
          location: 'Hyperbad, IN',
          status: 'queued',
          creator: 'Jane Doe'
        },
        {
          id: 'AAA1',
          name: 'Delores Abernathy',
          gender: 'F',
          age: 99,
          phone: '1-415-555-1234',
          location: 'Hyperbad, IN',
          status: 'queued',
          creator: 'John Smith'
        },
        {
          id: 'AAA1',
          name: 'Delores Abernathy',
          gender: 'F',
          age: 99,
          phone: '1-415-555-1234',
          location: 'Hyperbad, IN',
          status: 'queued',
          creator: 'John Smith'
        },
        {
          id: 'AAA1',
          name: 'Delores Abernathy',
          gender: 'F',
          age: 99,
          phone: '1-415-555-1234',
          location: 'Hyperbad, IN',
          status: 'queued',
          creator: 'John Smith'
        }
      ]
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

.dropdown-no-caret:after { content: none }

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
