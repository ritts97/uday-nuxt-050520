<template>
  <div>
    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Select Allocation</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            Allocate to Doctor <br><br>
            <!-- {{ this.$store.state.clusters[0].mds }} -->

            <span v-for="(md, index) in this.$store.state.udayDb.clusters.cluster001.mds" :key="index">
              <input type="radio" class="mr-3" name="" id=""> {{ md.demographics.name }} – {{ md.status }} <br>
            </span><br> or <br><br>
            <input type="radio" class="mr-3" name="" id=""> Allocate to General Queue
          </div>
          <div class="modal-footer">
            <!-- <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button> -->
            <nuxt-link to="/ha/profile/visit" class="w-100">
            <!-- <button class="w-100 btn btn-dark rounded font-weight-bold py-3 mb-0  text-uppercase">Allocate New Episode To Doctor</button>      -->
              <button @click="addToQueue()" type="button" data-dismiss="modal" class="w-100 btn btn-dark rounded font-weight-bold py-3 mb-0 text-uppercase">Submit Allocation</button>
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>

    <div class="container mt-0">
      <div class="row" v-if="this.$store.state.currPatient.status !== 'allocated'">
        <div class="col-md-12">
          <!-- <nuxt-link to="/ha/profile/"> -->
          <!-- {{ this.$store.state.currPatient.status === 'allocated'}} -->
            <!-- <button data-toggle="modal" :disabled="this.$store.state.currPatient.status === 'allocated'" data-target="#exampleModal" class="w-100 btn btn-dark rounded font-weight-bold py-3 mb-2  text-uppercase">Allocate for Doctor's Review</button>      -->
          <!-- </nuxt-link> -->
        </div>
        <!-- <div class="col-md-6">
          <nuxt-link to="/ha/profile/">
            <button  @click="sendAlert('The patient has been allocated to a doctor.')" class="w-100 btn btn-dark rounded font-weight-bold py-3 mb-0  text-uppercase">Allocate To Queue</button>     
          </nuxt-link>
        </div> -->
        <!-- <div class="col-md-12">
          <hr class="mt-2">
        </div> -->
      </div>
      <div class="row">
        <div class="col-md-12">
          <!-- Episode ID: {{ this.$route.query.id }} <br>
          Curr Patient: {{ this.$store.state.currPatient.episodes.find(episode => episode.episodeID === this.$route.query.id ) }} -->
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
          <transition name="u-fade"  mode="out-in">

          <div class="w-100 bg-white mb-2 mt-0 px-3 pt-3 pb-3" key="complaint" style="min-height: 200px;" v-if="subTabs[0].isActive">
            <div class="row mt-1">
              <div class="col-md-12 mb-3">
                <div class="small text-muted mb-2">
                  Chief Complaint
                </div>
                <button class="btn px-3 small btn-dark" role="button">
                  Pain
                </button>
                <button class="btn px-3 small btn-dark" role="button">
                  Ear Pain
                </button>
                <br><br>
                <div class="small text-muted mb-2">
                  Description
                </div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat earum sequi laudantium est consequuntur non natus suscipit quibusdam, hic dolore, quam, quidem nostrum. Incidunt alias eos repellendus quaerat tempore doloremque unde sit, earum maiores facilis beatae vero ex hic eaque necessitatibus nulla consectetur dolorum? Voluptas magnam alias at sed unde!
              </div>
              <!-- <div class="col-md-6 mb-3">
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
              </div> -->
            </div>
          </div>
          <div class="w-100 bg-white mb-2 mt-0 px-3 pt-3 pb-3" key="vitals" style="min-height: 200px;" v-if="subTabs[1].isActive">
            <div class="row mt-1">
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
              <div class="col-md-12 mb-4">
                <hr class="pb-3">
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
          </div>
          <div class="w-100 bg-white mb-2 mt-0 px-3 pt-3 pb-3" key="general-exams" style="min-height: 200px;" v-if="subTabs[2].isActive">
            <div class="row mt-1">
              <!-- <div class="col-md-12 mb-5 text-center" style="min-height: 300px;">
                <img src="/anatomy_sketch.png" alt="">
              </div> -->
              <div class="col-md-6 mb-3">
                <div class="small text-muted">
                  Eyes
                </div>
                Jaundice Present <br>
                Mild Pallor
                <!-- <input type="text" class="w-100 p-2 mb-3" placeholder="Patient Appearance"> -->
              </div>
              <div class="col-md-6 mb-3">
                <div class="small text-muted">
                  Hands
                </div>
                Normal Nails <br>
                Cyanosis Present
                <!-- <input type="text" class="w-100 p-2 mb-3" placeholder="Patient Gait"> -->
              </div>
              <div class="col-md-6 mb-3">
                <div class="small text-muted">
                  Lower Leg and Ankle
                </div>
                Mild Oedema
                <!-- <input type="text" class="w-100 p-2 mb-3" placeholder="BP (___/___ mmHg)"> -->
              </div>
            </div>
          </div>
          <div class="w-100 bg-white mb-2 mt-0 px-3 pt-3 pb-3" key="specific-exams" style="min-height: 200px;" v-if="subTabs[3].isActive">
            <div class="row mt-1">
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
              <div class="col-md-12 mb-4">
                <hr class="pb-3">
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
          </div>
          <div class="w-100 bg-white mb-2 mt-0 px-3 pt-3 pb-1" key="photo" style="min-height: 200px;" v-if="subTabs[4].isActive">
            <div class="row mt-1">
              <!-- <div class="col-md-12 mb-3 text-center">
                Additional Photos
              </div> -->
              <div class="col-md-3 mb-4">
                <img src="/square-grey.jpg" class="w-100" alt="">
              </div>
              <div class="col-md-3 mb-4">
                <img src="/square-grey.jpg" class="w-100" alt="">
              </div>
              <!-- <div class="col-md-3 mb-4">
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
              </div> -->
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
          </div>
          </transition>
          <!-- <div class="row px-2 mb-2">
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
          </div> -->
        </div>
      </div>
    </div>

    <!-- <div class="container">
      <div class="row">
        <div class="col-md-12 rounded">
          <ul class="list-inline mt-2 mb-2">
            <li class="list-inline-item pointer">
              <div class="px-2 mr-2 pb-1 mb-1 underline" role="button">
                Billing this Visit
              </div>
            </li>
            <li class="list-inline-item pointer">
              <div class="px-2 mr-2 pb-1 mb-1 underline" role="button">
                All Episode Billing
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="container">
        <div class="w-100 bg-white mb-3 mt-0 px-3 pt-3 pb-1">
          <div class="row mt-1 mb-3">
            <div class="col-md-12">
              Costs Accrued: $99
            </div>
          </div>
        </div>
    </div> -->

    <div>
      <div class="container mt-3 mb-3">
        <div class="row">
          <div class="col-md-12">
            <h5 class="d-inline">Feedback</h5> 
            <!-- [ <div class="d-inline pointer text-muted" @click="showDocsFeedback = !showDocsFeedback">
              <span v-if="!showDocsFeedback">show</span>
              <span v-else>hide</span>
            </div> ] -->
          </div>
        </div>
      </div>
    </div>

    <div class="w-100 bg-white pt-4 pb-3 mb-4" style="min-height: 30px;">
      <div class="container" v-if="!showDocsFeedback">
        <div class="row">
          <div class="col-md-12">
            <div class="small text-center">
              This patient visit does not yet have feedback.
            </div>
          </div>
        </div>
      </div>
      <div class="container" v-else>
        <div class="row mb-5">
          <div class="col-md-12">
            <div class="small text-muted">
              Prescriptions
            </div>
          </div>
          <div class="col-md-12">
            <div class="w-100 bg-white mb-3 mt-0 pt-0 pb-0">
              <table class="table table-sm table-hover mt-3">
                <thead>
                  <tr>
                    <th scope="col"></th>
                    <th scope="col">ID</th>
                    <th scope="col">Medicine</th>
                    <th scope="col">Type</th>
                    <th scope="col">Batch</th>
                    <th scope="col">Expiry</th>
                    <th scope="col">Stock</th>
                    <th scope="col">MRP</th>
                    <th scope="col">GST</th>
                    <th scope="col">Dis. Rate</th>
                    <th scope="col">Crit. Value</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="pointer">
                    <td><input type="checkbox" name="" id=""></td>
                    <td>AAU</td>
                    <td>Lorazepam</td>
                    <td>AAU</td>
                    <td>135</td>
                    <td>12/22</td>
                    <td>99</td>
                    <td>$99</td>
                    <td>$99</td>
                    <td>0%</td>
                    <td>10</td>
                  </tr>
                  <tr class="pointer">
                    <td><input type="checkbox" name="" id=""></td>
                    <td>AAU</td>
                    <td>Lorazepam</td>
                    <td>AAU</td>
                    <td>135</td>
                    <td>12/22</td>
                    <td>99</td>
                    <td>$99</td>
                    <td>$99</td>
                    <td>0%</td>
                    <td>10</td>
                  </tr>
                  <tr class="pointer">
                    <td><input type="checkbox" name="" id=""></td>
                    <td>AAU</td>
                    <td>Lorazepam</td>
                    <td>AAU</td>
                    <td>135</td>
                    <td>12/22</td>
                    <td>99</td>
                    <td>$99</td>
                    <td>$99</td>
                    <td>0%</td>
                    <td>10</td>
                  </tr>
                  <tr class="pointer">
                    <td><input type="checkbox" name="" id=""></td>
                    <td>AAU</td>
                    <td>Lorazepam</td>
                    <td>AAU</td>
                    <td>135</td>
                    <td>12/22</td>
                    <td>99</td>
                    <td>$99</td>
                    <td>$99</td>
                    <td>0%</td>
                    <td>10</td>
                  </tr>
                  <tr class="pointer" style="background-color: salmon;">
                    <td><input type="checkbox" name="" id=""></td>
                    <td>AAU</td>
                    <td>Lorazepam</td>
                    <td>AAU</td>
                    <td>135</td>
                    <td>12/22</td>
                    <td>99</td>
                    <td>$99</td>
                    <td>$99</td>
                    <td>0%</td>
                    <td>10</td>
                  </tr>
                  <tr class="pointer" style="background-color: salmon;">
                    <td><input type="checkbox" name="" id=""></td>
                    <td>AAU</td>
                    <td>Lorazepam</td>
                    <td>AAU</td>
                    <td>135</td>
                    <td>12/22</td>
                    <td>99</td>
                    <td>$99</td>
                    <td>$99</td>
                    <td>0%</td>
                    <td>10</td>
                  </tr>
                  <tr class="pointer" style="background-color: salmon;">
                    <td><input type="checkbox" name="" id=""></td>
                    <td>AAU</td>
                    <td>Lorazepam</td>
                    <td>AAU</td>
                    <td>135</td>
                    <td>12/22</td>
                    <td>99</td>
                    <td>$99</td>
                    <td>$99</td>
                    <td>0%</td>
                    <td>10</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="col-md-12">
            <!-- <nuxt-link to="/ha/profile/new-episode"> -->
              <button class="w-100 btn btn-dark rounded font-weight-bold py-3 mb-0  text-uppercase">Print Prescription</button>     
            <!-- </nuxt-link> -->
          </div>
        </div>
        <div class="row">
          <div class="col-md-12 mb-5">
            <div class="small text-muted mb-3">
              Investigations
            </div>
            {{ episodeData.feedback.investigations }}
          </div>
        </div>
        <div class="row">
          <div class="col-md-12 mb-5">
            <div class="small text-muted mb-3">
              Advice
            </div>
            {{ episodeData.feedback.advice }}
          </div>
        </div>
        <!-- <div class="row">
          <div class="col-md-12 mb-3 text-right">
            <div class="small">
              Last reviewed by Doctor Suresh at 7:00pm, 01/01/2021
            </div>
          </div>
        </div> -->
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
        title: 'Episode 1',
        url: '/ha/profile'
      }
    ])

    // get episode data
    // set episode data
    const episodeID = this.$route.query.id

    if ( this.$store.state.currPatient.id !== '') {
      this.episodeData = this.$store.state.currPatient.episodes.find(episode => episode.episodeID === episodeID )

      if (this.episodeData.feedback.hasFeedback ) {
        showDocsFeedback = true
      }
    }
  },
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
    },
    addToQueue: function (msg) {
      this.$store.commit("updateStatus", 'allocated')
    }
  },
  data() {
    return {
      episodeData: {
        type: '',
        billed: '',
        link: '',
        episodeID: '',
        title: '',
        created: '',
        lastUpdated: '',
        numFollowUps: '',
        followUps: [],
        services: [],
        complaint: {
          chiefComplaint: '',
          vitals: '',
          genExams: '',
          specExams: '',
          addPhotos: ''
        },
        feedback: {
          medicine: [],
          investigations: '',
          advice: '',
        }
      },
      showDocsFeedback: false,
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
        //   title: 'Record Follow Up',
        //   isActive: false
        // },
        // {
        //   name: 'newservice',
        //   title: 'Record Service',
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
          title: 'Photos',
          isActive: false,
        }
      ]
    }
  },
}
</script>