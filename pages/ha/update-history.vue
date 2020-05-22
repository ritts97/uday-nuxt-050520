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
              <div class="dropdown-menu w-75" aria-labelledby="dropdownMenuButton">
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
            Medical History
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
                View Medical History
              </button>
            </li><li class="list-inline-item">
              <button class="btn btn-light px-3 small" role="button">
                Update Medical History
              </button>
            </li>
          </ul>
        </div>
      </div>

      <div class="row">
        <div class="col-md-12 rounded">
          <div class="w-100 bg-white mb-3 px-3 pb-3" style="min-height: 100px;">

            <!-- Start Patient History -->
            <div class="row pt-3">
              <div class="col-md-12 pb-3">
                Patient History
              </div>
              <div class="col-md-12 small text-muted pb-3">
                Health Diagnosis
              </div>
              <div class="col-md-6">
                <div class="form-check ml-5 mb-4">
                  <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
                  <label class="form-check-label ml-3" for="defaultCheck1">
                    High Blood Pressure
                  </label>
                </div>
                <div class="form-check ml-5 mb-4">
                  <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
                  <label class="form-check-label ml-3" for="defaultCheck1">
                    Stroke
                  </label>
                </div>
                <div class="form-check ml-5 mb-4">
                  <input class="form-check-input" type="checkbox" value="" checked id="defaultCheck1">
                  <label class="form-check-label ml-3" for="defaultCheck1">
                    Asthma
                  </label>
                </div>
                <div class="form-check ml-5 mb-4">
                  <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
                  <label class="form-check-label ml-3" for="defaultCheck1">
                    Cancer
                  </label>
                </div>
                <div class="form-check ml-5 mb-4">
                  <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
                  <label class="form-check-label ml-3" for="defaultCheck1">
                    Tobacco
                  </label><br>
                  <input type="text" class="ml-3 p-2 mt-3 w-75" placeholder="Sticks/Packs per day" name="" id="">
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-check ml-5 mb-4">
                  <input class="form-check-input" type="checkbox" value="" checked id="defaultCheck1">
                  <label class="form-check-label ml-3" for="defaultCheck1">
                    Heart Attack
                  </label>
                </div>
                <div class="form-check ml-5 mb-4">
                  <input class="form-check-input" type="checkbox" value="" checked id="defaultCheck1">
                  <label class="form-check-label ml-3" for="defaultCheck1">
                    Diabetes
                  </label>
                </div>
                <div class="form-check ml-5 mb-4">
                  <input class="form-check-input" type="checkbox" value="" checked id="defaultCheck1">
                  <label class="form-check-label ml-3" for="defaultCheck1">
                    TB
                  </label>
                </div>
                <div class="form-check ml-5 mb-4">
                  <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
                  <label class="form-check-label ml-3" for="defaultCheck1">
                    Other
                  </label>
                </div>
                <div class="form-check ml-5 mb-4">
                  <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
                  <label class="form-check-label ml-3" for="defaultCheck1">
                    Alcohol
                  </label><br>
                  <input type="text" class="ml-3 p-2 mt-3 w-75" placeholder="Cups/Bottles per day" name="" id="">
                </div>
              </div>
            </div>
            <div class="row pt-3">
              <div class="col-md-12 small text-muted pb-3">
                General Notes
              </div>
              <div class="col-md-12">
                <textarea class="w-100 form-control" rows="5">
Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus veritatis, doloremque cum sunt rerum fugit, voluptatum rem pariatur similique nemo id reiciendis commodi. Aliquam aspernatur sapiente inventore ducimus, distinctio tempore.
                </textarea>
              </div>
              <div class="col-md-12 py-2">
                <hr>
              </div>
            </div>

            <!-- Start Family History -->
            <div class="row">
              <div class="col-md-12 pb-3">
                Family History
              </div>
              <div class="col-md-12 small text-muted pb-3">
                Health Diagnosis
              </div>
              <div class="col-md-6">
                <div class="form-check ml-5 mb-4">
                  <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
                  <label class="form-check-label ml-3" for="defaultCheck1">
                    High Blood Pressure
                  </label><br>
                  <select class="custom-select w-75 ml-3 mt-3">
                    <option selected disabled>Relationship</option>
                    <option value="1">Parent</option>
                    <option value="2">Spouse</option>
                    <option value="3">Other Relationship</option>
                  </select>
                </div>
                <div class="form-check ml-5 mb-4">
                  <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
                  <label class="form-check-label ml-3" for="defaultCheck1">
                    Stroke
                  </label><br>
                  <select class="custom-select w-75 ml-3 mt-3">
                    <option selected disabled>Relationship</option>
                    <option value="1">Parent</option>
                    <option value="2">Spouse</option>
                    <option value="3">Other Relationship</option>
                  </select>
                </div>
                <div class="form-check ml-5 mb-4">
                  <input class="form-check-input" type="checkbox" value="" checked id="defaultCheck1">
                  <label class="form-check-label ml-3" for="defaultCheck1">
                    Asthma
                  </label><br>
                  <select class="custom-select w-75 ml-3 mt-3">
                    <option disabled>Relationship</option>
                    <option selected value="1">Parent</option>
                    <option value="2">Spouse</option>
                    <option value="3">Other Relationship</option>
                  </select>
                </div>
                <div class="form-check ml-5 mb-4">
                  <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
                  <label class="form-check-label ml-3" for="defaultCheck1">
                    Cancer
                  </label><br>
                  <select class="custom-select w-75 ml-3 mt-3">
                    <option disabled>Relationship</option>
                    <option value="1">Parent</option>
                    <option selected value="2">Spouse</option>
                    <option value="3">Other Relationship</option>
                  </select>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-check ml-5 mb-4">
                  <input class="form-check-input" type="checkbox" value="" checked id="defaultCheck1">
                  <label class="form-check-label ml-3" for="defaultCheck1">
                    Heart Attack
                  </label><br>
                  <select class="custom-select w-75 ml-3 mt-3">
                    <option disabled>Relationship</option>
                    <option value="1">Parent</option>
                    <option value="2">Spouse</option>
                    <option selected value="3">Other Relationship</option>
                  </select>
                </div>
                <div class="form-check ml-5 mb-4">
                  <input class="form-check-input" type="checkbox" value="" checked id="defaultCheck1">
                  <label class="form-check-label ml-3" for="defaultCheck1">
                    Diabetes
                  </label><br>
                  <select class="custom-select w-75 ml-3 mt-3">
                    <option disabled>Relationship</option>
                    <option selected value="1">Parent</option>
                    <option value="2">Spouse</option>
                    <option value="3">Other Relationship</option>
                  </select>
                </div>
                <div class="form-check ml-5 mb-4">
                  <input class="form-check-input" type="checkbox" value="" checked id="defaultCheck1">
                  <label class="form-check-label ml-3" for="defaultCheck1">
                    TB
                  </label><br>
                  <select class="custom-select w-75 ml-3 mt-3">
                    <option disabled>Relationship</option>
                    <option selected value="1">Parent</option>
                    <option value="2">Spouse</option>
                    <option value="3">Other Relationship</option>
                  </select>
                </div>
                <div class="form-check ml-5 mb-4">
                  <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
                  <label class="form-check-label ml-3" for="defaultCheck1">
                    Other
                  </label><br>
                  <input type="text" class="ml-3 p-2 mt-3 w-75" placeholder="Describe condition..." name="" id=""><br>
                  <select class="custom-select w-75 ml-3 mt-3">
                    <option selected disabled>Relationship</option>
                    <option value="1">Parent</option>
                    <option value="2">Spouse</option>
                    <option value="3">Other Relationship</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <div class="form-check ml-5 mb-4">
                  <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
                  <label class="form-check-label ml-3" for="defaultCheck1">
                    Tobacco
                  </label><br>
                  <input type="text" class="ml-3 p-2 mt-3 w-75" placeholder="Sticks/Packs per day" name="" id=""><br>
                  <select class="custom-select w-75 ml-3 mt-3">
                    <option selected disabled>Relationship</option>
                    <option value="1">Parent</option>
                    <option value="2">Spouse</option>
                    <option value="3">Other Relationship</option>
                  </select>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-check ml-5 mb-4">
                  <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
                  <label class="form-check-label ml-3" for="defaultCheck1">
                    Alcohol
                  </label><br>
                  <input type="text form-control" class="ml-3 p-2 mt-3 w-75" placeholder="Cups/Bottles per day" name="" id=""><br>
                  <select class="custom-select w-75 ml-3 mt-3">
                    <option selected disabled>Relationship</option>
                    <option value="1">Parent</option>
                    <option value="2">Spouse</option>
                    <option value="3">Other Relationship</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="row pt-3">
              <div class="col-md-12 small text-muted pb-3">
                General Notes
              </div>
              <div class="col-md-12">
                <textarea class="w-100 form-control" rows="5">
Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores vel aliquam debitis tempore eligendi libero. Soluta aperiam accusamus aliquid hic?
                </textarea>
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
                Save Medical History
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
