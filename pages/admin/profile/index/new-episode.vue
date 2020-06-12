<template>
  <div>
    <div class="container mt-2">
      <div class="row">
        <div class="col-md-12 rounded">
          <ul class="list-inline">
            <li class="list-inline-item">
              <button class="btn btn-dark px-3" role="button">
                New Episode
              </button>
            </li>
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
                Additional Photos 12312
              </div>
              <div class="col-md-4 mb-4">
                <img src="/square-grey.jpg" alt="">
              </div>
              <div class="col-md-4 mb-4">
                <img src="/square-grey.jpg" alt="">
              </div>
              <div class="col-md-4 mb-4">
                <img src="/square-grey.jpg" alt="">
              </div>
              <div class="col-md-4 mb-4">
                <img src="/square-grey.jpg" alt="">
              </div>
              <div class="col-md-4 mb-4">
                <img src="/square-grey.jpg" alt="">
              </div>
              <div class="col-md-4 mb-4">
                <img src="/square-grey.jpg" alt="">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container mb-3">
      <div class="row">
        <div class="col-md-12">
          <div v-if="!showComplete">
            <button @click="goToNext()" class="w-100 btn btn-dark rounded font-weight-bold py-3 mb-1  text-uppercase">GO TO NEXT</button>
          </div>
          <div v-else>
            <nuxt-link to="/ha/profile">
              <button @click="showAlert()" class="w-100 btn btn-dark rounded font-weight-bold py-3 mb-1  text-uppercase">
                Record New Episode
              </button>
            </nuxt-link>
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
    showAlert: function () {
      alert(`This episode has been recorded.`)
    },
// \n
// Please allocate a doctor for which you would like to have this patient seen by.

// :: Doctor Suresh (available)
// :: Doctor Gupta (available)
// :: Doctor Sitadel (unavailable)
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
    }
  },
  mounted () {
    this.$store.commit('increment', this.fullPath)
  },
  data() {
    return {
      fullPath: [
        {
          title: 'Dashboard',
          url: '/ha'
        },
        {
          title: 'Delores Abernathy',
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
