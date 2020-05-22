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
            </nuxt-link> > 
            Perform ECG
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
    <div class="container mt-2">
      <div class="row">
        <div class="col-md-12 rounded">
          <ul class="list-inline">
            <li v-for="(tab, index) in tabs" :key="index" class="list-inline-item">
              <button class="btn px-3 small" :class="tab.isActive ? 'btn-dark' : 'btn-light'" role="button">
                {{ tab.title }}
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12 rounded">
          <ul class="list-inline mb-2">
            <li class="list-inline-item" v-for="(tab, index) in subTabs" :key="index">
              <button class="btn pl-0 pr-4 pb-2" @click="getSubTab(tab.name)" role="button">
                {{ tab.title }}
              </button>
            </li>
          </ul>
          <div class="w-100 bg-white mb-3 mt-0 px-3 pt-3 pb-3" style="min-height: 200px;" v-if="subTabs[0].isActive">
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
        </div>
      </div>
    </div>
    <div>
      <div class="container mt-3 mb-3">
        <div class="row">
          <div class="col-md-12">
            <h5 class="d-inline">Doctor's Feedback </h5> 
            [ <div class="d-inline pointer text-muted" @click="showDocsFeedback = !showDocsFeedback">
              <span v-if="!showDocsFeedback">show</span>
              <span v-else>hide</span>
            </div> ]
          </div>
        </div>
      </div>
    </div>
    <div class="w-100 bg-white pt-3 pb-3 mb-4" style="min-height: 30px;">
      <div class="container" v-if="showDocsFeedback">
        <div class="row">
          <div class="col-md-12 mb-5">
            <div class="small text-muted mb-3">
              Investigations
            </div>
            <!-- <textarea class="w-100 p-2 mb-3" rows="6" name=""> -->
Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil vero qui consectetur, eligendi facilis soluta maiores quae sequi eaque. Quia suscipit quaerat deleniti iure aliquid, voluptas repellat delectus ad labore officia nulla voluptatem ratione omnis provident cumque ab quae. Ullam natus sunt atque. Sint ullam autem commodi, corrupti inventore quod!
            <!-- </textarea> -->
          </div>
        </div>
        <div class="row">
          <div class="col-md-12 mb-5">
            <div class="small text-muted mb-3">
              Prescribed Medicines
            </div>
            <!-- <textarea class="w-100 p-2 mb-3" rows="6" name=""> -->
Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil vero qui consectetur, eligendi facilis soluta maiores quae sequi eaque. Quia suscipit quaerat deleniti iure aliquid, voluptas repellat delectus ad labore officia nulla voluptatem ratione omnis provident cumque ab quae. Ullam natus sunt atque. Sint ullam autem commodi, corrupti inventore quod!
            <!-- </textarea> -->
          </div>
        </div>
        <div class="row">
          <div class="col-md-12 mb-5">
            <div class="small text-muted mb-3">
              Advice
            </div>
            <!-- <textarea class="w-100 p-2 mb-3" rows="6" name=""> -->
Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil vero qui consectetur, eligendi facilis soluta maiores quae sequi eaque. Quia suscipit quaerat deleniti iure aliquid, voluptas repellat delectus ad labore officia nulla voluptatem ratione omnis provident cumque ab quae. Ullam natus sunt atque. Sint ullam autem commodi, corrupti inventore quod!
            <!-- </textarea> -->
          </div>
        </div>
        <div class="row">
          <div class="col-md-12 mb-3 text-right">
            <!-- <div class="small text-muted mb-3">
              <hr>
            </div> -->
            <div class="small">
              Last reviewed by Doctor Suresh at 7:00pm, 01/01/2021
            </div>
            <!-- <textarea class="w-100 p-2 mb-3" rows="6" name=""> -->
            <!-- </textarea> -->
          </div>
        </div>
      </div>
    </div>
    <div class="container text-center mb-4">
      <div class="row">
        <div class="col-md-12 text-secondary">
          <small>
            UdayHealth.org is a virtual, telemedicine application organized by medical professionals and volunteers worldwide.
            <!-- <br> 
            About | Privacy Policy | Contact -->
          </small>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    getSubTab: function (tabName) {
      let tabs = this.subTabs
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
      showDocsFeedback: false,
      showDemographics: true,
      showComplete: false,
      tabs: [
        {
          name: 'service1',
          title: 'Perform ECG',
          isActive: true
        },
      ],
      subTabs: [
        {
          name: 'allocated',
          title: 'Service Results',
          isActive: true,
        },
        // {
        //   name: 'cluster',
        //   title: 'Vitals',
        //   isActive: false,
        // },
        // {
        //   name: 'general',
        //   title: 'General Exams',
        //   isActive: false,
        // },
        // {
        //   name: 'specific',
        //   title: 'Specific Exams',
        //   isActive: false,
        // },
        // {
        //   name: 'photos',
        //   title: 'Add. Photos',
        //   isActive: false,
        // },
        {
          name: 'billing',
          title: 'Billing Details',
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
