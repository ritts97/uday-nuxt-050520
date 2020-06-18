<template>
  <div>

    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <nuxt-link to="/ha/profile/new-episode">
            <button class="w-100 btn btn-dark rounded font-weight-bold py-3 mb-2  text-uppercase">Record New Episode</button>     
          </nuxt-link>
        </div>
        <div class="col-md-6">
          <nuxt-link to="/ha/profile/new-service">
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
          <div class="w-100 bg-white mb-3 mt-0 px-3 pt-3 pb-3" style="min-height: 10px;">
             <!-- 1 {{ this.$store.state.currPatient.episodes }} -->
            <table class="table table-sm table-hover mb-0">
              <thead>
                <tr>
                  <th scope="col">Visit ID</th>
                  <th scope="col">Visit Type</th>
                  <!-- <th scope="col">Status</th> -->
                  <th scope="col">Date Created</th>
                  <th scope="col">Last Updated</th>
                  <th scope="col"># Follow Ups</th>
                  <!-- <th scope="col"># Prescr.</th> -->
                  <!-- <th scope="col"># Services</th> -->
                  <!-- <th scope="col">HA Actions</th> -->
                </tr>
              </thead>
              <tbody>
                <tr class="pointer" v-for="(visit, index) in filterAllVisits" :key="index" style="height: 40px;">
                  <td scope="row">{{ visit.episodeID }}</td>
                  <td>
                    <div v-if="visit.link">
                      <nuxt-link :to="visit.link">
                        {{ visit.title }}
                      </nuxt-link>
                    </div>
                    <div v-else>
                      {{ visit.title }}
                    </div>
                  </td>
                  <td>{{ visit.created }}</td>
                  <td>{{ visit.lastUpdated }}</td>
                  <td>{{ visit.numFollowUps }}</td>
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
  mounted() {
    this.list = this.filterAllVisits

    this.$store.commit('updatePath', [
      {
        title: 'Dashboard',
        url: '/ha'
      },
      {
        title: 'Patient Profile',
        url: '/ha/profile'
      }
    ])
  },
  computed: {
    filterAllVisits: function () {
      return this.$store.state.currPatient.visits
    },
    filterEpisode: function () { 
      return this.$store.state.currPatient.visits.filter(visit => visit.type == 'episode').reverse()
    },
    filterService: function () {
      return this.$store.state.currPatient.visits.filter(visit => visit.type == 'service').reverse()
    },
    filterBill: function () {
      return this.$store.state.currPatient.visitse.filter(visit => visit.type == 'bill').reverse()
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
      tabs: [
        {
          name: 'visit',
          title: 'All Visits',
          isActive: true,
        },
        // {
        //   name: 'episode',
        //   title: 'Episodes',
        //   isActive: false,
        // },
        // {
        //   name: 'service',
        //   title: 'Direct Services',
        //   isActive: false,
        // },
      ],
      list: [],
      masterList: [
        {
          id: 'EP0 FL0',
          name: 'Patient Registered',
          type: 'registration',
          status: '',
          created: '1 week ago',
          lastVisited: '1 week ago',
          followUps: 0,
        },
        // {
        //   id: 'EP1 FL0',
        //   name: 'Episode 1',
        //   type: 'episode',
        //   gender: '4 weeks ago',
        //   lastVisited: '1 weeks ago',
        //   status: '',
        //   billed: '',
        //   link: '/ha/profile/profile-visit',
        //   followups: 4,
        //   age: 'Yes',
        //   phone: '14155551234'
        // },
        // {
        //   id: 'EP1 SV1',
        //   name: 'Perform Service',
        //   type: 'service',
        //   gender: '2 weeks ago',
        //   lastVisited: '1 weeks ago',
        //   status: '',
        //   billed: 'View Bill',
        //   link: '/ha/profile/profile-visit-service',
        //   age: 'Yes',
        //   phone: '14155551234'
        // },
        // {
        //   id: 'EP2 FL0',
        //   name: 'Episode 2',
        //   type: 'episode',
        //   gender: '1 weeks ago',
        //   lastVisited: '1 weeks ago',
        //   status: 'queued',
        //   followups: 3,
        //   billed: '',
        //   link: '/ha/profile/profile-visit',
        //   age: 'Yes',
        //   phone: '14155551234'
        // },
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
</style>
