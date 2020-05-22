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
            </nuxt-link> > Register New Patient
          </small>
        </div>
        <div class="col-md-12 text-center">
          Register a New Patient
          <hr>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-md-12 rounded">
          <ul class="list-inline mb-2">
            <li class="list-inline-item" v-for="(tab, index) in tabs" :key="index">
              <!-- <div style="border-bottom: 2px solid #ccc;"> -->
                <div class="px-2 mr-2 pb-1 mb-1 underline" @click="getTab(tab.name)" role="button">
                  {{ tab.title }}
                </div>
              <!-- </div> -->
            </li>
          </ul>
          <div class="w-100 bg-white mb-3 mt-0 px-3 pt-3 pb-3" v-if="tabs[0].isActive">
            <!-- Demographics <br><br> -->
            <div class="container">
              <div class="row">
                <div class="col-md-12 text-center">
                  <img src="/avatar.png" class="m-3" style="width: 200px;" alt=""><br>
                  <button class="btn btn-dark px-4">Upload a Patient Photo</button>
                </div>
              </div>
              <div class="row mt-3">
                <div class="col-md-12 mb-3">
                  General Information
                </div>
                <div class="col-md-6">
                  <input type="text" class="w-100 p-2 mb-3" placeholder="Full Name">
                  <select class="custom-select mb-3">
                    <option selected disabled>Gender</option>
                    <option value="1">Male</option>
                    <option value="2">Female</option>
                    <option value="3">Other</option>
                  </select>
                  <input type="text" class="w-100 p-2 mb-3" placeholder="Phone Number">
                  <input type="text" class="w-100 p-2 mb-3" placeholder="H/W/S/D of">
                </div>
                <div class="col-md-6">
                  <input type="text" class="w-100 p-2 mb-3" placeholder="Age">
                  <select class="custom-select mb-3">
                    <option selected disabled>Occupation</option>
                    <option value="1">Industrial Farmer</option>
                    <option value="2">Teacher</option>
                    <option value="2">Student</option>
                    <option value="3">Other</option>
                  </select>
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
                  <select class="custom-select mb-3">
                    <option selected disabled>State</option>
                    <option value="1">Maharashtra</option>
                    <option value="2">Kerala</option>
                    <option value="2">Tamila Nadu</option>
                    <option value="3">Other</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container mb-3">
      <div class="row">
        <div class="col-md-12">
          <nuxt-link to="/ha">
            <button class="w-100 btn btn-dark rounded font-weight-bold py-3 mb-1  text-uppercase">
              Register New Patient
            </button>
          </nuxt-link>
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
    }
  },
  data() {
    return {
      list: [],
      tabs: [
        {
          name: 'patients',
          title: 'Demographics',
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
