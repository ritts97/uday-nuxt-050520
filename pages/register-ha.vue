<template>
  <div>
    <div class="w-100 bg-dark text-white mb-3">
      <div class="container bg-dark">
        <div class="row py-2">
          <div class="col-md-6 font-weight-bold pt-2" style="font-size: 24px;">
            <nuxt-link to="/" class="text-white">UD.</nuxt-link>
          </div>
          <div class="col-md-6 py-3 text-right">
            jane.doe@udayhealth.org | Logout
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-md-12 text-center">
          Register a New Health Assistant
          <hr>
        </div>
      </div>
    </div>
    <div class="container mt-2">
      <div class="row">
        <div class="col-md-12 rounded">
          <div class="w-100 bg-white mb-3 px-3 py-3">
            <div class="container">
              <div class="row">
                <div class="col-md-12 text-center" style="min-height: 200px;">
                  <img src="/avatar.png" class="m-3" style="width: 200px;" alt=""><br>
                  <button>Action :: Upload a Patient Photo</button>
                </div>
              </div>
              <div class="row mt-3">
                <div class="col-md-12 mb-3">
                  Account Information
                </div>
                <div class="col-md-6">
                  <input type="text" class="w-100 p-2 mb-3" placeholder="Username">
                </div>
                <div class="col-md-6">
                  <input type="text" class="w-100 p-2 mb-3" placeholder="Password">
                </div>
                <div class="col-md-6">
                  <input type="text" class="w-100 p-2 mb-3" placeholder="Email">
                </div>
                <div class="col-md-6">
                  <input type="text" class="w-100 p-2 mb-3" placeholder="Confirm Password">
                </div>
              </div>
              <div class="row mt-3">
                <div class="col-md-12 mb-3">
                  General Information
                </div>
                <div class="col-md-6">
                  <input type="text" class="w-100 p-2 mb-3" placeholder="First Name">
                </div>
                <div class="col-md-6">
                  <input type="text" class="w-100 p-2 mb-3" placeholder="Designation">
                </div>
                <div class="col-md-6">
                  <input type="text" class="w-100 p-2 mb-3" placeholder="DOB">
                </div>
                <div class="col-md-6">
                  <input type="text" class="w-100 p-2 mb-3" placeholder="Supervisor">
                </div>
                <div class="col-md-6">
                  <input type="text" class="w-100 p-2 mb-3" placeholder="Last Name">
                </div>
                <div class="col-md-6">
                  <input type="text" class="w-100 p-2 mb-3" placeholder="Gender">
                </div>
                <div class="col-md-6">
                  <input type="text" class="w-100 p-2 mb-3" placeholder="Phone Number">
                </div>
                <div class="col-md-6">
                  <input type="text" class="w-100 p-2 mb-3" placeholder="Supervisor">
                </div>
              </div>
              <div class="row mt-3">
                <div class="col-md-12 mb-3">
                  Location Information
                </div>
                <div class="col-md-6">
                  <input type="text" class="w-100 p-2 mb-3" placeholder="City or Village">
                  <input type="text" class="w-100 p-2 mb-3" placeholder="State">
                  <input type="text" class="w-100 p-2 mb-3" placeholder="PS ID">
                </div>
                <div class="col-md-6">
                  <input type="text" class="w-100 p-2 mb-3" placeholder="District">
                  <input type="text" class="w-100 p-2 mb-3" placeholder="Country">
                  <input type="text" class="w-100 p-2 mb-3" placeholder="Govt. ID">
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
          <button class="w-100 btn btn-dark rounded font-weight-bold py-3 mb-1  text-uppercase">Register Health Assistant</button>
        </div>
      </div>
    </div>
    <div class="container text-center">
      <div class="row">
        <div class="col-md-12 text-secondary">
          <small>
            UdayHealth.org is a virtual, telemedicine application <br> organized by medical professionals and volunteers worldwide.
          </small>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
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
