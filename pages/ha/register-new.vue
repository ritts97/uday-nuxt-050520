<template>
  <div>
    <form v-on:submit.prevent="registerPatient">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <ul class="list-inline">
            <li class="list-inline-item" v-for="(tab, index) in tabs" :key="index">
              <div class="btn px-3 small mr-1 pointer" type="button" @click="getTab(tab.name, tab.isEnabled)" :class="tab.isActive ? 'btn-dark' : 'btn-light'">
                {{ tab.title }}
              </div>
            </li>
          </ul>
        </div>
      </div>

      <!-- Demographics -->
      <div class="row" v-if="tabs[0].isActive">
        <div class="col-md-12 rounded">
          <div class="w-100 bg-white mb-3 mt-0 px-3 pt-4 pb-3">
            <div class="container">
              <div class="row">
                <div class="col-md-12 text-center">
                  <!-- <img src="/avatar-placeholder.jpg" class="m-3" style="width: 200px;" alt=""><br> -->

                  <div class="position-relative mx-auto" style="width: 200px;">
                    <div class="position-absolute">
                      <img src="/avatar-placeholder.jpg" alt="">
                    </div>
                    <div style="padding-bottom: 100%;"></div>
                  </div>
                  <br>
                  <button class="btn btn-dark px-4 mb-3">Upload Photo</button>
                </div>
              </div>
              <div class="row mt-3">
                <div class="col-md-12 text-muted small mb-0">
                  Demographic Information
                  <hr>
                </div>
                <div class="col-md-6">
                  <label for="">Name</label>
                  <input type="text" class="w-100 p-2 mb-3" v-model="patientData.name" placeholder="Full Name">
                  
                  <label for="">Gender</label>
                  <select class="custom-select mb-3" v-model="patientData.gender">
                    <option selected disabled>Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                  <label for="">Phone Number</label>
                  <input type="text" class="w-100 p-2 mb-3" v-model="patientData.phone" placeholder="Phone Number">
                  
                  <!-- <label for="">Current Date</label>
                  <input type="text" class="w-100 p-2 mb-3" placeholder="Current Date">
                 -->
                </div>
                <div class="col-md-6">
                  <label for="">Age</label>
                  <input type="text" class="w-100 p-2 mb-3" v-model="patientData.age" placeholder="Age">
                  
                  <label for="">Occupation</label>
                  <select class="custom-select mb-3" v-model="patientData.occupationId" id="occupation" @click="changeocc()">
                  </select>

                  <label for="">Husband/Wife/Son/Daughter of</label>
                  <input type="text" class="w-100 p-2 mb-3" v-model="patientData.hswd" placeholder="Family Members's Name">
                
                </div>
              </div>
              <div class="row mt-3">
                <div class="col-md-12 text-muted small mb-0">
                  Geographic Information
                  <hr>
                </div>
                <div class="col-md-6">

                  <label for="">Address</label>
                  <input type="text" class="w-100 p-2 mb-3" v-model="patientData.address" placeholder="Address 1">
                  
                  <label for="">District</label>
                  <select class="custom-select mb-4" v-model="patientData.districtId" id="districtId" @click="changedistrict()">
                  </select>
                  <label for="">Police Station</label>
                  <select class="custom-select mb-4" v-model="patientData.psId" id="psId" @click="changeps()">
                  </select>
                </div>
                <div class="col-md-6">

                  <label for="">Address 2</label>
                  <input type="text" class="w-100 p-2 mb-3" v-model="patientData.address2" placeholder="Address 2">
                  
                  <label for="">State</label>
                  <select class="custom-select mb-4" v-model="patientData.stateId" id="stateId" @click="changestate()">
                  </select>
                  <label for="">Country</label>
                  <input type="text" class="w-100 p-2 mb-3" v-model="patientData.country" placeholder="India" value="India">
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-12 mb-3">
          <button type="button" @click="goToNext()" class="w-100 btn btn-dark rounded font-weight-bold py-3 mb-1  text-uppercase">
            Go to Patient Medical History
          </button>
        </div>
      </div>

      <!-- Patient Medical History -->
      <div class="row" v-if="tabs[1].isActive">
        <div class="col-md-12 rounded">
          <div class="w-100 bg-white mb-3 px-3 pb-3" style="min-height: 100px;">
            <!-- Start Patient History -->
            <div class="row pt-3">
              <div class="col-md-12 small text-muted pb-2">
                Health Diagnosis
                <hr>
              </div>
              <div class="col-md-6" v-for="(patientQuestion, index) in patientData.patientHistory.questions" :key="index">
                <div v-if="patientQuestion.placeholder" class="form-check ml-5 mb-4">
                  <input class="form-check-input" v-model="patientQuestion.isActive" type="checkbox" value="" :id="'patientQuestions' + index">
                  <label class="form-check-label ml-3 fake-link" :for="'patientQuestions' + index">
                    {{ patientQuestion.title }}
                  </label><br>
                  <input type="number" v-model="patientQuestion.value" min="0" class="ml-3 mr-3 p-2 mt-3 w-5" placeholder="0"> Sticks/packs per day.
                </div>
                <div class="form-check ml-5 mb-4" v-else>
                  <input class="form-check-input" v-model="patientQuestion.isActive" type="checkbox" value="" :id="'patientQuestions' + index">
                  <label class="form-check-label ml-3 fake-link" :for="'patientQuestions' + index">
                    {{ patientQuestion.title }}
                  </label>
                </div>
              </div>
            </div>
            <div class="row pt-3">
              <div class="col-md-12 small text-muted pb-2">
                General Notes
                <hr>
              </div>
              <div class="col-md-12">
                <textarea v-model="patientData.patientHistory.generalDescription" class="w-100 form-control" rows="5" placeholder="Please provide any additional or relevant information"></textarea>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-12 mb-3">
          <button type="button" @click="goNext()" class="w-100 btn btn-dark rounded font-weight-bold py-3 mb-1  text-uppercase">
            Go to Family Medical History
          </button>
        </div>
      </div>

      <!-- Family Medical History -->
      <div class="row" v-if="tabs[2].isActive">
        <div class="col-md-12 rounded">
          <div class="w-100 bg-white mb-3 px-3 pb-3" style="min-height: 100px;">
            <div class="row pt-3">
              <div class="col-md-12 small text-muted pb-2">
                Health Diagnosis
                <hr>
              </div>
              <div class="col-md-6" v-for="(patientQuestion, index) in patientData.familyHistory.questions" :key="index">
                <div v-if="patientQuestion.placeholder" class="form-check ml-5 mb-4">
                  <input class="form-check-input" v-model="patientQuestion.isActive" type="checkbox" value="" :id="'patientQuestions' + index">
                  <label class="form-check-label ml-3 fake-link" :for="'patientQuestions' + index">
                    {{ patientQuestion.title }}
                  </label><br>
                  <input type="number" v-model="patientQuestion.value" min="0" class="ml-3 mr-3 p-2 mt-3 w-25" placeholder="0"> Sticks/packs per day.
                </div>
                <div class="form-check ml-5 mb-4" v-else>
                  <input class="form-check-input" v-model="patientQuestion.isActive" type="checkbox" value="" :id="'patientQuestions' + index">
                  <label class="form-check-label ml-3 fake-link" :for="'patientQuestions' + index">
                    {{ patientQuestion.title }}
                  </label><br>
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
              <div class="col-md-12 small text-muted pb-2">
                General Notes
                <hr>
              </div>
              <div class="col-md-12">
                <textarea v-model="patientData.familyHistory.generalDescription" class="w-100 form-control" rows="5" placeholder="Please provide any additional or relevant information"></textarea>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-12 mb-3">
          <button type="submit" class="w-100 btn btn-dark rounded font-weight-bold py-3 mb-1  text-uppercase">
            Register New Patient
          </button>
        </div>
      </div>
    </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
import Vue from 'vue'
import VueCookies from 'vue-cookies'

Vue.use(VueCookies)
var occ = ""
export default {
  layout: 'dashboard',
  mounted() {
    let path = [
      {
        title: 'HA\'s Dashboard',
        url: '/ha'
      },
      {
        title: 'Register New Patient',
        url: '/ha/register-new'
      },
    ]

    this.$store.commit('updatePath', path)

    this.generateFakeCredentials()

  },
  methods: {
    generateFakeCredentials: function name(params) {
      let self = this
      axios.get('https://cors-anywhere.herokuapp.com/https://randomuser.me/api/').then(res => {
        
        const profile = res.data.results[0]
        console.log(profile)
        self.patientData.name = profile.name.first + ' ' + profile.name.last
        self.patientData.address = profile.location.street.number + ' ' + profile.location.street.name
        self.patientData.age = profile.dob.age
        self.patientData.phone = profile.phone
        self.patientData.gender = profile.gender[0].toUpperCase()
        self.patientData.location = profile.location.city + ', ' + profile.location.state + ', ' + profile.location.country
      })
    },
    changeocc: function() {
      var occp = this.$occ;
      var l = occp.length;
      var opt = "", options = "<option selected disabled>State</option>\n";
      var i = 0;
      for(i = 0; i < l; i++){
        opt = "<option value=\"" + occp[i]['objectid'] + "\">" + occp[i]['name'] + "</option>\n";
        options = options.concat(opt)
      }
      document.getElementById("occupation").innerHTML = options
    },
    changestate: function() {
      var st = this.$state;
      var l = st.length;
      var opt = "", options = "<option selected disabled>State</option>\n";
      var i = 0;
      for(i = 0; i < l; i++){
        opt = "<option value=\"" + st[i]['objectid'] + "\">" + st[i]['name'] + "</option>\n";
        options = options.concat(opt)
      }
      document.getElementById("stateId").innerHTML = options
    },
    changedistrict: function() {
      var options = "<option selected disabled>District</option>\n", opt = "";
      if(this.patientData.stateId == undefined){
        alert("State not selected!")
      }
      else{
        var dist = this.$district;
        var l = dist.length, i = 0;
        for(i = 0; i < l; i++){
          if(dist[i]['state'] == this.patientData.stateId){
            opt = "<option value=\"" + dist[i]['objectid'] + "\">" + dist[i]['name'] + "</option>\n";
            options = options.concat(opt)
          }
        }
      }
      document.getElementById("districtId").innerHTML = options
    },
    changeps: function() {
      var options = "<option selected disabled>Police Station</option>\n", opt = "";
      if(this.patientData.districtId == undefined){
        alert("District not selected!")
      }
      else{
        var ps = this.$ps;
        var l = ps.length, i = 0;
        for(i = 0; i < l; i++){
          if(ps[i]['district'] == this.patientData.districtId){
            opt = "<option value=\"" + ps[i]['objectid'] + "\">" + ps[i]['name'] + "</option>\n";
            options = options.concat(opt)
          }
        }
      }
      document.getElementById("psId").innerHTML = options
    },
    goNext: function() {
      let tabs = this.tabs
      let ref = 0
      let self = this

      for (let i = 0; i < tabs.length; i++) {
        if (tabs[i].isActive === true) {
          tabs[i].isActive = false
          ref = i
        }
      }

      tabs[ref + 1].isActive = true
      tabs[ref + 1].isEnabled = true
    },
    goToNext: function () {
      let tabs = this.tabs
      let ref = 0
      let self = this

      for (let i = 0; i < tabs.length; i++) {
        if (tabs[i].isActive === true) {
          tabs[i].isActive = false
          ref = i
        }
      }

      tabs[ref + 1].isActive = true
      tabs[ref + 1].isEnabled = true
      var headers = {
        'Content-Type': 'application/json;charset=UTF-8',
      }
      var data = {
        HaId: Vue.$cookies.get('HaId'),
        name: self.patientData.name,
        gender: self.patientData.gender,
        age: Number(self.patientData.age),
        ageType: 'Years',
        phone: Number(self.patientData.phone),
        villOrCity: self.patientData.address,
        stateId: self.patientData.stateId,
        districtId: self.patientData.districtId,
        psId: self.patientData.psId,
        sdwOf: self.patientData.hswd,
        occupationId: self.patientData.occupationId
      }

      axios.post(this.$url +'registerpatient', data, headers)
      .then(function (response) {
        Vue.$cookies.set('PID', response.data)
        alert('Patient reg. Id '+ Vue.$cookies.get('PID'))
      })
      .catch(function(error){
        console.log(error);
        alert('Could not register')
      });
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
      }
    },
    registerPatient: function (event) {
      let payload = {
        regBy: this.$store.state.currUser.name,
        demographics: this.patientData
      }

      // event.preventDefault()

      this.$store.commit('registerPatient', payload)
      this.$store.commit('updateCurrPatient', payload)
      
      
    }
  },
  data() {
    return {
      patientData: {
        name: "",
        occupation: "",
        gender: "m",
        age: "29",
        hswd: '',
        address: "4444 Market St.",
        address2: "Address 2",
        police: "Police Station",
        phone: "1-415-555-5555",
        location: "Hyderabad, IN",
        country: '',
        demographics: {
          name: "",
          occupation: "",
          gender: "m",
          age: "29",
          hswd: '',
          address: "4444 Market St.",
          address2: "Address 2",
          police: "Police Station",
          phone: "1-415-555-5555",
          location: "Hyderabad, IN",
          country: '',
        },
        patientHistory: {
          questions: {
            highBloodPressure: {
              title: 'High Blood Pressure',
              isActive: false,
            },
            heartAttack: {
              title: 'Heart Attack',
              isActive: false,
            },
            stroke: {
              title: 'Stroke',
              isActive: false,
            },
            diabetes: {
              title: 'Diabetes',
              isActive: false,
            },
            asthma: {
              title: 'Asthma',
              isActive: false,
            },
            tb: {
              title: 'Tuberculosis',
              isActive: false,
            },
            cancer: {
              title: 'Cancer',
              isActive: false,
            },
            other: {
              title: 'Other',
              isActive: false,
            },
            tobacco: {
              title: 'Tobacco',
              placeholder: 'Sticks/packs per day',
              isActive: false,
              value: 0,
            },
            alcohol: {
              title: 'Alcohol',
              placeholder: 'Cups/bottles per day',
              isActive: false,
              value: 0,
            },
          },
          generalDescription: ''
        },
        familyHistory: {
          questions: {
            highBloodPressure: {
              title: 'High Blood Pressure',
              isActive: false,
              relationship: ''
            },
            heartAttack: {
              title: 'Heart Attack',
              isActive: false,
              relationship: ''
            },
            stroke: {
              title: 'Stroke',
              isActive: false,
              relationship: ''
            },
            diabetes: {
              title: 'Diabetes',
              isActive: false,
              relationship: ''
            },
            asthma: {
              title: 'Asthma',
              isActive: false,
              relationship: ''
            },
            tb: {
              title: 'Tuberculosis',
              isActive: false,
              relationship: ''
            },
            cancer: {
              title: 'Cancer',
              isActive: false,
              relationship: ''
            },
            other: {
              title: 'Other',
              isActive: false,
              relationship: ''
            },
            tobacco: {
              title: 'Tobacco',
              placeholder: 'Sticks/packs per day',
              isActive: false,
              relationship: ''
            },
            alcohol: {
              title: 'Alcohol',
              placeholder: 'Cups/bottles per day',
              isActive: false,
              relationship: ''
            },
          },
          generalDescription: ''
        }
      },
      tabs: [
        {
          name: 'demographics',
          title: 'Patient Demographics',
          isActive: true,
          isEnabled: true
        },
        {
          name: 'medicalHistory',
          title: 'Patient Medical History',
          isActive: false,
          isEnabled: false
        },
        {
          name: 'familyHistory',
          title: 'Family Medical History',
          isActive: false,
          isEnabled: false
        },
      ]
    }
  }
}
</script>


<style>
.fake-link:hover {
  cursor: pointer;
}
</style>