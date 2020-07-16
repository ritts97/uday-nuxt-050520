<template>
  <div>
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

          <transition  appear name="u-fade"  mode="out-in">

          <div class="w-100 bg-white mb-3 mt-0 px-3 pt-3 pb-3" style="min-height: 200px;" key="chiefComplaints" v-if="tabs[0].isActive">
            <!-- Chief Complaints<br><br> -->
            <div class="row mt-1">
              <div class="col-md-12 text-muted small mb-0">
                General Information {{ categoryItemInd }}
                <hr>
              </div>

              <!-- General Category -->
              <div class="col-md-12 mb-3">
                <label for="exampleFormControlSelect1">What is the category of the complaint?</label><br>
                <button  v-for="(category, index) in categories" :class="category.isActive ? 'btn-dark text-white' : 'btn-light'" class="btn mb-2 mr-2" @click="makeCategoryActive(category.name)" :key="index">{{category.name}}</button>
              </div>

              <!-- General SubCategory -->
              <transition  appear name="u-fade"  mode="out-in" tag="div">
                <div class="col-md-12 mb-3" v-if="hasSubCategory">
                  <label for="exampleFormControlSelect1">What is the specific complaint?</label><br>
                  <div v-if="categoryItemInd !== null" class="w-100">
                    <button v-for="(complaintItem, index) in categories[categoryItemInd].subCategories" :key="index" class="btn mb-2 mr-2" :class="complaintItem.isActive ? 'btn-dark text-white' : 'btn-light'" @click="handleSubCategory('Headache', categoryItemInd, index)">{{ complaintItem.name }}</button>
                  </div>
                </div>
              </transition> 

              <!-- Complaint Questions -->
              <transition  appear name="u-fade"  mode="out-in" tag="div">
                <div v-show="showQuestions" class="w-100">
                  <div class="col-md-12 text-muted small mb-0 w-100">
                    Fixed Questions
                    <hr>
                  </div>
                  <div class="container">
                    <div class="row">
                      <div v-for="(question, index) in questions" class="col-md-12 mb-4" :key="index">
                        <div v-if="question.type === 'text'">
                          <label for="exampleFormControlSelect1">{{ question.question }}</label><br>
                          <input type="text" class="p-2 w-100" placeholder="Text input...">
                        </div>
                        <div v-if="question.type === 'button'">
                          <label for="exampleFormControlSelect1">{{ question.question }}</label><br>
                          <button class="btn mb-2 btn-light mr-2" v-for="(option, index) in question.options" :key="index">{{ option.name }}</button>
                        </div>
                      </div>
                    </div>
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
          this.subCategory = ''

          if (this.categories[index].subCategories) {
            self.hasSubCategory = true
            self.showQuestions = false
            self.categoryItemInd = index
          } else {
            self.hasSubCategory = false
            self.showQuestions = true
            self.questions = this.categories[index].questions
            self.categoryItemInd = null
          }

        } else {
          this.categories[index].isActive = false
        }
      })
    },
    handleSubCategory: function (categoryName, categoryInd, subCategoryInd) {
      const self = this
      this.complaintItem = categoryName
      this.showQuestions = true

      this.categories[categoryInd].subCategories.forEach(function(subCategory, index){
        console.log(index + ' : ' + subCategoryInd)
        if (index === subCategoryInd) {
          subCategory.isActive = true
          self.questions = subCategory.questions
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
      questions: [],
      categories: [
        {
          name: 'Pain',
          isActive: false,
          subCategories: [
            {
              name: 'Headache',
              isActive: false,
              questions: [
                {
                  question: "What how long has this been going on?",
                  type: 'text'
                },
                {
                  question: "Where did it start?",
                  type: 'button',
                  options: [
                    {
                      name: 'Front (R)',
                      isActive: false
                    },
                    {
                      name: 'Front (L)',
                      isActive: false
                    },
                    {
                      name: 'Back (R)',
                      isActive: false
                    },
                    {
                      name: 'Back (L)',
                      isActive: false
                    },
                    {
                      name: 'Middle',
                      isActive: false
                    },
                    {
                      name: 'All Over',
                      isActive: false
                    },
                  ]
                },
                {
                  question: "Where is it now?",
                  type: 'button',
                  options: [
                    {
                      name: 'Front (R)',
                      isActive: false
                    },
                    {
                      name: 'Front (L)',
                      isActive: false
                    },
                    {
                      name: 'Back (R)',
                      isActive: false
                    },
                    {
                      name: 'Back (L)',
                      isActive: false
                    },
                    {
                      name: 'Middle',
                      isActive: false
                    },
                    {
                      name: 'Did Not Move',
                      isActive: false
                    },
                    {
                      name: 'Other',
                      isActive: false
                    },
                  ]
                },
                {
                  question: "How did the pain start?",
                  type: 'button',
                  options: [
                    {
                      name: 'Sudden',
                      isActive: false
                    },
                    {
                      name: 'Gradual',
                      isActive: false
                    },
                    {
                      name: 'Other',
                      isActive: false
                    },
                  ]
                },
                {
                  question: "What is the intensity of the pain?",
                  type: 'button',
                  options: [
                    {
                      name: 'Mild',
                      isActive: false
                    },
                    {
                      name: 'Moderate',
                      isActive: false
                    },
                    {
                      name: 'Severe',
                      isActive: false
                    },
                    {
                      name: 'Varies',
                      isActive: false
                    }
                  ]
                },
                {
                  question: "What is the nature of the pain?",
                  type: 'button',
                  options: [
                    {
                      name: 'Continuous',
                      isActive: false
                    },
                    {
                      name: 'Comes and Goes',
                      isActive: false
                    },
                    {
                      name: 'Always there, but sometimes worse',
                      isActive: false
                    }
                  ]
                },
                {
                  question: "What brings it on?",
                  type: 'button',
                  options: [
                    {
                      name: 'Injury',
                      isActive: false
                    },
                    {
                      name: 'Bright Light',
                      isActive: false
                    },
                    {
                      name: 'Loud Noise',
                      isActive: false
                    },
                    {
                      name: 'None',
                      isActive: false
                    },
                    {
                      name: 'Other',
                      isActive: false
                    }
                  ]
                },
                {
                  question: "What is the pain relieved by?",
                  type: 'button',
                  options: [
                    {
                      name: 'None',
                      isActive: false
                    },
                    {
                      name: 'Other',
                      isActive: false
                    }
                  ]
                },
                {
                  question: "Are there any associated symptoms?",
                  type: 'button',
                  options: [
                    {
                      name: 'Vomiting',
                      isActive: false
                    },
                    {
                      name: 'Vertigo',
                      isActive: false
                    },
                    {
                      name: 'None',
                      isActive: false
                    },
                    {
                      name: 'Other',
                      isActive: false
                    }
                  ]
                },
              ]
            },
            {
              name: 'Ear Pain',
              isActive: false,
              questions: [
                {
                  question: "What how long has this been going on?",
                  type: 'text'
                },
                {
                  question: "Where did it start?",
                  type: 'button',
                  options: [
                    {
                      name: 'Right',
                      isActive: false
                    },
                    {
                      name: 'Left',
                      isActive: false
                    },
                    {
                      name: 'Both',
                      isActive: false
                    },
                  ]
                },
                {
                  question: "Where is it now?",
                  type: 'button',
                  options: [
                    {
                      name: 'Has Not Moved',
                      isActive: false
                    },
                    {
                      name: 'Other',
                      isActive: false
                    },
                  ]
                },
                {
                  question: "How did the pain start?",
                  type: 'button',
                  options: [
                    {
                      name: 'Sudden',
                      isActive: false
                    },
                    {
                      name: 'Gradual',
                      isActive: false
                    },
                    {
                      name: 'Other',
                      isActive: false
                    },
                  ]
                },
                {
                  question: "What is the intensity of the pain?",
                  type: 'button',
                  options: [
                    {
                      name: 'Mild',
                      isActive: false
                    },
                    {
                      name: 'Moderate',
                      isActive: false
                    },
                    {
                      name: 'Severe',
                      isActive: false
                    },
                    {
                      name: 'Varies',
                      isActive: false
                    }
                  ]
                },
                {
                  question: "What is the nature of the pain?",
                  type: 'button',
                  options: [
                    {
                      name: 'Continouos',
                      isActive: false
                    },
                    {
                      name: 'Comes and Goes',
                      isActive: false
                    },
                    {
                      name: 'Always there, but sometimes worse',
                      isActive: false
                    }
                  ]
                },
                {
                  question: "What brings it on?",
                  type: 'button',
                  options: [
                    {
                      name: 'None',
                      isActive: false
                    },
                    {
                      name: 'Other',
                      isActive: false
                    }
                  ]
                },
                {
                  question: "What is the pain relieved by?",
                  type: 'button',
                  options: [
                    {
                      name: 'None',
                      isActive: false
                    },
                    {
                      name: 'Other',
                      isActive: false
                    }
                  ]
                },
                {
                  question: "Are there any associated symptoms?",
                  type: 'button',
                  options: [
                    {
                      name: 'H/O Injury',
                      isActive: false
                    },
                    {
                      name: 'Discharge from Ear',
                      isActive: false
                    },
                    {
                      name: 'Bleeding from Ear',
                      isActive: false
                    },
                    {
                      name: 'Diminished Hearing',
                      isActive: false
                    },
                    {
                      name: 'Other',
                      isActive: false
                    },
                    {
                      name: 'None',
                      isActive: false
                    },
                  ]
                },
              ]
            },
            {
              name: 'Teeth Pain',
              isActive: false,
              questions: [
                {
                  question: "What how long has this been going on?",
                  type: 'text'
                },
                {
                  question: "Where did it start?",
                  type: 'button',
                  options: [
                    {
                      name: 'Upper Right',
                      isActive: false
                    },
                    {
                      name: 'Upper Left',
                      isActive: false
                    },
                    {
                      name: 'Lower Right',
                      isActive: false
                    },
                    {
                      name: 'Lower Left',
                      isActive: false
                    }
                  ]
                },
                {
                  question: "Where is it now?",
                  type: 'button',
                  options: [
                    {
                      name: 'Has Not Moved',
                      isActive: false
                    },
                    {
                      name: 'Other',
                      isActive: false
                    },
                  ]
                },
                {
                  question: "How did the pain start?",
                  type: 'button',
                  options: [
                    {
                      name: 'Sudden',
                      isActive: false
                    },
                    {
                      name: 'Gradual',
                      isActive: false
                    },
                    {
                      name: 'Other',
                      isActive: false
                    },
                  ]
                },
                {
                  question: "What is the intensity of the pain?",
                  type: 'button',
                  options: [
                    {
                      name: 'Mild',
                      isActive: false
                    },
                    {
                      name: 'Moderate',
                      isActive: false
                    },
                    {
                      name: 'Severe',
                      isActive: false
                    },
                    {
                      name: 'Varies',
                      isActive: false
                    }
                  ]
                },
                {
                  question: "What is the nature of the pain?",
                  type: 'button',
                  options: [
                    {
                      name: 'Continuous',
                      isActive: false
                    },
                    {
                      name: 'Comes and Goes',
                      isActive: false
                    },
                    {
                      name: 'Always there, but sometimes worse',
                      isActive: false
                    }
                  ]
                },
                {
                  question: "What brings it on?",
                  type: 'button',
                  options: [
                    {
                      name: 'None',
                      isActive: false
                    },
                    {
                      name: 'Other',
                      isActive: false
                    }
                  ]
                },
                {
                  question: "What is the pain relieved by?",
                  type: 'button',
                  options: [
                    {
                      name: 'None',
                      isActive: false
                    },
                    {
                      name: 'Other',
                      isActive: false
                    }
                  ]
                },
                {
                  question: "Are there any associated symptoms?",
                  type: 'button',
                  options: [
                    {
                      name: 'H/O Injury',
                      isActive: false
                    },
                    {
                      name: 'Bad Smell',
                      isActive: false
                    },
                    {
                      name: 'Swelling in Gum',
                      isActive: false
                    },
                    {
                      name: 'Bleeding from Gum',
                      isActive: false
                    },
                    {
                      name: 'None',
                      isActive: false
                    },
                    {
                      name: 'Other',
                      isActive: false
                    }
                  ]
                },
              ]
            },
            {
              name: 'Throat Pain',
              isActive: false,
              questions: [
                {
                  question: "What how long has this been going on?",
                  type: 'text'
                },
                {
                  question: "Where did it start?",
                  type: 'button',
                  options: [
                    {
                      name: 'Back of Mouth',
                      isActive: false
                    },
                    {
                      name: 'Front of Throat',
                      isActive: false
                    }
                  ]
                },
                {
                  question: "Where is it now?",
                  type: 'button',
                  options: [
                    {
                      name: 'Has Not Moved',
                      isActive: false
                    },
                    {
                      name: 'Other',
                      isActive: false
                    },
                  ]
                },
                {
                  question: "How did the pain start?",
                  type: 'button',
                  options: [
                    {
                      name: 'Sudden',
                      isActive: false
                    },
                    {
                      name: 'Gradual',
                      isActive: false
                    },
                    {
                      name: 'Other',
                      isActive: false
                    },
                  ]
                },
                {
                  question: "What is the intensity of the pain?",
                  type: 'button',
                  options: [
                    {
                      name: 'Mild',
                      isActive: false
                    },
                    {
                      name: 'Moderate',
                      isActive: false
                    },
                    {
                      name: 'Severe',
                      isActive: false
                    },
                    {
                      name: 'Varies',
                      isActive: false
                    }
                  ]
                },
                {
                  question: "What is the nature of the pain?",
                  type: 'button',
                  options: [
                    {
                      name: 'Continuous',
                      isActive: false
                    },
                    {
                      name: 'Comes and Goes',
                      isActive: false
                    },
                    {
                      name: 'Always there, but sometimes worse',
                      isActive: false
                    }
                  ]
                },
                {
                  question: "What brings it on?",
                  type: 'button',
                  options: [
                    {
                      name: 'None',
                      isActive: false
                    },
                    {
                      name: 'Other',
                      isActive: false
                    }
                  ]
                },
                {
                  question: "What is the pain relieved by?",
                  type: 'button',
                  options: [
                    {
                      name: 'None',
                      isActive: false
                    },
                    {
                      name: 'Other',
                      isActive: false
                    }
                  ]
                },
                {
                  question: "Are there any associated symptoms?",
                  type: 'button',
                  options: [
                    {
                      name: 'Cough',
                      isActive: false
                    },
                    {
                      name: 'Fever',
                      isActive: false
                    },
                    {
                      name: 'Change of Voice',
                      isActive: false
                    },
                    {
                      name: 'Difficulty Swallowing',
                      isActive: false
                    },
                    {
                      name: 'None',
                      isActive: false
                    },
                    {
                      name: 'Other',
                      isActive: false
                    }
                  ]
                },
              ]
            },
            {
              name: 'Back Pain',
              isActive: false,
              questions: [
                {
                  question: "What how long has this been going on?",
                  type: 'text'
                },
                {
                  question: "Where did it start?",
                  type: 'button',
                  options: [
                    {
                      name: 'Upper Right',
                      isActive: false
                    },
                    {
                      name: 'Upper Center',
                      isActive: false
                    },
                    {
                      name: 'Upper Left',
                      isActive: false
                    },
                    {
                      name: 'Lower Right',
                      isActive: false
                    },
                    {
                      name: 'Lower Center',
                      isActive: false
                    },
                    {
                      name: 'Lower Left',
                      isActive: false
                    },
                    {
                      name: 'All Over',
                      isActive: false
                    },
                  ]
                },
                {
                  question: "Where is it now?",
                  type: 'button',
                  options: [
                    {
                      name: 'Moved to the Front Right',
                      isActive: false
                    },
                    {
                      name: 'Moved to the Front Left',
                      isActive: false
                    },
                    {
                      name: 'Front of Leg (Right)',
                      isActive: false
                    },
                    {
                      name: 'Back of Leg (Right)',
                      isActive: false
                    },
                    {
                      name: 'Front of Leg (Left)',
                      isActive: false
                    },
                    {
                      name: 'Back of Leg (Left)',
                      isActive: false
                    },
                    {
                      name: 'All Over',
                      isActive: false
                    },
                    {
                      name: 'Other',
                      isActive: false
                    },
                  ]
                },
                {
                  question: "How did the pain start?",
                  type: 'button',
                  options: [
                    {
                      name: 'Sudden',
                      isActive: false
                    },
                    {
                      name: 'Gradual',
                      isActive: false
                    },
                    {
                      name: 'Other',
                      isActive: false
                    },
                  ]
                },
                {
                  question: "What is the intensity of the pain?",
                  type: 'button',
                  options: [
                    {
                      name: 'Mild',
                      isActive: false
                    },
                    {
                      name: 'Moderate',
                      isActive: false
                    },
                    {
                      name: 'Severe',
                      isActive: false
                    },
                    {
                      name: 'Varies',
                      isActive: false
                    }
                  ]
                },
                {
                  question: "What is the nature of the pain?",
                  type: 'button',
                  options: [
                    {
                      name: 'Continuous',
                      isActive: false
                    },
                    {
                      name: 'Comes and Goes',
                      isActive: false
                    },
                    {
                      name: 'Always there, but sometimes worse',
                      isActive: false
                    }
                  ]
                },
                {
                  question: "What brings it on?",
                  type: 'button',
                  options: [
                    {
                      name: 'Injury',
                      isActive: false
                    },
                    {
                      name: 'Bright Light',
                      isActive: false
                    },
                    {
                      name: 'Loud Noise',
                      isActive: false
                    },
                    {
                      name: 'None',
                      isActive: false
                    },
                    {
                      name: 'Other',
                      isActive: false
                    }
                  ]
                },
                {
                  question: "What is the pain relieved by?",
                  type: 'button',
                  options: [
                    {
                      name: 'Rest',
                      isActive: false
                    },
                    {
                      name: 'None',
                      isActive: false
                    },
                    {
                      name: 'Other',
                      isActive: false
                    }
                  ]
                },
                {
                  question: "Are there any associated symptoms?",
                  type: 'button',
                  options: [
                    {
                      name: 'H/O Injury',
                      isActive: false
                    },
                    {
                      name: 'Weakness of Legs',
                      isActive: false
                    },
                    {
                      name: 'Difficult to Control Urine',
                      isActive: false
                    },
                    {
                      name: 'None',
                      isActive: false
                    },
                    {
                      name: 'Other',
                      isActive: false
                    }
                  ]
                },
              ]
            },
            {
              name: 'Joint Pain',
              isActive: false,
              questions: [
                {
                  question: "What how long has this been going on?",
                  type: 'text'
                },
                {
                  question: "Where did it start?",
                  type: 'button',
                  options: [
                    {
                      name: 'Neck',
                      isActive: false
                    },
                    {
                      name: 'Shoulder (Right)',
                      isActive: false
                    },
                    {
                      name: 'Shoulder (Left)',
                      isActive: false
                    },
                    {
                      name: 'Shoulder (Back)',
                      isActive: false
                    },
                    {
                      name: 'Elbow (Right)',
                      isActive: false
                    },
                    {
                      name: 'Elbow (Left)',
                      isActive: false
                    },
                    {
                      name: 'Elbow (Back)',
                      isActive: false
                    },
                    {
                      name: 'Wrist (Right)',
                      isActive: false
                    },
                    {
                      name: 'Wrist (Left)',
                      isActive: false
                    },
                    {
                      name: 'Wrist (Back)',
                      isActive: false
                    },
                    {
                      name: 'All Fingers (Right)',
                      isActive: false
                    },
                    {
                      name: 'Thumb (Right)',
                      isActive: false
                    },
                    {
                      name: 'Index Finger (Right)',
                      isActive: false
                    },
                    {
                      name: 'Middle Finger (Right)',
                      isActive: false
                    },
                    {
                      name: 'Right Finger (Right)',
                      isActive: false
                    },
                    {
                      name: 'Little Finger (Right)',
                      isActive: false
                    },
                    {
                      name: 'All Fingers (Left)',
                      isActive: false
                    },
                    {
                      name: 'Thumb (Left)',
                      isActive: false
                    },
                    {
                      name: 'Index Finger (Left)',
                      isActive: false
                    },
                    {
                      name: 'Middle Finger (Left)',
                      isActive: false
                    },
                    {
                      name: 'Ring Finger (Left)',
                      isActive: false
                    },
                    {
                      name: 'Little Finger (Left)',
                      isActive: false
                    },
                    {
                      name: 'All Fingers (Back)',
                      isActive: false
                    },
                    {
                      name: 'Thumb (Back)',
                      isActive: false
                    },
                    {
                      name: 'Index Finger (Back)',
                      isActive: false
                    },
                    {
                      name: 'Middle Finger (Back)',
                      isActive: false
                    },
                    {
                      name: 'Ring Finger (Back)',
                      isActive: false
                    },
                    {
                      name: 'Little Finger (Back)',
                      isActive: false
                    },
                    {
                      name: 'Hip (Right)',
                      isActive: false
                    },
                    {
                      name: 'Hip (Left)',
                      isActive: false
                    },
                    {
                      name: 'Hip (Back)',
                      isActive: false
                    },
                    {
                      name: 'Knee (Right)',
                      isActive: false
                    },
                    {
                      name: 'Knee (Left)',
                      isActive: false
                    },
                    {
                      name: 'Knee (Back)',
                      isActive: false
                    },
                    {
                      name: 'Ankle (Right)',
                      isActive: false
                    },
                    {
                      name: 'Ankle (Left)',
                      isActive: false
                    },
                    {
                      name: 'Ankle (Back)',
                      isActive: false
                    },
                    {
                      name: 'All Toes (Right)',
                      isActive: false
                    },
                    {
                      name: 'Great Toe (Right)',
                      isActive: false
                    },
                    {
                      name: 'Other Toes (Right)',
                      isActive: false
                    },
                    {
                      name: 'All Toes (Left)',
                      isActive: false
                    },
                    {
                      name: 'Great Toe (Left)',
                      isActive: false
                    },
                    {
                      name: 'Other Toes (Left)',
                      isActive: false
                    },
                    {
                      name: 'Other Toes',
                      isActive: false
                    },
                    {
                      name: 'Other',
                      isActive: false
                    },
                  ]
                },
                {
                  question: "Where is it now?",
                  type: 'button',
                  options: [
                    {
                      name: 'Neck',
                      isActive: false
                    },
                    {
                      name: 'Shoulder (Right)',
                      isActive: false
                    },
                    {
                      name: 'Shoulder (Left)',
                      isActive: false
                    },
                    {
                      name: 'Shoulder (Back)',
                      isActive: false
                    },
                    {
                      name: 'Elbow (Right)',
                      isActive: false
                    },
                    {
                      name: 'Elbow (Left)',
                      isActive: false
                    },
                    {
                      name: 'Elbow (Back)',
                      isActive: false
                    },
                    {
                      name: 'Wrist (Right)',
                      isActive: false
                    },
                    {
                      name: 'Wrist (Left)',
                      isActive: false
                    },
                    {
                      name: 'Wrist (Back)',
                      isActive: false
                    },
                    {
                      name: 'All Fingers (Right)',
                      isActive: false
                    },
                    {
                      name: 'Thumb (Right)',
                      isActive: false
                    },
                    {
                      name: 'Index Finger (Right)',
                      isActive: false
                    },
                    {
                      name: 'Middle Finger (Right)',
                      isActive: false
                    },
                    {
                      name: 'Right Finger (Right)',
                      isActive: false
                    },
                    {
                      name: 'Little Finger (Right)',
                      isActive: false
                    },
                    {
                      name: 'All Fingers (Left)',
                      isActive: false
                    },
                    {
                      name: 'Thumb (Left)',
                      isActive: false
                    },
                    {
                      name: 'Index Finger (Left)',
                      isActive: false
                    },
                    {
                      name: 'Middle Finger (Left)',
                      isActive: false
                    },
                    {
                      name: 'Ring Finger (Left)',
                      isActive: false
                    },
                    {
                      name: 'Little Finger (Left)',
                      isActive: false
                    },
                    {
                      name: 'All Fingers (Back)',
                      isActive: false
                    },
                    {
                      name: 'Thumb (Back)',
                      isActive: false
                    },
                    {
                      name: 'Index Finger (Back)',
                      isActive: false
                    },
                    {
                      name: 'Middle Finger (Back)',
                      isActive: false
                    },
                    {
                      name: 'Ring Finger (Back)',
                      isActive: false
                    },
                    {
                      name: 'Little Finger (Back)',
                      isActive: false
                    },
                    {
                      name: 'Hip (Right)',
                      isActive: false
                    },
                    {
                      name: 'Hip (Left)',
                      isActive: false
                    },
                    {
                      name: 'Hip (Back)',
                      isActive: false
                    },
                    {
                      name: 'Knee (Right)',
                      isActive: false
                    },
                    {
                      name: 'Knee (Left)',
                      isActive: false
                    },
                    {
                      name: 'Knee (Back)',
                      isActive: false
                    },
                    {
                      name: 'Ankle (Right)',
                      isActive: false
                    },
                    {
                      name: 'Ankle (Left)',
                      isActive: false
                    },
                    {
                      name: 'Ankle (Back)',
                      isActive: false
                    },
                    {
                      name: 'All Toes (Right)',
                      isActive: false
                    },
                    {
                      name: 'Great Toe (Right)',
                      isActive: false
                    },
                    {
                      name: 'Other Toes (Right)',
                      isActive: false
                    },
                    {
                      name: 'All Toes (Left)',
                      isActive: false
                    },
                    {
                      name: 'Great Toe (Left)',
                      isActive: false
                    },
                    {
                      name: 'Other Toes (Left)',
                      isActive: false
                    },
                    {
                      name: 'Other Toes',
                      isActive: false
                    },
                    {
                      name: 'Other',
                      isActive: false
                    },
                  ]
                },
                {
                  question: "How did the pain start?",
                  type: 'button',
                  options: [
                    {
                      name: 'Sudden',
                      isActive: false
                    },
                    {
                      name: 'Gradual',
                      isActive: false
                    },
                    {
                      name: 'Other',
                      isActive: false
                    },
                  ]
                },
                {
                  question: "What is the intensity of the pain?",
                  type: 'button',
                  options: [
                    {
                      name: 'Mild',
                      isActive: false
                    },
                    {
                      name: 'Moderate',
                      isActive: false
                    },
                    {
                      name: 'Severe',
                      isActive: false
                    },
                    {
                      name: 'Varies',
                      isActive: false
                    }
                  ]
                },
                {
                  question: "What is the nature of the pain?",
                  type: 'button',
                  options: [
                    {
                      name: 'Continuous',
                      isActive: false
                    },
                    {
                      name: 'Comes and Goes',
                      isActive: false
                    },
                    {
                      name: 'Always there, but sometimes worse',
                      isActive: false
                    }
                  ]
                },
                {
                  question: "What brings it on?",
                  type: 'button',
                  options: [
                    {
                      name: 'Activity',
                      isActive: false
                    },
                    {
                      name: 'Inactivity',
                      isActive: false
                    },
                    {
                      name: 'None',
                      isActive: false
                    },
                    {
                      name: 'Other',
                      isActive: false
                    }
                  ]
                },
                {
                  question: "What is the pain relieved by?",
                  type: 'button',
                  options: [
                    {
                      name: 'Activity',
                      isActive: false
                    },
                    {
                      name: 'Inactivity',
                      isActive: false
                    },
                    {
                      name: 'None',
                      isActive: false
                    },
                    {
                      name: 'Other',
                      isActive: false
                    }
                  ]
                },
                {
                  question: "Are there any associated symptoms?",
                  type: 'button',
                  options: [
                    {
                      name: 'H/O Injury',
                      isActive: false
                    },
                    {
                      name: 'Swelling',
                      isActive: false
                    },
                    {
                      name: 'Inability to Move',
                      isActive: false
                    },
                    {
                      name: 'None',
                      isActive: false
                    },
                    {
                      name: 'Other',
                      isActive: false
                    }
                  ]
                },
              ]
            },
            {
              name: 'Chest Pain',
              isActive: false,
              questions: [
                {
                  question: "What how long has this been going on?",
                  type: 'text'
                },
                {
                  question: "Where did it start?",
                  type: 'button',
                  options: [
                    {
                      name: 'Upper (R)',
                      isActive: false
                    },
                    {
                      name: 'Upper (C)',
                      isActive: false
                    },
                    {
                      name: 'Upper (L)',
                      isActive: false
                    },
                    {
                      name: 'Lower (R)',
                      isActive: false
                    },
                    {
                      name: 'Lower (C)',
                      isActive: false
                    },
                    {
                      name: 'Lower (L)',
                      isActive: false
                    },
                    {
                      name: 'All Over',
                      isActive: false
                    },
                  ]
                },
                {
                  question: "Where is it now?",
                  type: 'button',
                  options: [
                    {
                      name: 'Upper (R)',
                      isActive: false
                    },
                    {
                      name: 'Upper (C)',
                      isActive: false
                    },
                    {
                      name: 'Upper (L)',
                      isActive: false
                    },
                    {
                      name: 'Lower (R)',
                      isActive: false
                    },
                    {
                      name: 'Lower (C)',
                      isActive: false
                    },
                    {
                      name: 'Lower (L)',
                      isActive: false
                    },
                    {
                      name: 'Arm (L)',
                      isActive: false
                    },
                    {
                      name: 'Lower (R)',
                      isActive: false
                    },
                    {
                      name: 'Neck/Jaw',
                      isActive: false
                    },
                    {
                      name: 'All Over',
                      isActive: false
                    },
                    {
                      name: 'Did Not Move',
                      isActive: false
                    },
                    {
                      name: 'Other',
                      isActive: false
                    },
                  ]
                },
                {
                  question: "How did the pain start?",
                  type: 'button',
                  options: [
                    {
                      name: 'Sudden',
                      isActive: false
                    },
                    {
                      name: 'Gradual',
                      isActive: false
                    },
                    {
                      name: 'Other',
                      isActive: false
                    },
                  ]
                },
                {
                  question: "What is the intensity of the pain?",
                  type: 'button',
                  options: [
                    {
                      name: 'Mild',
                      isActive: false
                    },
                    {
                      name: 'Moderate',
                      isActive: false
                    },
                    {
                      name: 'Severe',
                      isActive: false
                    },
                    {
                      name: 'Varies',
                      isActive: false
                    }
                  ]
                },
                {
                  question: "What is the nature of the pain?",
                  type: 'button',
                  options: [
                    {
                      name: 'Dull',
                      isActive: false
                    },
                    {
                      name: 'Sharp',
                      isActive: false
                    },
                    {
                      name: 'Sense of Pressure',
                      isActive: false
                    },
                    {
                      name: 'Constant',
                      isActive: false
                    }
                  ]
                },
                {
                  question: "What brings it on?",
                  type: 'button',
                  options: [
                    {
                      name: 'Exertion',
                      isActive: false
                    },
                    {
                      name: 'Cough',
                      isActive: false
                    },
                    {
                      name: 'Injury',
                      isActive: false
                    },
                    {
                      name: 'None',
                      isActive: false
                    },
                    {
                      name: 'Other',
                      isActive: false
                    },
                  ]
                },
                {
                  question: "What is the pain relieved by?",
                  type: 'button',
                  options: [
                    {
                      name: 'Rest',
                      isActive: false
                    },
                    {
                      name: 'None',
                      isActive: false
                    },
                    {
                      name: 'Other',
                      isActive: false
                    }
                  ]
                },
                {
                  question: "Are there any associated symptoms?",
                  type: 'button',
                  options: [
                    {
                      name: 'Sweating',
                      isActive: false
                    },
                    {
                      name: 'Extreme Anxiety',
                      isActive: false
                    },
                    {
                      name: 'Unconsciousness',
                      isActive: false
                    },
                    {
                      name: 'Difficulty Breathing',
                      isActive: false
                    },
                    {
                      name: 'None',
                      isActive: false
                    },
                    {
                      name: 'Other',
                      isActive: false
                    }
                  ]
                },
              ]
            },
            {
              name: 'Abdominal Pain',
              isActive: false,isActive: false,
              questions: [
                {
                  question: "What how long has this been going on?",
                  type: 'text'
                },
                {
                  question: "Where did it start?",
                  type: 'button',
                  options: [
                    {
                      name: 'Upper (R)',
                      isActive: false
                    },
                    {
                      name: 'Upper (C)',
                      isActive: false
                    },
                    {
                      name: 'Upper (L)',
                      isActive: false
                    },
                    {
                      name: 'Middle (R)',
                      isActive: false
                    },
                    {
                      name: 'Middle (C)',
                      isActive: false
                    },
                    {
                      name: 'Middle (L)',
                      isActive: false
                    },
                    {
                      name: 'Lower (R)',
                      isActive: false
                    },
                    {
                      name: 'Lower (C)',
                      isActive: false
                    },
                    {
                      name: 'Lower (L)',
                      isActive: false
                    },
                    {
                      name: 'All Over',
                      isActive: false
                    },
                  ]
                },
                {
                  question: "Where is it now?",
                  type: 'button',
                  options: [
                    {
                      name: 'Upper (R)',
                      isActive: false
                    },
                    {
                      name: 'Upper (C)',
                      isActive: false
                    },
                    {
                      name: 'Upper (L)',
                      isActive: false
                    },
                    {
                      name: 'Middle (R)',
                      isActive: false
                    },
                    {
                      name: 'Middle (C)',
                      isActive: false
                    },
                    {
                      name: 'Middle (L)',
                      isActive: false
                    },
                    {
                      name: 'Lower (R)',
                      isActive: false
                    },
                    {
                      name: 'Lower (C)',
                      isActive: false
                    },
                    {
                      name: 'Lower (L)',
                      isActive: false
                    },
                    {
                      name: 'Has Not Moved',
                      isActive: false
                    },
                    {
                      name: 'All Over',
                      isActive: false
                    },
                  ]
                },
                {
                  question: "How did the pain start?",
                  type: 'button',
                  options: [
                    {
                      name: 'Sudden',
                      isActive: false
                    },
                    {
                      name: 'Gradual',
                      isActive: false
                    },
                    {
                      name: 'Other',
                      isActive: false
                    },
                  ]
                },
                {
                  question: "What is the intensity of the pain?",
                  type: 'button',
                  options: [
                    {
                      name: 'Mild',
                      isActive: false
                    },
                    {
                      name: 'Moderate',
                      isActive: false
                    },
                    {
                      name: 'Severe',
                      isActive: false
                    },
                    {
                      name: 'Varies',
                      isActive: false
                    }
                  ]
                },
                {
                  question: "What is the nature of the pain?",
                  type: 'button',
                  options: [
                    {
                      name: 'Continuous',
                      isActive: false
                    },
                    {
                      name: 'Comes and Goes',
                      isActive: false
                    },
                    {
                      name: 'Always there, but sometimes worse',
                      isActive: false
                    }
                  ]
                },
                {
                  question: "What brings it on?",
                  type: 'button',
                  options: [
                    {
                      name: 'Food',
                      isActive: false
                    },
                    {
                      name: 'Empty Stomach',
                      isActive: false
                    },
                    {
                      name: 'Period',
                      isActive: false
                    },
                    {
                      name: 'None',
                      isActive: false
                    },
                    {
                      name: 'Other',
                      isActive: false
                    }
                  ]
                },
                {
                  question: "What is the pain relieved by?",
                  type: 'button',
                  options: [
                    {
                      name: 'Food',
                      isActive: false
                    },
                    {
                      name: 'Vomiting',
                      isActive: false
                    },
                    {
                      name: 'None',
                      isActive: false
                    },
                    {
                      name: 'Other',
                      isActive: false
                    }
                  ]
                },
                {
                  question: "Are there any associated symptoms?",
                  type: 'button',
                  options: [
                    {
                      name: 'Constipation',
                      isActive: false
                    },
                    {
                      name: 'Diarrhea',
                      isActive: false
                    },
                    {
                      name: 'Vomiting',
                      isActive: false
                    },
                    {
                      name: 'Loss of Appetite',
                      isActive: false
                    },
                    {
                      name: 'None',
                      isActive: false
                    },
                    {
                      name: 'Other',
                      isActive: false
                    }
                  ]
                },
              ]
            },
            {
              name: 'Breast Pain',
              isActive: false,
              questions: [
                {
                  question: "What how long has this been going on?",
                  type: 'text'
                },
                {
                  question: "Where did it start?",
                  type: 'button',
                  options: [
                    {
                      name: 'RUO (R)',
                      isActive: false
                    },
                    {
                      name: 'RLO (R)',
                      isActive: false
                    },
                    {
                      name: 'LUO (R)',
                      isActive: false
                    },
                    {
                      name: 'LLO (R)',
                      isActive: false
                    },
                    {
                      name: 'C (R)',
                      isActive: false
                    },
                    {
                      name: 'RUO (L)',
                      isActive: false
                    },
                    {
                      name: 'RLO (L)',
                      isActive: false
                    },
                    {
                      name: 'LUO (L)',
                      isActive: false
                    },
                    {
                      name: 'Back (L)',
                      isActive: false
                    },
                  ]
                },
                {
                  question: "Where is it now?",
                  type: 'button',
                  options: [
                    {
                      name: 'RUO (R)',
                      isActive: false
                    },
                    {
                      name: 'RLO (R)',
                      isActive: false
                    },
                    {
                      name: 'LUO (R)',
                      isActive: false
                    },
                    {
                      name: 'LLO (R)',
                      isActive: false
                    },
                    {
                      name: 'C (R)',
                      isActive: false
                    },
                    {
                      name: 'RUO (L)',
                      isActive: false
                    },
                    {
                      name: 'RLO (L)',
                      isActive: false
                    },
                    {
                      name: 'LUO (L)',
                      isActive: false
                    },
                    {
                      name: 'Back (L)',
                      isActive: false
                    },
                  ]
                },
                {
                  question: "How did the pain start?",
                  type: 'button',
                  options: [
                    {
                      name: 'Sudden',
                      isActive: false
                    },
                    {
                      name: 'Gradual',
                      isActive: false
                    },
                    {
                      name: 'Other',
                      isActive: false
                    },
                  ]
                },
                {
                  question: "What is the intensity of the pain?",
                  type: 'button',
                  options: [
                    {
                      name: 'Mild',
                      isActive: false
                    },
                    {
                      name: 'Moderate',
                      isActive: false
                    },
                    {
                      name: 'Severe',
                      isActive: false
                    },
                    {
                      name: 'Varies',
                      isActive: false
                    }
                  ]
                },
                {
                  question: "What is the nature of the pain?",
                  type: 'button',
                  options: [
                    {
                      name: 'Continuous',
                      isActive: false
                    },
                    {
                      name: 'Comes and Goes',
                      isActive: false
                    },
                    {
                      name: 'Always there, but sometimes worse',
                      isActive: false
                    }
                  ]
                },
                {
                  question: "What brings it on?",
                  type: 'button',
                  options: [
                    {
                      name: 'Period',
                      isActive: false
                    },
                    {
                      name: 'Activity',
                      isActive: false
                    },
                    {
                      name: 'None',
                      isActive: false
                    },
                    {
                      name: 'Other',
                      isActive: false
                    }
                  ]
                },
                {
                  question: "What is the pain relieved by?",
                  type: 'button',
                  options: [
                    {
                      name: 'Period',
                      isActive: false
                    },
                    {
                      name: 'Rest',
                      isActive: false
                    },
                    {
                      name: 'None',
                      isActive: false
                    },
                    {
                      name: 'Other',
                      isActive: false
                    }
                  ]
                },
                {
                  question: "Are there any associated symptoms?",
                  type: 'button',
                  options: [
                    {
                      name: 'Discharge from Nipple',
                      isActive: false
                    },
                    {
                      name: 'Bleeding from Nipple',
                      isActive: false
                    },
                    {
                      name: 'None',
                      isActive: false
                    },
                    {
                      name: 'Other',
                      isActive: false
                    }
                  ]
                },
              ]
            },
            {
              name: 'Scrotal Pain',
              isActive: false,isActive: false,
              questions: [
                {
                  question: "What how long has this been going on?",
                  type: 'text'
                },
                {
                  question: "Where did it start?",
                  type: 'button',
                  options: [
                    {
                      name: 'Left',
                      isActive: false
                    },
                    {
                      name: 'Right',
                      isActive: false
                    },
                    {
                      name: 'Both',
                      isActive: false
                    },
                  ]
                },
                {
                  question: "Where is it now?",
                  type: 'button',
                  options: [
                    {
                      name: 'Did Not Move',
                      isActive: false
                    },
                    {
                      name: 'Spread to Groin',
                      isActive: false
                    },
                    {
                      name: 'Other',
                      isActive: false
                    },
                  ]
                },
                {
                  question: "How did the pain start?",
                  type: 'button',
                  options: [
                    {
                      name: 'Sudden',
                      isActive: false
                    },
                    {
                      name: 'Gradual',
                      isActive: false
                    },
                    {
                      name: 'Other',
                      isActive: false
                    },
                  ]
                },
                {
                  question: "What is the intensity of the pain?",
                  type: 'button',
                  options: [
                    {
                      name: 'Mild',
                      isActive: false
                    },
                    {
                      name: 'Moderate',
                      isActive: false
                    },
                    {
                      name: 'Severe',
                      isActive: false
                    },
                    {
                      name: 'Varies',
                      isActive: false
                    }
                  ]
                },
                {
                  question: "What is the nature of the pain?",
                  type: 'button',
                  options: [
                    {
                      name: 'Continuous',
                      isActive: false
                    },
                    {
                      name: 'Comes and Goes',
                      isActive: false
                    },
                    {
                      name: 'Always there, but sometimes worse',
                      isActive: false
                    }
                  ]
                },
                {
                  question: "What brings it on?",
                  type: 'button',
                  options: [
                    {
                      name: 'Injury',
                      isActive: false
                    },
                    {
                      name: 'None',
                      isActive: false
                    },
                    {
                      name: 'Other',
                      isActive: false
                    }
                  ]
                },
                {
                  question: "What is the pain relieved by?",
                  type: 'button',
                  options: [
                    {
                      name: 'Rest',
                      isActive: false
                    },
                    {
                      name: 'None',
                      isActive: false
                    },
                    {
                      name: 'Other',
                      isActive: false
                    }
                  ]
                },
                {
                  question: "Are there any associated symptoms?",
                  type: 'button',
                  options: [
                    {
                      name: 'Swelling',
                      isActive: false
                    },
                    {
                      name: 'Dysuria',
                      isActive: false
                    },
                    {
                      name: 'None',
                      isActive: false
                    },
                    {
                      name: 'Other',
                      isActive: false
                    }
                  ]
                },
              ]
            },
            {
              name: 'Perianal Pain',
              isActive: false,isActive: false,
              questions: [
                {
                  question: "What how long has this been going on?",
                  type: 'text'
                },
                {
                  question: "Where did it start?",
                  type: 'button',
                  options: [
                    {
                      name: 'Anal Region',
                      isActive: false
                    },
                    {
                      name: 'Around the Anal Region',
                      isActive: false
                    },
                    {
                      name: 'Other',
                      isActive: false
                    }
                  ]
                },
                {
                  question: "Where is it now?",
                  type: 'button',
                  options: [
                    {
                      name: 'Has Not Moved',
                      isActive: false
                    },
                    {
                      name: 'Anal Region',
                      isActive: false
                    },
                    {
                      name: 'Around the Anal Region',
                      isActive: false
                    },
                    {
                      name: 'Other',
                      isActive: false
                    }
                  ]
                },
                {
                  question: "How did the pain start?",
                  type: 'button',
                  options: [
                    {
                      name: 'Sudden',
                      isActive: false
                    },
                    {
                      name: 'Gradual',
                      isActive: false
                    },
                    {
                      name: 'Other',
                      isActive: false
                    },
                  ]
                },
                {
                  question: "What is the intensity of the pain?",
                  type: 'button',
                  options: [
                    {
                      name: 'Mild',
                      isActive: false
                    },
                    {
                      name: 'Moderate',
                      isActive: false
                    },
                    {
                      name: 'Severe',
                      isActive: false
                    },
                    {
                      name: 'Varies',
                      isActive: false
                    }
                  ]
                },
                {
                  question: "What is the nature of the pain?",
                  type: 'button',
                  options: [
                    {
                      name: 'Continuous',
                      isActive: false
                    },
                    {
                      name: 'Comes and Goes',
                      isActive: false
                    },
                    {
                      name: 'Always there, but sometimes worse',
                      isActive: false
                    }
                  ]
                },
                {
                  question: "What brings it on?",
                  type: 'button',
                  options: [
                    {
                      name: 'Passage of Stool',
                      isActive: false
                    },
                    {
                      name: 'None',
                      isActive: false
                    },
                    {
                      name: 'Other',
                      isActive: false
                    }
                  ]
                },
                {
                  question: "What is the pain relieved by?",
                  type: 'button',
                  options: [
                    {
                      name: 'Rest',
                      isActive: false
                    },
                    {
                      name: 'None',
                      isActive: false
                    },
                    {
                      name: 'Other',
                      isActive: false
                    }
                  ]
                },
                {
                  question: "Are there any associated symptoms?",
                  type: 'button',
                  options: [
                    {
                      name: 'Fever',
                      isActive: false
                    },
                    {
                      name: 'Discharge',
                      isActive: false
                    },
                    {
                      name: 'Bleeding',
                      isActive: false
                    },
                    {
                      name: 'None',
                      isActive: false
                    },
                    {
                      name: 'Other',
                      isActive: false
                    }
                  ]
                },
              ]
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
          questions: [
            {
              question: "What how long has this been going on?",
              // type:
              options: ['Red', 'Green', 'Blue']
            },
            {
              question: "How has it progressed?",
              options: ['Red', 'Green', 'Blue']
            },
            {
              question: "What brings it on?",
              options: ['Red', 'Green', 'Blue']
            },
            {
              question: "What relieves it?",
              options: ['Red', 'Green', 'Blue']
            },
            {
              question: "Does it wake you up at night?",
              options: ['Red', 'Green', 'Blue']
            },
            {
              question: "Is there any chest pain?",
              options: ['Red', 'Green', 'Blue']
            },
            {
              question: "Are there any associated symptons?",
              options: ['Red', 'Green', 'Blue']
            },
          ]
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