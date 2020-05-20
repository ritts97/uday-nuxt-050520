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
            </nuxt-link> > New Episode
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
        <div class="col-md-12">
          <!-- <div class="text-muted pointer d-inline" style="margin-left: -16px; position: absolute;" @click="showDemographics = !showDemographics">
            <span v-if="!showDemographics">+</span>
            <span v-else>-</span>
          </div> -->
          <h5 class="d-inline">Delores Abernathy (29, F)</h5> 
          [ <div class="d-inline pointer text-muted" @click="showDemographics = !showDemographics">
            <span v-if="!showDemographics">show</span>
            <span v-else>hide</span>
          </div> ]
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
          <nuxt-link to="/ha/profile-view-history" class="text-muted">
            View Medical History...
          </nuxt-link><br>
        </div>
        <div class="col-md-5">
          Address 1 <br>
          Address 2 <br>
          <br><br>
          Police Station<br><br>
          <nuxt-link to="/ha/profile-edit-demographics" class="text-muted">
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
    <div class="container mt-2">
      <div class="row">
        <div class="col-md-12 rounded">
          <ul class="list-inline">
            <li class="list-inline-item">
              <button class="btn btn-dark px-3" role="button">
                New Episode
              </button>
            </li>
            <!-- <li class="list-inline-item">
              <button class="btn btn-light px-3" role="button">
                Follow Up 1
              </button>
            </li>
            <li class="list-inline-item">
              <button class="btn btn-light px-3" role="button">
                Follow Up 2
              </button>
            </li>
            <li class="list-inline-item">
              <button class="btn btn-light px-3" role="button">
                New Follow Up
              </button>
            </li> -->
            <!-- <li class="list-inline-item">
              <button class="btn btn-light px-3 small" role="button">
                + Service
              </button>
            </li> -->
          </ul>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12 rounded">
          <ul class="list-inline mb-2">
            <li class="list-inline-item" v-for="(tab, index) in tabs" :key="index">
              <button class="btn pl-0 pr-4 pb-2" @click="getTab(tab.name)" role="button">
                {{ tab.title }}
              </button>
            </li>
          </ul>
          <!-- <div class="w-100 bg-white my-3 px-3 py-3" v-if="tabs[0].isActive"> -->
            <!-- Demographics <br><br> -->
            <!-- <div class="container"> -->
              <!-- <div class="row">
                <div class="col-md-12 text-center">
                  <img src="/avatar.png" class="m-3" style="width: 200px;" alt=""><br>
                  <button>Action :: Upload a Patient Photo</button>
                </div>
              </div> -->
              <!-- <div class="row mt-3">
                <div class="col-md-12 mb-3">
                  General Information
                </div>
                <div class="col-md-6">
                  <input type="text" class="w-100 p-2 mb-3" placeholder="First Name">
                  <input type="text" class="w-100 p-2 mb-3" placeholder="Gender">
                  <input type="text" class="w-100 p-2 mb-3" placeholder="Phone Number">
                  <input type="text" class="w-100 p-2 mb-3" placeholder="H/W/S/D of">
                </div>
                <div class="col-md-6">
                  <input type="text" class="w-100 p-2 mb-3" placeholder="Last Name">
                  <input type="text" class="w-100 p-2 mb-3" placeholder="Age">
                  <input type="text" class="w-100 p-2 mb-3" placeholder="Occupation">
                  <input type="text" class="w-100 p-2 mb-3" placeholder="Current Date">
                </div>
              </div>
              <div class="row mt-3">
                <div class="col-md-12 mb-3">
                  Location Information
                </div>
                <div class="col-md-6">
                  <input type="text" class="w-100 p-2 mb-3" placeholder="Address 1">
                  <input type="text" class="w-100 p-2 mb-3" placeholder="District">
                  <input type="text" class="w-100 p-2 mb-3" placeholder="Police Station">
                </div>
                <div class="col-md-6">
                  <input type="text" class="w-100 p-2 mb-3" placeholder="Address 2">
                  <input type="text" class="w-100 p-2 mb-3" placeholder="State">
                </div>
              </div>
            </div>
          </div> -->
          <div class="w-100 bg-white mb-3 mt-0 px-3 pt-3 pb-3" style="min-height: 200px;" v-if="tabs[0].isActive">
            Chief Complaints<br><br>
            <div class="row mt-1">
              <div class="col-md-12 text-muted small mb-3">
                  Please complete to the best of your ability.
                </div>
              <div class="col-md-6">
                <input type="text" class="w-100 p-2 mb-3" placeholder="Complaint 1">
              </div>
              <div class="col-md-6">
                <input type="text" class="w-100 p-2 mb-3" placeholder="Complaint 2">
              </div>
              <div class="col-md-6">
                <input type="text" class="w-100 p-2 mb-3" placeholder="Complaint 3">
              </div>
              <div class="col-md-6">
                <input type="text" class="w-100 p-2 mb-3" placeholder="Complaint 4">
              </div>
              <div class="col-md-6">
                <input type="text" class="w-100 p-2 mb-3" placeholder="Complaint 5">
              </div>
              <div class="col-md-6">
                <input type="text" class="w-100 p-2 mb-3" placeholder="Complaint 6">
              </div>
              <div class="col-md-6">
                <input type="text" class="w-100 p-2 mb-3" placeholder="Complaint 7">
              </div>
              <div class="col-md-6">
                <input type="text" class="w-100 p-2 mb-3" placeholder="Complaint 8">
              </div>
            </div>
          </div>
          <!-- <div class="w-100 bg-white my-3 px-3 py-3" v-if="tabs[2].isActive">
            Medical History
          </div> -->
          <div class="w-100 bg-white my-3 px-3 py-3" style="min-height: 200px;" v-if="tabs[1].isActive">
            Vitals<br><br>
            <div class="row mt-1">
              <div class="col-md-12 text-muted small mb-3">
                  Please complete to the best of your ability.
                </div>
              <div class="col-md-6">
                <input type="text" class="w-100 p-2 mb-3" placeholder="Patient Appearance">
              </div>
              <div class="col-md-6">
                <input type="text" class="w-100 p-2 mb-3" placeholder="Patient Gait">
              </div>
              <div class="col-md-6">
                <input type="text" class="w-100 p-2 mb-3" placeholder="BP (___/___ mmHg)">
              </div>
              <div class="col-md-6">
                <input type="text" class="w-100 p-2 mb-3" placeholder="SP02 (%)">
              </div>
              <div class="col-md-6">
                <input type="text" class="w-100 p-2 mb-3" placeholder="Temperature (‘’ F)">
              </div>
              <div class="col-md-6">
                <input type="text" class="w-100 p-2 mb-3" placeholder="Height (cm)">
              </div>
              <div class="col-md-6">
                <input type="text" class="w-100 p-2 mb-3" placeholder="Weight (kg)">
              </div>
              <div class="col-md-6">
                <input type="text" class="w-100 p-2 mb-3" placeholder="BMI (kg/m2) (Auto Calculated)">
              </div>
            </div>
          </div>
          <div class="w-100 bg-white my-3 px-3 py-3" style="min-height: 200px;" v-if="tabs[2].isActive">
            General Exams<br><br>
            <div class="row mt-1">
              <div class="col-md-12 mb-5 text-center">
                <img src="/anatomy_sketch.png" alt="">
              </div>
              <div class="col-md-12 text-muted small mb-3">
                  Please complete to the best of your ability.
                </div>
              <div class="col-md-6">
                <input type="text" class="w-100 p-2 mb-3" placeholder="Patient Appearance">
              </div>
              <div class="col-md-6">
                <input type="text" class="w-100 p-2 mb-3" placeholder="Patient Gait">
              </div>
              <div class="col-md-6">
                <input type="text" class="w-100 p-2 mb-3" placeholder="BP (___/___ mmHg)">
              </div>
              <div class="col-md-6">
                <input type="text" class="w-100 p-2 mb-3" placeholder="SP02 (%)">
              </div>
              <div class="col-md-6">
                <input type="text" class="w-100 p-2 mb-3" placeholder="Temperature (‘’ F)">
              </div>
              <div class="col-md-6">
                <input type="text" class="w-100 p-2 mb-3" placeholder="Height (cm)">
              </div>
              <div class="col-md-6">
                <input type="text" class="w-100 p-2 mb-3" placeholder="Weight (kg)">
              </div>
              <div class="col-md-6">
                <input type="text" class="w-100 p-2 mb-3" placeholder="BMI (kg/m2) (Auto Calculated)">
              </div>
            </div>
          </div>
          <div class="w-100 bg-white my-3 px-3 py-3" style="min-height: 200px;" v-if="tabs[3].isActive">
            Specific Exams
            <br><br>
            <div class="row mt-1">
              <div class="col-md-12 mb-5 text-center">
                <img src="/anatomy_sketch.png" alt="">
              </div>
              <div class="col-md-12 text-muted small mb-3">
                  Please complete to the best of your ability.
                </div>
              <div class="col-md-6">
                <input type="text" class="w-100 p-2 mb-3" placeholder="Patient Appearance">
              </div>
              <div class="col-md-6">
                <input type="text" class="w-100 p-2 mb-3" placeholder="Patient Gait">
              </div>
              <div class="col-md-6">
                <input type="text" class="w-100 p-2 mb-3" placeholder="BP (___/___ mmHg)">
              </div>
              <div class="col-md-6">
                <input type="text" class="w-100 p-2 mb-3" placeholder="SP02 (%)">
              </div>
              <div class="col-md-6">
                <input type="text" class="w-100 p-2 mb-3" placeholder="Temperature (‘’ F)">
              </div>
              <div class="col-md-6">
                <input type="text" class="w-100 p-2 mb-3" placeholder="Height (cm)">
              </div>
              <div class="col-md-6">
                <input type="text" class="w-100 p-2 mb-3" placeholder="Weight (kg)">
              </div>
              <div class="col-md-6">
                <input type="text" class="w-100 p-2 mb-3" placeholder="BMI (kg/m2) (Auto Calculated)">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container mb-3">
      <div class="row">
        <div class="col-md-12">
          <button v-if="!showComplete" @click="goToNext()" class="w-100 btn btn-dark rounded font-weight-bold py-3 mb-1  text-uppercase">GO TO NEXT</button>
          <button disabled v-else @click="goToNext()" class="w-100 btn btn-dark rounded font-weight-bold py-3 mb-1  text-uppercase">Record New Patient</button>
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
