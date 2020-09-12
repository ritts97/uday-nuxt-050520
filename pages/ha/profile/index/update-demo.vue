<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-md-12 rounded">
          <ul class="list-inline">
            <li class="list-inline-item">
              <button class="btn btn-dark px-3 small" role="button">
                Update Demographics
              </button>
            </li>
          </ul>
        </div>
      </div>

      <div class="row">
        <div class="col-md-12 rounded">
          
          <div class="w-100 bg-white mb-3 px-3 pb-3" style="min-height: 100px;">
            <div class="row pt-3">
              <div class="col-md-12 pb-3">
                General Information <br>
                <!-- <br><br> -->
                <!-- {{ demographics }} -->
                <!-- {{ currPatient.demographics }} -->
              </div>
              <div class="col-md-6">
                <div class="small text-muted mb-1">
                  Full Name
                </div>
                <input type="text" class="w-100 p-2 mb-3" placeholder="First Name" v-model="demographics.name">
                <div class="small text-muted mb-1">
                  Phone Number
                </div>
                <input type="text" class="w-100 p-2 mb-3" placeholder="Phone Number" v-model="demographics.phone">
                <div class="small text-muted mb-1">
                  H/W/S/D of
                </div>
                <input type="text" class="w-100 p-2 mb-3" placeholder="H/W/S/D of" v-model="demographics.hswd">
              </div>
              <div class="col-md-6">
                <div class="small text-muted mb-1">
                  Gender
                </div>
                <input type="text" class="w-100 p-2 mb-3" placeholder="Gender" v-model="demographics.gender">
                <div class="small text-muted mb-1">
                  Age
                </div>
                <input type="text" class="w-100 p-2 mb-3" placeholder="Age" v-model="demographics.age">
                <div class="small text-muted mb-1">
                  Occupation
                </div>
                <input type="text" class="w-100 p-2 mb-3" placeholder="Occupation" v-model="demographics.occupation">
              </div>
            </div>
            <div class="row pt-3">
              <div class="col-md-12 pb-3">
                Location Information
              </div>
              <div class="col-md-6">
                <div class="small text-muted mb-1">
                  Address 1
                </div>
                <input type="text" class="w-100 p-2 mb-3" placeholder="First Name" v-model="demographics.address">
                <div class="small text-muted mb-1">
                  District
                </div>
                <input type="text" class="w-100 p-2 mb-3" placeholder="First Name" value="District">
                <div class="small text-muted mb-1">
                  Police Station
                </div>
                <input type="text" class="w-100 p-2 mb-3" placeholder="Phone Number" v-model="demographics.police">
              </div>
              <div class="col-md-6">
                <div class="small text-muted mb-1">
                  Address 2
                </div>
                <input type="text" class="w-100 p-2 mb-3" placeholder="First Name" v-model="demographics.address2">
                <div class="small text-muted mb-1">
                  State
                </div>
                <input type="text" class="w-100 p-2 mb-3" placeholder="" v-model="demographics.country">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container mb-3">
      <div class="row">
        <div class="col-md-12">
          <div>
            <nuxt-link to="/ha/profile">
              <button @click="updateDemographics('Patient demographics have been updated.')" class="w-100 btn btn-dark rounded font-weight-bold py-3 mb-1 text-uppercase">
                Save Demographics
              </button>
            </nuxt-link>
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
        title: 'View Family History',
        url: '/ha/profile'
      }
    ])
  },
  computed: {
    currPatient: function () {
      return this.$store.state.currPatient
    }
  },
  mounted() {
    this.demographics = {...this.currPatient.demographics}
  },
  methods: {
    updateDemographics: function (msg) {
      alert(msg)

      let currPatientId = this.currPatient.id

      this.$store.commit('updateDemographics', [currPatientId, this.demographics])
    }
  },
  data() {
    return {
      list: [],
      showDocsFeedback: true,
      showDemographics: true,
      showComplete: false,
      demographics: {
        name: '',
        occupation: '',
        gender: '',
        age: 0,
        hswd: '',
        address: '',
        address2: '',
        police: '',
        phone: '',
        location: '',
        country: '',
      },
      tabs: [
        {
          name: 'allocated',
          title: 'Chief Complaints',
          isActive: true,
        },
        {
          name: 'cluster',
          title: 'Vitals',
          isActive: false,
        },
        {
          name: 'general',
          title: 'General Exams',
          isActive: false,
        },
        {
          name: 'specific',
          title: 'Specific Exams',
          isActive: false,
        },
        {
          name: 'photos',
          title: 'Add. Photos',
          isActive: false,
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
</style>
