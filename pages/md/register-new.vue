<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-md-12 text-center">
          Register a New Patient
          <hr>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-md-12 rounded">
          <div class="w-100 bg-white mb-3 mt-0 px-3 pt-3 pb-3" v-if="tabs[0].isActive">
            <!-- Demographics <br><br> -->
            <div class="container">
              <div class="row">
                <div class="col-md-12 text-center">
                  <img src="/avatar-placeholder.jpg" class="m-3" style="width: 200px;" alt=""><br>
                  <button class="btn btn-dark px-4">Upload Photo</button>
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
          <nuxt-link to="/md">
            <button @click="registerPatient()" class="w-100 btn btn-dark rounded font-weight-bold py-3 mb-1  text-uppercase">
              Register New Patient
            </button>
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'dashboard',
  mounted() {
    let path = [
      {
        title: 'Dashboard',
        url: '/ha'
      },
      {
        title: 'Register New Patient',
        url: '/ha/register-new'
      },
    ]

    this.$store.commit('updatePath', path)
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
    showAlert: function (msg) {
      alert(msg)
    },
    registerPatient: function () {
      this.showAlert('Successfully registered.')

      let payload = {
        name: 'Delores Abernathy (from App)',
        gender: 'M',
        age: 99,
        phone: '1-415-555-1234',
        location: 'Hyperbad, IN',
        creator: 'Dr. Akshit Gupta',
      }

      this.$store.commit('registerPatient', payload)
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
