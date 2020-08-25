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
                    Chief Complaints, Fixed Questions
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
                              <div v-if="question.showOther === true">
                                <input type="text" class="mt-1 p-2 w-100" placeholder="Describe any further details">
                              </div>
                            </div>
                            <div v-if="question.type === 'button' && question.showTextInput === true">
                              <div>
                                <input type="text" class="mt-1 p-2 w-100" :placeholder="question.options[0].isActive === true ? question.options[0].placeholder : question.options[1].placeholder">
                              </div>
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
                  <div class="form-check" v-for="(preCheckQuestion, index) in preCheckQuestions" :key ="index">
                    <input type="checkbox" class="form-check-input" v-model="preCheckQuestion.isChecked" :id="'checkbox' + index">
                    <label class="form-check-label" :for="'checkbox' + index">{{ preCheckQuestion.question }}</label>
                  </div>
                </div>
              </div>
            </div>
            <!-- Button: Go to Next Section -->
            <div class="container mb-3">
              <div class="row">
                <div class="col-md-12 px-0">
                  <!-- :disabled="!preCheckQuestions.every((question) => question.isChecked === true)" -->
                    <button @click="goToNext()"  type="button" class="w-100 btn btn-dark rounded font-weight-bold py-3 mb-0 text-uppercase">
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
                <div class="col-md-12 mb-3" v-for="(vitalQuestion, index) in vitalQuestions" :key="index">
                  <label for="exampleFormControlSelect1">{{ vitalQuestion.title }}</label><br>
                  <button v-for="(option, optionIndex) in vitalQuestion.options" :class="option.isActive ? 'btn-dark' : 'btn-light'" :key="optionIndex" @click="handleVitalsQuestions(index, optionIndex)" class="btn mb-2 mr-2">
                    {{ option.name }}
                  </button>
                </div>
                <div class="col-md-6 mb-3">
                  <label for="exampleFormControlSelect1">Blood Pressure</label><br>
                  <input class="form-control d-inline w-25 mr-2" type="number" value="0"> /
                  <input class="form-control d-inline w-25 mx-2" type="number" value="0"> mmHg
                </div>
                <div class="col-md-6 mb-3">
                  <label for="exampleFormControlSelect1">Sp02</label><br>
                  <input class="form-control d-inline w-25 mr-2" type="number" value="0"> /
                  <input class="form-control d-inline w-25 mx-2" type="number" value="0"> %
                </div>
                <div class="col-md-6 mb-3">
                  <label for="exampleFormControlSelect1">Patient Temperature</label><br>
                  <input class="form-control d-inline w-25 mr-2" type="number" value="0"> °F
                </div>
                <div class="col-md-6 mb-3">
                  <label for="exampleFormControlSelect1">Patient Height</label><br>
                  <input class="form-control d-inline w-25 mr-2" @keyup="calculateBMI" @click="calculateBMI" v-model="patHeight" type="number" value="0"> cm
                </div>
                <div class="col-md-6 mb-3">
                  <label for="exampleFormControlSelect2">Patient Weight</label><br>
                  <input class="form-control d-inline w-25 mr-2" @keyup="calculateBMI" @click="calculateBMI" v-model="patWeight" type="number" value="0"> kg
                </div>
                <div class="col-md-6 mb-3">
                  <label for="exampleFormControlSelect1">Body Mass Index (BMI)</label><br>
                  {{ patBMI }} kg/m^2
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
                <div class="col-md-12 text-muted small mb-0">
                  Please complete to the best of your ability.
                  <hr>
                </div>
                <div class="col-md-12 mb-5 text-center">
                  <img src="/anatomy_sketch_02.png" class="w-75" alt="">
                </div>
                <div class="col-md-6 mb-3">
                  <label for="exampleFormControlSelect1">Jaundice in Eyes</label><br>
                  <button class="btn btn-light mb-2 mr-2">Yes</button>
                  <button class="btn btn-light mb-2 mr-2">No</button>
                </div>
                <div class="col-md-6 mb-3">
                  <label for="exampleFormControlSelect1">Pallor in Eyes</label><br>
                  <button class="btn btn-light mb-2 mr-2">Yes</button>
                  <button class="btn btn-light mb-2 mr-2">No</button>
                </div>
                <div class="col-md-6 mb-3">
                  <label for="exampleFormControlSelect1">Cyanosis in Hands</label><br>
                  <button class="btn btn-light mb-2 mr-2">Yes</button>
                  <button class="btn btn-light mb-2 mr-2">No</button>
                </div>
                <div class="col-md-6 mb-3">
                  <label for="exampleFormControlSelect1">Clubbing in Hands</label><br>
                  <button class="btn mb-2 mr-2" :class="[ generalExams.handsClubbing === 'normal' ?  'btn-dark' : 'btn-light' ]"  @click="generalExams.handsClubbing = 'normal'">Normal</button>
                  <button class="btn mb-2 mr-2" :class="[ generalExams.handsClubbing === 'clubbing' ?  'btn-dark' : 'btn-light' ]"  @click="generalExams.handsClubbing = 'clubbing'">Clubbing</button>
                  <button class="btn mb-2 mr-2" :class="[ generalExams.handsClubbing === 'spooning' ?  'btn-dark' : 'btn-light' ]" @click="generalExams.handsClubbing = 'spooning'">Spooning</button>
                  <button class="btn mb-2 mr-2" :class="[ generalExams.handsClubbing === 'cyanosis' ?  'btn-dark' : 'btn-light' ]" @click="generalExams.handsClubbing = 'cyanosis'">Cyanosis</button>
                  <button class="btn mb-2 mr-2" :class="[ generalExams.handsClubbing === 'none' ?  'btn-dark' : 'btn-light' ]"  @click="generalExams.handsClubbing = 'none'">None</button>
                </div>
                <div class="col-md-6 mb-3">
                  <label for="exampleFormControlSelect1">Oedema in Legss</label><br>
                  <button class="btn mb-2 mr-2" :class="[ generalExams.legsOedema === 'mild' ?  'btn-dark' : 'btn-light' ]"  @click="generalExams.legsOedema = 'mild'">Mild</button>
                  <button class="btn mb-2 mr-2" :class="[ generalExams.legsOedema === 'moderate' ?  'btn-dark' : 'btn-light' ]"  @click="generalExams.legsOedema = 'moderate'">Moderate</button>
                  <button class="btn mb-2 mr-2" :class="[ generalExams.legsOedema === 'severe' ?  'btn-dark' : 'btn-light' ]" @click="generalExams.legsOedema = 'severe'">Severe</button>
                  <button class="btn mb-2 mr-2" :class="[ generalExams.legsOedema === 'none' ?  'btn-dark' : 'btn-light' ]"  @click="generalExams.legsOedema = 'none'">None</button>
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
                <div class="col-md-12 text-muted small mb-0">
                  Please complete to the best of your ability.
                  <hr>
                </div>
                <div class="col-md-12 mb-5 text-center">
                  <img src="/anatomy_sketch_02.png" class="w-75" alt="">
                </div>
                <!-- {{ currCategory }}<br>
                {{ subCategory }}<br><br> -->

                <!-- {{ showSpecificComplaintQuestions(currCategory, subCategory) }} <br><br> -->
                <!-- <div class="container">
                  
                </div> -->

                <div class="container">
                  <div class="row" v-for="(organ, index) in showSpecificComplaintQuestions(currCategory, subCategory)" :key="index">
                    <div class="col-md-12 mt-4 mb-2 text-muted">
                      <small>Area to examine: {{ organ.examination }}</small>
                      <hr>
                    </div>
                    <div class="col-md-6 mb-3" v-for="(question, qIndex) in organ.questions" :key="qIndex">
                      <label for="exampleFormControlSelect1">{{ question.title }}</label><br>
                        <button v-for="(option, oIndex) in question.options" :key="oIndex" class="btn btn-light mb-2 mr-2">
                          {{ option.name }}
                        </button>
                    </div>
                  </div>
                </div>

                
                <!-- <div class="col-md-6 mb-3">
                  <label for="exampleFormControlSelect1">Jaundice in Eyes</label><br>
                  <button class="btn btn-light mb-2 mr-2">Eyes</button>
                  <button class="btn btn-light mb-2 mr-2">Hands</button>
                  <button class="btn btn-light mb-2 mr-2">Lower Leg and Ankle</button>
                </div>
                <div class="col-md-6 mb-3">
                  <label for="exampleFormControlSelect1">Pallor in Skin</label><br>
                  <button class="btn btn-light mb-2 mr-2">Eyes</button>
                  <button class="btn btn-light mb-2 mr-2">Hands</button>
                  <button class="btn btn-light mb-2 mr-2">Lower Leg and Ankle</button>
                </div>
                <div class="col-md-6 mb-3">
                  <label for="exampleFormControlSelect1">Cyanosis in Skin/Nails/Lips/Eyes</label><br>
                  <button class="btn btn-light mb-2 mr-2">Eyes</button>
                  <button class="btn btn-light mb-2 mr-2">Hands</button>
                  <button class="btn btn-light mb-2 mr-2">Lower Leg and Ankle</button>
                </div>
                <div class="col-md-6 mb-3">
                  <label for="exampleFormControlSelect1">Oedema in Arms/Legs</label><br>
                  <button class="btn btn-light mb-2 mr-2">Eyes</button>
                  <button class="btn btn-light mb-2 mr-2">Hands</button>
                  <button class="btn btn-light mb-2 mr-2">Lower Leg and Ankle</button>
                </div> -->
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
                <div class="col-md-12 mb-3">
                  Photo 1.jpg (999 kb) <br>
                  Photo 2.jpg (999 kb) <br>
                  Photo 3.jpg (999 kb) <br>
                  Photo 4.jpg (999 kb) <br>
                  Photo 5.jpg (999 kb) <br>
                </div>
                <div class="col-md-12 mb-3 text-center">
                  <div class="custom-file">
                    <input type="file" class="custom-file-input" id="customFile">
                    <label class="custom-file-label" for="customFile">Choose file</label>
                  </div>
                </div>
                <!-- <div class="col-md-12">
                  <div class="custom-file">
                </div> -->
                <!-- <div class="col-md-3 mb-4">
                  <img src="/square-grey.jpg" class="w-100" alt="">
                </div>
                <div class="col-md-3 mb-4">
                  <img src="/square-grey-add.jpg" class="w-100" alt="">
                </div> -->
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
      let self = this

      this.questions[indexQuestion].options.forEach((question, index) => {
        if (indexAnswer === index) {
          question.isActive = true

          // toggle secondary input
          console.log(self.questions[indexQuestion].showTextInput)
          if (self.questions[indexQuestion].showTextInput === false) {
            self.questions[indexQuestion].showTextInput = true
          }
          console.log(self.questions[indexQuestion].showTextInput)

          if (question.name === "Other") {
            console.log('Click')
            console.log(self.questions[indexQuestion].showOther)
            self.questions[indexQuestion].showOther = true
            console.log(self.questions[indexQuestion].showOther)
          } else {
            self.questions[indexQuestion].showOther = false
          }
        } else {
          question.isActive = false
        }
      })

      // console.log(indexQuestion, indexAnswer)
    },
    handleVitalsQuestions: function (questionIndex, optionIndex) {
      let self = this

      self.vitalQuestions[questionIndex].options.forEach((vitalQuestionOption, index) => {
        if (index === optionIndex) {
          vitalQuestionOption.isActive = true
        } else {
          vitalQuestionOption.isActive = false
        }
      })
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
    calculateBMI: function () {
      const BMI = (this.patWeight / (this.patHeight * this.patHeight)) * 10000
      
      if (typeof(BMI) === 'number' && BMI < 999) {
        this.patBMI = BMI.toFixed(2)
      } else {
        this.patBMI = 0
      }
    },
    showSpecificComplaintQuestions(currCategory, currSubCategory) {
      switch (currCategory) {
        case 'Pain':
          switch (currSubCategory) {
            case 'Headache':
              return this.specificExamQuestions.filter(organ => organ.examination === 'head' || organ.examination === 'eyes' || organ.examination === 'hands')
            case 'Ear Pain':
              return this.specificExamQuestions.filter(organ => organ.examination === 'ears' || organ.examination === 'eyes' || organ.examination === 'hands')
            case 'Teeth Pain':
              return this.specificExamQuestions.filter(organ => organ.examination === 'cheek&mouth')
            case 'Throat Pain':
              return this.specificExamQuestions.filter(organ => organ.examination === 'neck' || organ.examination === 'cheek&mouth' || organ.examination === 'eyes')
            case 'Back Pain':
              return this.specificExamQuestions.filter(organ => organ.examination === 'back' || organ.examination === 'lowerleg&ankle' || organ.examination === 'eyes')
            case 'Joint Pain':
              return this.specificExamQuestions.filter(organ => organ.examination === 'joints')
            case 'Chest Pain':
              return this.specificExamQuestions.filter(organ => organ.examination === 'eyes' || organ.examination === 'lowerleg&ankle' || organ.examination === 'hands' || organ.examination === 'chest')
            case 'Abdominal Pain':
              return this.specificExamQuestions.filter(organ => organ.examination === 'eyes' || organ.examination === 'lowerleg&ankle' || organ.examination === 'hands' || organ.examination === 'abdomen')
            case 'Breast Pain':
              return null
            case 'Scrotal Pain':
              return null
            case 'Perianal Pain':
              return null
            default:
              return null
          }
        case 'Swelling/Tumor':
          switch (currSubCategory) {
            case 'Throat Swelling':
              return this.specificExamQuestions.filter(organ => organ.examination === 'eyes' || organ.examination === 'hands' || organ.examination === 'neck&throat' ||  organ.examination === 'chest'|| organ.examination === 'lowerleg&ankle')
            case 'Abdomen Swelling':
              return this.specificExamQuestions.filter(organ => organ.examination === 'eyes' || organ.examination === 'neck' || organ.examination === 'lowerleg&ankle' ||  organ.examination === 'abdomen'|| organ.examination === 'cheek&mouth' || organ.examination === 'lump&swelling')
            case 'Swelling (Other)':
              return this.specificExamQuestions.filter(organ => organ.examination === 'lump&swelling' || organ.examination === 'eyes' || organ.examination === 'lowerleg&ankle')
            default:
              return null
          }
        case 'Difficulty Breathing':
          return this.specificExamQuestions.filter(organ => organ.examination === 'eyes' || organ.examination === 'neck' || organ.examination === 'lowerleg&ankle' || organ.examination === 'hands'|| organ.examination === 'chest')
        case 'Fever':
          return this.specificExamQuestions.filter(organ => organ.examination === 'eyes' || organ.examination === 'neck' || organ.examination === 'lowerleg&ankle' || organ.examination === 'hands'|| organ.examination === 'chest' || organ.examination === 'abdomen')
        case 'Diarrhoea':
          return this.specificExamQuestions.filter(organ => organ.examination === 'eyes' || organ.examination === 'cheek&mouth' || organ.examination === 'lowerleg&ankle' || organ.examination === 'hands'|| organ.examination === 'abdomen')
        case 'Vomiting':
          return this.specificExamQuestions.filter(organ => organ.examination === 'eyes' || organ.examination === 'cheek&mouth' || organ.examination === 'lowerleg&ankle' || organ.examination === 'hands'|| organ.examination === 'abdomen')
        case 'Dizziness':
          return this.specificExamQuestions.filter(organ => organ.examination === 'eyes' || organ.examination === 'neck' || organ.examination === 'lowerleg&ankle' || organ.examination === 'hands' || organ.examination === 'chest' || organ.examination === 'bloodpressure' || organ.examination === 'pulse')
        case 'Acidity/Indigestion':
          return this.specificExamQuestions.filter(organ => organ.examination === 'eyes' || organ.examination === 'cheek&mouth' || organ.examination === 'lowerleg&ankle' || organ.examination === 'abdomen')
        case 'Yellow Urine':
          return this.specificExamQuestions.filter(organ => organ.examination === 'eyes' || organ.examination === 'cheek&mouth' || organ.examination === 'abdomen' || organ.examination === 'hands')
        case 'Skin Rash':
          return this.specificExamQuestions.filter(organ => organ.examination === 'rash')
        case 'Bleeding with Stool':
          return this.specificExamQuestions.filter(organ => organ.examination === 'eyes' || organ.examination === 'lowerleg&ankle' || organ.examination === 'abdomen')
        case 'Gynae Problems':
          switch (currSubCategory) {
            case 'Period Problem':
              return this.specificExamQuestions.filter(organ => organ.examination === 'eyes' || organ.examination === 'lowerleg&ankle' || organ.examination === 'abdomen')
            case 'Ante-natal Problem':
              return null
            case 'Infertility Problem':
              return null
            case 'Private Parts Problem':
              return null
            case 'Intercourse Problem':
              return null
            default:
              return null
          }
        case 'Injury':
          return this.specificExamQuestions.filter(organ => organ.examination === 'injury')
        case 'Boils':
          return this.specificExamQuestions.filter(organ => organ.examination === 'lumps')
        case 'Ulcer':
          return this.specificExamQuestions.filter(organ => organ.examination === 'ulcer')
        case 'Palpitation':
          return this.specificExamQuestions.filter(organ => organ.examination === 'eyes' || organ.examination === 'neck' || organ.examination === 'lowerleg&ankle' || organ.examination === 'hands' || organ.examination === 'chest' || organ.examination === 'bloodpressure' || organ.examination === 'pulse')
        case 'Fainting':
          return this.specificExamQuestions.filter(organ => organ.examination === 'eyes' || organ.examination === 'neck' || organ.examination === 'lowerleg&ankle' || organ.examination === 'hands' || organ.examination === 'chest' || organ.examination === 'bloodpressure' || organ.examination === 'pulse')
        case 'Weakness':
          switch (currSubCategory) {
            case 'General Weakness':
              return this.specificExamQuestions.filter(organ => organ.examination === 'eyes' || organ.examination === 'neck' || organ.examination === 'lowerleg&ankle' || organ.examination === 'hands' || organ.examination === 'chest' || organ.examination === 'bloodpressure' || organ.examination === 'pulse')
            case 'Particular Weakness':
              return this.specificExamQuestions.filter(organ => organ.examination === 'head' || organ.examination === 'eyes' || organ.examination === 'hands')
            default:
              return null
          }
        default:
          return null
      }
    }
  },
  mounted () {
    this.$store.commit('updatePath', this.fullPath)
  },
  computed: {
  },
  data() {
    return {
      patHeight: 0,
      patWeight: 0,
      patBMI: 0,
      currCategory: '',
      categoryIndex: null,
      subCategory: '',
      subCategoryInd: null,
      categoryItemInd: null,
      hasSubCategory: false,
      showQuestions: false,
      complaintItem: '',
      specificExamQuestions: [
        {
          examination: 'eyes',
          questions: [
            {
              title: 'Conjunctivitis',
              options: [
                {
                  name: 'Yes',
                  isActive: false,
                },
                {
                  name: 'No',
                  isActive: false,
                },
              ]
            },
            {
              title: 'Jaundice',
              options: [
                {
                  name: 'Yes',
                  isActive: false,
                },
                {
                  name: 'No',
                  isActive: false,
                },
              ]
            },
            {
              title: 'Pallor',
              options: [
                {
                  name: 'Yes',
                  isActive: false,
                },
                {
                  name: 'No',
                  isActive: false,
                },
              ]
            },
            {
              title: 'Puffiness',
              options: [
                {
                  name: 'Yes',
                  isActive: false,
                },
                {
                  name: 'No',
                  isActive: false,
                },
              ]
            },
            {
              title: 'Pupil',
              options: [
                {
                  name: 'Yes',
                  isActive: false,
                },
                {
                  name: 'No',
                  isActive: false,
                },
              ]
            },
          ]
        },
        {
          examination: 'hands',
          questions: [
            {
              title: 'Clubbing',
              options: [
                {
                  name: 'Yes',
                  isActive: false,
                },
                {
                  name: 'No',
                  isActive: false,
                },
              ]
            },
            {
              title: 'Cyanosis',
              options: [
                {
                  name: 'Yes',
                  isActive: false,
                },
                {
                  name: 'No',
                  isActive: false,
                },
              ]
            },
            {
              title: 'Tremor',
              options: [
                {
                  name: 'Yes',
                  isActive: false,
                },
                {
                  name: 'No',
                  isActive: false,
                },
              ]
            },
            {
              title: 'Puffiness',
              options: [
                {
                  name: 'Yes',
                  isActive: false,
                },
                {
                  name: 'No',
                  isActive: false,
                },
              ]
            },
          ]
        },
        {
          examination: 'lowerleg&ankle',
          questions: [
            {
              title: 'Leg Oedema',
              options: [
                {
                  name: 'Normal',
                  isActive: false,
                },
                {
                  name: 'Clubbing',
                  isActive: false,
                },
                {
                  name: 'Spooning',
                  isActive: false,
                },
                {
                  name: 'Cyanosis',
                  isActive: false,
                },
              ]
            },
            {
              title: 'Skin of Lower Leg/Ankle',
              options: [
                {
                  name: 'Normal',
                  isActive: false,
                },
                {
                  name: 'Thickened',
                  isActive: false,
                },
                {
                  name: 'Discolored',
                  isActive: false,
                },
              ]
            },
            {
              title: 'Ulcer',
              options: [
                {
                  name: 'Yes',
                  isActive: false,
                },
                {
                  name: 'No',
                  isActive: false,
                },
              ]
            },
            {
              title: 'Pedal Pulses',
              options: [
                {
                  name: 'DP Pulse +/-',
                  isActive: false,
                },
                {
                  name: 'PT Pulse +/-',
                  isActive: false,
                },
              ]
            },
          ]
        },
        {
          examination: 'cheek&mouth',
          questions: [
            {
              title: 'Discoloration',
              options: [
                {
                  name: 'Normal',
                  isActive: false,
                },
                {
                  name: 'Coated',
                  isActive: false,
                },
                {
                  name: 'Dry',
                  isActive: false,
                },
              ]
            },
            {
              title: 'Dryness',
              options: [
                {
                  name: 'Dry',
                  isActive: false,
                },
                {
                  name: 'Not Dry',
                  isActive: false,
                },
              ]
            },
            {
              title: 'Ulcer',
              options: [
                {
                  name: 'Yes',
                  isActive: false,
                },
                {
                  name: 'No',
                  isActive: false,
                },
              ]
            },
            {
              title: 'Teeth',
              options: [
                {
                  name: 'Teeth Normal',
                  isActive: false,
                },
                {
                  name: 'Black Discoloration',
                  isActive: false,
                },
              ]
            },
            {
              title: 'Jaw Movement',
              options: [
                {
                  name: 'Painless',
                  isActive: false,
                },
                {
                  name: 'Painful',
                  isActive: false,
                },
              ]
            },
            {
              title: 'Redness at Back of Mouth',
              options: [
                {
                  name: 'Redness Around Tonsils & Back of Throat',
                  isActive: false,
                },
                {
                  name: 'Normal Throat',
                  isActive: false,
                },
              ]
            },
            {
              title: 'Sunkess Appearance',
              options: [
                {
                  name: 'Cheek Normal',
                  isActive: false,
                },
                {
                  name: 'Cheek Sunken',
                  isActive: false,
                },
              ]
            },
          ]
        },
        {
          examination: 'chest',
          questions: [
            {
              title: 'Chest Wall Movements',
              options: [
                {
                  name: 'Both Sides Moving Equally',
                  isActive: false,
                },
                {
                  name: 'Both Sides Moving Less',
                  isActive: false,
                },
              ]
            },
            {
              title: 'Redness Swelling',
              options: [
                {
                  name: 'No Redness',
                  isActive: false,
                },
                {
                  name: 'Redness Over Area',
                  isActive: false,
                },
              ]
            },
            {
              title: 'Tender Areas',
              options: [
                {
                  name: 'Tenderness None',
                  isActive: false,
                },
                {
                  name: 'Tenderness Felt Over Area',
                  isActive: false,
                },
              ]
            },
            {
              title: 'Breath Sounds',
              options: [
                {
                  name: 'Sound File',
                  isActive: false,
                },
              ]
            },
          ]
        },
        {
          examination: 'neck',
          questions: [
            {
              title: 'Swelling',
              options: [
                {
                  name: 'None',
                  isActive: false,
                },
                {
                  name: 'Swelling in Areas',
                  isActive: false,
                },
              ]
            },
            {
              title: 'Position of Trachea',
              options: [
                {
                  name: 'Central',
                  isActive: false,
                },
                {
                  name: 'Deviated to Right',
                  isActive: false,
                },
                {
                  name: 'Deviated to Left',
                  isActive: false,
                },
              ]
            },
          ]
        },
        {
          examination: 'abdomen',
          questions: [
            {
              title: 'Size',
              options: [
                {
                  name: 'Normal',
                  isActive: false,
                },
                {
                  name: 'Appears Distended',
                  isActive: false,
                },
              ]
            },
            {
              title: 'Scars',
              options: [
                {
                  name: 'None',
                  isActive: false,
                },
                {
                  name: 'Present Over Area',
                  isActive: false,
                },
              ]
            },
            {
              title: 'Tenderness',
              options: [
                {
                  name: 'None',
                  isActive: false,
                },
                {
                  name: 'Present Over Area',
                  isActive: false,
                },
              ]
            },
            {
              title: 'Lumps',
              options: [
                {
                  name: 'Upper Right',
                  isActive: false,
                },
                {
                  name: 'Upper Center',
                  isActive: false,
                },
                {
                  name: 'Upper Left',
                  isActive: false,
                },
                {
                  name: 'Middle Right',
                  isActive: false,
                },
                {
                  name: 'Middle Center',
                  isActive: false,
                },
                {
                  name: 'Middle Left',
                  isActive: false,
                },
              ]
            },
          ]
        },
        {
          examination: 'back',
          questions: [
            {
              title: 'Swelling',
              options: [
                {
                  name: 'None',
                  isActive: false,
                },
                {
                  name: 'Present Over Area',
                  isActive: false,
                },
              ]
            },
            {
              title: 'Position of Spinal Column',
              options: [
                {
                  name: 'Midline',
                  isActive: false,
                },
                {
                  name: 'Deviated',
                  isActive: false,
                },
              ]
            },
            {
              title: 'Movement',
              options: [
                {
                  name: 'Bends Forward and Backwards Normally',
                  isActive: false,
                },
                {
                  name: 'Restricted',
                  isActive: false,
                },
              ]
            },
            {
              title: 'Redness',
              options: [
                {
                  name: 'No Redness',
                  isActive: false,
                },
                {
                  name: 'Present Over Area',
                  isActive: false,
                },
              ]
            },
          ]
        },
        {
          examination: 'head',
          questions: [
            {
              title: 'Injury',
              options: [
                {
                  name: 'None',
                  isActive: false,
                },
                {
                  name: 'Present Over Area',
                  isActive: false,
                },
              ]
            },
            {
              title: 'Swelling',
              options: [
                {
                  name: 'None',
                  isActive: false,
                },
                {
                  name: 'Present Over Area',
                  isActive: false,
                },
              ]
            },
            {
              title: 'Tenderness',
              options: [
                {
                  name: 'None',
                  isActive: false,
                },
                {
                  name: 'Present in Area',
                  isActive: false,
                },
              ]
            },
          ]
        },
        {
          examination: 'ears',
          questions: [
            {
              title: 'Bleeding',
              options: [
                {
                  name: 'None',
                  isActive: false,
                },
                {
                  name: 'Bleeding in Right Ear',
                  isActive: false,
                },
                {
                  name: 'Bleeding in Left Ear',
                  isActive: false,
                },
                {
                  name: 'Bleeding in Both Ears',
                  isActive: false,
                },
              ]
            },
            {
              title: 'Redness',
              options: [
                {
                  name: 'None',
                  isActive: false,
                },
                {
                  name: 'Present Over Area',
                  isActive: false,
                },
              ]
            },
            {
              title: 'Discharge',
              options: [
                {
                  name: 'None',
                  isActive: false,
                },
                {
                  name: 'Discharge in Right Ear',
                  isActive: false,
                },
                {
                  name: 'Discharge in Left Ear',
                  isActive: false,
                },
                {
                  name: 'Discharge in Both Ears',
                  isActive: false,
                },
              ]
            },
          ]
        },
        {
          examination: 'joints',
          questions: [
            {
              title: 'Swelling',
              options: [
                {
                  name: 'None',
                  isActive: false,
                },
                {
                  name: 'Present Over Area',
                  isActive: false,
                },
              ]
            },
            {
              title: 'Redness',
              options: [
                {
                  name: 'None',
                  isActive: false,
                },
                {
                  name: 'Present Over Area',
                  isActive: false,
                },
              ]
            },
            {
              title: 'Deformity',
              options: [
                {
                  name: 'None',
                  isActive: false,
                },
                {
                  name: 'Present Over Area',
                  isActive: false,
                },
              ]
            },
            {
              title: 'Movement',
              options: [
                {
                  name: 'Full Range',
                  isActive: false,
                },
                {
                  name: 'Restricted',
                  isActive: false,
                },
              ]
            },
          ]
        },
        {
          examination: 'ulcers',
          questions: [
            {
              title: 'Location',
              options: [
                {
                  name: 'Location of Ulcer',
                  isActive: false,
                },
              ]
            },
            {
              title: 'How many ulcers',
              options: [
                {
                  name: '#',
                  isActive: false,
                },
              ]
            },
            {
              title: 'Shape of ulcer(s)',
              options: [
                {
                  name: 'Rounded',
                  isActive: false,
                },
                {
                  name: 'Irregluar',
                  isActive: false,
                },
              ]
            },
            {
              title: 'Depth',
              options: [
                {
                  name: 'Superficial',
                  isActive: false,
                },
                {
                  name: 'Deep',
                  isActive: false,
                },
                {
                  name: 'Bone Exposed',
                  isActive: false,
                },
              ]
            },
            {
              title: 'Size',
              options: [
                {
                  name: '# cms',
                  isActive: false,
                },
              ]
            },
            {
              title: 'Edge',
              options: [
                {
                  name: 'Raised',
                  isActive: false,
                },
                {
                  name: 'Flat',
                  isActive: false,
                },
              ]
            },
            {
              title: 'Floor',
              options: [
                {
                  name: 'Pink',
                  isActive: false,
                },
                {
                  name: 'Black',
                  isActive: false,
                },
                {
                  name: 'Yellow-Green',
                  isActive: false,
                },
                {
                  name: 'Mixed',
                  isActive: false,
                },
              ]
            },
            {
              title: 'Discharge',
              options: [
                {
                  name: 'Clear',
                  isActive: false,
                },
                {
                  name: 'Blood',
                  isActive: false,
                },
                {
                  name: 'Pus',
                  isActive: false,
                },
                {
                  name: 'Mixed',
                  isActive: false,
                },
                {
                  name: 'Reddish',
                  isActive: false,
                },
              ]
            },
            {
              title: 'Pain',
              options: [
                {
                  name: 'Painless',
                  isActive: false,
                },
                {
                  name: 'Painful',
                  isActive: false,
                },
              ]
            },
          ]
        },
        {
          examination: 'lump&swelling',
          questions: [
            {
              title: 'Location',
              options: [
                {
                  name: 'Location of Ulcer',
                  isActive: false,
                },
              ]
            },
            {
              title: 'How many lumps/swellings',
              options: [
                {
                  name: '#',
                  isActive: false,
                },
              ]
            },
            {
              title: 'Shape of ulcer(s)',
              options: [
                {
                  name: 'Rounded',
                  isActive: false,
                },
                {
                  name: 'Irregluar',
                  isActive: false,
                },
              ]
            },
            {
              title: 'Surface',
              options: [
                {
                  name: 'Smooth',
                  isActive: false,
                },
                {
                  name: 'Irregular',
                  isActive: false,
                },
              ]
            },
            {
              title: 'Color of Skinze',
              options: [
                {
                  name: 'Normal',
                  isActive: false,
                },
                {
                  name: 'Red',
                  isActive: false,
                },
                {
                  name: 'Discolored',
                  isActive: false,
                },
                {
                  name: 'Dark Spot',
                  isActive: false,
                },
              ]
            },
            {
              title: 'Ulcer',
              options: [
                {
                  name: 'None',
                  isActive: false,
                },
                {
                  name: 'Present',
                  isActive: false,
                },
              ]
            },
            {
              title: 'Size',
              options: [
                {
                  name: '# cms',
                  isActive: false,
                },
              ]
            },
            {
              title: 'Movement',
              options: [
                {
                  name: 'Can Be Moved',
                  isActive: false,
                },
                {
                  name: 'Cannot Be Moved',
                  isActive: false,
                },
              ]
            },
            {
              title: 'Feel',
              options: [
                {
                  name: 'Tender',
                  isActive: false,
                },
                {
                  name: 'Not Tender',
                  isActive: false,
                },
              ]
            },
          ]
        },
        {
          examination: 'rash',
          questions: [
            {
              title: 'Location',
              options: [
                {
                  name: 'Location of Rash',
                  isActive: false,
                },
              ]
            },
            {
              title: 'How many rash(es)',
              options: [
                {
                  name: '#',
                  isActive: false,
                },
              ]
            },
            {
              title: 'Shape of rash(es)',
              options: [
                {
                  name: 'Rounded',
                  isActive: false,
                },
                {
                  name: 'Irregluar',
                  isActive: false,
                },
              ]
            },
            {
              title: 'Color',
              options: [
                {
                  name: 'Red',
                  isActive: false,
                },
                {
                  name: 'Pink',
                  isActive: false,
                },
                {
                  name: 'Dark Color',
                  isActive: false,
                },
                {
                  name: 'Black',
                  isActive: false,
                },
              ]
            },
            {
              title: 'Size',
              options: [
                {
                  name: '# cms',
                  isActive: false,
                },
              ]
            },
            {
              title: 'Edge',
              options: [
                {
                  name: 'Raised',
                  isActive: false,
                },
                {
                  name: 'Flat',
                  isActive: false,
                },
              ]
            },
          ]
        },
        {
          examination: 'injury',
          questions: [
            {
              title: 'With Cut: Length',
              options: [
                {
                  name: '# cms',
                  isActive: false,
                },
              ]
            },
            {
              title: 'With Cut: Bleeding',
              options: [
                {
                  name: 'None',
                  isActive: false,
                },
                {
                  name: 'Oozing',
                  isActive: false,
                },
                {
                  name: 'Major',
                  isActive: false,
                },
              ]
            },
            {
              title: 'With Cut: Visibility',
              options: [
                {
                  name: 'Fat',
                  isActive: false,
                },
                {
                  name: 'Muscle',
                  isActive: false,
                },
                {
                  name: 'Deep Tissue',
                  isActive: false,
                },
              ]
            },
            {
              title: 'With Cut: Edges of Skin',
              options: [
                {
                  name: 'Clean',
                  isActive: false,
                },
                {
                  name: 'Irregular',
                  isActive: false,
                },
                {
                  name: 'Loss of Skin',
                  isActive: false,
                },
              ]
            },
            {
              title: 'Without Cut: Skin Color of Abrasion/Bruise',
              options: [
                {
                  name: 'Normal Skin',
                  isActive: false,
                },
                {
                  name: 'Scratch Marks',
                  isActive: false,
                },
                {
                  name: 'Blue',
                  isActive: false,
                },
                {
                  name: 'Red',
                  isActive: false,
                },
              ]
            },
            {
              title: 'Without Cut: Burned Area',
              options: [
                {
                  name: '# by # cms',
                  isActive: false,
                },
              ]
            },
            {
              title: 'Without Cut: Burned Surface',
              options: [
                {
                  name: 'Black',
                  isActive: false,
                },
                {
                  name: 'White',
                  isActive: false,
                },
                {
                  name: 'Red',
                  isActive: false,
                },
              ]
            },
            {
              title: 'Without Cut: Burned Blisters',
              options: [
                {
                  name: 'None',
                  isActive: false,
                },
                {
                  name: 'Present',
                  isActive: false,
                },
              ]
            },
          ]
        },
      ],
      vitalQuestions: [
        {
          title: 'Patient Appearance',
          options: [
            {
              name: 'Looks Comfortable',
              isActive: false,
            },
            {
              name: 'In Pain',
              isActive: false,
            },
            {
              name: 'Appears Breathless',
              isActive: false,
            },
            {
              name: 'Looks Unwell',
              isActive: false,
            },
            {
              name: 'Looks Very Thin',
              isActive: false,
            },
            {
              name: 'Looks Obese',
              isActive: false,
            }
          ]
        },
        {
          title: 'Patient Gait',
          options: [
            {
              name: 'Walks Normally',
              isActive: false,
            },
            {
              name: 'Walks with a Limp',
              isActive: false,
            },
            {
              name: 'Walks with a Bump',
              isActive: false,
            },
            {
              name: 'Cannot Walk',
              isActive: false,
            },
          ]
        },
      ],
      preCheckQuestions: [
        {
          question: "Have you washed your hands?",
          isChecked: false,
        },
        {
          question: "If you are examning a female patient, is there a female chaperon in the room?",
          isChecked: false,
        },
        {
          question: "Have you greeted the patient by name?",
          isChecked: false,
        },
        {
          question: "Ask the patient to sit/lie down comfortably, assist if necessary?",
          isChecked: false,
        },
        {
          question: "Watch as the patient walks to the chair/couch?",
          isChecked: false,
        },
        {
          question: "Ask the patient if there is any pain anywhere, and if so, approach that region last and very slowly?",
          isChecked: false,
        },
      ],
      generalExams: {
        eyesJaundice: null,
        eyesPallor: null,
        handsCyanosis: null,
        handsClubbing: null,
        legsOedema: null,
      },
      vitalsOptions: {
        patientAppearance: [],
        patientGait: [],
        bloodPressure: {
          first: 0,
          second: 0
        },
        oxygen: {
          first: 0,
          second: 0
        },
        patientTemp: 0,
        patientHeight: 0,
        patientWeight: 0,
        patientBMI: 0
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
              organsToExamine: ['eye', 'head', 'hand'],
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
                  showOther: false,
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
                  showOther: false,
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
                  showOther: false,
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
                  showOther: false,
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
                  showOther: false,
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
              organsToExamine: ['ear', 'cheek&mouth'],
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
                  showOther: false,
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
                  showOther: false,
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
                  showOther: false,
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
                  showOther: false,
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
                  showOther: false,
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
              organsToExamine: ['cheek&mouth'],
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
                  showOther: false,
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
                  showOther: false,
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
                  showOther: false,
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
                  showOther: false,
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
                  showOther: false,
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
              organsToExamine: ['neck', 'cheek&mouth', 'eyes'],
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
                  showOther: false,
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
                  showOther: false,
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
                  showOther: false,
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
                  showOther: false,
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
                  showOther: false,
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
              organsToExamine: ['back', 'eyes&mouth', 'lowerleg&ankle'],
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
                  showOther: false,
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
                  showOther: false,
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
                  showOther: false,
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
                  showOther: false,
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
                  showOther: false,
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
              organsToExamine: ['joints'],
              questions: [
                {
                  question: "How long has this been going on?",
                  type: 'text',
                  placeholder: 'Describe the # of days'
                },
                {
                  question: "Where did it start?",
                  type: 'button',
                  showOther: false,
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
                  showOther: false,
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
                  showOther: false,
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
                  showOther: false,
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
                  showOther: false,
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
              organsToExamine: ['eyes', 'lowerleg&ankle', 'hands', 'chest'],
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
                  showOther: false,
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
                  showOther: false,
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
                  showOther: false,
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
                  showOther: false,
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
                  showOther: false,
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
              isActive: false,
              organsToExamine: ['eye', 'lowerleg&ankle', 'hands', 'abdomen'],
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
                  showOther: false,
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
                  showOther: false,
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
                  showOther: false,
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
                  showOther: false,
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
              organsToExamine: [],
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
                  showOther: false,
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
                  showOther: false,
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
                  showOther: false,
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
                  showOther: false,
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
              isActive: false,
              organsToExamine: [],
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
                  showOther: false,
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
                  showOther: false,
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
                  showOther: false,
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
                  showOther: false,
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
                  showOther: false,
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
              isActive: false,
              organsToExamine: ['neck', 'cheek&mouth', 'eyes'],
              questions: [
                {
                  question: "How long has this been going on?",
                  type: 'text',
                  placeholder: 'Describe the # of days'
                },
                {
                  question: "Where did it start?",
                  type: 'button',
                  showOther: false,
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
                  showOther: false,
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
                  showOther: false,
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
                  showOther: false,
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
                  showOther: false,
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
          organsToExamine: ['eye', 'hands', 'neck&throat', 'chest', 'lowerleg&ankle'],
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
                  showOther: false,
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
              organsToExamine: ['eye', 'neck', 'adbomen', 'cheek&mouth', 'lump&swelling', 'lowerleg&ankle'],
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
                    },
                  ]
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
                  placeholder: 'Describe the # of times per day'
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
              organsToExamine: ['eye', 'hands', 'neck&throat', 'chest', 'lowerleg&ankle'],
              questions: [
                {
                  question: "Where is the swelling?",
                  type: 'text'
                },
                {
                  question: "How many swellings are there?",
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
              showOther: false,
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
              showOther: false,
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
              showOther: false,
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
              showOther: false,
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
              showOther: false,
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
              showOther: false,
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
              showOther: false,
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
              showOther: false,
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
              showOther: false,
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
              showOther: false,
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
              showOther: false,
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
              showOther: false,
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
              placeholder: 'Describe the # of days',
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
              placeholder: 'PDescribe the # of days between incidents',
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
              placeholder: 'Describe any relevant information',
            },
            {
              question: "Is there any relief?",
              type: 'text',
              placeholder: 'Describe any relevant information',
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
              showOther: false,
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
              placeholder: 'Describe the # of days',
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
              showOther: false,
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
              placeholder: 'Describe any possible causes',
            },
            {
              question: "What provides relief?",
              type: 'text',
              placeholder: 'Describe any possible causes',
            },
            {
              question: "Is there a relation with positioning?",
              type: 'button',
              showOther: false,
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
              showOther: false,
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
              placeholder: 'Describe the # of days',
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
              placeholder: 'Describe the # of days',
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
              placeholder: 'Describe any relevant information',
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
              placeholder: 'PDescribe the location on body',
            },
            {
              question: "How big is the rash?",
              type: 'text',
              placeholder: 'Describe the size in cm x cm',
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
              placeholder: 'Describe any relevant information',
            },
          ]
        },
        {
          name: 'Bleeding with Stool',
          isActive: false,
          showOther: false,
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
                  placeholder: 'Describe # of days',
                },
                {
                  question: "What is the duration of the patient's period?",
                  type: 'text',
                  placeholder: 'Describe # of days',
                },
                {
                  question: "What is the interval between periods?",
                  type: 'button',
                  showTextInput: false,
                  options: [
                    {
                      name: 'Regular',
                      isActive: false,
                      placeholder: 'Describe the # of days'
                    },
                    {
                      name: 'Varies',
                      isActive: false,
                      placeholder: 'Describe the # to # days'
                    },
                  ]
                },
                {
                  question: "What is the flow?",
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
                  placeholder: 'Describe # age',
                },
                {
                  question: "How old was the patient at the last childbirth?",
                  type: 'text',
                  placeholder: 'Describe # age',
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
                  type: 'button',
                  options: [
                    {
                      name: 'Not Started Yet',
                      isActive: false
                    },
                    {
                      name: 'Started at age #',
                      isActive: false
                    },
                  ]
                },
                {
                  question: "Are there any associated symptoms?",
                  type: 'button',
                  showOther: false,
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
                  placeholder: 'Describe # of days',
                },
                {
                  question: "What is the duration of the patient's period?",
                  type: 'text',
                  placeholder: 'Describe the # of days',
                },
                {
                  question: "What is the interval between periods?",
                  type: 'button',
                  showTextInput: false,
                  options: [
                    {
                      name: 'Regular',
                      isActive: false,
                      placeholder: 'Describe the # of days'
                    },
                    {
                      name: 'Varies',
                      isActive: false,
                      placeholder: 'Describe the # to # days'
                    },
                  ]
                },
                {
                  question: "What is the flow?",
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
                  placeholder: 'Describe # age',
                },
                {
                  question: "How old was the patient at the last childbirth?",
                  type: 'text',
                  placeholder: 'Describe # age',
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
                  placeholder: 'Started at age #'
                },
                {
                  question: "Are there any associated symptoms?",
                  type: 'button',
                  showOther: false,
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
                  placeholder: 'Describe the # days',
                },
                {
                  question: "What is the duration of the patient's period?",
                  type: 'text',
                  placeholder: 'Describe the # days',
                },
                {
                  question: "What is the interval between periods?",
                  type: 'button',
                  showTextInput: false,
                  options: [
                    {
                      name: 'Regular',
                      isActive: false,
                      placeholder: 'Describe the # of days'
                    },
                    {
                      name: 'Varies',
                      isActive: false,
                      placeholder: 'Describe the # to # days'
                    },
                  ]
                },
                {
                  question: "What is the flow?",
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
                  placeholder: 'Describe # age',
                },
                {
                  question: "How old was the patient at the last childbirth?",
                  type: 'text',
                  placeholder: 'Describe # age',
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
                  placeholder: 'Started at age #'
                },
                {
                  question: "Are there any associated symptoms?",
                  type: 'button',
                  showOther: false,
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
                  placeholder: 'Describe the # days',
                },
                {
                  question: "What is the duration of the patient's period?",
                  type: 'text',
                  placeholder: 'Describe the # days',
                },
                {
                  question: "What is the interval between periods?",
                  type: 'button',
                  showTextInput: false,
                  options: [
                    {
                      name: 'Regular',
                      isActive: false,
                      placeholder: 'Describe the # of days'
                    },
                    {
                      name: 'Varies',
                      isActive: false,
                      placeholder: 'Describe the # to # days'
                    },
                  ]
                },
                {
                  question: "What is the flow?",
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
                  placeholder: 'Describe # age',
                },
                {
                  question: "How old was the patient at the last childbirth?",
                  type: 'text',
                  placeholder: 'Describe # age',
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
                  placeholder: 'Started at age #'
                },
                {
                  question: "Are there any associated symptoms?",
                  type: 'button',
                  showOther: false,
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
                  placeholder: 'Describe the # days',
                },
                {
                  question: "What is the duration of the patient's period?",
                  type: 'text',
                  placeholder: 'Describe the # days',
                },
                {
                  question: "What is the interval between periods?",
                  type: 'button',
                  showTextInput: false,
                  options: [
                    {
                      name: 'Regular',
                      isActive: false,
                      placeholder: 'Describe the # of days'
                    },
                    {
                      name: 'Varies',
                      isActive: false,
                      placeholder: 'Describe the # to # days'
                    },
                  ]
                },
                {
                  question: "What is the flow?",
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
                  placeholder: 'Describe # age',
                },
                {
                  question: "How old was the patient at the last childbirth?",
                  type: 'text',
                  placeholder: 'Describe # age',
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
                  placeholder: 'Started at age #'
                },
                {
                  question: "Are there any associated symptoms?",
                  type: 'button',
                  showOther: false,
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
              type: 'text',
              placeholder: 'Describe the location on body'
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
              placeholder: 'Describe the # of days',
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
              showOther: false,
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
              showOther: false,
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
              placeholder: 'Describe the # of days',
            },
            {
              question: "Where is the ulcer located?",
              type: 'text',
              placeholder: 'Describe the location on body',
            },
            {
              question: "How did the ulcer start?",
              type: 'button',
              showOther: false,
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
              showOther: false,
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
              placeholder: 'Describe the # of days',
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
              showOther: false,
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
              placeholder: 'Describe any relevant information',
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
              placeholder: 'Describe any relevant information'
            },
            {
              question: "How is the fainting relieved?",
              type: 'text',
              placeholder: 'Describe any relevant information'
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
                  placeholder: 'Describe the # of days'
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
                  placeholder: 'Describe the # of days'
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