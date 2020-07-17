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
                      <div v-for="(question, indexQuestion) in questions" class="col-md-12 mb-4" :key="indexQuestion">
                        <div v-if="question.type === 'text'">
                          <label for="exampleFormControlSelect1">{{ question.question }}</label><br>
                          <input type="text" class="p-2 w-100" placeholder="Text input...">
                        </div>
                        <div v-if="question.type === 'button'">
                          <label for="exampleFormControlSelect1">{{ question.question }}</label><br>
                          <button class="btn mb-2 btn-light mr-2" v-for="(option, indexAnswer) in question.options" :key="indexAnswer" @click="handleSelectAnswer(indexQuestion, indexAnswer)">{{ option.name }}</button>
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
              <div class="col-md-12 mb-5 text-center">
                <img src="/anatomy_sketch.png" alt="">
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
          <div class="w-100 bg-white mb-3 mt-0 px-3 pt-3 pb-1" key="allocation" style="min-height: 160px;" v-if="tabs[5].isActive">
            <div class="row mt-1">
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
          </transition>
        </div>
      </div>
    </div>
    <div class="container mb-3" v-if="tabs[5].isActive">
      <div class="row">
        <div class="col-md-12">
            <nuxt-link to="/ha/profile" class="w-100"><button @click="addToQueue" type="button" data-dismiss="modal" class="w-100 btn btn-dark rounded font-weight-bold py-3 mb-0 text-uppercase">Submit Allocation</button>
            </nuxt-link>
        </div>
        <div class="col-md-12">
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
            // has sub-category
            self.hasSubCategory = true
            self.showQuestions = false
            self.categoryItemInd = index
          } else {
            // does not have sub-category
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
    handleSelectAnswer: function (indexQuestion, indexAnswer) {
      console.log(indexQuestion, indexAnswer)
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
                  type: 'button',
                  options: [
                    {
                      name: 'A few days',
                      isActive: false
                    },
                    {
                      name: '1 week',
                      isActive: false
                    },
                    {
                      name: 'A few weeks',
                      isActive: false
                    },
                    {
                      name: '1 month',
                      isActive: false
                    },
                    {
                      name: 'A few months',
                      isActive: false
                    },
                    {
                      name: 'More than a few months',
                      isActive: false
                    },
                  ]
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
              questions: [
                {
                  question: "Where is it swelling?",
                  type: 'text'
                },
                {
                  question: "How many tumors are there?",
                  type: 'text'
                },
                {
                  question: "How long has it been there?",
                  type: 'text'
                },
                {
                  question: "How did it start?",
                  type: 'text'
                },
                {
                  question: "Is it painful?",
                  type: 'text'
                },
                {
                  question: "Has it changed in size?",
                  type: 'text'
                },
                {
                  question: "Are there any other symptoms?",
                  type: 'text'
                },
                {
                  question: "Is there any history of injury?",
                  type: 'text'
                },
                {
                  question: "Is there excessive sweating?",
                  type: 'text'
                },
                {
                  question: "Is there constipation?",
                  type: 'text'
                },
                {
                  question: "Are there any period problems?",
                  type: 'text'
                },
                {
                  question: "Has there been an excess in appetite?",
                  type: 'text'
                },
                {
                  question: "Is there a general weakness?",
                  type: 'text'
                },
              ]
            },
            {
              name: 'Abdomen Swelling',
              isActive: false,
              questions: [
                {
                  question: "Where is the swelling?",
                  type: 'text'
                },
                {
                  question: "How many tumors are there?",
                  type: 'text'
                },
                {
                  question: "How long has it been there?",
                  type: 'text'
                },
                {
                  question: "How did it start?",
                  type: 'text'
                },
                {
                  question: "Is it painful?",
                  type: 'text'
                },
                {
                  question: "Has it changed in size?",
                  type: 'text'
                },
                {
                  question: "Are there any other symptoms?",
                  type: 'text'
                },
                {
                  question: "Is there any history of injury?",
                  type: 'text'
                },
                {
                  question: "Is it general abdoinal pain?",
                  type: 'text'
                },
                {
                  question: "Has there been a change in weight?",
                  type: 'text'
                },
                {
                  question: "What is the bowel habit?",
                  type: 'text'
                },
                {
                  question: "Is there yellow colour in urine?",
                  type: 'text'
                },
                {
                  question: "Has there been any vomiting?",
                  type: 'text'
                },
                {
                  question: "Has there been a change in appetite?",
                  type: 'text'
                },
                {
                  question: "Are there any flucuations in size?",
                  type: 'text'
                },
              ]
            },
            {
              name: 'Swelling (Others)',
              isActive: false,
              questions: [
                {
                  question: "Where is the swelling?",
                  type: 'text'
                },
                {
                  question: "How many swellings are there?",
                  type: 'text'
                },
                {
                  question: "How long has it been there?",
                  type: 'text'
                },
                {
                  question: "How did it start?",
                  type: 'text'
                }, 
                {
                  question: "Is it painful?",
                  type: 'text'
                },
                {
                  question: "Has it changed in size?",
                  type: 'text'
                },
                {
                  question: "Has there been a change in skin color?",
                  type: 'text'
                },
                {
                  question: "Are there any other symptoms?",
                  type: 'text'
                },
                {
                  question: "Is there any history of injury?",
                  type: 'text'
                },
              ]
            },
          ]
        },
        {
          name: 'Difficulty Breathing',
          isActive: false,
          questions: [
            {
              question: "What how long has this been going on?",
              type: 'text'
            },
            {
              question: "How has it progressed?",
              type: 'button',
              options: [
                {
                  name: 'Same as Before',
                  isActive: false
                },
                {
                  name: 'Worsening',
                  isActive: false
                },
                {
                  name: 'Improving',
                  isActive: false
                },
                {
                  name: 'Varies with Season',
                  isActive: false
                },
                {
                  name: 'Other',
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
                  name: 'Climbing Stairs',
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
              question: "What is the difficulty relieved?",
              type: 'button',
              options: [
                {
                  name: 'Resting',
                  isActive: false
                },
                {
                  name: 'Sitting Up',
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
              question: "Does it wake you up at night?",
              type: 'button',
              options: [
                {
                  name: 'Yes',
                  isActive: false
                },
                {
                  name: 'No',
                  isActive: false
                }
              ]
            },
            {
              question: "Is there a cough?",
              type: 'button',
              options: [
                {
                  name: 'Yes',
                  isActive: false
                },
                {
                  name: 'No',
                  isActive: false
                }
              ]
            },
            {
              question: "Are there any associated symptoms?",
              type: 'button',
              options: [
                {
                  name: 'General Weakness',
                  isActive: false
                },
                {
                  name: 'Fever',
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
            }
          ]
        },
        {
          name: 'Fever',
          isActive: false,
          questions: [
            {
              question: "What how long has this been going on?",
              type: 'text'
            },
            {
              question: "How has it progressed?",
              type: 'button',
              options: [
                {
                  name: 'Same as Before',
                  isActive: false
                },
                {
                  name: 'Worsening',
                  isActive: false
                },
                {
                  name: 'Improving',
                  isActive: false
                },
                {
                  name: 'Varies with Season',
                  isActive: false
                },
                {
                  name: 'Other',
                  isActive: false
                }
              ]
            },
            {
              question: "What is the nature of the fever?",
              type: 'button',
              options: [
                {
                  name: 'Everyday',
                  isActive: false
                },
                {
                  name: 'Alternate',
                  isActive: false
                },
                {
                  name: 'Irregular',
                  isActive: false
                },
                {
                  name: 'Other',
                  isActive: false
                }
              ]
            },
            {
              question: "What is the type?",
              type: 'button',
              options: [
                {
                  name: 'All Day',
                  isActive: false
                },
                {
                  name: 'Part of the Day (morning)',
                  isActive: false
                },
                {
                  name: 'Part of the Day (evening)',
                  isActive: false
                },
                {
                  name: 'Part of the Day (night)',
                  isActive: false
                },
                {
                  name: 'Other',
                  isActive: false
                }
              ]
            },
            {
              question: "What is the temperature of the patient?",
              type: 'button',
              options: [
                {
                  name: 'Low',
                  isActive: false
                },
                {
                  name: 'Medium',
                  isActive: false
                },
                {
                  name: 'High',
                  isActive: false
                },
                {
                  name: 'Combined High and Low',
                  isActive: false
                },
                {
                  name: 'Other',
                  isActive: false
                },
              ]
            },
            {
              question: "Is there shivering?",
              type: 'button',
              options: [
                {
                  name: 'Yes',
                  isActive: false
                },
                {
                  name: 'No',
                  isActive: false
                }
              ]
            },
            {
              question: "Is there a cough?",
              type: 'button',
              options: [
                {
                  name: 'Yes',
                  isActive: false
                },
                {
                  name: 'No',
                  isActive: false
                }
              ]
            },
            {
              question: "Is there a cough with blood?",
              type: 'button',
              options: [
                {
                  name: 'Yes',
                  isActive: false
                },
                {
                  name: 'No',
                  isActive: false
                }
              ]
            },
            {
              question: "Is there pain?",
              type: 'button',
              options: [
                {
                  name: 'Yes',
                  isActive: false
                },
                {
                  name: 'No',
                  isActive: false
                }
              ]
            },
            {
              question: "Is there general weakness?",
              type: 'button',
              options: [
                {
                  name: 'Yes',
                  isActive: false
                },
                {
                  name: 'No',
                  isActive: false
                }
              ]
            },
            {
              question: "Is there loss of weight?",
              type: 'button',
              options: [
                {
                  name: 'Yes',
                  isActive: false
                },
                {
                  name: 'No',
                  isActive: false
                }
              ]
            },
            {
              question: "Is there a burning or more frequency in urine?",
              type: 'button',
              options: [
                {
                  name: 'Yes',
                  isActive: false
                },
                {
                  name: 'No',
                  isActive: false
                },
                {
                  name: 'Other',
                  isActive: false
                }
              ]
            },
            {
              question: "Are there any reliefs?",
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
              question: "Describe any possible causes.",
              type: 'button',
              options: [
                {
                  name: 'General Weakness',
                  isActive: false
                },
                {
                  name: 'Fever',
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
          name: 'Diarrhoea',
          isActive: false,
          questions: [
            {
              question: "How long has this been happening?",
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
              question: "What is the stool type?",
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
              question: "What is the nature of this complaint?",
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
              question: "How is the frequency?",
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
              question: "Is there blood in the stool?",
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
              question: "Does the complaint intensify with food?",
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
              question: "Are there any current medications?",
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
          ]
        },
        {
          name: 'Vomiting',
          isActive: false,
          questions: [
            {
              question: "How long has this been happening?",
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
              question: "What is the nature of the vomiting?",
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
              question: "What is the frequency?",
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
              question: "Has appetitie changed?",
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
              question: "What causes the vomiting?",
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
              question: "What provides relief?",
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
              question: "Is there blood?",
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
              question: "Any associated symptoms?",
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
          ]
        },
        {
          name: 'Dizziness',
          isActive: false,
          questions: [
            {
              question: "How long has this been happening?",
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
              question: "What is the nature of the dizziness?",
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
              question: "When does the dizziness occur?",
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
              question: "What causes the dizziness?",
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
              question: "What provides relief?",
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
              question: "Is there a relation with positioning?",
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
              question: "Is there H/O fainting?",
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
              question: "Is there H/O fall?",
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
              question: "Any associated symptoms?",
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
              question: "Has there been a change in hearing?",
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
              question: "Has there been a change in vision?",
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
          ]
        },
        {
          name: 'Acidity/Indigestion',
          isActive: false,
          questions: [
            {
              question: "How long has this been happening?",
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
              question: "Is there any abdominal pain?",
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
              question: "Is there any vomiting?",
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
              question: "Is there any nausea?",
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
              question: "Is there a loss of appetite?",
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
              question: "Is there constipation?",
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
              question: "Is there diarrhea?",
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
              question: "What causes the complaint?",
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
              question: "Is there H/O jaundice?",
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
              question: "Is there H/O alcohol ingestion?",
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
              question: "Has there been a change weight?",
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
          ]
        },
        {
          name: 'Yellow Urine',
          isActive: false,
          questions: [
            {
              question: "How long has this been happening?",
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
              question: "Is there any abdominal pain?",
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
              question: "Is there any fever?",
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
              question: "What is the color of stool?",
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
              question: "Is there any bleeding with urine?",
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
              question: "Is there a general weakness?",
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
          ]
        },
        {
          name: 'Skin Rash',
          isActive: false,
          questions: [
            {
              question: "Where is the rash located?",
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
              question: "How big is the rash?",
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
              question: "How many are there?",
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
              question: "Provide a description of the surface.",
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
              question: "Provide a description of the color.",
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
          ]
        },
        {
          name: 'Bleeding with Stool',
          isActive: false,
          questions: [
            {
              question: "Where is the color of the stool?",
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
              question: "What is the amount of stool?",
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
              question: "Is there pain during the passing of stool?",
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
              question: "Is there any constipation",
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
              question: "Is there any diarrhea?",
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
          ]
        },
        {
          name: 'Gynae Problems',
          isActive: false,
          subCategories: [
            {
              name: 'Period Problem',
              isActive: false,
              questions: [
                {
                  question: "Is the patient married?",
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
                  question: "When was the last LMP?",
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
                  question: "What is the duration of the patient's period?",
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
                  question: "What is the interval between periods?",
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
                  question: "Flow?",
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
                  question: "How many of children are there?",
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
                  question: "How many pregnancies?",
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
                  question: "What age was the patient at first childbirth?",
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
                  question: "What age was the patient at the last childbirth?",
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
                  question: "Please describe any contraception practice?",
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
                  question: "What was the age of onset?",
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
                  question: "Are there any associated symptoms?",
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
                  question: "Is there any pain?",
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
              ]
            },
            {
              name: 'Ante-natal Problem',
              isActive: false,
              questions: [
                {
                  question: "Is the patient married?",
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
                  question: "When was the last LMP?",
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
                  question: "What is the duration of the patient's period?",
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
                  question: "What is the interval between periods?",
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
                  question: "Flow?",
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
                  question: "How many of children are there?",
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
                  question: "How many pregnancies?",
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
                  question: "What age was the patient at first childbirth?",
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
                  question: "What age was the patient at the last childbirth?",
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
                  question: "Please describe any contraception practice?",
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
                  question: "What was the age of onset?",
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
                  question: "Are there any associated symptoms?",
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
                  question: "Is there any pain?",
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
              ]
            },
            {
              name: 'Infertility Problem',
              isActive: false,
              questions: [
                {
                  question: "Is the patient married?",
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
                  question: "When was the last LMP?",
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
                  question: "What is the duration of the patient's period?",
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
                  question: "What is the interval between periods?",
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
                  question: "Flow?",
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
                  question: "How many of children are there?",
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
                  question: "How many pregnancies?",
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
                  question: "What age was the patient at first childbirth?",
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
                  question: "What age was the patient at the last childbirth?",
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
                  question: "Please describe any contraception practice?",
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
                  question: "What was the age of onset?",
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
                  question: "Are there any associated symptoms?",
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
                  question: "Is there any pain?",
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
              ]
            },
            {
              name: 'Intercourse Problem',
              isActive: false,
              questions: [
                {
                  question: "Is the patient married?",
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
                  question: "When was the last LMP?",
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
                  question: "What is the duration of the patient's period?",
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
                  question: "What is the interval between periods?",
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
                  question: "Flow?",
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
                  question: "How many of children are there?",
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
                  question: "How many pregnancies?",
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
                  question: "What age was the patient at first childbirth?",
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
                  question: "What age was the patient at the last childbirth?",
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
                  question: "Please describe any contraception practice?",
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
                  question: "What was the age of onset?",
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
                  question: "Are there any associated symptoms?",
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
                  question: "Is there any pain?",
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
              ]
            },
            {
              name: 'Problem with Private Parts',
              isActive: false,
              questions: [
                {
                  question: "Is the patient married?",
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
                  question: "When was the last LMP?",
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
                  question: "What is the duration of the patient's period?",
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
                  question: "What is the interval between periods?",
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
                  question: "Flow?",
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
                  question: "How many of children are there?",
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
                  question: "How many pregnancies?",
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
                  question: "What age was the patient at first childbirth?",
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
                  question: "What age was the patient at the last childbirth?",
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
                  question: "Please describe any contraception practice?",
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
                  question: "What was the age of onset?",
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
                  question: "Are there any associated symptoms?",
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
                  question: "Is there any pain?",
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
              ]
            },
          ]
        },
        {
          name: 'Injury',
          isActive: false,
          questions: [
            {
              question: "Where is the injury located?",
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
              question: "How was the injury sustained?",
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
              question: "When was the injury sustained?",
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
              question: "Describe other problems and issues resulting from the injury.",
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
              question: "Is there any bleeding?",
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
            }
          ]
        },
        {
          name: 'Boils',
          isActive: false,
          questions: [
            {
              question: "How long have the boils been there?",
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
              question: "Where is are the boils located?",
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
              question: "How did the boils start?",
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
              question: "Is there any pain or discomfort?",
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
              question: "Describe the color of the skin over the boils.",
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
            }
          ]
        },
        {
          name: 'Ulcer',
          isActive: false,
          questions: [
            {
              question: "How long has the ulcer been there?",
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
              question: "Where is the ulcer located?",
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
              question: "How did the ulcer start?",
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
              question: "Is there any pain or discomfort?",
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
              question: "Describe the surface of the ulcer.",
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
              question: "Describe the edges of the ulcer.",
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
              question: "What is the size of the ulcer??",
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
              question: "How is the fainting relieved?",
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
            }
          ]
        },
        {
          name: 'Fainting',
          isActive: false,
          questions: [
            {
              question: "How many episodes have there been?",
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
              question: "What is the interavl between episodes?",
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
              question: "Is consciousness loss during fainting?",
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
              question: "Are there any associated fits?",
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
              question: "Is there dizziness?",
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
              question: "Was there a fall?",
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
              question: "What brings on the fainting?",
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
              question: "How is the fainting relieved?",
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
            }
          ]
        },
        {
          name:  'Weakness',
          isActive: false,
          subCategories: [
            {
              name: 'General Weakness',
              isActive: false,
              questions: [
                {
                  question: "What is the duration?",
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
                  question: "Is there an appetite?",
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
                  question: "Has there been a change in weight?",
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
                  question: "Is there any abdominal pain?",
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
                  question: "Is there any chest pain?",
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
                  question: "Are there any associated symptoms?",
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
                }
              ]
            },
            {
              name: 'Particular Weakness',
              isActive: false,
              questions: [
                {
                  question: "What is the duration?",
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
                  question: "Is there an appetite?",
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
                  question: "Has there been a change in weight?",
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
                  question: "Is there any abdominal pain?",
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
                  question: "Is there any chest pain?",
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
                  question: "Are there any associated symptoms?",
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
                }
              ]
            }
          ]
        },
        {
          name: 'Palpitation',
          isActive: false,
          questions: [
            {
              question: "What is the duration?",
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
              question: "What is the type of palpitation?",
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
              question: "How long do the palpitations last?",
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
              question: "Are there any associated symptoms?",
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
            }
          ]
        },
        // {
        //   name: 'Mental Health Problem',
        //   isActive: false,
        // },
        // {
        //   name: 'Other Category',
        //   isActive: false,
        // },
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
        },
        {
          name: 'allocation',
          title: 'Allocation',
          isActive: false,
        }
      ]
    }
  },
}
</script>