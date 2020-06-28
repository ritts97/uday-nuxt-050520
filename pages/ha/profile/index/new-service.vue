<template>
  <div>
    <div class="container mt-2">
      <div class="row">
        <div class="col-md-12 rounded">
          <ul class="list-inline">
            <li class="list-inline-item">
              <button class="btn btn-dark px-3" role="button">
                New Service
              </button>
            </li>
            <li class="list-inline-item">
              <button class="btn btn-light px-3" role="button">
                Billing
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12 rounded">
          <!-- <ul class="list-inline mb-2">
            <li class="list-inline-item" v-for="(tab, index) in tabs" :key="index">
              <button class="btn pl-0 pr-4 pb-2" @click="getTab(tab.name)" role="button">
                {{ tab.title }}
              </button>
            </li>
          </ul> -->
          <div class="w-100 bg-white mb-3 mt-0 px-3 pt-3 pb-3" style="min-height: 200px;" v-if="tabs[0].isActive">
            <div class="row mt-1">
              <div class="col-md-12 text-muted small mb-3">
                  Please complete to the best of your ability.
                </div>
              <div class="col-md-6">
                <input type="text" class="w-100 p-2 mb-3" placeholder="What service did you provide?">
              </div>
              <div class="col-md-6">
                <input type="text" class="w-100 p-2 mb-3" placeholder="What were the results?">
              </div>
              <div class="col-md-12">
                <textarea class="w-100 p-2" rows="5" placeholder="Please provide any additional information..."></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container mb-3">
      <div class="row">
        <div class="col-md-12">
          <nuxt-link to="/ha/profile"> 
            <button @click="recordNewService()" class="w-100 btn btn-dark rounded font-weight-bold py-3 mb-1  text-uppercase">Record New Service</button>
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'dashboard',
  mounted () {
    this.$store.commit('updatePath', [
      {
        title: 'HA\'s Dashboard',
        url: '/ha'
      },
      {
        title: 'Patient\'s Profile',
        url: '/ha/profile'
      },
      {
        title: 'New Service',
        url: '/ha/new-service'
      },
    ])
  },
  methods: {
    // showAlert: function () {
    //   alert(`This service has been recorded.`)
    // },
    recordNewService: function () {
      alert('New service has been recorded.')

      this.$store.commit('recordNewService')
    },
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
    goToNext: function () {
      let tabs = this.tabs
      let ref = 0

      for (let i = 0; i < tabs.length; i++) {
        if (tabs[i].isActive === true) {
          tabs[i].isActive = false
          ref = i
        }
      }

      if ((ref + 1) >= (tabs.length-1)) {
        this.showComplete = true
      } 

      tabs[ref + 1].isActive = true
    }
  },
  data() {
    return {
      list: [],
      showDemographics: true,
      showComplete: false,
      tabs: [
        // {
        //   name: 'patients',
        //   title: 'Demographics',
        //   isActive: true,
        // },
        {
          name: 'allocated',
          title: 'Service Details',
          isActive: true,
        }
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
