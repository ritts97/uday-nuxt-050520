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
          <div class="modal-body mb-2">
            Allocate to an available doctor:<br><br>
            <span v-for="(md, index) in this.$store.state.udayDb.clusters['cluster001'].mds" :key="index">
              <input type="radio" class="mr-3" name="" id=""> {{ md.demographics.name }} ({{ md.status }})<br>
            </span>
            <input type="radio" class="mr-3" name="" id=""> or add to General Queue
          </div>
          <div class="modal-footer">
            <nuxt-link to="/ha/profile" class="w-100"><button @click="addToQueue" type="button" data-dismiss="modal" class="w-100 btn btn-dark rounded font-weight-bold py-3 mb-0 text-uppercase">Submit Allocation</button>
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>

    <div class="container mt-2">
      <div class="row">
        <div class="col-md-12 rounded">
          <ul class="list-inline">
            <li class="list-inline-item">
              <button class="btn btn-dark px-3" role="button">
                New Episode
              </button>
            </li>
            <!-- <li class="list-inline-item">
              <button class="btn btn-light px-3" role="button">
                Billing
              </button>
            </li> -->
          </ul>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12 rounded">
          <ul class="list-inline mb-2">
            <li class="list-inline-item pointer" v-for="(tab, index) in tabs" :key="index">
              <div class="px-2 mr-2 pb-1 mb-1" @click="getTab(tab.name)" :class="{ underline: tab.isActive }" role="button">
                {{ tab.title }}
              </div>
            </li>
          </ul>
          <div class="w-100 bg-white mb-3 mt-0 px-3 pt-3 pb-3" style="min-height: 200px;" v-if="tabs[0].isActive">
            <!-- Chief Complaints<br><br> -->
            <div class="row mt-1">
              <div class="col-md-12 text-muted small mb-3">
                  Please complete to the best of your ability.
                </div>
              <div class="col-md-6">
                <input type="text" class="w-100 p-2 mb-3" placeholder="What is the major complaint?">
              </div>
              <div class="col-md-6">
                <input type="text" class="w-100 p-2 mb-3" placeholder="What are the symptoms?">
              </div>
              <div class="col-md-12">
                <textarea class="w-100 p-2" rows="5" placeholder="Please provide any additional information..."></textarea>
              </div>
            </div>
          </div>
          <div class="w-100 bg-white mb-3 mt-0 px-3 pt-3 pb-3" style="min-height: 200px;" v-if="tabs[1].isActive">
            <!-- Vitals<br><br> -->
            <div class="row mt-1">
              <div class="col-md-12 text-muted small mb-3">
                  Please complete to the best of your ability.
                </div>
              <div class="col-md-6">
                <input type="text" class="w-100 p-2 mb-3" placeholder="Patient Appearance">
              </div>
              <div class="col-md-6">
                <input type="text" class="w-100 p-2 mb-3" placeholder="Patient Gait">
              </div>
              <div class="col-md-6">
                <input type="text" class="w-100 p-2 mb-3" placeholder="BP (___/___ mmHg)">
              </div>
              <div class="col-md-6">
                <input type="text" class="w-100 p-2 mb-3" placeholder="SP02 (%)">
              </div>
              <div class="col-md-6">
                <input type="text" class="w-100 p-2 mb-3" placeholder="Temperature (‘’ F)">
              </div>
              <div class="col-md-6">
                <input type="text" class="w-100 p-2 mb-3" placeholder="Height (cm)">
              </div>
              <div class="col-md-6">
                <input type="text" class="w-100 p-2 mb-3" placeholder="Weight (kg)">
              </div>
              <div class="col-md-6">
                <input type="text" class="w-100 p-2 mb-3" placeholder="BMI (kg/m2) (Auto Calculated)">
              </div>
            </div>
          </div>
          <div class="w-100 bg-white mb-3 mt-0 px-3 pt-3 pb-3" style="min-height: 200px;" v-if="tabs[2].isActive">
            <!-- General Exams<br><br> -->
            <div class="row mt-1">
              <!-- <div class="col-md-12 mb-5 text-center">
                <img src="/anatomy_sketch.png" alt="">
              </div> -->
              <div class="col-md-12 text-muted small mb-3">
                  Please complete to the best of your ability.
                </div>
              <div class="col-md-6">
                <input type="text" class="w-100 p-2 mb-3" placeholder="Patient Appearance">
              </div>
              <div class="col-md-6">
                <input type="text" class="w-100 p-2 mb-3" placeholder="Patient Gait">
              </div>
              <div class="col-md-6">
                <input type="text" class="w-100 p-2 mb-3" placeholder="BP (___/___ mmHg)">
              </div>
              <div class="col-md-6">
                <input type="text" class="w-100 p-2 mb-3" placeholder="SP02 (%)">
              </div>
              <div class="col-md-6">
                <input type="text" class="w-100 p-2 mb-3" placeholder="Temperature (‘’ F)">
              </div>
              <div class="col-md-6">
                <input type="text" class="w-100 p-2 mb-3" placeholder="Height (cm)">
              </div>
              <div class="col-md-6">
                <input type="text" class="w-100 p-2 mb-3" placeholder="Weight (kg)">
              </div>
              <div class="col-md-6">
                <input type="text" class="w-100 p-2 mb-3" placeholder="BMI (kg/m2) (Auto Calculated)">
              </div>
            </div>
          </div>
          
          <div class="w-100 bg-white mb-3 mt-0 px-3 pt-3 pb-3" style="min-height: 200px;" v-if="tabs[3].isActive">
            <!-- Specific Exams
            <br><br> -->
            <div class="row mt-1">
              <!-- <div class="col-md-12 mb-5 text-center">
                <img src="/anatomy_sketch.png" alt="">
              </div> -->
              <div class="col-md-12 text-muted small mb-3">
                  Please complete to the best of your ability.
                </div>
              <div class="col-md-6">
                <input type="text" class="w-100 p-2 mb-3" placeholder="Patient Appearance">
              </div>
              <div class="col-md-6">
                <input type="text" class="w-100 p-2 mb-3" placeholder="Patient Gait">
              </div>
              <div class="col-md-6">
                <input type="text" class="w-100 p-2 mb-3" placeholder="BP (___/___ mmHg)">
              </div>
              <div class="col-md-6">
                <input type="text" class="w-100 p-2 mb-3" placeholder="SP02 (%)">
              </div>
              <div class="col-md-6">
                <input type="text" class="w-100 p-2 mb-3" placeholder="Temperature (‘’ F)">
              </div>
              <div class="col-md-6">
                <input type="text" class="w-100 p-2 mb-3" placeholder="Height (cm)">
              </div>
              <div class="col-md-6">
                <input type="text" class="w-100 p-2 mb-3" placeholder="Weight (kg)">
              </div>
              <div class="col-md-6">
                <input type="text" class="w-100 p-2 mb-3" placeholder="BMI (kg/m2) (Auto Calculated)">
              </div>
            </div>
          </div>
          <div class="w-100 bg-white mb-3 mt-0 px-3 pt-3 pb-1" style="min-height: 200px;" v-if="tabs[4].isActive">
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
              <div class="col-md-3 mb-4">
                <img src="/square-grey-add.jpg" class="w-100" alt="">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container mb-3">
      <!-- <div class="row">
        <div class="col-md-12">
          <hr>
        </div>
        <div class="col-md-12 mb-3">
          Record New Episode
        </div>
      </div> -->
      <div class="row">
        <!-- <div class="col-md-6">
          <nuxt-link to="/ha/profile/new-episode">
            <button class="w-100 btn btn-dark rounded font-weight-bold py-3 mb-2  text-uppercase">Allocate to Doctor</button>     
          </nuxt-link>
        </div> -->
        <div class="col-md-12">
          <!-- <nuxt-link to="/ha/profile/"> -->
            <button data-toggle="modal" data-target="#exampleModal" class="w-100 btn btn-dark rounded font-weight-bold py-3 mb-0  text-uppercase">Allocate for Feedback</button>     
          <!-- </nuxt-link> -->
        </div>
        <div class="col-md-12">
          <!-- <div v-if="showComplete">
            <button @click="goToNext()" class="w-100 btn btn-dark rounded font-weight-bold py-3 mb-1  text-uppercase">GO TO NEXT</button>
          </div>
          <div v-else>
            <nuxt-link to="/ha/profile">
              <button @click="showAlert()" class="w-100 btn btn-dark rounded font-weight-bold py-3 mb-1  text-uppercase">
                Record New Episode
              </button>
            </nuxt-link>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'dashboard',
  methods: {
    showAlert: function () {
      alert(`This episode has been recorded.`)
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
    goToNext: function () {
      let tabs = this.tabs
      let ref = 0

      for (let i = 0; i < tabs.length; i++) {
        if (tabs[i].isActive === true) {
          tabs[i].isActive = false
          ref = i
        }
      }

      if ((ref + 1) >= (tabs.length-1)) {
        this.showComplete = true
      } 

      tabs[ref + 1].isActive = true
    },
    addToQueue: function () {
      // alert('Added to Patient Queue.')
      this.$store.commit('updateStatus', 'allocated')
      this.$store.commit('addPatientToQueue', this.$store.state.currPatient.id)
      this.$store.commit('recordNewEpisode')
      this.$store.commit('updateCurrPatient')
    },
  },
  mounted () {
    this.$store.commit('updatePath', this.fullPath)
  },
  data() {
    return {
      fullPath: [
        {
          title: 'Dashboard',
          url: '/ha'
        },
        {
          title: 'Patient\'s Profile',
          url: '/ha/profile'
        },
        {
          title: 'New Episode',
          url: '/ha/new-episode'
        },
      ],
      list: [],
      showDemographics: true,
      showComplete: false,
      tabs: [
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