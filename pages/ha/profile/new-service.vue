<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-md-12 rounded">
          <ul class="list-inline mb-2">
            <li class="list-inline-item mr-0">
              <div class="px-2 mr-2 pb-1 mb-1 underline" role="button">
                New Service
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12 rounded">
          <div class="w-100 bg-white mb-3 mt-0 px-3 pt-3 pb-3" style="min-height: 200px;" v-if="tabs[0].isActive">
            <div class="row mt-1">
              <div class="col-md-12 text-muted small mb-3">
                  Please describe details relating to the service performed.
                </div>
              <div class="col-md-12">
                <label for="">What service did you provide?</label><br>
                <button class="btn mb-2 mr-2 btn-light">ECG</button>
                <button class="btn mb-2 mr-2 btn-light">Service 2</button>
                <button class="btn mb-2 mr-2 btn-light">Service 3</button>
                <button class="btn mb-2 mr-2 btn-light">Service 4</button>
                <button class="btn mb-2 mr-2 btn-light">Service 5</button>
                <button class="btn mb-2 mr-2 btn-light">Service 6</button>
              </div>
              <div class="col-md-12 mt-2">
                <label for="">What were the results?</label>
                <input type="text" class="w-100 p-2 mb-3" v-model="serviceDetails.serviceResults" placeholder="Describe the results from the tests performed">
              </div>
              <div class="col-md-12 mt-2">
                <label for="">Please provide any additional information</label>
                <textarea class="w-100 p-2" rows="5" v-model="serviceDetails.serviceDescription" placeholder="Additional information..."></textarea>
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
        title: 'Dashboard',
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
    recordNewService: function () {
      alert('New service has been recorded.')

      this.$store.commit('recordNewService', this.serviceDetails)
    },
  },
  data() {
    return {
      list: [],
      serviceDetails: {
        chiefComplaints: [['ECG']],
        serviceResults: '',
        serviceDescription: '',
      },
      showDemographics: true,
      showComplete: false,
      tabs: [
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
