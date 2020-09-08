<template>
  <div>
    <div class="container mt-0">
      <div class="row">
        <div class="col-md-12">
        </div>
      </div>
      <div class="row">
        <!-- <div class="col-md-12">
          <nuxt-link to="/ha/profile/new-episode">
            <button class="w-100 btn btn-dark rounded font-weight-bold py-3 mb-2  text-uppercase">Record New Follow Up</button>     
          </nuxt-link>
        </div>
        <div class="col-md-12">
          <hr class="mt-2">
        </div> -->
      </div>
      <div class="row">
        <div class="col-md-12 rounded">
          <ul class="list-inline">
            <li class="list-inline-item">
              <button class="btn btn-dark px-3 small" role="button">
                Service 1
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12 rounded">
          <ul class="list-inline mb-2">
            <li class="list-inline-item text-center pointer">
              <div class="px-2 mr-2 pb-1 mb-1 underline">
                Service Details
              </div>
            </li>
          </ul>
          <div class="w-100 bg-white mb-2 mt-0 px-3 pt-3 pb-3" key="complaint" style="min-height: 200px;">
            <div class="row mt-1">
              <div class="col-md-12">
                <div class="small text-muted mb-2">
                  Service Performed
                  <hr class="mb-1 mt-1">
                </div>
                <div class="d-inline">
                  <button class="btn px-3 mr-2 small btn-dark" role="button">
                    {{ serviceData.episodeDetails.chiefComplaints[0][0] }}
                  </button>
                  <!-- {{ serviceData }} -->
                  <!-- <br><br> -->
                  <!-- {{ this.$route.query.id }} <br><br>
                  {{ serviceData }} -->
                  <!-- {{ this.$store.state.currPatient.services }}
                  <div v-for="(service, index) in this.$store.state.currPatient.services" :key="index">
                    {{ service.id }}
                  </div> -->
                </div>
              </div>
              <div class="col-md-12 mt-4">
                <div class="small text-muted mb-2">
                  Service Results
                  <hr class="mb-1 mt-1">
                </div>
                <div class="d-inline">
                  <!-- {{ serviceData }} -->
                  <!-- {{ this.$route.query.id }}
                  {{ this.$store.state.currPatient.services.find(service => service.episodeID === this.$route.query.id) }} -->
                  {{ serviceData.episodeDetails.serviceResults }}
                </div>
              </div>
              <div class="col-md-12 mt-4 mb-2">
                <div class="small text-muted mb-2">
                  Additional Details
                  <hr class="mb-1 mt-1">
                </div>
                <div class="d-inline">
                  {{ serviceData.episodeDetails.serviceDescription }}
                </div>
              </div>
            </div>
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
        title: 'Episode 1',
        url: '/ha/profile'
      }
    ])

    const serviceID = this.$route.query.id

    if ( this.$store.state.currPatient.id !== '') {
      this.serviceData = this.$store.state.currPatient.services.find(service => service.episodeID === serviceID )
    }
  },
  computed: {
  },
  methods: {
    
  },
  data() {
    return {
      serviceData: { 
        "type": "", 
        "billed": "", 
        "link": "", 
        "episodeID": "", 
        "title": "", 
        "created": "", 
        "lastUpdated": "", 
        "episodeDetails": { 
          "chiefComplaints": [ [ "" ] ], 
          "serviceResults": "", 
          "serviceDescription": "" 
        }, 
        "numFollowUps": "" 
      }
    }
  },
}
</script>