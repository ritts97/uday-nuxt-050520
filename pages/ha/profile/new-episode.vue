<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-md-12 rounded">
          <ul class="list-inline mb-2">
            <li class="list-inline-item" v-for="(tab, index) in tabs" :key="index">
              <div class="px-2 mr-2 pb-1 mb-1" @click="getTab(tab.name, tab.isEnabled)" :class="{ underline: tab.isActive,  'text-muted': !tab.isEnabled, 'pointer': tab.isEnabled }" role="button">
                {{ tab.title }}
              </div>
            </li>
          </ul>

          <transition  appear name="u-fade"  mode="out-in">

          <div key="chiefComplaints" v-if="tabs[0].isActive">
            <div class="w-100 bg-white mb-3 mt-0 px-3 pt-3 pb-3" style="min-height: 200px;">
              <!-- Chief Complaints<br><br> -->
              <div class="row mt-1">
                <div class="col-md-12 text-muted small mb-0">
                  Please generalize the chief complaint. <br>
                  <hr>
                </div>

                <!-- General Category -->
                <div class="col-md-12 mb-3">
                  <label for="exampleFormControlSelect1">What is the category of the complaint?
                     </label><br>
                  <button  v-for="(category, index) in categories" :class="category.isActive ? 'btn-dark text-white' : 'btn-light'" class="btn mb-2 mr-2" @click="makeCategoryActive(category.name)" :key="index">{{category.name}}</button>
                </div>
                <!-- General SubCategory -->
                <transition  appear name="u-fade"  mode="out-in" tag="div">
                  <div class="col-md-12 mb-3" v-if="hasSubCategory">
                    <label for="exampleFormControlSelect1">What is the specific complaint? 
                      </label><br>
                    <div v-if="categoryItemInd !== null" class="w-100">
                      <button v-for="(complaintItem, index) in categories[categoryItemInd].subCategories" :key="index" class="btn mb-2 mr-2" :class="complaintItem.isActive ? 'btn-dark text-white' : 'btn-light'" @click="handleSubCategory(currCategory, categoryItemInd, index)">{{ complaintItem.name }}</button>
                    </div>
                  </div>
                </transition> 
              </div>
            </div>
            <!-- Button: Go to Next Section -->
            <div class="container mb-3">
              <div class="row">
                <div class="col-md-12 px-0">
                  <!-- {{ subCategoryInd }} -->
                    <button @click="goToNext()" :disabled="(!categoryIndex && !hasSubCategory) || (hasSubCategory && subCategoryInd <= -1)" type="button" class="w-100 btn btn-dark rounded font-weight-bold py-3 mb-0 text-uppercase">
                      Go to Fixed Questions
                    </button>
                </div>
              </div>
            </div>
          </div>

          <div key="fixed-questions" v-if="tabs[1].isActive">
            <div class="w-100 bg-white mb-3 mt-0 px-3 pt-3 pb-3" style="min-height: 200px;">
              <div class="row mt-1">
                <div class="col-md-12 mb-0 px-0">
                  <div class="col-md-12 text-muted small mb-0 w-100">
                    Chief Complain, whFixed Questions
                    <hr>
                  </div>
                  <transition  appear name="u-fade"  mode="out-in" tag="div">
                    <div v-show="showQuestions" class="w-100">
                      <div class="container">
                        <div class="row">
                          <div class="col-md-12 mb-3">
                            <button class="btn mb-2 btn-dark mr-2" v-if="currCategory">{{ currCategory }}</button>
                            <button class="btn mb-2 btn-dark mr-2" v-if="subCategoryInd >= 0">{{ subCategory }}</button><br>
                          </div>
                          <div v-for="(question, indexQuestion) in questions" class="col-md-12 mb-4" :key="indexQuestion">
                            <div v-if="question.type === 'text'">
                              <label for="exampleFormControlSelect1">{{ question.question }}</label><br>
                              <input type="text" class="p-2 w-100" :placeholder="question.placeholder || 'There is no placeholder.'">
                            </div>
                            <div v-if="question.type === 'button'">
                              <label for="exampleFormControlSelect1">{{ question.question }}</label><br>
                              <button class="btn mb-2 mr-2" v-for="(option, indexAnswer) in question.options" :key="indexAnswer" :class="option.isActive ? 'btn-dark text-white' : 'btn-light'" @click="handleSelectAnswer(indexQuestion, indexAnswer)">
                                {{ option.name }}
                              </button>
                            </div>
                            <div v-if="question.type === 'select'">
                              <label for="exampleFormControlSelect1">{{ question.question }}</label><br>
                              <select class="form-control" id="exampleFormControlSelect1">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </transition>
                </div>
              </div>
            </div>
            <!-- Button: Go to Next Section -->
            <div class="container mb-3">
              <div class="row">
                <div class="col-md-12 px-0">
                    <button @click="goToNext()" type="button" class="w-100 btn btn-dark rounded font-weight-bold py-3 mb-0 text-uppercase">
                      Go to Vitals
                    </button>
                </div>
              </div>
            </div>
          </div>

          <div key="pre-check" v-if="tabs[2].isActive">
            <div class="w-100 bg-white mb-3 mt-0 px-3 pt-3 pb-3" style="min-height: 200px;">
              <div class="row mt-1">
                <div class="col-md-12 text-muted small mb-0">
                  <!-- Pre-Check Questions: -->
                  Please complete all the pre-check requirements below.
                  <hr>
                </div>
                <div class="col-md-12 mb-3">
                  <input type="checkbox" class="mr-3 mb-2">Have you washed your hands? <br>
                  <input type="checkbox" class="mr-3 mb-2">If you are examning a female patient, is there a female chaperon in the room? <br>
                  <input type="checkbox" class="mr-3 mb-2">Have you greeted the patient by name? <br>
                  <input type="checkbox" class="mr-3 mb-2">Ask the patient to sit/lie down comfortably, assist if necessary? <br>
                  <input type="checkbox" class="mr-3 mb-2">Watch as the patient walks to the chair/couch? <br>
                  <input type="checkbox" class="mr-3 mb-2">Ask the patient if there is any pain anywhere, and if so, approach that region last and very slowly? <br>
                </div>
              </div>
            </div>
            <!-- Button: Go to Next Section -->
            <div class="container mb-3">
              <div class="row">
                <div class="col-md-12 px-0">
                    <button @click="goToNext()" type="button" class="w-100 btn btn-dark rounded font-weight-bold py-3 mb-0 text-uppercase">
                      Go to General Exams
                    </button>
                </div>
              </div>
            </div>
          </div>

          <div key="vitals" v-if="tabs[3].isActive">
            <div class="w-100 bg-white mb-3 mt-0 px-3 pt-3 pb-3" style="min-height: 200px;">
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
            <!-- Button: Go to Next Section -->
            <div class="container mb-3">
              <div class="row">
                <div class="col-md-12 px-0">
                    <button @click="goToNext()" type="button" class="w-100 btn btn-dark rounded font-weight-bold py-3 mb-0 text-uppercase">
                      Go to General Exams
                    </button>
                </div>
              </div>
            </div>
          </div>

          <div key="generalExams" v-if="tabs[4].isActive">
            <div class="w-100 bg-white mb-3 mt-0 px-3 pt-3 pb-3" style="min-height: 200px;">
              <div class="row mt-1">
                <div class="col-md-12 mb-5 text-center">
                  <img src="/anatomy_sketch.png" alt="">
                </div>
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
            <!-- Button: Go to Next Section -->
            <div class="container mb-3">
              <div class="row">
                <div class="col-md-12 px-0">
                    <button @click="goToNext()" type="button" class="w-100 btn btn-dark rounded font-weight-bold py-3 mb-0 text-uppercase">
                      Go to Specific Exams
                    </button>
                </div>
              </div>
            </div>
          </div>

          <div key="specificExams" v-if="tabs[5].isActive">
            <div class="w-100 bg-white mb-3 mt-0 px-3 pt-3 pb-3" style="min-height: 200px;">
              <!-- Specific Exams
              <br><br> -->
              <div class="row mt-1">
                <div class="col-md-12 mb-5 text-center">
                  <img src="/anatomy_sketch.png" alt="">
                </div>
                <div class="col-md-12 text-muted small">
                  Specific Exam Questions
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
            <!-- Button: Go to Next Section -->
            <div class="container mb-3">
              <div class="row">
                <div class="col-md-12 px-0">
                    <button @click="goToNext()" type="button" class="w-100 btn btn-dark rounded font-weight-bold py-3 mb-0 text-uppercase">
                      Go to Photos
                    </button>
                </div>
              </div>
            </div>
          </div>

          <div key="addPhotos" v-if="tabs[6].isActive">
            <div class="w-100 bg-white mb-3 mt-0 px-3 pt-3 pb-1" style="min-height: 200px;">
              <div class="row mt-1">

                <div class="col-md-12 text-muted small">
                  Please include any additional photos where applicable.
                  <hr>
                </div>
                <!-- <div class="col-md-12">
                  <div class="custom-file">
                </div> -->
                <div class="col-md-3 mb-4">
                  <img src="/square-grey.jpg" class="w-100" alt="">
                </div>
                <div class="col-md-3 mb-4">
                  <img src="/square-grey-add.jpg" class="w-100" alt="">
                </div>
              </div>
            </div>
            <!-- Button: Go to Next Section -->
            <div class="container mb-3">
              <div class="row">
                <div class="col-md-12 px-0">
                    <button @click="goToNext()" type="button" class="w-100 btn btn-dark rounded font-weight-bold py-3 mb-0 text-uppercase">
                      Go to Allocations
                    </button>
                </div>
              </div>
            </div>
          </div>


          <div key="allocation" v-if="tabs[7].isActive">
            <div class="w-100 bg-white mb-3 mt-0 px-3 pt-3 pb-1" style="min-height: 160px;">
              <div class="row mt-1">
                <div class="col-md-12 mb-2">
                  Please select a doctor to allocate this patient to:
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
            <div class="row">
              <div class="col-md-12">
                  <nuxt-link to="/ha/profile" class="w-100">
                    <button @click="addToQueue" type="button" data-dismiss="modal" class="w-100 btn btn-dark rounded font-weight-bold py-3 mb-0 text-uppercase">
                      Submit Allocation
                    </button>
                  </nuxt-link>
              </div>
              <div class="col-md-12">
              </div>
            </div>
          </div>
          </transition>
        </div>
      </div>


      <img src="/anatomy_sketch.png" class="d-none" alt="">
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
          self.currCategory = clickedCategory
          // this.subCategory = ''
          self.categoryIndex = index

          if (this.categories[index].subCategories) {
            // has sub-category
            self.hasSubCategory = true
            self.showQuestions = false
            self.categoryItemInd = index
            self.subCategoryInd = -1

            this.categories[index].subCategories.forEach(function(subCategory, index){
              subCategory.isActive = false
            })
          } else {
            // does not have sub-category
            self.hasSubCategory = false
            self.showQuestions = true
            self.questions = this.categories[index].questions
            self.categoryItemInd = null
            self.subCategoryInd = -1
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
      // this.subCategory = categoryName
      this.subCategoryInd = subCategoryInd

      // console.log(categoryName)

      this.categories[categoryInd].subCategories.forEach(function(subCategory, index){
        // console.log(self.subCategory)
        if (index === subCategoryInd) {
          subCategory.isActive = true
          self.questions = subCategory.questions
          self.subCategory = subCategory.name
        } else {
          subCategory.isActive = false
        }
      })
    },
    handleSelectAnswer: function (indexQuestion, indexAnswer) {
      // currCategory
      // subCategory
      // let questions

      // // if (this.categories[this.currCategory].subCategories !== undefined) {
      // //   // questions = this.categories[this.currCategory].subCategories[self.subCategoryIndex].questions
      // // // } else {
      // //   questions = this.categories[this.currCategory].questions
      // // }
      // // console.log(this.categories[this.categoryIndex])

      // if ('subCategories' in this.categories[this.categoryIndex]) {
      // //   console.log('Subcategories exist')
      // //   console.log(this.categories[this.categoryIndex].subCategories[this.subCategoryInd])
      //   questions = this.categories[this.categoryIndex].subCategories[this.subCategoryInd].questions
      // } else {
      //   questions = this.categories[this.categoryIndex].questions
      // }

      // console.log(questions[indexQuestion].options)

      this.questions[indexQuestion].options.forEach((question, index) => {
        if (indexAnswer === index) {
          question.isActive = true
        } else {
          question.isActive = false
        }
      })

      console.log(indexQuestion, indexAnswer)
    },
    showAlert: function () {
      alert(`This episode has been recorded.`)
    },
    getTab: function (tabName, tabIsEnabled) {
      let tabs = this.tabs
      let ref = 0

      if (tabIsEnabled) {
        for (let i = 0; i < tabs.length; i++) {
        console.log('----')
        console.log(tabName, i)
        console.log(tabs[i].isEnabled)
        console.log('----')
        // if (tabs[i].name === tabName) {
        //   if (tabs[i].isEnabled) {
        //     tabs[i].isActive = true 
        //   }
        // } else if (tabs[i].name === tabName && !tabs[i].isEnabled) {
        //   tabs[i].isActive = false 
        // }
        if (tabs[i].isEnabled) {
          if (tabs[i].name === tabName) {
            tabs[i].isActive = true
          } else {
            tabs[i].isActive = false
          }
        }
      }
      
        //   // if (tabs[i].name === tabName) {
        //   //   tabs[i].isActive = true
        //   //   // ref = i
        //   // } else {
        //   //   tabs[i].isActive = false
        //   // }
        // } 
        
        // if (tabs[i].isEnabled && tabs[i].name !== tabName) {
        //   tabs[i].isActive = false
        // }
        // if (tabs[i].isEnabled) {
          // if (tabs[i].name === tabName) {
          //   tabs[i].isActive = true
          //   // ref = i
          // } else {
          //   tabs[i].isActive = false
          // }
        // } 

        // if (ref == (tabs.length - 1)) {
        //   this.showComplete = true
        // } else {
        //   this.showComplete = false
        // }
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

      // if ((ref + 1) >= (tabs.length-1)) {
      //   this.showComplete = true
      // } 

      tabs[ref + 1].isActive = true
      tabs[ref + 1].isEnabled = true
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
      categoryIndex: null,
      subCategory: '',
      subCategoryInd: null,
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
                  question: "How long has this been going on?",
                  type: 'text',
                  placeholder: 'Describe the # of days'
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
                  question: "How long has this been going on?",
                  type: 'text',
                  placeholder: 'Describe the # of days'
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
                      name: 'Has not moved',
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
                  question: "How long has this been going on?",
                  type: 'text',
                  placeholder: 'Describe the # of days'
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
                      name: 'Has not moved',
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
                  question: "How long has this been going on?",
                  type: 'text',
                  placeholder: 'Describe the # of days'
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
                      name: 'Has not moved',
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
                  question: "How long has this been going on?",
                  type: 'text',
                  placeholder: 'Describe the # of days'
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
                  question: "How long has this been going on?",
                  type: 'text',
                  placeholder: 'Describe the # of days'
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
                  question: "How long has this been going on?",
                  type: 'text',
                  placeholder: 'Describe the # of days'
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
                  question: "How long has this been going on?",
                  type: 'text',
                  placeholder: 'Describe the # of days'
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
                      name: 'Has not moved',
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
                  question: "How long has this been going on?",
                  type: 'text',
                  placeholder: 'Describe the # of days'
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
                  question: "How long has this been going on?",
                  type: 'text',
                  placeholder: 'Describe the # of days'
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
                  question: "How long has this been going on?",
                  type: 'text',
                  placeholder: 'Describe the # of days'
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
                      name: 'Has not moved',
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
                  type: 'button',
                  options: [
                    {
                      name: 'Back of Motuh',
                      isActive: false
                    },
                    {
                      name: 'Front of Throat',
                      isActive: false
                    },
                  ]
                },
                {
                  question: "How long has it been there?",
                  type: 'text'
                },
                {
                  question: "How did it start?",
                  type: 'button',
                  options: [
                    {
                      name: 'Gradually',
                      isActive: false
                    },
                    {
                      name: 'Suddenly',
                      isActive: false
                    },
                  ]
                },
                {
                  question: "Is it painful?",
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
                  ]
                },
                {
                  question: "Has it changed in size?",
                  type: 'button',
                  options: [
                    {
                      name: 'No Change',
                      isActive: false
                    },
                    {
                      name: 'Increased',
                      isActive: false
                    },
                    {
                      name: 'Decreased',
                      isActive: false
                    },
                  ]
                },
                {
                  question: "Has there been a change in skin color?",
                  type: 'button',
                  options: [
                    {
                      name: 'No Change',
                      isActive: false
                    },
                    {
                      name: 'Change',
                      isActive: false
                    },
                  ]
                },
                {
                  question: "Are there any other symptoms?",
                  type: 'button',
                  options: [
                    {
                      name: 'Difficulty in Work',
                      isActive: false
                    },
                    {
                      name: 'Difficulty in Movement',
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
                  question: "Is there any history of injury?",
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
                  ]
                },
                {
                  question: "Is there excessive sweating?",
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
                  ]
                },
                {
                  question: "Is there constipation?",
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
                  ]
                },
                {
                  question: "Are there any period problems?",
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
                  ]
                },
                {
                  question: "Has there been an excess in appetite?",
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
                  ]
                },
                {
                  question: "Is there a general weakness?",
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
                  ]
                },
              ]
            },
            {
              name: 'Abdomen Swelling',
              isActive: false,
              questions: [
                {
                  question: "Where is the swelling?",
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
                  ]
                },
                {
                  question: "How many tumors are there?",
                  type: 'select'
                },
                {
                  question: "How long has it been there?",
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
                  ]
                },
                {
                  question: "How did it start?",
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
                  ]
                },
                {
                  question: "Is it painful?",
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
                  ]
                },
                {
                  question: "Has it changed in size?",
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
                  ]
                },
                {
                  question: "Are there any other symptoms?",
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
                  ]
                },
                {
                  question: "Is there any history of injury?",
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
                  ]
                },
                {
                  question: "Is it general abdominal pain?",
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
                  ]
                },
                {
                  question: "Has there been a change in weight?",
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
                  ]
                },
                {
                  question: "What is the bowel habit?",
                  type: 'text',
                  placeholder: 'Please describe the # of times per day'
                },
                {
                  question: "Is there yellow colour in urine?",
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
                  ]
                },
                {
                  question: "Has there been any vomiting?",
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
                  ]
                },
                {
                  question: "Has there been a change in appetite?",
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
                  ]
                },
                {
                  question: "Are there any flucuations in swelling size?",
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
                  ]
                },
              ]
            },
            {
              name: 'Swelling (Other)',
              isActive: false,
              questions: [
                {
                  question: "Where is the swelling?",
                  type: 'text'
                },
                {
                  question: "How many swellings are there?",
                  type: 'select'
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
                question: "How long has this been going on?",
                type: 'text',
                placeholder: 'Describe the # of days'
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
              question: "How long has this been going on?",
              type: 'text',
              placeholder: 'Describe the # of days'
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
              question: "When does the fever come on?",
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
              question: "Is there burning, or more frequency in urine?",
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
              type: 'text',
              placeholder: 'Describe any possible causes'
            },
          ]
        },
        {
          name: 'Diarrhoea',
          isActive: false,
          questions: [
            {
              question: "How long has this been happening?",
              type: 'text',
              placeholder: 'Describe the # of days',
            },
            {
              question: "What is the stool type?",
              type: 'button',
              options: [
                {
                  name: 'Watery',
                  isActive: false
                },
                {
                  name: 'Soft',
                  isActive: false
                },
                {
                  name: 'Ill-formed',
                  isActive: false
                },
                {
                  name: 'Other',
                  isActive: false
                }
              ]
            },
            {
              question: "What is the nature of this complaint?",
              type: 'button',
              options: [
                {
                  name: 'Happens Everyday',
                  isActive: false
                },
                {
                  name: 'Happens Somedays',
                  isActive: false
                },
              ]
            },
            {
              question: "What is the frequency?",
              type: 'text',
              placeholder: 'Describe the # of times per day',
            }, 
            {
              question: "Is there blood in the stool?",
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
              ]
            },
            {
              question: "Are there any associated symptoms?",
              type: 'button',
              options: [
                {
                  name: 'Abdominal Pain',
                  isActive: false
                },
                {
                  name: 'Vomiting',
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
            {
              question: "Is there any relation to food?",
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
              ]
            },
            {
              question: "Are there any current medications?",
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
              type: 'text',
              placeholder: 'Please describe the # of days',
            },
            {
              question: "What is the nature of the vomiting?",
              type: 'button',
              options: [
                {
                  name: 'Happens Everyday',
                  isActive: false
                },
                {
                  name: 'Happens Somedays',
                  isActive: false
                },
              ]
            },
            {
              question: "What is the frequency?",
              type: 'text',
              placeholder: 'Please describe the # of days between incidents',
            },
            {
              question: "Has appetitie changed?",
              type: 'button',
              options: [
                {
                  name: 'Normal',
                  isActive: false
                },
                {
                  name: 'Less',
                  isActive: false
                },
                {
                  name: 'More',
                  isActive: false
                },
              ]
            }, 
            {
              question: "What causes the vomiting?",
              type: 'text',
              placeholder: 'Please describe any relevant information',
            },
            {
              question: "Is there any relief?",
              type: 'text',
              placeholder: 'Please describe any relevant information',
            },
            {
              question: "Is there blood?",
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
              ]
            },
            {
              question: "Is there nausea?",
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
              ]
            },
            {
              question: "Any associated symptoms?",
              type: 'button',
              options: [
                {
                  name: 'Abdominal Pain',
                  isActive: false
                },
                {
                  name: 'Loss of Weight',
                  isActive: false
                },
                {
                  name: 'Headache',
                  isActive: false
                },
                {
                  name: 'Diarrhoea',
                  isActive: false
                },
                {
                  name: 'Constipation',
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
          name: 'Dizziness',
          isActive: false,
          questions: [
            {
              question: "How long has this been happening?",
              type: 'text',
              placeholder: 'Please describe the # of days',
            },
            {
              question: "What is the nature of the dizziness?",
              type: 'button',
              options: [
                {
                  name: 'Happens Everyday',
                  isActive: false
                },
                {
                  name: 'Happens Somedays',
                  isActive: false
                },
              ]
            },
            {
              question: "When does the dizziness occur?",
              type: 'button',
              options: [
                {
                  name: 'Whole Day',
                  isActive: false
                },
                {
                  name: 'Part of Day (morning)',
                  isActive: false
                },
                {
                  name: 'Part of Day (evening)',
                  isActive: false
                },
                {
                  name: 'Part of Day (night)',
                  isActive: false
                },
                {
                  name: 'Other',
                  isActive: false
                },
              ]
            },
            {
              question: "What causes the dizziness?",
              type: 'text',
              placeholder: 'Please describe any possible causes',
            },
            {
              question: "What provides relief?",
              type: 'text',
              placeholder: 'Please describe any possible causes',
            },
            {
              question: "Is there a relation with positioning?",
              type: 'button',
              options: [
                {
                  name: 'Lying Down',
                  isActive: false
                },
                {
                  name: 'Standing Up',
                  isActive: false
                },
                {
                  name: 'Moving Neck',
                  isActive: false
                },
                {
                  name: 'Opening Eyes',
                  isActive: false
                },
                {
                  name: 'Other',
                  isActive: false
                }
              ]
            },
            {
              question: "Is there H/O fainting?",
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
              ]
            },
            {
              question: "Is there H/O fall?",
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
                  name: 'Chest Pain',
                  isActive: false
                },
                {
                  name: 'Breathlessness',
                  isActive: false
                },
                {
                  name: 'Pain in Ear',
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
              question: "Has there been a change in hearing?",
              type: 'button',
              options: [
                {
                  name: 'Normal',
                  isActive: false
                },
                {
                  name: 'Diminished',
                  isActive: false
                },
              ]
            },
            {
              question: "Has there been a change in vision?",
              type: 'button',
              options: [
                {
                  name: 'Normal',
                  isActive: false
                },
                {
                  name: 'Less',
                  isActive: false
                },
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
              type: 'text',
              placeholder: 'Please describe the # of days',
            },
            {
              question: "Is there any abdominal pain?",
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
              ]
            },
            {
              question: "Is there any vomiting?",
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
              ]
            },
            {
              question: "Is there any nausea?",
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
              ]
            },
            {
              question: "Is there a loss of appetite?",
              type: 'button',
              options: [
                {
                  name: 'Normal',
                  isActive: false
                },
                {
                  name: 'Less',
                  isActive: false
                },
              ]
            },
            {
              question: "Is there any constipation?",
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
              ]
            },
            {
              question: "Is there any diarrhea?",
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
              ]
            },
            {
              question: "Is there H/O jaundice?",
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
              ]
            },
            {
              question: "Is there H/O alcohol ingestion?",
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
              ]
            },
            {
              question: "Is there H/O smoking?",
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
              ]
            },
            {
              question: "Has there been a change weight?",
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
              type: 'text',
              placeholder: 'Please describe the # of days',
            },
            {
              question: "Is there any abdominal pain?",
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
              ]
            },
            {
              question: "Is there any fever?",
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
              ]
            },
            {
              question: "What is the color of stool?",
              type: 'text',
              placeholder: 'Please describe any relevant information',
            },
            {
              question: "Is there any bleeding with urine?",
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
              ]
            },
            {
              question: "Is there a general weakness?",
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
              type: 'text',
              placeholder: 'Please describe the location on body',
            },
            {
              question: "How big is the rash?",
              type: 'text',
              placeholder: 'Please describe the size in cm x cm',
            },
            {
              question: "How many rashes are there?",
              type: 'button',
              options: [
                {
                  name: 'Single',
                  isActive: false
                },
                {
                  name: 'Multiple (2-5)',
                  isActive: false
                },
                {
                  name: 'Many (5+)',
                  isActive: false
                },
              ]
            },
            {
              question: "Provide a description of the surface.",
              type: 'button',
              options: [
                {
                  name: 'Smooth',
                  isActive: false
                },
                {
                  name: 'Rough',
                  isActive: false
                },
              ]
            },
            {
              question: "Provide a description of the color.",
              type: 'text',
              placeholder: 'Please describe any relevant information',
            },
          ]
        },
        {
          name: 'Bleeding with Stool',
          isActive: false,
          questions: [
            {
              question: "What is the color of the stool?",
              type: 'button',
              options: [
                {
                  name: 'Bright Red',
                  isActive: false
                },
                {
                  name: 'Dark Red',
                  isActive: false
                },
                {
                  name: 'Other',
                  isActive: false
                },
              ]
            },
            {
              question: "What is the amount of stool?",
              type: 'button',
              options: [
                {
                  name: 'A lot',
                  isActive: false
                },
                {
                  name: 'Droplets',
                  isActive: false
                },
              ]
            },
            {
              question: "Is there pain during the passing of stool?",
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
              ]
            },
            {
              question: "Has there been a change in bowel habit?",
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
              ]
            },
            {
              question: "Is there any constipation?",
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
              ]
            },
            {
              question: "Is there any diarrhoea?",
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
                      name: 'Yes',
                      isActive: false
                    },
                    {
                      name: 'No',
                      isActive: false
                    },
                  ]
                },
                {
                  question: "When was the last LMP?",
                  type: 'text',
                  placeholder: 'Please describe # of days',
                },
                {
                  question: "What is the duration of the patient's period?",
                  type: 'text',
                  placeholder: 'Please describe # of days',
                },
                {
                  question: "What is the interval between periods?",
                  type: 'button',
                  options: [
                    {
                      name: 'Regular – # of Days',
                      isActive: false
                    },
                    {
                      name: 'Varies – # to # days',
                      isActive: false
                    },
                  ]
                },
                {
                  question: "What is flow?",
                  type: 'button',
                  options: [
                    {
                      name: 'Normal',
                      isActive: false
                    },
                    {
                      name: 'Heavy',
                      isActive: false
                    },
                    {
                      name: 'Low',
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
                  type: 'text',
                  placeholder: 'Describe the # of children'
                },
                {
                  question: "How many pregnancies have there been?",
                  type: 'text',
                  placeholder: 'Describe the # of pregnancies'
                },
                {
                  question: "What age was the patient at first childbirth?",
                  type: 'text',
                  placeholder: 'Please describe the age at children',
                },
                {
                  question: "How old was the patient at the last childbirth?",
                  type: 'text',
                  placeholder: 'Please describe the age at last childbirth',
                },
                {
                  question: "Is contraception practiced?",
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
                  ]
                },
                {
                  question: "What was the age of onset?",
                  type: 'text',
                  placeholder: 'Describe the age of onset'
                },
                {
                  question: "Are there any associated symptoms?",
                  type: 'button',
                  options: [
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
                {
                  question: "Is there any pain?",
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
                      name: 'Yes',
                      isActive: false
                    },
                    {
                      name: 'No',
                      isActive: false
                    },
                  ]
                }
                ,{
                  question: "When was the last LMP?",
                  type: 'text',
                  placeholder: 'Please describe # of days',
                },
                {
                  question: "What is the duration of the patient's period?",
                  type: 'text',
                  placeholder: 'Please describe the # of days',
                },
                {
                  question: "What is the interval between periods?",
                  type: 'button',
                  options: [
                    {
                      name: 'Regular – # of Days',
                      isActive: false
                    },
                    {
                      name: 'Varies – # to # days',
                      isActive: false
                    },
                  ]
                },
                {
                  question: "What is flow?",
                  type: 'button',
                  options: [
                    {
                      name: 'Normal',
                      isActive: false
                    },
                    {
                      name: 'Heavy',
                      isActive: false
                    },
                    {
                      name: 'Low',
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
                  type: 'text',
                  placeholder: 'Describe the # of children'
                },
                {
                  question: "How many pregnancies have there been?",
                  type: 'text',
                  placeholder: 'Describe the # of pregnancies'
                },
                {
                  question: "What age was the patient at first childbirth?",
                  type: 'text',
                  placeholder: 'Please describe the age at children',
                },
                {
                  question: "How old was the patient at the last childbirth?",
                  type: 'text',
                  placeholder: 'Please describe the age at last childbirth',
                },
                {
                  question: "Is contraception practiced?",
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
                  ]
                },
                {
                  question: "What was the age of onset?",
                  type: 'text',
                  placeholder: 'Describe the age of onset'
                },
                {
                  question: "Are there any associated symptoms?",
                  type: 'button',
                  options: [
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
                {
                  question: "Is there any pain?",
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
                      name: 'Yes',
                      isActive: false
                    },
                    {
                      name: 'No',
                      isActive: false
                    },
                  ]
                },
                {
                  question: "When was the last LMP?",
                  type: 'text',
                  placeholder: 'Please describe any relevant information.',
                },
                {
                  question: "What is the duration of the patient's period?",
                  type: 'text',
                  placeholder: 'Please describe any relevant information.',
                },
                {
                  question: "What is the interval between periods?",
                  type: 'button',
                  options: [
                    {
                      name: 'Regular – # of Days',
                      isActive: false
                    },
                    {
                      name: 'Varies – # to # days',
                      isActive: false
                    },
                  ]
                },
                {
                  question: "What is flow?",
                  type: 'button',
                  options: [
                    {
                      name: 'Normal',
                      isActive: false
                    },
                    {
                      name: 'Heavy',
                      isActive: false
                    },
                    {
                      name: 'Low',
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
                  type: 'text',
                  placeholder: 'Describe the # of children'
                },
                {
                  question: "How many pregnancies have there been?",
                  type: 'text',
                  placeholder: 'Describe the # of pregnancies'
                },
                {
                  question: "What age was the patient at first childbirth?",
                  type: 'text',
                  placeholder: 'Please describe the age at children',
                },
                {
                  question: "How old was the patient at the last childbirth?",
                  type: 'text',
                  placeholder: 'Please describe the age at last childbirth',
                },
                {
                  question: "Is contraception practiced?",
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
                  ]
                },
                {
                  question: "What was the age of onset?",
                  type: 'text',
                  placeholder: 'Describe the age of onset'
                },
                {
                  question: "Are there any associated symptoms?",
                  type: 'button',
                  options: [
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
                {
                  question: "Is there any pain?",
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
                  ]
                },
              ]
            },
            {
              name: 'Private Parts Problem',
              isActive: false,
              questions: [
                {
                  question: "Is the patient married?",
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
                  ]
                },
                {
                  question: "When was the last LMP?",
                  type: 'text',
                  placeholder: 'Please describe any relevant information.',
                },
                {
                  question: "What is the duration of the patient's period?",
                  type: 'text',
                  placeholder: 'Please describe any relevant information.',
                },
                {
                  question: "What is the interval between periods?",
                  type: 'button',
                  options: [
                    {
                      name: 'Regular – # of Days',
                      isActive: false
                    },
                    {
                      name: 'Varies – # to # days',
                      isActive: false
                    },
                  ]
                },
                {
                  question: "What is flow?",
                  type: 'button',
                  options: [
                    {
                      name: 'Normal',
                      isActive: false
                    },
                    {
                      name: 'Heavy',
                      isActive: false
                    },
                    {
                      name: 'Low',
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
                  type: 'text',
                  placeholder: 'Describe the # of children'
                },
                {
                  question: "How many pregnancies have there been?",
                  type: 'text',
                  placeholder: 'Describe the # of pregnancies'
                },
                {
                  question: "What age was the patient at first childbirth?",
                  type: 'text',
                  placeholder: 'Please describe the age at children',
                },
                {
                  question: "How old was the patient at the last childbirth?",
                  type: 'text',
                  placeholder: 'Please describe the age at last childbirth',
                },
                {
                  question: "Is contraception practiced?",
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
                  ]
                },
                {
                  question: "What was the age of onset?",
                  type: 'text',
                  placeholder: 'Describe the age of onset'
                },
                {
                  question: "Are there any associated symptoms?",
                  type: 'button',
                  options: [
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
                {
                  question: "Is there any pain?",
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
                      name: 'Yes',
                      isActive: false
                    },
                    {
                      name: 'No',
                      isActive: false
                    },
                  ]
                },
                {
                  question: "When was the last LMP?",
                  type: 'text',
                  placeholder: 'Please describe any relevant information.',
                },
                {
                  question: "What is the duration of the patient's period?",
                  type: 'text',
                  placeholder: 'Please describe any relevant information.',
                },
                {
                  question: "What is the interval between periods?",
                  type: 'button',
                  options: [
                    {
                      name: 'Regular – # of Days',
                      isActive: false
                    },
                    {
                      name: 'Varies – # to # days',
                      isActive: false
                    },
                  ]
                },
                {
                  question: "What is flow?",
                  type: 'button',
                  options: [
                    {
                      name: 'Normal',
                      isActive: false
                    },
                    {
                      name: 'Heavy',
                      isActive: false
                    },
                    {
                      name: 'Low',
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
                  type: 'text',
                  placeholder: 'Describe the # of children'
                },
                {
                  question: "How many pregnancies have there been?",
                  type: 'text',
                  placeholder: 'Describe the # of pregnancies'
                },
                {
                  question: "What age was the patient at first childbirth?",
                  type: 'text',
                  placeholder: 'Please describe the age at children',
                },
                {
                  question: "How old was the patient at the last childbirth?",
                  type: 'text',
                  placeholder: 'Please describe the age at last childbirth',
                },
                {
                  question: "Is contraception practiced?",
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
                  ]
                },
                {
                  question: "What was the age of onset?",
                  type: 'text',
                  placeholder: 'Describe the age of onset'
                },
                {
                  question: "Are there any associated symptoms?",
                  type: 'button',
                  options: [
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
                {
                  question: "Is there any pain?",
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
                  name: 'Location on Body',
                  isActive: false
                },
              ]
            },
            {
              question: "How was the injury sustained?",
              type: 'button',
              options: [
                {
                  name: 'Fall (at home)',
                  isActive: false
                },
                {
                  name: 'Fall (on road)',
                  isActive: false
                },
                {
                  name: 'Fall (on height)',
                  isActive: false
                },
                {
                  name: 'Hit by Car',
                  isActive: false
                },
                {
                  name: 'Hit by Bike',
                  isActive: false
                },
                {
                  name: 'Hit by Bicycle',
                  isActive: false
                },
                {
                  name: 'Hit by Machine',
                  isActive: false
                },
                {
                  name: 'Cut',
                  isActive: false
                },
                {
                  name: 'Violence',
                  isActive: false
                }
              ]
            },
            {
              question: "When was the injury sustained?",
              type: 'text',
              placeholder: 'Please describe the # of days',
            },
            {
              question: "Describe other problems and issues resulting from the injury.",
              type: 'button',
              options: [
                {
                  name: 'Can\'t Walk',
                  isActive: false
                },
                {
                  name: 'Can\'t Move',
                  isActive: false
                },
                {
                  name: 'Pain',
                  isActive: false
                },
              ]
            },
            {
              question: "Is there any bleeding?",
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
              type: 'text',
              placeholder: '# of days'
            },
            {
              question: "Where is are the boils located?",
              type: 'text',
              placeholder: 'Describe the location on body'
            },
            {
              question: "How did the boils start?",
              type: 'button',
              options: [
                {
                  name: 'Injury',
                  isActive: false
                },
                {
                  name: 'On its Own',
                  isActive: false
                },
                {
                  name: 'Other',
                  isActive: false
                },
              ]
            },
            {
              question: "Is there any pain or discomfort?",
              type: 'button',
              options: [
                {
                  name: 'Throbbing',
                  isActive: false
                },
                {
                  name: 'Dull',
                  isActive: false
                },
                {
                  name: 'Continuous',
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
              question: "Describe the color of the skin over the boils.",
              type: 'button',
              options: [
                {
                  name: 'Red',
                  isActive: false
                },
                {
                  name: 'Normal',
                  isActive: false
                },
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
              type: 'text',
              placeholder: 'Please describe the # of days',
            },
            {
              question: "Where is the ulcer located?",
              type: 'text',
              placeholder: 'Please describe the location on body',
            },
            {
              question: "How did the ulcer start?",
              type: 'button',
              options: [
                {
                  name: 'Injury',
                  isActive: false
                },
                {
                  name: 'On its Own',
                  isActive: false
                },
                {
                  name: 'Other',
                  isActive: false
                },
              ]
            },
            {
              question: "Is there any pain or discomfort?",
              type: 'button',
              options: [
                {
                  name: 'Throbbing',
                  isActive: false
                },
                {
                  name: 'Dull',
                  isActive: false
                },
                {
                  name: 'Continuous',
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
              question: "Describe the surface of the ulcer.",
              type: 'button',
              options: [
                {
                  name: 'Clean',
                  isActive: false
                },
                {
                  name: 'Dirty',
                  isActive: false
                },
                {
                  name: 'Pink',
                  isActive: false
                },
                {
                  name: 'Black',
                  isActive: false
                },
                {
                  name: 'Green',
                  isActive: false
                },
                {
                  name: 'Mixed',
                  isActive: false
                }
              ]
            },
            {
              question: "Describe the edges of the ulcer.",
              type: 'button',
              options: [
                {
                  name: 'Raised',
                  isActive: false
                },
                {
                  name: 'Flat with Surface',
                  isActive: false
                },
              ]
            },
            {
              question: "What is the size of the ulcer??",
              type: 'text'
            },
          ]
        },
        {
          name: 'Palpitation',
          isActive: false,
          questions: [
            {
              question: "How long do the palpitations last?",
              placeholder: '# of days',
              type: 'text',
              placeholder: 'Please describe the # of days',
            },
            {
              question: "What is the type of palpitation?",
              type: 'button',
              options: [
                {
                  name: 'Intermittent',
                  isActive: false
                },
                {
                  name: 'Always Happening',
                  isActive: false
                },
              ]
            },
            {
              question: "How long do the palpitations last?",
              placeholder: '# of days',
              type: 'text',
            },
            {
              question: "Are there any associated symptoms?",
              type: 'button',
              options: [
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
            {
              question: "Is there Fainting?",
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
              ]
            },
            {
              question: "Was there a Fall?",
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
              ]
            },
            {
              question: "Is there Dizziness?",
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
              ]
            },
            {
              question: "What brings the palpitations on?",
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
              ]
            },
            {
              question: "How are the palpitation relieved?",
              type: 'text',
              placeholder: 'Please describe any relevant information',
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
                  name: '1',
                  isActive: false
                },
                {
                  name: '2',
                  isActive: false
                },
                {
                  name: '3',
                  isActive: false
                },
                {
                  name: '4',
                  isActive: false
                },
                {
                  name: '5+',
                  isActive: false
                }
              ]
            },
            {
              question: "What is the interval between episodes?",
              type: 'button',
              options: [
                {
                  name: '1',
                  isActive: false
                },
                {
                  name: '2',
                  isActive: false
                },
                {
                  name: '3',
                  isActive: false
                },
                {
                  name: '4',
                  isActive: false
                },
                {
                  name: '5+',
                  isActive: false
                }
              ]
            },
            {
              question: "Is consciousness loss during fainting?",
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
              ]
            },
            {
              question: "Are there any associated fits?",
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
              ]
            },
            {
              question: "Is there dizziness?",
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
              ]
            },
            {
              question: "Was there a fall?",
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
              ]
            },
            {
              question: "What brings on the fainting?",
              type: 'text',
              placeholder: 'Please describe any relevant information'
            },
            {
              question: "How is the fainting relieved?",
              type: 'text',
              placeholder: 'Please describe any relevant information'
            },
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
                  type: 'text',
                  placeholder: 'Please describe the # of days'
                },
                {
                  question: "Is there a loss of appetite?",
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
                  ]
                },
                {
                  question: "Has there been a change in weight?",
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
                  ]
                },
                {
                  question: "Is there any abdominal pain?",
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
                  ]
                },
                {
                  question: "Is there any chest pain?",
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
                  ]
                },
                {
                  question: "Are there any associated symptoms?",
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
                  type: 'text',
                  placeholder: 'Please describe the # of days'
                },
                {
                  question: "Is there a loss appetite?",
                  type: 'button',
                  options: [
                    {
                      name: 'Normal',
                      isActive: false
                    },
                    {
                      name: 'Decreased',
                      isActive: false
                    },
                  ]
                },
                {
                  question: "Has there been a change in weight?",
                  type: 'button',
                  options: [
                    {
                      name: 'No Change',
                      isActive: false
                    },
                    {
                      name: 'Decreased',
                      isActive: false
                    },
                    {
                      name: 'Increased',
                      isActive: false
                    },
                  ]
                },
                {
                  question: "Is there any abdominal pain?",
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
                  ]
                },
                {
                  question: "Is there any chest pain?",
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
                      name: 'Cough',
                      isActive: false
                    },
                    {
                      name: 'Diarrhea',
                      isActive: false
                    },
                    {
                      name: 'Constipation',
                      isActive: false
                    }
                  ]
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
          name: 'chiefComplaints',
          title: 'Chief Complaints',
          isActive: true,
          isEnabled: true
        },
        {
          name: 'fixedQuestions',
          title: 'Fixed Questions',
          isActive: false,
          isEnabled: false
        },
        {
          name: 'precheck',
          title: 'Pre-Check',
          isActive: false,
          isEnabled: false
        },
        {
          name: 'vitals',
          title: 'Vitals',
          isActive: false,
          isEnabled: false
        },
        {
          name: 'generalExams',
          title: 'General Exams',
          isActive: false,
          isEnabled: false
        },
        {
          name: 'specificExams',
          title: 'Specific Exams',
          isActive: false,
          isEnabled: false
        },
        {
          name: 'photos',
          title: 'Photos',
          isActive: false,
          isEnabled: false
        },
        {
          name: 'allocation',
          title: 'Allocation',
          isActive: false,
          isEnabled: false 
        }
      ]
    }
  },
}
</script>