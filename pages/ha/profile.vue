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
                <a class="dropdown-item" href="#">MIS Reports</a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="#">Edit Profile</a>
                <a class="dropdown-item" href="#">Change Password</a>
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
            <nuxt-link to="/ha" class="text-muted">
              Dashboard
            </nuxt-link>
             > Patient Profile
          </small>
        </div>
      </div>
    </div>
    <div class="container mt-3">
      <div class="row">
        <div class="col-md-6">
          <nuxt-link to="/ha/profile" class="text-decoration-none text-dark">
            <h5 class="d-inline text-decoration-none">Delores Abernathy (29, F)</h5>  
          </nuxt-link>
          [ <div class="d-inline pointer text-muted" @click="showDemographics = !showDemographics">
            <span v-if="!showDemographics">show</span>
            <span v-else>hide</span>
          </div> ]
        </div>
        <div class="col-md-6 text-right">
          <img src="/circle-green.svg" class="shape-status" alt="">
          Registered
        </div>
      </div>
      <div class="row mt-3" v-if="showDemographics">
        <div class="col-md-3 text-left">
          <img src="/avatar.png" alt="">
        </div>
        <div class="col-md-4">
          Industrial Farmer <br>
          1-415-555-1234 <br>
          Son of Bernard <br><br>
          District, State <br><br>
          <nuxt-link to="/ha/update-history" class="text-muted">
            View Medical History...
          </nuxt-link><br>
          <nuxt-link to="/ha/view-bills" class="text-muted">
            View Billing History...
          </nuxt-link><br>
        </div>
        <div class="col-md-5">
          Address 1 <br>
          Address 2 <br>
          <br><br>
          Police Station<br><br>
          <nuxt-link to="/ha/update-demo" class="text-muted">
            Update Demographics...
          </nuxt-link><br>
          <nuxt-link to="/ha/update-history" class="text-muted">
            Update Medical History...
          </nuxt-link>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <hr>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <nuxt-link to="/ha/new-episode">
            <button class="w-100 btn btn-dark rounded font-weight-bold py-3 mb-2  text-uppercase">Record New Episode</button>     
          </nuxt-link>
          <nuxt-link to="/ha/new-service">
            <button class="w-100 btn btn-dark rounded font-weight-bold py-3 mb-0  text-uppercase">Record New Service</button>     
          </nuxt-link>
        </div>
      </div>

      <div class="row">
        <div class="col-md-12">
          <hr>
        </div>
      </div>

      <div class="row mt-0">
        <div class="col-md-12">
          <ul class="list-inline mb-2">
            <li class="list-inline-item pointer" v-for="(tab, index) in tabs" :key="index">
                <div class="px-2 mr-2 pb-1 mb-1" @click="getList(tab.name)" :class="{ underline: tab.isActive }" role="button">
                  {{ tab.title }} ({{ getListLength(tab.name) }})
                </div>
            </li>
          </ul>
          <div class="w-100 bg-white mb-3 mt-0 px-3 pt-3 pb-3" style="min-height: 300px;">
            <table class="table table-sm table-hover">
              <thead>
                <tr>
                  <th scope="col">Visit ID</th>
                  <th scope="col">Visit Type</th>
                  <th scope="col">Date of Visit</th>
                  <th scope="col"># FUs</th>
                  <th scope="col"># Prescr.</th>
                  <th scope="col"># Services</th>
                  <th scope="col">HA Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr class="pointer" v-for="(visit, index) in list" :key="index" style="height: 40px;">
                  <td scope="row">{{ visit.id }}</td>
                  <td>
                    <div v-if="visit.link">
                      <nuxt-link :to="visit.link">
                        {{ visit.name }}
                      </nuxt-link>
                    </div>
                    <div v-else>
                      {{ visit.name }}
                    </div>
                  </td>
                  <td>{{ visit.gender }}</td>
                  <td>{{ visit.followups }}</td>
                  <td>3</td>
                  <td>1</td>
                  <td>
                    <div class="dropdown" v-if="visit.type === 'episode'">
                      <button class="btn btn-secondary dropdown-toggle dropdown-menu-right w-100" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Select an Action
                      </button>
                      <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <nuxt-link class="dropdown-item" to="/ha/profile-visit">
                          New Follow Up
                        </nuxt-link>
                        <nuxt-link class="dropdown-item" to="/ha/profile-visit">
                          New Service
                        </nuxt-link>
                        <div class="dropdown-divider"></div>
                        <nuxt-link class="dropdown-item" to="/ha/profile-visit">
                          View Billing
                        </nuxt-link>
                      </div>
                    </div>
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
  mounted() {
    this.list = this.filterAllVisits
  },
  computed: {
    filterAllVisits: function () {
      return this.masterList.reverse()
    },
    filterEpisode: function () { 
      return this.masterList.filter(visit => visit.type == 'episode').reverse()
    },
    filterService: function () {
      return this.masterList.filter(visit => visit.type == 'service').reverse()
    },
    filterBill: function () {
      return this.masterList.filter(visit => visit.type == 'bill').reverse()
    }
  },
  methods: {
    getTab: function (tabName) {
      let tabs = this.tabs
      let ref = 0

      for (let i = 0; i < tabs.length; i++) {
        if (tabs[i].name === tabName) {
          tabs[i].isActive = true
          ref = i
        } else {
          tabs[i].isActive = false
        }

        if (ref == (tabs.length - 1)) {
          this.showComplete = true
        } else {
          this.showComplete = false
        }
      }
    },
    getList: function (tabName) {
      if (tabName == 'visit') {
        this.list = this.filterAllVisits
      }
      else if (tabName == 'episode') {
        this.list = this.filterEpisode
      }
      else if (tabName == 'service') {
        this.list = this.filterService
      }
      else if (tabName == 'bill') {
        this.list = this.filterBill
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
      if (tabName == 'visit') {
        return this.filterAllVisits.length
      }
      else if (tabName == 'episode') {
        return this.filterEpisode.length
      }
      else if (tabName == 'prescription') {
        return this.filterPrescription.length
      }
      else if (tabName == 'service') {
        return this.filterService.length
      }
      else if (tabName == 'bill') {
        return this.filterBill.length
      }
    },
  },
  data() {
    return {
      arr: [1,12,31,23,21,312],
      showDemographics: true,
      tabs: [
        {
          name: 'visit',
          title: 'All Visits',
          isActive: true,
        },
        {
          name: 'episode',
          title: 'Episodes',
          isActive: false,
        },
        {
          name: 'service',
          title: 'Direct Services',
          isActive: false,
        },
        {
          name: 'bill',
          title: 'Billed',
          isActive: false,
        }
      ],
      list: [],
      masterList: [
        {
          id: 'EP0 FL0',
          name: 'Patient Registered',
          type: 'registration',
          gender: '8 weeks ago',
          billed: '',
          link: '',
          age: 'Yes',
          phone: '14155551234'
        },
        {
          id: 'EP1 FL0',
          name: 'New Episode 1',
          type: 'episode',
          gender: '4 weeks ago',
          billed: '',
          link: '/ha/profile-visit',
          followups: 4,
          age: 'Yes',
          phone: '14155551234'
        },
        {
          id: 'EP1 SV1',
          name: 'Perform ECG',
          type: 'service',
          gender: '2 weeks ago',
          billed: 'View Bill',
          link: '/ha/profile-visit-service',
          age: 'Yes',
          phone: '14155551234'
        },
        {
          id: 'EP2 FL0',
          name: 'New Episode 2',
          type: 'episode',
          gender: '1 weeks ago',
          followups: 3,
          billed: '',
          link: '/ha/profile-visit',
          age: 'Yes',
          phone: '14155551234'
        },
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
</style>
