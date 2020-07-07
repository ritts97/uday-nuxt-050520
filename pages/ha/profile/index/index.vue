<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <nuxt-link to="/ha/profile/new-episode">
            <button :disabled="this.$store.state.currPatient.status == 'allocated'" class="w-100 btn btn-dark rounded font-weight-bold py-3 mb-2  text-uppercase">Record New Episode</button>     
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
      <!-- {{ this.$store.state.currPatient.services }} -->
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
                <tr class="pointer" v-for="(visit, index) in this.list.slice().reverse()" :key="index" style="height: 40px;" :class="{ 'bg-red' : visit.allocated }">
                  <td class="text-uppercase" scope="row">{{ visit.episodeID }}</td>
                  <td>
                    <div v-if="visit.title !== 'Registered'">
                      <nuxt-link :to="'profile/visit?id=' + visit.episodeID">
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
                <tr class="pointer" v-if="this.list.length === 0" style="height: 40px;">
                  <td class="py-3 px-3 text-center" colspan="9">
                    <small>
                      There are no visits in this list.
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
  mounted() {
    let queryID = this.$route.query.id
    if (queryID !== this.$store.state.currPatient.id) {
      // get that patient profile
      // update to currUser

      this.$store.commit('updateCurrPatient', { id: queryID })
    }

    this.list = this.filterAllVisits

    this.$store.commit('updatePath', [
      {
        title: 'Dashboard',
        url: '/ha'
      },
      {
        title: 'Patient\'s Profile',
        url: '/ha/profile'
      }
    ])
  },
  computed: {
    filterAllVisits: function () {
      let queryID = this.$route.query.id

      if (!queryID) {
        queryID = this.$store.state.currPatient.id
      }

      return [...(this.$store.state.currPatient.episodes), ...(this.$store.state.currPatient.services)] || []
    },
    filterEpisode: function () { 
      return this.$store.state.currPatient.episodes.slice(1)
    },
    filterService: function () {
      return this.$store.state.currPatient.services
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
      else if (tabName == 'service') {
        return this.filterService.length
      }
    },
  },
  data() {
    return {
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
          title: 'Services',
          isActive: false,
        },
      ],
      list: [],
    }
  },
  transition: 'u-fade'
}
</script>

<style>
.bg-red {
  background-color: #ffb6b5;
}
</style>