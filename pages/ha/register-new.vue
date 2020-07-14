<template>
  <div>
    <form v-on:submit.prevent="registerPatient">
    <div class="container">
      <div class="row mt-2">
        <div class="col-md-12 rounded">
          <div class="w-100 bg-white mb-3 mt-0 px-3 pt-4 pb-3">
            <div class="container">
              <div class="row">
                <div class="col-md-12 text-center">
                  <img src="/avatar-placeholder.jpg" class="m-3" style="width: 200px;" alt=""><br>
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
                  <select class="custom-select mb-3">
                    <option selected disabled>Gender</option>
                    <option value="1">Male</option>
                    <option value="2">Female</option>
                    <option value="3">Other</option>
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
                  <select class="custom-select mb-3">
                    <option selected disabled>Occupation</option>
                    <option value="1">Industrial Farmer</option>
                    <option value="2">Teacher</option>
                    <option value="2">Student</option>
                    <option value="3">Other</option>
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
                  <input type="text" class="w-100 p-2 mb-3" placeholder="District">
                  <label for="">Police Station</label>
                  <input type="text" class="w-100 p-2 mb-3" v-model="patientData.police" placeholder="Police Station">
                </div>
                <div class="col-md-6">

                  <label for="">Address 2</label>
                  <input type="text" class="w-100 p-2 mb-3" v-model="patientData.address2" placeholder="Address 2">
                  
                  <label for="">State</label>
                  <select class="custom-select mb-4">
                    <option selected disabled>State</option>
                    <option value="1">Maharashtra</option>
                    <option value="2">Kerala</option>
                    <option value="2">Tamila Nadu</option>
                    <option value="3">Other</option>
                  </select>
                  <label for="">Country</label>
                  <input type="text" class="w-100 p-2 mb-3" v-model="patientData.country" placeholder="India">
                  
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
    registerPatient: function (event) {
      let payload = {
        regBy: this.$store.state.currUser.name,
        demographics: this.patientData
      }

      // event.preventDefault()

      this.$store.commit('registerPatient', payload)
      this.$store.commit('updateCurrPatient', payload)

      alert('A new patient has been registered.')
      
      
    }
  },
  data() {
    return {
      patientData: {
        name: "",
        occupation: 'Truck Driver',
        gender: "m",
        age: "29",
        hswd: '',
        address: "4444 Market St.",
        address2: "Address 2",
        police: "Police Station",
        phone: "1-415-555-5555",
        location: "Hyderabad, IN",
        country: ''
      }
    }
  }
}
</script>
