<template>
  <div>
    <div class="w-100 bg-dark text-white mb-3">
      <div class="container bg-dark">
        <div class="row py-2">
          <div class="col-md-6 font-weight-bold pt-2" style="font-size: 24px;"> 
            <nuxt-link to="/ha" class="text-white text-decoration-none">UD.</nuxt-link>
          </div>
          <div class="col-md-6 py-3 text-right">
            <div class="dropdown d-inline">
              <span class="dropdown-toggle dropdown-no-caret pointer" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                jane.doe@udayhealth.org
              </span>
              <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <nuxt-link to="/ha/mis-reports" class="dropdown-item">MIS Reports</nuxt-link>
                <div class="dropdown-divider"></div>
                <nuxt-link to="/ha/edit-profile" class="dropdown-item">Edit Profile</nuxt-link>
                <nuxt-link to="/ha/edit-profile" class="dropdown-item">Change Password</nuxt-link>
              </div>
            </div>
            | Logout
          </div>
        </div>
      </div>
    </div>
        <div class="container">
      <div class="row">
        <div class="col-md-12">
          <small>
            Dashboard
          </small>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-md-12 mb-1 text-center">
          Health Assistant's Dashboard
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
            <li class="list-inline-item" v-for="(tab, index) in tabs" :key="index">
              <!-- <div style="border-bottom: 2px solid #ccc;"> -->
                <button class="btn" @click="getList(tab.name)" role="button">
                  {{ tab.title }} <span v-if="tab.name !== 'global'">({{ getListLength(tab.name) }})</span>
                </button>
              <!-- </div> -->
            </li>
          </ul>
          <div class="w-100 bg-white mb-3 mt-0 px-3 pt-3 pb-3">
            <input type="text" class="w-100 p-2" placeholder=":: Search by ID, name or phone number">
            <table class="table table-sm table-hover mt-3" v-if="!tabs[4].isActive">
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
                    <nuxt-link to="/ha/profile">{{ patient.name }}
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
                    {{ patient.status }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div class="container text-center mb-4">
      <div class="row">
        <div class="col-md-12 text-secondary">
          <small>
            UdayHealth.org is a virtual, telemedicine application organized by medical professionals and volunteers worldwide.
          </small>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    filterMyPatients: function () {
      // return 123
      return this.masterList.filter(patient => patient.creator == 'Jane Doe')
    },
    filterAllocated: function () {
      return  this.masterList.filter(patient => patient.status == 'allocated')
    },
    filterReleased: function () {
      return this.masterList.filter(patient => patient.status == 'released')
    },
    filterCluster: function () {
      return this.masterList
    },
    filterGlobal: function () {
      return this.masterList.filter(patient => patient.status == 'global')
    }
  },
  created() {
    this.list = this.masterList.filter(patient => patient.creator == 'Jane Doe')
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
          name: 'patients',
          title: 'My Patients',
          isActive: true,
        },
        {
          name: 'allocated',
          title: 'My Allocated Patients',
          isActive: false,
        },
        {
          name: 'released',
          title: 'My Released Patients',
          isActive: false,
        },
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
      masterList: [
        {
          id: 'AAA1',
          name: 'Delores Abernathy',
          gender: 'M',
          age: 99,
          phone: '1-415-555-1234',
          location: 'Hyperbad, IN',
          status: 'allocated',
          creator: 'Jane Doe'
        },
        {
          id: 'AAA1',
          name: 'Delores Abernathy',
          gender: 'M',
          age: 99,
          phone: '1-415-555-1234',
          location: 'Hyperbad, IN',
          status: 'released',
          creator: 'Jane Doe'
        },
        {
          id: 'AAA1',
          name: 'Delores Abernathy',
          gender: 'M',
          age: 99,
          phone: '1-415-555-1234',
          location: 'Hyperbad, IN',
          status: 'registered',
          creator: 'Jane Doe'
        },
        {
          id: 'AAA1',
          name: 'Delores Abernathy',
          gender: 'M',
          age: 99,
          phone: '1-415-555-1234',
          location: 'Hyperbad, IN',
          status: 'registered',
          creator: 'Jane Doe'
        },
        {
          id: 'AAA1',
          name: 'Delores Abernathy',
          gender: 'M',
          age: 99,
          phone: '1-415-555-1234',
          location: 'Hyperbad, IN',
          status: 'registered',
          creator: 'Jane Doe'
        },
        {
          id: 'AAA1',
          name: 'Delores Abernathy',
          gender: 'M',
          age: 99,
          phone: '1-415-555-1234',
          location: 'Hyperbad, IN',
          status: 'registered',
          creator: 'John Smith'
        },
        {
          id: 'AAA1',
          name: 'Delores Abernathy',
          gender: 'M',
          age: 99,
          phone: '1-415-555-1234',
          location: 'Hyperbad, IN',
          status: 'registered',
          creator: 'John Smith'
        },
        {
          id: 'AAA1',
          name: 'Delores Abernathy',
          gender: 'M',
          age: 99,
          phone: '1-415-555-1234',
          location: 'Hyperbad, IN',
          status: 'registered',
          creator: 'John Smith'
        },
        // {
        //   id: 'AAA1',
        //   name: 'Bernard Lowe',
        //   gender: 'M',
        //   age: 99,
        //   phone: '1-415-555-1234',
        //   location: 'Hyperbad, IN',
        //   status: 'global',
        //   creator: 'John Smith'
        // }
      ]
    }
  },
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

.dropdown-no-caret:after { content: none }
</style>
