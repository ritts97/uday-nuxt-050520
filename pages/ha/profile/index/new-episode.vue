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
            <input type="radio" class="mt-1 mr-3" name="" id=""> 
            <i>Add to General Queue</i>
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

          <transition  appear name="u-fade"  mode="out-in">

          <div class="w-100 bg-white mb-3 mt-0 px-3 pt-3 pb-3" style="min-height: 200px;" key="chiefComplaints" v-if="tabs[0].isActive">
            <!-- Chief Complaints<br><br> -->
            <div class="row mt-1">
              <div class="col-md-12 text-muted small mb-3">
                  Please complete to the best of your ability.
                </div>
              <div class="col-md-12 mb-3">
                <label for="exampleFormControlSelect1">What is the category of the complaint?</label><br>
                <button  v-for="(category, index) in categories" :class="category.isActive ? 'btn-dark text-white' : 'btn-light'" class="btn mb-2 mr-2" @click="makeCategoryActive(category.name)" :key="index">{{category.name}}</button>
              </div>
              <div class="col-md-12 mb-3" v-if="currCategory !== ''">
                <label for="exampleFormControlSelect1">What is the specific complaint?</label><br>
    <transition  appear name="u-fade"  mode="out-in" tag="div">

                <div v-if="currCategory === 'Pain'" key="pain" class="w-100">
                  <button class="btn btn-light mb-2 mr-2" @click="handleSubCategory('Headache')">Headache</button>
                  <button class="btn btn-light mb-2 mr-2" @click="handleSubCategory('Headache')">Ear Pain</button>
                  <button class="btn btn-light mb-2 mr-2" @click="handleSubCategory('Headache')">Teeth Pain</button>
                  <button class="btn btn-light mb-2 mr-2" @click="handleSubCategory('Headache')">Throat Pain</button>
                  <button class="btn btn-light mb-2 mr-2" @click="handleSubCategory('Headache')">Back Pain</button>
                  <button class="btn btn-light mb-2 mr-2" @click="handleSubCategory('Headache')">Joint Pain</button>
                  <button class="btn btn-light mb-2 mr-2" @click="handleSubCategory('Headache')">Chest Pain</button>
                  <button class="btn btn-light mb-2 mr-2" @click="handleSubCategory('Headache')">Abdominal Pain</button>
                  <button class="btn btn-light mb-2 mr-2" @click="handleSubCategory('Headache')">Breast Pain</button>
                  <button class="btn btn-light mb-2 mr-2" @click="handleSubCategory('Headache')">Scrotal Pain</button>
                  <button class="btn btn-light mb-2 mr-2" @click="handleSubCategory('Headache')">Perianal Pain</button>
                </div>
                <div v-if="currCategory === 'Swelling/Tumor'" key="swelling" class="w-100">
                  <button class="btn btn-light mb-2 mr-2">Throat Swelling</button>
                  <button class="btn btn-light mb-2 mr-2">Abdomen Swelling</button>
                  <button class="btn btn-light mb-2 mr-2">Other Swelling</button>
                </div>
                <div v-if="currCategory === 'Difficulty Breathing'" key="breathing" class="w-100">
                  <button class="btn btn-light mb-2 mr-2">Difficulty Breathing</button>
                </div>

                <div v-if="currCategory === 'Fever'" v-bind:key="'fever'" class="w-100">
                  <button class="btn btn-light mb-2 mr-2">Fever</button>
                </div>
                <div v-if="currCategory === 'Diarrhoea'" v-bind:key="'diarrhoea'" class="w-100">
                  <button class="btn btn-light mb-2 mr-2">Diarrhoea</button>
                </div>
                <div v-if="currCategory === 'Vomiting'" v-bind:key="'vomiting'" class="w-100">
                  <button class="btn btn-light mb-2 mr-2">Vomiting</button>
                </div>
                <div v-if="currCategory === 'Dizziness'" v-bind:key="'dizziness'" class="w-100">
                  <button class="btn btn-light mb-2 mr-2">Dizziness</button>
                </div>
                <div v-if="currCategory === 'Acidity/Indigestion'" v-bind:key="'acidity'" class="w-100">
                  <button class="btn btn-light mb-2 mr-2">Acidity/Indigestion</button>
                </div>
                <div v-if="currCategory === 'Yellow Urine'" v-bind:key="'urine'" class="w-100">
                  <button class="btn btn-light mb-2 mr-2">Yellow Urine</button>
                </div>
                <div v-if="currCategory === 'Skin Rash'" v-bind:key="'rash'" class="w-100">
                  <button class="btn btn-light mb-2 mr-2">Skin Rash</button>
                </div>
                <div v-if="currCategory === 'Bleeding with Stool'" v-bind:key="'stool'" class="w-100">
                  <button class="btn btn-light mb-2 mr-2">Bleeding with Stool</button>
                </div>
                <div v-if="currCategory === 'Gynae Problems'" v-bind:key="'gyane'" class="w-100">
                  <button class="btn btn-light mb-2 mr-2">Period Problem</button>
                  <button class="btn btn-light mb-2 mr-2">Ante-natal</button>
                  <button class="btn btn-light mb-2 mr-2">Infertility</button>
                  <button class="btn btn-light mb-2 mr-2">Private Parts</button>
                  <button class="btn btn-light mb-2 mr-2">Intercourse</button>
                </div>
                <div v-if="currCategory === 'Injury'" v-bind:key="'injury'" class="w-100">
                  <button class="btn btn-light mb-2 mr-2">Injury</button>
                </div>
                <div v-if="currCategory === 'Boils'" v-bind:key="'boils'" class="w-100">
                  <button class="btn btn-light mb-2 mr-2">Boils</button>
                </div>
                <div v-if="currCategory === 'Ulcer'" v-bind:key="'ulcer'" class="w-100">
                  <button class="btn btn-light mb-2 mr-2">Ulcer</button>
                </div>
                <div v-if="currCategory === 'Palpitation'" v-bind:key="'palpitation'" class="w-100">
                  <button class="btn btn-light mb-2 mr-2">Palpitation</button>
                </div>
                <div v-if="currCategory === 'Fainting'" v-bind:key="'fainting'" class="w-100">
                  <button class="btn btn-light mb-2 mr-2">Fainting</button>
                </div>
                <div v-if="currCategory === 'Weakness'" v-bind:key="'weakness'" class="w-100">
                  <button class="btn btn-light mb-2 mr-2">General Weakness</button>
                  <button class="btn btn-light mb-2 mr-2">Particular Weakness</button>
                </div>


    </transition> 

              </div>
              <div v-if="subCategory !== ''" class="col-md-12 mb-3">
                <label for="exampleFormControlSelect1">Please examine these organs fully.</label><br>
                Eye, Head, Hand
              </div>
              <div class="col-md-12 mb-3">
                <label for="exampleFormControlSelect1">Please examine these organs partially.</label><br>
                Pupil
              </div>
              <div class="col-md-12 mb-3">
                <label for="exampleFormControlSelect1">What has been the duration of this complaint?</label>
                <input type="text" class="p-2 w-100">
              </div>
              <div class="col-md-12 mb-3">
                <label for="exampleFormControlSelect1">Where did this complaint start?</label>
                <input type="text" class="p-2 w-100">
              </div>
              <div class="col-md-12 mb-3">
                <label for="exampleFormControlSelect1">Please describe the intensity of the pain.</label>
                <input type="text" class="p-2 w-100">
              </div>
              <div class="col-md-12 mb-3">
                <label for="exampleFormControlSelect1">Please describe the nature of the pain.</label>
                <input type="text" class="p-2 w-100">
              </div>
              <div class="col-md-12 mb-3">
                <label for="exampleFormControlSelect1">Please describe what brings the pain on.</label>
                <input type="text" class="p-2 w-100">
              </div>
              <div class="col-md-12 mb-3">
                <label for="exampleFormControlSelect1">Please describe any relief.</label>
                <input type="text" class="p-2 w-100">
              </div>
              <div class="col-md-12 mb-3">
                <label for="exampleFormControlSelect1">Please describe any associated symptons.</label>
                <input type="text" class="p-2 w-100">
              </div>
              <div class="col-md-12 mb-3">
                <label for="exampleFormControlSelect1">Please provide any further information that might be relevant.</label>
              </div>
              <div class="col-md-12">
                <textarea class="w-100 p-2" rows="5" placeholder="Please provide any additional information..."></textarea>
              </div>
            </div>
          </div>

          <div class="w-100 bg-white mb-3 mt-0 px-3 pt-3 pb-3" key="vitals" style="min-height: 200px;" v-if="tabs[1].isActive">
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
          <div class="w-100 bg-white mb-3 mt-0 px-3 pt-3 pb-3" key="generalExams" style="min-height: 200px;" v-if="tabs[2].isActive">
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
          <div class="w-100 bg-white mb-3 mt-0 px-3 pt-3 pb-3" key="specificExams" style="min-height: 200px;" v-if="tabs[3].isActive">
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
          <div class="w-100 bg-white mb-3 mt-0 px-3 pt-3 pb-1" key="addPhotos" style="min-height: 200px;" v-if="tabs[4].isActive">
            <div class="row mt-1">
              <div class="col-md-12 mb-3 text-center">
                Additional Photos
              </div>
              <div class="col-md-3 mb-4">
                <img src="/square-grey.jpg" class="w-100" alt="">
              </div>
              <div class="col-md-3 mb-4">
                <img src="/square-grey-add.jpg" class="w-100" alt="">
              </div>
            </div>
          </div>
          </transition>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-md-12 rounded">
          <ul class="list-inline mb-2">
            <li class="list-inline-item pointer">
              <div class="px-2 mr-2 pb-1 mb-1 underline" role="button">
                Allocation
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="container">
        <div class="w-100 bg-white mb-3 mt-0 px-3 pt-3 pb-1" style="min-height: 100px;">
          <div class="row mt-1 mb-3">
            <div class="col-md-12 mb-2">
              Please select an available allocation:
              <!-- <div class="pl-4">
                <span v-for="(md, index) in this.$store.state.udayDb.clusters['cluster001'].mds" :key="index">
                  <input type="radio" class="mr-3" name="" id=""> {{ md.demographics.name }} ({{ md.status }})<br>
                </span>
              </div> -->
            </div>
            <div v-for="(md, index) in this.$store.state.udayDb.clusters['cluster001'].mds" :key="index" class="col-md-6 pl-5">
              <input type="radio" class="mr-3" name="" id=""> {{ md.demographics.name }} ({{ md.status }})<br>
            </div>
            <div class="col-md-6 pl-5">
              <input type="radio" class="mt-1 mr-3" name="" id=""> 
              <i>Add to General Queue</i>
            </div>
          </div>
        </div>
      <!-- </fieldset> -->
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
    makeCategoryActive: function (clickedCategory) {
      this.categories.forEach((category, index) => {
        if (category.name == clickedCategory) {
          this.categories[index].isActive = true
          this.currCategory = clickedCategory
        } else {
          this.categories[index].isActive = false
        }
      })
    },
    handleSubCategory: function (categoryName) {
      this.subCategory = categoryName
    },
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
      alert('The patient has been allocated to the general queue.')

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
      currCategory: '',
      subCategory: '',
      categories: [
        {
          name: 'Pain',
          isActive: false,
          subCategories: [
            {
              name: 'Headache',
              isActive: false,

            }
          ]
        },
        {
          name: 'Swelling/Tumor',
          isActive: false,
        },
        {
          name: 'Difficulty Breathing',
          isActive: false,
        },
        {
          name: 'Fever',
          isActive: false,
        },
        {
          name: 'Diarrhoea',
          isActive: false,
        },
        {
          name: 'Vomiting',
          isActive: false,
        },
        {
          name: 'Dizziness',
          isActive: false,
        },
        {
          name: 'Acidity/Indigestion',
          isActive: false,
        },
        {
          name: 'Yellow Urine',
          isActive: false,
        },
        {
          name: 'Skin Rash',
          isActive: false,
        },
        {
          name: 'Bleeding with Stool',
          isActive: false,
        },
        {
          name: 'Gynae Problems',
          isActive: false,
        },
        {
          name: 'Injury',
          isActive: false,
        },
        {
          name: 'Boils',
          isActive: false,
        },
        {
          name: 'Ulcer',
          isActive: false,
        },
        {
          name: 'Fainting',
          isActive: false,
        },
        {
          name:  'Weakness',
          isActive: false,
        },
        {
          name: 'Palpitation',
          isActive: false,
        },
        {
          name: 'Other Category',
          isActive: false,
        },
      ],
      fullPath: [
        {
          title: 'HA\'s Dashboard',
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