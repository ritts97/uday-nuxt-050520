<template>
  <div>
    <div class="container mt-0">
      <div class="row">
        <div class="col-md-6">
          <nuxt-link to="/md/profile/profile-visit">
            <button @click="editable = true" :disabled="editable" class="w-100 btn btn-dark rounded font-weight-bold py-3 mb-2  text-uppercase">Record Feedback</button>     
          </nuxt-link>
        </div>
        <div class="col-md-6">
          <nuxt-link to="/md/">
            <button @click="showAlert('Your feedback has been recorded, and the patient has been released.')" :disabled="!editable" class="w-100 btn btn-dark rounded font-weight-bold py-3 mb-2  text-uppercase">Release Patient</button>     
          </nuxt-link>
        </div>
      </div>

      <div class="row">
        <div class="col-md-12">
          <hr>
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
              <div class="col-md-12 mb-3">
                <div class="small text-muted mb-2">
                  Chief Complaint
                </div>
                Coughing Problem <br><br>
                <!-- <div class="small text-muted mb-2">
                  Notes
                </div> -->
                <span class="rounded mr-2 p-2 text-white" style="background-color: #a9a9a9;">
                  Lasting 2 days 
                </span>
                <span class="rounded mr-2 p-2 text-white" style="background-color: #a9a9a9;">
                  Only at night 
                </span>
                <span class="rounded mr-2 p-2 text-white" style="background-color: #a9a9a9;">
                  Sputum No 
                </span>
                <span class="rounded mr-2 p-2 text-white" style="background-color: #a9a9a9;">
                  Yellow Color 
                </span>
                <span class="rounded mr-2 p-2 text-white" style="background-color: #a9a9a9;">
                  Amount a lot 
                </span>
                <span class="rounded mr-2 p-2 text-white" style="background-color: #a9a9a9;">
                  Fever Yes 
                </span>
                <span class="rounded mr-2 p-2 text-white" style="background-color: #a9a9a9;">
                  No difficulty in swallowing 
                </span>
                <span class="rounded mr-2 p-2 text-white" style="background-color: #a9a9a9;">
                  No Pain in throat
                </span>
                <br><br>
                <div class="small text-muted mb-2">
                  Description
                </div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat earum sequi laudantium est consequuntur non natus suscipit quibusdam, hic dolore, quam, quidem nostrum. Incidunt alias eos repellendus quaerat tempore doloremque unde sit, earum maiores facilis beatae vero ex hic eaque necessitatibus nulla consectetur dolorum? Voluptas magnam alias at sed unde!
              </div>
            </div>
            <div class="row mt-1">
              <div class="col-md-12 text-left">
                <span>
                  <small>First Recorded by Jane Doe on January 1, 2022</small>
                </span>
                <span class="float-right">
                  <small>
                    Last Updated by Jane Doe on January 20, 2022
                  </small>
                </span>
              </div>
            </div>
          </div>
          <div class="w-100 bg-white mb-3 mt-0 px-3 pt-3 pb-3" style="min-height: 200px;" v-if="subTabs[1].isActive">
            <div class="row mt-1">
              <div class="col-md-12 mb-4">
                <div class="small text-muted mb-1">
                  Patient Appearance
                </div>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quas fuga modi necessitatibus, similique explicabo quae aliquid nostrum velit dolorem veniam fugit temporibus hic ut quia et obcaecati consequatur libero possimus animi exercitationem omnis ducimus culpa nisi enim. Optio, similique. Veniam, tempore et architecto voluptates nisi odit expedita illo ipsam incidunt!
              </div>
              <div class="col-md-12 mb-4">
                <div class="small text-muted mb-1">
                  Patient Gait
                </div>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellat voluptatum porro quos error minus iste nesciunt nobis quam vero animi unde deserunt totam modi odio itaque atque perspiciatis voluptatibus ea optio, adipisci nisi iusto id corrupti. Doloribus repudiandae eaque sed hic, perferendis, iure, expedita est pariatur corrupti vitae architecto maxime!
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
            <div class="row mt-1">
              <div class="col-md-6 text-left">
                <small>First Recorded: January 1, 2022</small>
              </div>
              <div class="col-md-6 text-right">
                <small>Last Updated: January 20, 2022</small>
              </div>
            </div>
          </div>
          <!-- <transition name="u-fade" mode="out-in"> -->
          <div class="w-100 bg-white mb-3 mt-0 px-3 pt-3 pb-3" style="min-height: 200px;" v-if="subTabs[2].isActive">
            <div class="row mt-1">
              <!-- <div class="col-md-12 mb-5 text-center" style="min-height: 300px;">
                <img src="/anatomy_sketch.png" alt="">
              </div> -->
              <div class="col-md-6 pb-3 mb-3">
                <div class="small text-muted mb-3">
                  Eyes
                </div>
                <span class="rounded mr-2 p-2 text-white" style="background-color: #a9a9a9;">
                  Jaundice Yes 
                </span>
                <span class="rounded mr-2 p-2 text-white" style="background-color: #a9a9a9;">
                  Pallor Mild
                </span>
                <!-- <input type="text" class="w-100 p-2 mb-3" placeholder="Patient Appearance"> -->
              </div>
              <div class="col-md-6 pb-3 mb-3">
                <div class="small text-muted mb-3">
                  Hands
                </div>
                <span class="rounded mr-2 p-2 text-white" style="background-color: #a9a9a9;">
                  Nails Normal
                </span>
                <span class="rounded mr-2 p-2 text-white" style="background-color: #a9a9a9;">
                  Cyanosis Yes
                </span>
                <!-- <input type="text" class="w-100 p-2 mb-3" placeholder="Patient Gait"> -->
              </div>
              <div class="col-md-6 pb-3 mb-3">
                <div class="small text-muted mb-3">
                  Lower Leg and Ankle
                </div>
                <span class="rounded mr-2 p-2 text-white" style="background-color: #a9a9a9;">
                Oedema Mild
                </span>
                <!-- <input type="text" class="w-100 p-2 mb-3" placeholder="BP (___/___ mmHg)"> -->
              </div>
            </div>
            <div class="row mt-1">
              <div class="col-md-6 text-left">
                <small>First Recorded: January 1, 2022</small>
              </div>
              <div class="col-md-6 text-right">
                <small>Last Updated: January 20, 2022</small>
              </div>
            </div>
          </div>
          <!-- </transition> -->
          <!-- <transition name="u-fade" mode="out-in"> -->
            <div class="w-100 bg-white mb-3 mt-0 px-3 pt-3 pb-3" style="min-height: 200px;" v-if="subTabs[3].isActive">
              <div class="row mt-1">
                <div class="col-md-12 mb-4">
                  <!-- <hr class="pb-3"> -->
                  <div class="small text-muted mb-1">
                    Patient Appearance
                  </div>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quas fuga modi necessitatibus, similique explicabo quae aliquid nostrum velit dolorem veniam fugit temporibus hic ut quia et obcaecati consequatur libero possimus animi exercitationem omnis ducimus culpa nisi enim. Optio, similique. Veniam, tempore et architecto voluptates nisi odit expedita illo ipsam incidunt!
                </div>
                <div class="col-md-12 mb-4">
                  <div class="small text-muted mb-1">
                    Patient Gait
                  </div>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellat voluptatum porro quos error minus iste nesciunt nobis quam vero animi unde deserunt totam modi odio itaque atque perspiciatis voluptatibus ea optio, adipisci nisi iusto id corrupti. Doloribus repudiandae eaque sed hic, perferendis, iure, expedita est pariatur corrupti vitae architecto maxime!
                </div>
              </div>
              <div class="row mt-1">
                <div class="col-md-6 text-left">
                  <small>First Recorded: January 1, 2022</small>
                </div>
                <div class="col-md-6 text-right">
                  <small>Last Updated: January 20, 2022</small>
                </div>
              </div>
            </div>
          <!-- </transition> -->
          <div class="w-100 bg-white mb-3 mt-0 px-3 pt-3 pb-3" style="min-height: 200px;" v-if="subTabs[4].isActive">
            <div class="row mt-1">
              <div class="col-md-12 mb-3 text-center">
                Additional Photos
              </div>
              <div class="col-md-3 mb-4">
                <img src="/square-grey.jpg" class="w-100" alt="">
              </div>
              <div class="col-md-3 mb-4">
                <img src="/square-grey.jpg" class="w-100" alt="">
              </div>
              <div class="col-md-3 mb-4">
                <img src="/square-grey.jpg" class="w-100" alt="">
              </div>
              <div class="col-md-3 mb-4">
                <img src="/square-grey.jpg" class="w-100" alt="">
              </div>
              <div class="col-md-3 mb-4">
                <img src="/square-grey.jpg" class="w-100" alt="">
              </div>
              <div class="col-md-3 mb-4">
                <img src="/square-grey.jpg" class="w-100" alt="">
              </div>
              <!-- <div class="col-md-3 mb-4">
                <img src="/square-grey.jpg" class="w-100" alt="">
              </div> -->
              <div class="col-md-3 mb-4">
                <img src="/square-grey-add.jpg" class="w-100" alt="">
              </div>
              <!-- <div class="col-md-3 mb-4">
                <img src="/square-grey.jpg" alt="">
              </div>
              <div class="col-md-3 mb-4">
                <img src="/square-grey.jpg" alt="">
              </div> -->
            </div>
            <div class="row mt-1">
              <div class="col-md-12 text-left">
                <span>
                  <small>First Recorded on January 1, 2022</small>
                </span>
                <span class="float-right">
                  <small>
                    Last Updated by Jane Doe on January 20, 2022
                  </small>
                </span>
              </div>
            </div>
          </div>
          <div v-if="editable" class="container px-0">
            <div class="row">
              <div class="col-md-6">
                <nuxt-link to="/ha/profile/new-episode">
                  <button class="w-100 btn btn-dark rounded font-weight-bold py-3 px-0 mb-2 text-uppercase">Edit Complaint</button>     
                </nuxt-link>
              </div>
              <div class="col-md-6">
                <nuxt-link to="/ha/profile/new-episode">
                  <button disabled class="w-100 btn btn-dark rounded font-weight-bold py-3 px-0 mb-2 text-uppercase">Save Changes</button>     
                </nuxt-link>
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
            <h5 class="d-inline">Doctor's Feedback</h5> 
            <!-- [ <div class="d-inline pointer text-muted" @click="showDocsFeedback = !showDocsFeedback">
              <span v-if="!showDocsFeedback">show</span>
              <span v-else>hide</span>
            </div> ] -->
          </div>
        </div>
      </div>
    </div>

    <div v-if="!editable" class="w-100 bg-white py-4 mb-4">
      <div class="row">
        <div class="col-md-12">
          <div class="small text-center">
            This patient visit does not yet have feedback.
          </div>
        </div>
      </div>
    </div>

    <div v-else class="w-100 bg-white pt-3 pb-3 mb-3" style="min-height: 30px;">
      <div class="container">
        
        <!-- <div class="row">
          <div class="col-md-12 mb-5">
            <div class="small text-muted mb-3">
              Investigations
            </div>
Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil vero qui consectetur, eligendi facilis soluta maiores quae sequi eaque. Quia suscipit quaerat deleniti iure aliquid, voluptas repellat delectus ad labore officia nulla voluptatem ratione omnis provident cumque ab quae. Ullam natus sunt atque. Sint ullam autem commodi, corrupti inventore quod!
          </div>
        </div> -->
        <div v-if="this.visitStatus !== 'allocated'" class="row my-4">
          <div class="col-md-12">
            <div class="small text-center">
              This patient visit does not yet have feedback.
            </div>
          </div>
        </div>
        <div v-if="this.visitStatus === 'allocated'" class="row mb-4">
          <div class="col-md-12">
            <div class="small text-muted">
              Prescriptions
            </div>
          </div>
          <div class="col-md-12">
            <div class="w-100 bg-white mt-0 pt-3">
              <table class="table table-sm table-hover">
                <thead>
                  <tr>
                    <th scope="col">Medicine</th>
                    <th scope="col">Unit</th>
                    <th scope="col">Morning</th>
                    <!-- <th scope="col">Morning Ins</th> -->
                    <th scope="col">Afternoon</th>
                    <!-- <th scope="col">Afternoon Ins</th> -->
                    <th scope="col">Evening</th>
                    <!-- <th scope="col">Evening Ins</th> -->
                    <th scope="col">Dinner</th>
                    <th scope="col">Other</th>
                    <!-- <th scope="col">Other Ins</th> -->
                    <th scope="col">Duration</th>
                    <th scope="col">Time</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="pointer" style="height: 40px;">
                    <td class="py-3 px-3 text-center" colspan="9">
                      <small>
                        Medicine has not yet been prescribed.
                      </small>
                    </td>
                  </tr>
                  <!-- <tr class="pointer" style="height: 40px;">
                    <td>xxx</td>
                    <td>xxx</td>
                    <td>xxx</td>
                    <td>3</td>
                    <td>1</td>
                    <td>Lorem ipsum</td>
                  </tr> -->
                </tbody>
              </table>
            </div>
            <!-- <div class="text-right w-100">
              <button class="btn btn-dark text-center px-5">Edit Medicine</button>
              <button class="btn btn-dark text-center px-5">Save Medicine</button>
            </div> -->
          </div>
          <div class="col-md-6">
            <nuxt-link to="/ha/profile/new-episode">
              <button class="w-100 btn btn-dark rounded font-weight-bold py-3 px-0 mb-2 text-uppercase">Add New Medicine</button>     
            </nuxt-link>
          </div>
          <div class="col-md-6">
            <nuxt-link to="/ha/profile/new-episode">
              <button disabled class="w-100 btn btn-dark rounded font-weight-bold py-3 px-0 mb-2 text-uppercase">Delete Medicine</button>     
            </nuxt-link>
          </div>
        </div>
        <div v-if="this.visitStatus === 'allocated'" class="row">
          <div class="col-md-12 mb-2">
            <div class="small text-muted mb-3">
              Investigations
            </div>
            <textarea class="w-100 p-2 mb-3" rows="3" placeholder="Provide a description of your current investigations...">
           </textarea>
            <!-- <div class="text-right w-100">
              <button class="btn btn-dark text-center px-5">Edit Advice</button>
              <button class="btn btn-dark text-center px-5">Save Advice</button>
            </div> -->
          </div>
        </div>
        <div v-if="this.visitStatus === 'allocated'" class="row">
          <div class="col-md-12 mb-2">
            <div class="small text-muted mb-3">
              Advice
            </div>
            <textarea class="w-100 p-2 mb-3" rows="3"  placeholder="Provide a description of your current advice...">
            </textarea>
            <!-- <div class="text-right w-100">
              <button class="btn btn-dark text-center px-5">Edit Advice</button>
              <button class="btn btn-dark text-center px-5">Save Advice</button>
            </div> -->
          </div>
        </div>
        <div v-if="this.visitStatus === 'allocated'" class="row">
          <div class="col-md-12 mb-3">
            <div class="small text-muted mb-3">
              Diagnosis
            </div>
            <textarea class="w-100 p-2" rows="3"  placeholder="Provide a description of your current diagnosis...">
            </textarea>
            <!-- <div class="text-right w-100">
              <button class="btn btn-dark text-center px-5">Edit Feedback</button>
              <button class="btn btn-dark text-center px-5">Save Feedback</button>
            </div> -->
          </div>
        </div>
        <!-- <div class="row">
          <div class="col-md-12 mb-3 text-right">
            <div class="small">
              Last reviewed by Doctor Suresh at 7:00pm, 01/01/2021
            </div>
          </div>
        </div> -->
        <div class="row mt-1">
          <div class="col-md-12 text-right">
            <span>
              <!-- <small>Last Updated by Dr. Suresh on January 1, 2022</small> -->
            </span>
            <!-- <span class="float-right"> -->
              <!-- <small>
                Last Updated: January 20, 2022
              </small> -->
            <!-- </span> -->
          </div>
          <!-- <div class="col-md-6 text-right">
            <small>Last Updated: January 20, 2022</small>
          </div> -->
        </div>
      </div>
      <div v-if="editable" class="container">
        <div class="row">
          <div class="col-md-6">
            <nuxt-link to="/ha/profile/new-episode">
              <button class="w-100 btn btn-dark rounded font-weight-bold py-3 px-0 mb-2 text-uppercase">Edit Feedback</button>     
            </nuxt-link>
          </div>
          <div class="col-md-6">
            <nuxt-link to="/ha/profile/new-episode">
              <button disabled class="w-100 btn btn-dark rounded font-weight-bold py-3 px-0 mb-2 text-uppercase">Save Changes</button>     
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
    <!-- <div v-if="editable" class="container mb-3">
      <div class="row">
        <div class="col-md-12">
          <nuxt-link to="/ha/profile/new-episode">
            <button class="w-100 btn btn-dark rounded font-weight-bold py-3 px-0 mb-2 text-uppercase">Save All Feedback</button>     
          </nuxt-link>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
export default {
  layout: 'dashboard',
  methods: {
    showAlert: function (msg) {
      alert(msg)
    },
    handleAllocate: function () {
      if (this.visitStatus === 'queued') {
        alert('You have allocated this patient.')

        this.visitStatus = 'allocated'
      } else {
        alert('This patient has been released.')
      }
    },
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
      editable: false,
      visitStatus: 'allocated',
      showDocsFeedback: true,
      showDemographics: true,
      showComplete: false,
      tabs: [
        {
          name: 'episode1',
          title: 'Episode 1',
          isActive: true
        },
        // {
        //   name: 'followup1',
        //   title: 'Follow Up 1',
        //   isActive: false
        // },
        // {
        //   name: 'followup2',
        //   title: 'Follow Up 2',
        //   isActive: false
        // },
        // {
        //   name: 'service1',
        //   title: 'Perform ECG',
        //   isActive: false
        // },
        // {
        //   name: 'billing',
        //   title: 'Billing History',
        //   isActive: false
        // },
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
