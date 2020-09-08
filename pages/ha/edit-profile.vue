<template>
  <div>
    <div class="container mb-3">
      <div class="row px-3">
        <div class="col-md-12 text-center bg-white rounded py-5">
          <div class="position-relative mx-auto" style="width: 200px;">
            <div class="position-absolute">
              <img class="w-100 pb-2" src="/avatar-girl_04.png">
            </div>
            <div style="padding-bottom: 100%;"></div>
          </div>
          <br>
          <button class="btn btn-dark px-4 mb-3">Upload Photo</button>
        </div>
        <div class="col-md-12 bg-white rounded pb-3">
          <div class="container">
            <div class="row">
              <div class="col-md-12 text-muted small mb-0 ">
                Demographic Information
                <hr>
              </div>
              <div class="col-md-6">
                <label for="">Name</label>
                <input type="text" class="w-100 p-2 mb-3" placeholder="Full Name">
                <label for="">Gender</label>
                <select class="custom-select mb-3">
                  <option selected disabled>Gender</option>
                  <option value="1">Male</option>
                  <option value="2">Female</option>
                  <option value="3">Other</option>
                </select>
                <label for="">Phone Number</label>
                <input type="text" class="w-100 p-2 mb-3" placeholder="Phone Number">
              </div>
              <div class="col-md-6">
                <label for="">Age</label>
                <input type="text" class="w-100 p-2 mb-3"  placeholder="Age">

                <label for="">Occupation</label>
                <select class="custom-select mb-3">
                  <option selected disabled>Occupation</option>
                  <option value="1">Industrial Farmer</option>
                  <option value="2">Teacher</option>
                  <option value="2">Student</option>
                  <option value="3">Other</option>
                </select>
                <label for="">Husband/Wife/Son/Daughter of</label>
                <input type="text" class="w-100 p-2 mb-3" placeholder="Family Members's Name">
              </div>
            </div>
            <div class="row mt-3">
              <div class="col-md-12 text-muted small mb-0">
                Geographic Information
                <hr>
              </div>
              <div class="col-md-6">
                <label for="">Address</label>
                <input type="text" class="w-100 p-2 mb-3" placeholder="Address 1">
                <label for="">District</label>
                <input type="text" class="w-100 p-2 mb-3" placeholder="District">
                <label for="">Police Station</label>
                <input type="text" class="w-100 p-2 mb-3" placeholder="Police Station">
              </div>
              <div class="col-md-6">
                <label for="">Address 2</label>
                <input type="text" class="w-100 p-2 mb-3" placeholder="Address 2">
                <label for="">State</label>
                <select class="custom-select mb-4">
                  <option selected disabled>State</option>
                  <option value="1">Maharashtra</option>
                  <option value="2">Kerala</option>
                  <option value="2">Tamila Nadu</option>
                  <option value="3">Other</option>
                </select>
                <label for="">Country</label>
                <input type="text" class="w-100 p-2 mb-3" placeholder="India">
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
              Save Profile Information
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
        title: 'View/Edit Profile',
        url: '/ha/register-new'
      },
    ]

    this.$store.commit('updatePath', path)
  },
  data() {
    return {}
  },
}
</script>

<style>
</style>
