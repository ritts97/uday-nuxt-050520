<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-md-12 mb-0 text-center">
          Admin's Dashboard
          <hr>
        </div>
      </div>
    </div>
    <div class="container">
      <transition name="u-fade">
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
      </transition>
      <div class="row">
        <div class="col-md-12">
          <hr>
        </div>
      </div>
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
        <div class="col-md-12 mt-2">
          <hr>
        </div>
        <div class="col-md-6 mt-2">
          <nuxt-link to="/admin/medicine">
            <button class="w-100 btn btn-dark rounded font-weight-bold py-3 mb-1  text-uppercase">View Medicine Stock</button>
          </nuxt-link>
        </div>
        <div class="col-md-6 mt-2">
          <nuxt-link to="/admin/mis">
            <button class="w-100 btn btn-dark rounded font-weight-bold py-3 mb-1  text-uppercase">View MIS Reports</button>
          </nuxt-link>
        </div>
        <div class="col-md-6 mt-2">
          <nuxt-link to="/admin/data">
            <button class="w-100 btn btn-dark rounded font-weight-bold py-3 mb-1  text-uppercase">View Data Analysis</button>
          </nuxt-link>
        </div>
        <!-- <div class="col-md-6 mt-2">
          <nuxt-link to="/admin/">
            <button class="w-100 btn btn-dark rounded font-weight-bold py-3 mb-1  text-uppercase">Export Data</button>
          </nuxt-link>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'dashboard',
  computed: {
    filterMyPatients: function () {
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
  mounted () {
    let path = [
      {
        title: 'Dashboard',
        url: '/md'
      },
    ]

    this.list = this.masterList.filter(patient => patient.creator == 'Jane Doe')

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
          name: 'patients',
          title: 'Patients in Queue',
          isActive: true,
        },
        // {
        //   name: 'released',
        //   title: 'Recently Released',
        //   isActive: true,
        // },
        // {
        //   name: 'has',
        //   title: 'Health Assistants',
        //   isActive: false,
        // },
        // {
        //   name: 'global',
        //   title: 'Search Global',
        //   isActive: false,
        // }
      ],
      masterList: [
        {
          id: 'AAA1',
          name: 'Delores Abernathy',
          gender: 'M',
          age: 99,
          phone: '1-415-555-1234',
          location: 'Hyperbad, IN',
          status: 'queued',
          creator: 'Jane Doe'
        },
        {
          id: 'AAA1',
          name: 'Delores Abernathy',
          gender: 'M',
          age: 99,
          phone: '1-415-555-1234',
          location: 'Hyperbad, IN',
          status: 'queued',
          creator: 'Jane Doe'
        },
        {
          id: 'AAA1',
          name: 'Delores Abernathy',
          gender: 'M',
          age: 99,
          phone: '1-415-555-1234',
          location: 'Hyperbad, IN',
          status: 'queued',
          creator: 'Jane Doe'
        },
        {
          id: 'AAA1',
          name: 'Delores Abernathy',
          gender: 'M',
          age: 99,
          phone: '1-415-555-1234',
          location: 'Hyperbad, IN',
          status: 'queued',
          creator: 'Jane Doe'
        },
        {
          id: 'AAA1',
          name: 'Delores Abernathy',
          gender: 'M',
          age: 99,
          phone: '1-415-555-1234',
          location: 'Hyperbad, IN',
          status: 'queued',
          creator: 'Jane Doe'
        },
        {
          id: 'AAA1',
          name: 'Delores Abernathy',
          gender: 'M',
          age: 99,
          phone: '1-415-555-1234',
          location: 'Hyperbad, IN',
          status: 'queued',
          creator: 'John Smith'
        },
        {
          id: 'AAA1',
          name: 'Delores Abernathy',
          gender: 'M',
          age: 99,
          phone: '1-415-555-1234',
          location: 'Hyperbad, IN',
          status: 'queued',
          creator: 'John Smith'
        },
        {
          id: 'AAA1',
          name: 'Delores Abernathy',
          gender: 'M',
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
