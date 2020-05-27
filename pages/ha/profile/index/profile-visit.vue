<template>
  <div>
    <div class="container mt-0">
      <div class="row">
        <div class="col-md-6">
          <nuxt-link to="/ha/profile/new-episode">
            <button class="w-100 btn btn-dark rounded font-weight-bold py-3 mb-2  text-uppercase">Record New Follow Up</button>     
          </nuxt-link>
        </div>
        <div class="col-md-6">
          <nuxt-link to="/ha/profile/new-service">
            <button class="w-100 btn btn-dark rounded font-weight-bold py-3 mb-0  text-uppercase">Record New Service</button>     
          </nuxt-link>
        </div>
        <div class="col-md-12">
          <hr class="mt-2">
        </div>
      </div>
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
              <div class="col-md-12 mb-5 text-center" style="min-height: 300px;">
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
                <img src="/anatomy_sketch.png" style="min-height: 300px;">
              </div>
              <div class="col-md-6 mb-3">
                <div class="small text-muted">
                  Patient Appearance
                </div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, cupiditate.
              </div>
              <div class="col-md-6 mb-3">
                <div class="small text-muted">
                  Patient Gait
                </div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, cupiditate.
              </div>
              <div class="col-md-6 mb-3">
                <div class="small text-muted">
                  BP
                </div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, cupiditate.
              </div>
              <div class="col-md-6 mb-3">
                <div class="small text-muted">
                  SP02
                </div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, cupiditate.
              </div>
              <div class="col-md-6 mb-3">
                <div class="small text-muted">
                  Temperature
                </div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, cupiditate.
              </div>
              <div class="col-md-6 mb-3">
                <div class="small text-muted">
                  Height
                </div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, cupiditate.
              </div>
              <div class="col-md-6 mb-3">
                <div class="small text-muted">
                  Weight
                </div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, cupiditate.
              </div>
              <div class="col-md-6 mb-3">
                <div class="small text-muted">
                  BMI
                </div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, cupiditate.
                
              </div>
            </div>
          </div>
          <!-- <div class="w-100 bg-white mb-3 mt-0 px-3 pt-3 pb-3" style="min-height: 200px;" v-if="subTabs[4].isActive">
            <div class="row mt-1">
              <div class="col-md-6 mb-3">
                <div class="small text-muted">
                  Bill Number
                </div>
                00012345
              </div>
              <div class="col-md-6 mb-3">
                <div class="small text-muted">
                  Health Assistant
                </div>
                Lorem Ipsum
              </div>
              <div class="col-md-6 mb-3">
                <div class="small text-muted">
                  Bill Date
                </div>
                Lorem Ipsum
              </div>
              <div class="col-md-6 mb-3">
                <div class="small text-muted">
                  Administrating Doctor
                </div>
                Lorem Ipsum
              </div>
            </div>
            <div class="row pt-4">
              <div class="col-md-12">
                <div class="w-100 bg-white mb-3 mt-0 pt-3 pb-3">
                  <table class="table table-sm table-hover">
                    <thead>
                      <tr>
                        <th scope="col">Medicine</th>
                        <th scope="col">Batch</th>
                        <th scope="col">MSRP</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Disc. Rate</th>
                        <th scope="col">Net</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr class="pointer" style="height: 40px;">
                        <td>xxx</td>
                        <td>xxx</td>
                        <td>xxx</td>
                        <td>3</td>
                        <td>1</td>
                        <td>Lorem ipsum</td>
                      </tr>
                      <tr class="pointer" style="height: 40px;">
                        <td>xxx</td>
                        <td>xxx</td>
                        <td>xxx</td>
                        <td>3</td>
                        <td>1</td>
                        <td>Lorem ipsum</td>
                      </tr>
                      <tr class="pointer" style="height: 40px;">
                        <td>xxx</td>
                        <td>xxx</td>
                        <td>xxx</td>
                        <td>3</td>
                        <td>1</td>
                        <td>Lorem ipsum</td>
                      </tr>
                      <tr class="pointer" style="height: 40px;">
                        <td>xxx</td>
                        <td>xxx</td>
                        <td>xxx</td>
                        <td>3</td>
                        <td>1</td>
                        <td>Lorem ipsum</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div class="row mt-1">
              <div class="col-md-12 mb-3">
                <div class="small text-muted pb-3">
                  General Notes
                </div>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Earum illum quis nemo commodi accusantium veritatis modi molestias cupiditate doloribus nostrum.s
              </div>
            </div>
          </div> -->
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
        <div class="row mb-5">
          <div class="col-md-12">
            <div class="small text-muted mb-3">
              Prescribed Medicines
            </div>
          </div>
          <div class="col-md-12">
            <div class="w-100 bg-white mb-3 mt-0 pt-3 pb-3">
              <table class="table table-sm table-hover">
                <thead>
                  <tr>
                    <th scope="col">Medicine</th>
                    <th scope="col">Batch</th>
                    <th scope="col">MSRP</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Disc. Rate</th>
                    <th scope="col">Net</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="pointer" style="height: 40px;">
                    <td>xxx</td>
                    <td>xxx</td>
                    <td>xxx</td>
                    <td>3</td>
                    <td>1</td>
                    <td>Lorem ipsum</td>
                  </tr>
                  <tr class="pointer" style="height: 40px;">
                    <td>xxx</td>
                    <td>xxx</td>
                    <td>xxx</td>
                    <td>3</td>
                    <td>1</td>
                    <td>Lorem ipsum</td>
                  </tr><tr class="pointer" style="height: 40px;">
                    <td>xxx</td>
                    <td>xxx</td>
                    <td>xxx</td>
                    <td>3</td>
                    <td>1</td>
                    <td>Lorem ipsum</td>
                  </tr><tr class="pointer" style="height: 40px;">
                    <td>xxx</td>
                    <td>xxx</td>
                    <td>xxx</td>
                    <td>3</td>
                    <td>1</td>
                    <td>Lorem ipsum</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- <textarea class="w-100 p-2 mb-3" rows="6" name=""> -->
Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil vero qui consectetur, eligendi facilis soluta maiores quae sequi eaque. Quia suscipit quaerat deleniti iure aliquid, voluptas repellat delectus ad labore officia nulla voluptatem ratione omnis provident cumque ab quae. Ullam natus sunt atque. Sint ullam autem commodi, corrupti inventore quod!
            <!-- </textarea> -->
            <br><br>
            :: Download This Bill
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
  </div>
</template>

<script>
export default {
  layout: 'dashboard',
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
          name: 'service1',
          title: 'Perform ECG',
          isActive: false
        },
        {
          name: 'billing',
          title: 'All Billed',
          isActive: false
        },
        // {
        //   name: 'newfollowup',
        //   title: '+ New Follow Up',
        //   isActive: false
        // },
        // {
        //   name: 'newservice',
        //   title: '+ New Service',
        //   isActive: false
        // },
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
        // {
        //   name: 'bill',
        //   title: 'Billed',
        //   isActive: false,
        // },
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
