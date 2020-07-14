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

    <div class="container">
      <div class="row">
        <div class="col-md-12 rounded">
          <ul class="list-inline mb-2">
            <li class="list-inline-item pointer" v-for="(tab, index) in tabs" :key="index">
              <div class="px-2 mr-2 pb-1 mb-1" @click="getTab(tab.name)" :class="{ underline: tab.isActive }" role="button">
                {{ tab.title }}
              </div>
            </li>
          </ul>

          <transition  appear name="u-fade"  mode="in-out">

          <div class="w-100 bg-white mb-3 mt-0 px-3 pt-3 pb-3" style="min-height: 200px;" key="chiefComplaints" v-if="tabs[0].isActive">
            <!-- Chief Complaints<br><br> -->
            <div class="row mt-1">
              <div class="col-md-12 text-muted small mb-0">
                General Information {{ categoryItemInd }}
                <hr>
              </div>
              <div class="col-md-12 mb-3">
                <label for="exampleFormControlSelect1">What is the category of the complaint?</label><br>
                <button  v-for="(category, index) in categories" :class="category.isActive ? 'btn-dark text-white' : 'btn-light'" class="btn mb-2 mr-2" @click="makeCategoryActive(category.name)" :key="index">{{category.name}}</button>
              </div>

              <transition  appear name="u-fade"  mode="out-in" tag="div">
                <div class="col-md-12 mb-3" v-if="hasSubCategory">
                  <label for="exampleFormControlSelect1">What is the specific complaint?</label><br>

                  <!-- {{ categories[categoryItemInd].subCategories }} -->
                  <div v-if="categoryItemInd !== null" class="w-100">
                    <button v-for="(complaintItem, index) in categories[categoryItemInd].subCategories" :key="index" class="btn mb-2 mr-2" :class="complaintItem.isActive ? 'btn-dark text-white' : 'btn-light'" @click="handleSubCategory('Headache', categoryItemInd, index)">{{ complaintItem.name }}</button>
                  </div>
                </div>
              </transition> 


              <transition  appear name="u-fade"  mode="out-in" tag="div">

              <div v-show="showQuestions">
                <div class="col-md-12 text-muted small mb-0">
                  Fixed Questions
                  <hr>
                </div>
                <div class="col-md-12 mb-4">
                  <label for="exampleFormControlSelect1">How long has this been happening?</label><br>
                  <input type="text" class="p-2 w-100" placeholder="# of days..">
                </div>
                <div class="col-md-12 mb-4">
                  <label for="exampleFormControlSelect1">Where did this complaint start?</label><br>   
                  <button class="btn btn-light mb-2 mr-2">Does not move</button>
                  <button class="btn btn-light mb-2 mr-2">Front</button>
                  <button class="btn btn-light mb-2 mr-2">Left</button>
                  <button class="btn btn-light mb-2 mr-2">Back</button>
                  <button class="btn btn-light mb-2 mr-2">Middle</button>
                  <button class="btn btn-light mb-2 mr-2">All Over</button>
                </div>
                <div class="col-md-12 mb-4">
                  <label for="exampleFormControlSelect1">How did the pain start?</label><br>
                  <button class="btn btn-light mb-2 mr-2">Sudden</button>
                  <button class="btn btn-light mb-2 mr-2">Gradual</button>
                  <button class="btn btn-light mb-2 mr-2">Other (describe)</button>
                  <input type="text" class="p-2 w-100">
                </div>
                <div class="col-md-12 mb-4">
                  <label for="exampleFormControlSelect1">Please describe the intensity of the pain.</label><br>
                  <button class="btn btn-light mb-2 mr-2">Mild</button>
                  <button class="btn btn-light mb-2 mr-2">Moderate</button>
                  <button class="btn btn-light mb-2 mr-2">Severe</button>
                  <button class="btn btn-light mb-2 mr-2">Varies</button>
                </div>
                <div class="col-md-12 mb-4">
                  <label for="exampleFormControlSelect1">Please describe the nature of the pain.</label><br>
                  <button class="btn btn-light mb-2 mr-2">Continuous</button>
                  <button class="btn btn-light mb-2 mr-2">Comes and goes</button>
                  <button class="btn btn-light mb-2 mr-2">Always there, but sometimes worse</button>
                </div>
                <div class="col-md-12 mb-4">
                  <label for="exampleFormControlSelect1">Please describe what brings the pain on.</label><br>
                  <button class="btn btn-light mb-2 mr-2">Injury</button>
                  <button class="btn btn-light mb-2 mr-2">Bright Light</button>
                  <button class="btn btn-light mb-2 mr-2">Loud noice</button>
                  <button class="btn btn-light mb-2 mr-2">None</button>
                  <button class="btn btn-light mb-2 mr-2">Other (describe)</button>
                </div>
                <div class="col-md-12 mb-4">
                  <label for="exampleFormControlSelect1">Please describe any reliefs.</label><br>
                  <button class="btn btn-light mb-2 mr-2">None</button>
                  <button class="btn btn-light mb-2 mr-2">Other (describe)</button>
                </div>
                <div class="col-md-12 mb-4">
                  <label for="exampleFormControlSelect1">Please describe any associated symptons.</label><br>
                  <button class="btn btn-light mb-2 mr-2">Vomiting</button>
                  <button class="btn btn-light mb-2 mr-2">Vertigo</button>
                  <button class="btn btn-light mb-2 mr-2">None</button>
                  <button class="btn btn-light mb-2 mr-2">Other (describe)</button>
                </div>
              </div>

                </transition>

            </div>
          </div>

          <div class="w-100 bg-white mb-3 mt-0 px-3 pt-3 pb-3" key="vitals" style="min-height: 200px;" v-if="tabs[1].isActive">
            <!-- Vitals<br><br> -->
            <div class="row mt-1">
              <div class="col-md-12 text-muted small mb-0">
                  Please complete to the best of your ability.
                  <hr>
                </div>
              <div class="col-md-6 mb-3">
                <label for="exampleFormControlSelect1">Patient Appearance</label><br>
                <input type="text" class="w-100 p-2 mb-3" placeholder="Tired, out of breath, pale">
              </div>
              <div class="col-md-6 mb-3">
                <label for="exampleFormControlSelect1">Patient Gait</label><br>
                <input type="text" class="w-100 p-2 mb-3" placeholder="Walks with a limp">
              </div>
              <div class="col-md-6 mb-3">
                <label for="exampleFormControlSelect1">Blood Pressure</label><br>
                <input type="text" class="w-100 p-2 mb-3" placeholder="BP (___/___ mmHg)">
              </div>
              <div class="col-md-6 mb-3">
                <label for="exampleFormControlSelect1">Oxygen</label><br>
                <input type="text" class="w-100 p-2 mb-3" placeholder="SP02 (%)">
              </div>
              <div class="col-md-6 mb-3">
                <label for="exampleFormControlSelect1">Patient Temperature</label><br>
                <input type="text" class="w-100 p-2 mb-3" placeholder="Temperature (‘’ F)">
              </div>
              <div class="col-md-6 mb-3">
                <label for="exampleFormControlSelect1">Patient Height</label><br>
                <input type="text" class="w-100 p-2 mb-3" placeholder="Height (cm)">
              </div>
              <div class="col-md-6 mb-3">
                <label for="exampleFormControlSelect1">Patient Weight</label><br>
                <input type="text" class="w-100 p-2 mb-3" placeholder="Weight (kg)">
              </div>
              <div class="col-md-6 mb-3">
                <label for="exampleFormControlSelect1">Body Mass Index</label><br>
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
              <div class="col-md-12 text-muted small">
                General Physical Examinations
                <hr>
              </div>
              <div class="col-md-6 mb-3">
                <label for="exampleFormControlSelect1">Eyes – Jaundice</label><br>
                <button class="btn mb-2 mr-2" :class="[ generalExams.eyesJaundice === false ?  'btn-dark' : 'btn-light' ]" @click="generalExams.eyesJaundice = false">No</button>
                <button class="btn mb-2 mr-2" :class="[ generalExams.eyesJaundice === true ?  'btn-dark' : 'btn-light' ]" @click="generalExams.eyesJaundice = true">Yes</button>
              </div>
              <div class="col-md-6 mb-3">
                <label for="exampleFormControlSelect1">Eyes – Pallor</label><br>
                <button class="btn mb-2 mr-2" :class="[ generalExams.eyesPallor === 'none' ?  'btn-dark' : 'btn-light' ]"  @click="generalExams.eyesPallor = 'none'">None</button>
                <button class="btn mb-2 mr-2" :class="[ generalExams.eyesPallor === 'mild' ?  'btn-dark' : 'btn-light' ]"  @click="generalExams.eyesPallor = 'mild'">Mild</button>
                <button class="btn mb-2 mr-2" :class="[ generalExams.eyesPallor === 'moderate' ?  'btn-dark' : 'btn-light' ]"  @click="generalExams.eyesPallor = 'moderate'">Moderate</button>
                <button class="btn mb-2 mr-2" :class="[ generalExams.eyesPallor === 'severe' ?  'btn-dark' : 'btn-light' ]" @click="generalExams.eyesPallor = 'severe'">Severe</button>
              </div>
              <div class="col-md-6 mb-3">
                <label for="exampleFormControlSelect1">Hands – Cyanosis</label><br>
                <button class="btn mb-2 mr-2" :class="[ generalExams.handsCyanosis === false ?  'btn-dark' : 'btn-light' ]" @click="generalExams.handsCyanosis = false">No</button>
                <button class="btn mb-2 mr-2" :class="[ generalExams.handsCyanosis === true ?  'btn-dark' : 'btn-light' ]" @click="generalExams.handsCyanosis = true">Yes</button>
              </div>
              <!-- <div class="col-md-6 mb-3">
                <label for="exampleFormControlSelect1">Hands – Clubbing</label><br>  
                <button class="btn btn-light mb-2 mr-2">Normal</button>
                <button class="btn btn-light mb-2 mr-2">Clubbing</button>
                <button class="btn btn-light mb-2 mr-2">Spooning</button>
                <button class="btn btn-light mb-2 mr-2">Cyanosis</button>
                <button class="btn btn-light mb-2 mr-2">None</button>
              </div> -->

              <div class="col-md-6 mb-3">
                <label for="exampleFormControlSelect1">Hands – Clubbing</label><br>
                <button class="btn mb-2 mr-2" :class="[ generalExams.handsClubbing === 'none' ?  'btn-dark' : 'btn-light' ]"  @click="generalExams.handsClubbing = 'none'">None</button>
                <button class="btn mb-2 mr-2" :class="[ generalExams.handsClubbing === 'normal' ?  'btn-dark' : 'btn-light' ]"  @click="generalExams.handsClubbing = 'normal'">Normal</button>
                <button class="btn mb-2 mr-2" :class="[ generalExams.handsClubbing === 'clubbing' ?  'btn-dark' : 'btn-light' ]"  @click="generalExams.handsClubbing = 'clubbing'">Clubbing</button>
                <button class="btn mb-2 mr-2" :class="[ generalExams.handsClubbing === 'spooning' ?  'btn-dark' : 'btn-light' ]" @click="generalExams.handsClubbing = 'spooning'">Spooning</button>
                <button class="btn mb-2 mr-2" :class="[ generalExams.handsClubbing === 'cyanosis' ?  'btn-dark' : 'btn-light' ]" @click="generalExams.handsClubbing = 'cyanosis'">Cyanosis</button>
              </div>
              <div class="col-md-6 mb-3">
                <label for="exampleFormControlSelect1">Legs – Oedema</label><br>
                <button class="btn mb-2 mr-2" :class="[ generalExams.legsOedema === 'none' ?  'btn-dark' : 'btn-light' ]"  @click="generalExams.legsOedema = 'none'">None</button>
                <button class="btn mb-2 mr-2" :class="[ generalExams.legsOedema === 'mild' ?  'btn-dark' : 'btn-light' ]"  @click="generalExams.legsOedema = 'mild'">Mild</button>
                <button class="btn mb-2 mr-2" :class="[ generalExams.legsOedema === 'moderate' ?  'btn-dark' : 'btn-light' ]"  @click="generalExams.legsOedema = 'moderate'">Moderate</button>
                <button class="btn mb-2 mr-2" :class="[ generalExams.legsOedema === 'severe' ?  'btn-dark' : 'btn-light' ]" @click="generalExams.legsOedema = 'severe'">Severe</button>
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
              <div class="col-md-12 text-muted small">
                Pre-check Questions		
                <hr>
              </div>
              <div class="col-md-12 mb-3">
                <input type="checkbox" class="mr-2" name="" id=""> Have you washed your hands?<br>		
                <input type="checkbox" class="mr-2" name="" id=""> Is there a female chaperon in the room, if you are examning a female patient?<br>	
                <input type="checkbox" class="mr-2" name="" id=""> Greet the patient by name<br>	
                <input type="checkbox" class="mr-2" name="" id=""> Ask the patient to sit/lie down comfortably, assist if necessary<br>	
                <input type="checkbox" class="mr-2" name="" id=""> Watch as the patient walks to the chair/couch<br>	
                <input type="checkbox" class="mr-2" name="" id=""> Ask the patient if there is any pain anywhere, and if so, approach that region last and very slowly<br>	
              </div>
              <div class="col-md-12 text-muted small">
                Specific Physical Examinations
                <hr>
              </div>
              <div class="col-md-12 mb-3">
                <label for="exampleFormControlSelect1">Specific Examination</label><br>
                <button class="btn btn-light mb-2 mr-2">Eyes</button>
                <button class="btn btn-light mb-2 mr-2">Hands</button>
                <button class="btn btn-light mb-2 mr-2">Lower Leg and Ankle</button>
                <button class="btn btn-light mb-2 mr-2">Cheek & Mouth</button>
                <button class="btn btn-light mb-2 mr-2">Chest</button>
                <button class="btn btn-light mb-2 mr-2">Neck Region</button>
                <button class="btn btn-light mb-2 mr-2">Abdomen</button>
                <button class="btn btn-light mb-2 mr-2">Back</button>
                <button class="btn btn-light mb-2 mr-2">Head</button>
                <button class="btn btn-light mb-2 mr-2">Ear</button>
                <button class="btn btn-light mb-2 mr-2">Examination of a Joint</button>
                <button class="btn btn-light mb-2 mr-2">Examination of an Ulcer</button>
                <button class="btn btn-light mb-2 mr-2">Examination of a Lump/Swelling</button>
                <button class="btn btn-light mb-2 mr-2">Examination of a 'Rash'</button>
                <button class="btn btn-light mb-2 mr-2">Examination of 'Injuries'</button>
              </div>

              <div class="col-md-12 text-muted small">
                Output
                <hr>
              </div>
              <div class="col-md-6 mb-3">
                <label for="exampleFormControlSelect1">Jaundice</label><br>
                <button class="btn btn-light mb-2 mr-2">Eyes</button>
                <button class="btn btn-light mb-2 mr-2">Hands</button>
                <button class="btn btn-light mb-2 mr-2">Lower Leg and Ankle</button>
              </div>
              <div class="col-md-6 mb-3">
                <label for="exampleFormControlSelect1">Pallor</label><br>
                <button class="btn btn-light mb-2 mr-2">Eyes</button>
                <button class="btn btn-light mb-2 mr-2">Hands</button>
                <button class="btn btn-light mb-2 mr-2">Lower Leg and Ankle</button>
              </div>
              <div class="col-md-6 mb-3">
                <label for="exampleFormControlSelect1">Cyanosis</label><br>
                <button class="btn btn-light mb-2 mr-2">Eyes</button>
                <button class="btn btn-light mb-2 mr-2">Hands</button>
                <button class="btn btn-light mb-2 mr-2">Lower Leg and Ankle</button>
              </div>
              <div class="col-md-6 mb-3">
                <label for="exampleFormControlSelect1">Nails</label><br>
                <button class="btn btn-light mb-2 mr-2">Eyes</button>
                <button class="btn btn-light mb-2 mr-2">Hands</button>
                <button class="btn btn-light mb-2 mr-2">Lower Leg and Ankle</button>
              </div>
              <div class="col-md-6 mb-3">
                <label for="exampleFormControlSelect1">Oedema</label><br>
                <button class="btn btn-light mb-2 mr-2">Eyes</button>
                <button class="btn btn-light mb-2 mr-2">Hands</button>
                <button class="btn btn-light mb-2 mr-2">Lower Leg and Ankle</button>
              </div>
            </div>
          </div>
          <div class="w-100 bg-white mb-3 mt-0 px-3 pt-3 pb-1" key="addPhotos" style="min-height: 200px;" v-if="tabs[4].isActive">
            <div class="row mt-1">
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

            <nuxt-link to="/ha/profile" class="w-100"><button @click="addToQueue" type="button" data-dismiss="modal" class="w-100 btn btn-dark rounded font-weight-bold py-3 mb-0 text-uppercase">Submit Allocation</button>
            </nuxt-link>
            <!-- <button data-toggle="modal" data-target="#exampleModal" class="w-100 btn btn-dark rounded font-weight-bold py-3 mb-0  text-uppercase">Allocate for Feedback</button>      -->
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
      let self = this

      this.categories.forEach((category, index) => {
        if (category.name == clickedCategory) {
          this.categories[index].isActive = true
          this.currCategory = clickedCategory

          if (this.categories[index].subCategories) {
            self.hasSubCategory = true
            self.showQuestions = false
            self.categoryItemInd = index
          } else {
            self.hasSubCategory = false
            self.showQuestions = true
            self.categoryItemInd = null
          }
        } else {
          this.categories[index].isActive = false
        }
      })
    },
    handleSubCategory: function (categoryName, categoryInd, subCategoryInd) {
      this.complaintItem = categoryName
      this.showQuestions = true

      this.categories[categoryInd].subCategories.forEach(function(subCategory, index){
        console.log(index + ' : ' + subCategoryInd)
        if (index === subCategoryInd) {
          subCategory.isActive = true
        } else {
          subCategory.isActive = false
        }
      })
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
      alert('The patient has been allocated.')

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
      categoryItemInd: null,
      hasSubCategory: false,
      showQuestions: false,
      complaintItem: '',
      generalExams: {
        eyesJaundice: null,
        eyesPallor: null,
        handsCyanosis: null,
        handsClubbing: null,
        legsOedema: null,
      },
      categories: [
        {
          name: 'Pain',
          isActive: false,
          subCategories: [
            {
              name: 'Headache',
              isActive: false,
            },
            {
              name: 'Ear Pain',
              isActive: false,
            },
            {
              name: 'Teeth Pain',
              isActive: false,
            },
            {
              name: 'Throat Pain',
              isActive: false,
            },
            {
              name: 'Back Pain',
              isActive: false,
            },
            {
              name: 'Joint Pain',
              isActive: false,
            },
            {
              name: 'Chest Pain',
              isActive: false,
            },
            {
              name: 'Abdominal Pain',
              isActive: false,
            },
            {
              name: 'Breast Pain',
              isActive: false,
            },
            {
              name: 'Scrotal Pain',
              isActive: false,
            },
            {
              name: 'Perianal Pain',
              isActive: false,
            }
          ]
        },
        {
          name: 'Swelling/Tumor',
          isActive: false,
          subCategories: [
            {
              name: 'Throat Swelling',
              isActive: false,
            },
            {
              name: 'Abdomen Swelling',
              isActive: false,
            },
            {
              name: 'Swelling (Others)',
              isActive: false,
            },
          ]
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
          subCategories: [
            {
              name: 'Period Problem',
              isActive: false,
            },
            {
              name: 'Ante-natal Problem',
              isActive: false,
            },
            {
              name: 'Infertility Problem',
              isActive: false,
            },
            {
              name: 'Intercourse Problem',
              isActive: false,
            },
            {
              name: 'Problem with Private Parts',
              isActive: false,
            },
          ]
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
          subCategories: [
            {
              name: 'General Weakness',
              isActive: false,
            },
            {
              name: 'Particular Weakness',
              isActive: false,
            }
          ]
        },
        {
          name: 'Palpitation',
          isActive: false,
        },
        {
          name: 'Mental Health Problem',
          isActive: false,
        },

        {
          name: 'Coughing, Throat Problem',
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
          title: 'Photos',
          isActive: false,
        }
      ]
    }
  },
}
</script>