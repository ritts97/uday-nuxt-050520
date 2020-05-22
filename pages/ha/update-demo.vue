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
            </nuxt-link> > 
            <nuxt-link to="/ha/profile" class="text-muted">
              Patient Profile
            </nuxt-link> > 
            Demographics
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
        <div class="col-md-12 rounded">
          <ul class="list-inline">
            <li class="list-inline-item">
              <button class="btn btn-dark px-3 small" role="button">
                View Demographics
              </button>
            </li><li class="list-inline-item">
              <button class="btn btn-light px-3 small" role="button">
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
                General Information
              </div>
              <div class="col-md-6">
                <div class="small text-muted mb-1">
                  Full Name
                </div>
                <input type="text" class="w-100 p-2 mb-3" placeholder="First Name" value="Delores Abernathy">
                <div class="small text-muted mb-1">
                  Phone Number
                </div>
                <input type="text" class="w-100 p-2 mb-3" placeholder="Phone Number" value="1-415-555-12234">
                <div class="small text-muted mb-1">
                  H/W/S/D of
                </div>
                <input type="text" class="w-100 p-2 mb-3" placeholder="H/W/S/D of" value="Delores Abernathy">
              </div>
              <div class="col-md-6">
                <div class="small text-muted mb-1">
                  Gender
                </div>
                <input type="text" class="w-100 p-2 mb-3" placeholder="Gender" value="Male">
                <div class="small text-muted mb-1">
                  Age
                </div>
                <input type="text" class="w-100 p-2 mb-3" placeholder="Age" value="29">
                <div class="small text-muted mb-1">
                  Occupation
                </div>
                <input type="text" class="w-100 p-2 mb-3" placeholder="Occupation" value="Industrial Farmer">
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
                <input type="text" class="w-100 p-2 mb-3" placeholder="First Name" value="444 D St.">
                <div class="small text-muted mb-1">
                  District
                </div>
                <input type="text" class="w-100 p-2 mb-3" placeholder="First Name" value="Hyperbad">
                <div class="small text-muted mb-1">
                  Police Station
                </div>
                <input type="text" class="w-100 p-2 mb-3" placeholder="Phone Number" value="Police Station">
              </div>
              <div class="col-md-6">
                <div class="small text-muted mb-1">
                  Address 2
                </div>
                <input type="text" class="w-100 p-2 mb-3" placeholder="First Name" value="Apt #4">
                <div class="small text-muted mb-1">
                  State
                </div>
                <input type="text" class="w-100 p-2 mb-3" placeholder="Gender" value="India">
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
              <button class="w-100 btn btn-dark rounded font-weight-bold py-3 mb-1 text-uppercase">
                Save Demographics
              </button>
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
    <div class="container text-center">
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
      showDocsFeedback: true,
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
          title: 'Chief Complaints',
          isActive: true,
        },
        // {
        //   name: 'released',
        //   title: 'Medical History',
        //   isActive: false,
        // },
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
