<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-md-12 rounded">
          <ul class="list-inline">
            <li class="list-inline-item" v-for="(tab, index) in tabs" :key="index">
              <div class="btn px-3 small mr-1 pointer" type="button" @click="getTab(tab.name, tab.isEnabled)" :class="tab.isActive ? 'btn-dark' : 'btn-light'">
                {{ tab.title }}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Patient Medical History -->
    <div class="container" v-if="tabs[0].isActive">
      <div class="row">
        <div class="col-md-12 rounded">
          <div class="w-100 bg-white mb-3 px-3 pb-3" style="min-height: 100px;">
            <!-- Start Patient History -->
            <div class="row pt-3">
              <div class="col-md-12 small text-muted pb-2">
                Health Diagnosis
                <hr>
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
              <div class="col-md-12 small text-muted pb-0">
                General Notes
                <hr>
              </div>
              <div class="col-md-12">
                <textarea class="w-100 form-control" rows="5" placeholder="Please provide any additional or relevant information"></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container" v-if="tabs[1].isActive">
      <div class="row">
        <div class="col-md-12 rounded">
          <div class="w-100 bg-white mb-3 px-3 pb-3" style="min-height: 100px;">
            <div class="row pt-3">
              <div class="col-md-12 small text-muted pb-2">
                Health Diagnosis
                <hr>
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
              <div class="col-md-12 small text-muted pb-0">
                General Notes
                <hr>
              </div>
              <div class="col-md-12">
                <textarea class="w-100 form-control" rows="5" placeholder="Please provide any additional or relevant information"></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container mb-4">
      <div class="row">
        <div class="col-md-12">
          <div>
            <nuxt-link to="/ha/profile">
              <button class="w-100 btn btn-dark rounded font-weight-bold py-3 mb-2 text-uppercase">
                Edit Medical History
              </button>
            </nuxt-link>
            <nuxt-link to="/ha/profile">
              <button class="w-100 btn btn-dark rounded font-weight-bold py-3 mb-1 text-uppercase">
                Save Medical History
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
        title: 'View Demographics',
        url: '/ha/profile'
      }
    ])
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
        {
          name: 'medicalHistory',
          title: 'Patient Medical History',
          isActive: true,
        },
        {
          name: 'familyMedicalHistory',
          title: 'Family Medical History',
          isActive: false,
        },
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
