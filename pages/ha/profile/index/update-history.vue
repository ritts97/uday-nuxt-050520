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
                Health Diagnosis 111
                <hr>
              </div>
              <div class="col-md-6" v-for="(patientQuestion, index) in currPatient.demographics.patientHistory.questions" :key="index">
                <div v-if="patientQuestion.placeholder" class="form-check ml-5 mb-4">
                  <input class="form-check-input" type="checkbox" :checked="patientQuestion.isActive" :id="'patientQuestions' + index">
                  <label class="form-check-label ml-3 fake-link" :for="'patientQuestions' + index">
                    {{ patientQuestion.title }}
                  </label><br>
                  <input type="number" :value="patientQuestion.value" min="0" class="ml-3 mr-3 p-2 mt-3 w-5" placeholder="0"> Sticks/packs per day.
                </div>
                <div class="form-check ml-5 mb-4" v-else>
                  <input class="form-check-input" type="checkbox" :checked="patientQuestion.isActive" :id="'patientQuestions' + index">
                  <label class="form-check-label ml-3 fake-link" :for="'patientQuestions' + index">
                    {{ patientQuestion.title }}
                  </label>
                </div>
              </div>
            </div>
            <div class="row pt-3">
              <div class="col-md-12 small text-muted pb-0">
                General Notes
                <hr>
              </div>
              <div class="col-md-12 mb-4">
                {{ currPatient.demographics.patientHistory.generalDescription }}
                <!-- <textarea class="w-100 form-control" rows="5" placeholder="Please provide any additional or relevant information"></textarea> -->
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
              <div class="col-md-6" v-for="(patientQuestion, index) in currPatient.demographics.familyHistory.questions" :key="index">
                <div v-if="patientQuestion.placeholder" class="form-check ml-5 mb-4">
                  <input class="form-check-input" type="checkbox" :checked="patientQuestion.isActive" :id="'patientQuestions' + index">
                  <label class="form-check-label ml-3 fake-link" :for="'patientQuestions' + index">
                    {{ patientQuestion.title }}
                  </label><br>
                  <input type="number" :value="patientQuestion.value" min="0" class="ml-3 mr-3 p-2 mt-3 w-5" placeholder="0"> Sticks/packs per day.
                </div>
                <div class="form-check ml-5 mb-4" v-else>
                  <input class="form-check-input" type="checkbox" :checked="patientQuestion.isActive" :id="'patientQuestions' + index">
                  <label class="form-check-label ml-3 fake-link" :for="'patientQuestions' + index">
                    {{ patientQuestion.title }}
                  </label>
                </div>
              </div>
            </div>
            <div class="row pt-3">
              <div class="col-md-12 small text-muted pb-0">
                General Notes
                <hr>
              </div>
              <div class="col-md-12 mb-4">
                {{ currPatient.demographics.familyHistory.generalDescription }}
                <!-- <textarea class="w-100 form-control" rows="5" placeholder="Please provide any additional or relevant information"></textarea> -->
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
  computed: {
    currPatient: function () {
      return this.$store.state.currPatient
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
