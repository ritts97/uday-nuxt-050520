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
        <!-- <div class="col-md-12 text-center">
          Patient Profile
          <hr>
        </div> -->
      </div>
    </div>
    <div class="container mt-3">
      <div class="row">
        <div class="col-md-6">
          <h5 class="d-inline">Delores Abernathy (29, F)</h5>  
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
            <li class="list-inline-item" v-for="(tab, index) in tabs" :key="index">
              <!-- <div style="border-bottom: 2px solid #ccc;"> -->
                <button class="btn" @click="getList(tab.name)" role="button">
                  {{ tab.title }} ({{ getListLength(tab.name) }})
                </button>
              <!-- </div> -->
            </li>
          </ul>
          <div class="w-100 bg-white mb-3 mt-0 px-3 pt-3 pb-3" style="min-height: 300px;">
            <!-- <input type="text" class="w-100 p-2 mb-3" placeholder=":: Search by ID, name or phone number"> -->
            <table class="table table-sm table-hover">
              <thead>
                <tr>
                  <th scope="col">Visit ID</th>
                  <th scope="col">Visit Type</th>
                  <th scope="col">Date of Visit</th>
                  <th scope="col"># FUs</th>
                  <!-- <th scope="col">Released</th> -->
                  <th scope="col"># Prescr.</th>
                  <th scope="col"># Services</th>
                  <th scope="col">HA Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr class="pointer" v-for="(visit, index) in list" :key="index" style="height: 40px;">
                  <td scope="row">{{ visit.id }}</td>
                  <td>
                    <nuxt-link to="/ha/profile-visit">{{ visit.name }}
                    </nuxt-link>
                  </td>
                  <td>{{ visit.gender }}</td>
                  <td>{{ visit.followups }}</td>
                  <td>3</td>
                  <!-- <td>{{ visit.age }}</td> -->
                  <td>1</td>
                  <td>
                    <div class="dropdown w-100" v-if="visit.type === 'episode'">
                      <button class="btn btn-secondary dropdown-toggle dropdown-menu-right w-100" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Select an Action
                      </button>
                      <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <a class="dropdown-item" href="#">New Follow Up</a>
                        <a class="dropdown-item" href="#">New Service</a>
                        <!-- <a class="dropdown-item" href="#">Mark Episode Resolved</a> -->
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item" href="#">View Billing</a>
                      </div>
                    </div>
                    <!-- <select v-if="visit.type === 'episode'" id="actions">
                      <option value="volvo">Select an Action</option>
                      <option value="saab">New Follow Up</option>
                      <option value="mercedes">New Service</option>
                      <option value="audi">Mark Episode Resolved</option>
                    </select> -->
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
    // filterFollowUp: function () {
    //   return this.masterList.filter(visit => visit.type == 'followup')
    // },
    // filterPrescription: function () {
    //   return this.masterList.filter(visit => visit.type == 'prescription').reverse()
    // },
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
      // else if (tabName == 'followup') {
      //   this.list = this.filterFollowUp
      // }
      // else if (tabName == 'prescription') {
      //   this.list = this.filterPrescription
      // }
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
      // else if (tabName == 'followup') {
      //   return this.filterFollowUp.length
      // }
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
  // computed: {
  //   listReversed: function () {
  //     return this.list.reverse()
  //   }
  // },
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
        // {
        //   name: 'followup',
        //   title: 'Follow Ups',
        //   isActive: false,
        // },
        // {
        //   name: 'prescription',
        //   title: 'Prescriptions',
        //   isActive: false,
        // },
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
          age: 'Yes',
          phone: '14155551234'
        },
        {
          id: 'EP1 FL0',
          name: 'New Episode 1',
          type: 'episode',
          gender: '4 weeks ago',
          billed: '',
          followups: 4,
          age: 'Yes',
          phone: '14155551234'
        },
        // {
        //   id: 'EP1 FL1',
        //   name: 'Follow Up',
        //   type: 'followup',
        //   gender: '2 weeks ago',
        //   billed: '',
        //   age: 'Yes',
        //   phone: '14155551234'
        // },
        // {
        //   id: 'EP1 FL2',
        //   name: 'Follow Up',
        //   type: 'followup',
        //   gender: '2 weeks ago',
        //   billed: '',
        //   age: 'Yes',
        //   phone: '14155551234'
        // },
        // {
        //   id: 'EP1 PR1',
        //   name: 'Prescribe Medicine',
        //   type: 'prescription',
        //   gender: '2 weeks ago',
        //   billed: 'View Bill',
        //   age: 'Yes',
        //   phone: '14155551234'
        // },
        {
          id: 'EP1 SV1',
          name: 'Perform ECG',
          type: 'service',
          gender: '2 weeks ago',
          billed: 'View Bill',
          age: 'Yes',
          phone: '14155551234'
        },
        // {
        //   id: 'EP1 BL1',
        //   name: 'Bill for Service',
        //   type: 'bill',
        //   gender: '2 weeks ago',
        //   billed: '',
        //   age: 'Yes',
        //   phone: '14155551234'
        // },
        // {
        //   id: 'EP1 BL2',
        //   name: 'Bill for Prescription',
        //   type: 'bill',
        //   gender: '2 weeks ago',
        //   billed: '',
        //   age: 'Yes',
        //   phone: '14155551234'
        // },
        {
          id: 'EP2 FL0',
          name: 'New Episode 2',
          type: 'episode',
          gender: '1 weeks ago',
          followups: 3,
          billed: '',
          age: 'Yes',
          phone: '14155551234'
        },
        // {
        //   id: 'EP2 FL1',
        //   name: 'Follow Up',
        //   type: 'followup',
        //   gender: '2 weeks ago',
        //   billed: '',
        //   age: 'Yes',
        //   phone: '14155551234'
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
</style>
