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
            Episode 1
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
              <button  @click="getTab(tab.name)" class="btn px-3 small" :class="tab.isActive ? 'btn-dark' : 'btn-light'" role="button">
                {{ tab.title }}
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12 rounded">
          <ul class="list-inline mb-2">
            <li class="list-inline-item text-center pointer" v-for="(tab, index) in subTabs" :key="index">
              <div class="px-2 mr-2 pb-1 mb-1" @click="getSubTab(tab.name)" role="button" :class="{ underline: tab.isActive }">
                {{ tab.title }}
              </div>
            </li>
          </ul>
          <div class="w-100 bg-white mb-3 mt-0 px-3 pt-3 pb-3" style="min-height: 200px;" v-if="subTabs[0].isActive">
            <div class="row mt-1">
              <div class="col-md-6 mb-3">
                <div class="small text-muted mb-2">
                  Complaint 1
                </div>
                Coughing Problem <br><br>
                Lasting 2 days <br>
                Only at night <br>
                Sputum No <br>
                Yellow Color <br>
                Amount a lot <br>
                Fever Yes <br>
                No difficulty in swallowing <br>
                No Pain in throat <br>
                <!-- <input type="text" class="w-100 p-2 mb-3" placeholder="Complaint 1"> -->
              </div>
              <div class="col-md-6 mb-3">
                <div class="small text-muted mb-2">
                  Complaint 2
                </div>
                Fever <br><br>
                Lasting 3 days <br>
                Felt on alternate <br>
                Present all day <br>
                Low grade <br>
                Yes shivers <br>
                Associated with None <br>
                Haemoptysis No <br>
                Associated with Gguggu <br>
                Weakness No <br>
                Weightloss No <br>
                Dysuria No <br>
                Brought on by Ugugu <br>
                Relieved by Ugiig <br>
                <!-- <input type="text" class="w-100 p-2 mb-3" placeholder="Complaint 1"> -->
              </div>
            </div>
          </div>
          <div class="w-100 bg-white mb-3 mt-0 px-3 pt-3 pb-3" style="min-height: 200px;" v-if="subTabs[1].isActive">
            <div class="row mt-1">
              <div class="col-md-6 mb-4">
                <div class="small text-muted mb-1">
                  Patient Appearance
                </div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, cupiditate.
                <!-- <input type="text" class="w-100 p-2 mb-3" placeholder="Patient Appearance"> -->
              </div>
              <div class="col-md-6 mb-4">
                <div class="small text-muted mb-1">
                  Patient Gait
                </div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, cupiditate.
                <!-- <input type="text" class="w-100 p-2 mb-3" placeholder="Patient Gait"> -->
              </div>
              <div class="col-md-6 mb-4">
                <div class="small text-muted mb-1">
                  Pulse
                </div>
                72 BPM
                <!-- <input type="text" class="w-100 p-2 mb-3" placeholder="BP (___/___ mmHg)"> -->
              </div>
              <div class="col-md-6 mb-4">
                <div class="small text-muted mb-1">
                  BP
                </div>
                120/80 mmHg
                <!-- <input type="text" class="w-100 p-2 mb-3" placeholder="BP (___/___ mmHg)"> -->
              </div>
              <div class="col-md-6 mb-4">
                <div class="small text-muted mb-1">
                  SP02
                </div>
                89%
                <!-- <input type="text" class="w-100 p-2 mb-3" placeholder="SP02 (%)"> -->
              </div>
              <div class="col-md-6 mb-4">
                <div class="small text-muted mb-1">
                  Temperature
                </div>
                98^
                <!-- <input type="text" class="w-100 p-2 mb-3" placeholder="Temperature (‘’ F)"> -->
              </div>
              <div class="col-md-6 mb-4">
                <div class="small text-muted mb-1">
                  Height
                </div>
                180 cm
                <!-- <input type="text" class="w-100 p-2 mb-3" placeholder="Height (cm)"> -->
              </div>
              <div class="col-md-6 mb-4">
                <div class="small text-muted mb-1">
                  Weight
                </div>
                65 kg
                <!-- <input type="text" class="w-100 p-2 mb-3" placeholder="Weight (kg)"> -->
              </div>
              <div class="col-md-6 mb-3">
                <div class="small text-muted mb-1">
                  BMI
                </div>
                20.06 kg/m2
                <!-- <input type="text" class="w-100 p-2 mb-3" placeholder="BMI (kg/m2) (Auto Calculated)"> -->
              </div>
            </div>
          </div>
          <div class="w-100 bg-white mb-3 mt-0 px-3 pt-3 pb-3" style="min-height: 200px;" v-if="subTabs[2].isActive">
            <div class="row mt-1">
              <div class="col-md-12 mb-5 text-center">
                <img src="/anatomy_sketch.png" alt="">
              </div>
              <div class="col-md-6 mb-3">
                <div class="small text-muted">
                  Eyes
                </div>
                Jaundice – Yes <br>
                Pallor – Mild
                <!-- <input type="text" class="w-100 p-2 mb-3" placeholder="Patient Appearance"> -->
              </div>
              <div class="col-md-6 mb-3">
                <div class="small text-muted">
                  Hands
                </div>
                Nails – Normal <br>
                Cyanosis – Yes
                <!-- <input type="text" class="w-100 p-2 mb-3" placeholder="Patient Gait"> -->
              </div>
              <div class="col-md-6 mb-3">
                <div class="small text-muted">
                  Lower Leg and Ankle
                </div>
                Oedema – Mild
                <!-- <input type="text" class="w-100 p-2 mb-3" placeholder="BP (___/___ mmHg)"> -->
              </div>
            </div>
          </div>
          <div class="w-100 bg-white mb-3 mt-0 px-3 pt-3 pb-3" style="min-height: 200px;" v-if="subTabs[3].isActive">
            <div class="row mt-1">
              <div class="col-md-12 mb-5 text-center">
                <img src="/anatomy_sketch.png" alt="">
              </div>
              <div class="col-md-6 mb-3">
                <div class="small text-muted">
                  Patient Appearance
                </div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, cupiditate.
                <!-- <input type="text" class="w-100 p-2 mb-3" placeholder="Patient Appearance"> -->
              </div>
              <div class="col-md-6 mb-3">
                <div class="small text-muted">
                  Patient Gait
                </div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, cupiditate.
                <!-- <input type="text" class="w-100 p-2 mb-3" placeholder="Patient Gait"> -->
              </div>
              <div class="col-md-6 mb-3">
                <div class="small text-muted">
                  BP
                </div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, cupiditate.
                <!-- <input type="text" class="w-100 p-2 mb-3" placeholder="BP (___/___ mmHg)"> -->
              </div>
              <div class="col-md-6 mb-3">
                <div class="small text-muted">
                  SP02
                </div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, cupiditate.
                <!-- <input type="text" class="w-100 p-2 mb-3" placeholder="SP02 (%)"> -->
              </div>
              <div class="col-md-6 mb-3">
                <div class="small text-muted">
                  Temperature
                </div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, cupiditate.
                <!-- <input type="text" class="w-100 p-2 mb-3" placeholder="Temperature (‘’ F)"> -->
              </div>
              <div class="col-md-6 mb-3">
                <div class="small text-muted">
                  Height
                </div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, cupiditate.
                <!-- <input type="text" class="w-100 p-2 mb-3" placeholder="Height (cm)"> -->
              </div>
              <div class="col-md-6 mb-3">
                <div class="small text-muted">
                  Weight
                </div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, cupiditate.
                <!-- <input type="text" class="w-100 p-2 mb-3" placeholder="Weight (kg)"> -->
              </div>
              <div class="col-md-6 mb-3">
                <div class="small text-muted">
                  BMI
                </div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, cupiditate.
                <!-- <input type="text" class="w-100 p-2 mb-3" placeholder="BMI (kg/m2) (Auto Calculated)"> -->
              </div>
            </div>
          </div>
          <div class="w-100 bg-white mb-3 mt-0 px-3 pt-3 pb-3" style="min-height: 200px;" v-if="subTabs[4].isActive">
            <div class="row mt-1">
              <div class="col-md-12 mb-5 text-center">
                Additional Photos
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
          name: 'episode1',
          title: 'Episode 1',
          isActive: true
        },
        {
          name: 'followup1',
          title: 'Follow Up 1',
          isActive: false
        },
        {
          name: 'followup2',
          title: 'Follow Up 2',
          isActive: false
        },
        {
          name: 'billing',
          title: 'Billing',
          isActive: false
        },
        {
          name: 'newfollowup',
          title: '+ New Follow Up',
          isActive: false
        },
        {
          name: 'newservice',
          title: '+ New Service',
          isActive: false
        },
      ],
      subTabs: [
        {
          name: 'allocated',
          title: 'Chief Complaints',
          isActive: true,
        },
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

.underline {
  border-bottom: 2px solid #AAA;
}
</style>
