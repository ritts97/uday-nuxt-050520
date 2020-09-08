<template>
  <div>
    <div class="container mt-0">
      <div class="row" v-if="this.$store.state.currPatient.status === 'allocated'">
        <div class="col-md-12">
          <!-- <nuxt-link to="/md/profile/profile-visit"> -->
            <button @click="showDocsFeedback = true; editable = true" :disabled="editable" class="w-100 btn btn-dark rounded font-weight-bold py-3 mb-2  text-uppercase">Update Episode Feedback</button>     
          <!-- </nuxt-link> -->
        </div>
        <div class="col-md-12">
          <hr>
        </div>
      </div>

      <!-- <div class="row">
        <div class="col-md-12">
          Curr Cluster: {{ this.$store.state.currCluster }} <br>
          Curr Patient: {{ this.$store.state.currPatient.id }} <br>
          Episode ID: {{ this.$store.state.currPatient.episodes[1].episodeID }}<br>
          Episode Data: {{ this.$store.state.currPatient.episodes }}
        </div>
      </div> -->

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
              <div class="col-md-12">
                <div class="small text-muted mb-2">
                  Chief Complaints
                  <hr class="mb-1 mt-1">
                </div>

                <!-- {{ currEpisode }} <br>
                
                {{ this.$route.query.id }} <br>
   -->
                <!-- {{ episodeData.episodeDetails }} -->
                <div v-if="episodeData.episodeDetails.chiefComplaints">
                  <div v-for="(complaints, index) in episodeData.episodeDetails.chiefComplaints" :key="index">
                    <div v-for="(complaint, cIndex) in complaints" :key="cIndex" class="d-inline">
                      <button v-if="complaint" class="btn px-3 mb-2 mr-2 small btn-dark" role="button">
                        {{ complaint }}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-12 mt-4">
                <div class="small text-muted mb-2">
                  Fixed Questions
                  <hr class="mb-1 mt-1">
                </div>
                <div v-for="(question, indexQuestion) in episodeData.episodeDetails.chiefComplaintsFixedQuestions" class="mt-3 mb-4" :key="indexQuestion">
                  <div v-if="question.type === 'text'">
                    <label for="exampleFormControlSelect1">{{ question.question }}</label><br>
                    {{ question.answer }}
                  </div>
                  <div v-if="question.type === 'button'">
                    <label for="exampleFormControlSelect1">{{ question.question }}</label><br>
                    <button class="btn mb-2 mr-2" v-for="(option, indexAnswer) in question.options" :key="indexAnswer" :class="option.isActive ? 'btn-dark text-white' : 'btn-light'">
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
                  <div v-if="question.type === 'number'">
                    <label for="exampleFormControlSelect1">{{ question.question }}</label><br>
                    <input type="number" class="mt-1 p-2 mr-2 w-25" placeholder="0"> {{ question.caption }}
                  </div>
                </div>
              </div>
            </div>
            <!-- <div class="row mt-1">
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
            </div> -->
          </div>
          <div class="w-100 bg-white mb-3 mt-0 px-3 pt-3 pb-3" style="min-height: 200px;" v-if="subTabs[1].isActive">
            <div class="row mt-1">
              <div class="mb-4" v-for="(vitalQuestion, index) in episodeData.episodeDetails.vitals" :class="[vitalQuestion.fullLength ? 'col-md-12' : 'col-md-6']" :key="index">
                <div v-if="vitalQuestion.options">
                  <label for="exampleFormControlSelect1">{{ vitalQuestion.title }}</label><br>
                  <button v-for="(option, optionIndex) in vitalQuestion.options" :class="option.isActive ? 'btn-dark' : 'btn-light'" :key="optionIndex" class="btn mb-2 mr-2">
                    {{ option.name }}
                  </button>
                </div>
                <div v-else-if="!vitalQuestion.options && vitalQuestion.name === 'bp'">
                  <label for="exampleFormControlSelect1">{{ vitalQuestion.title }}</label><br>
                  {{ vitalQuestion.valueFirst }} / {{ vitalQuestion.valueSecond }}
                  {{ vitalQuestion.caption }}
                </div>
                <div v-else-if="!vitalQuestion.options && vitalQuestion.name === 'height'">
                  <label for="exampleFormControlSelect1 mb-2">{{ vitalQuestion.title }}</label><br>
                  {{ vitalQuestion.value }} {{ vitalQuestion.caption }}
                </div>
                <div v-else-if="!vitalQuestion.options && vitalQuestion.name === 'weight'">
                  <label for="exampleFormControlSelect1 mb-2">{{ vitalQuestion.title }} </label><br>
                  {{ vitalQuestion.value }} {{ vitalQuestion.caption }}
                </div>
                <div v-else-if="!vitalQuestion.options && vitalQuestion.name === 'bmi'">
                  <label for="exampleFormControlSelect1 mb-2">{{ vitalQuestion.title }}</label><br>
                  <div class="mt-2">{{ vitalQuestion.value }} {{ vitalQuestion.caption }}</div>
                </div>
                <div v-else>
                  <label for="exampleFormControlSelect1">{{ vitalQuestion.title }}</label><br>
                  {{ vitalQuestion.value }} {{ vitalQuestion.caption }}
                </div>
              </div>
            </div>
            <!-- <div class="row mt-1">
              <div class="col-md-6 text-left">
                <small>First Recorded: January 1, 2022</small>
              </div>
              <div class="col-md-6 text-right">
                <small>Last Updated: January 20, 2022</small>
              </div>
            </div> -->
          </div>
          <!-- <transition name="u-fade" mode="out-in"> -->
          <div class="w-100 bg-white mb-3 mt-0 px-3 pt-3 pb-3" style="min-height: 200px;" v-if="subTabs[2].isActive">
            <div class="row">
              <div class="col-md-12 text-muted small mb-0">
                General Exams
                <hr>
              </div>
              <div class="col-md-12">
                <div class="position-relative">
                  <div class="position-absolute">
                    <img src="/anatomy_sketch.svg" class="w-100" alt="">
                  </div>
                  <div class="w-100 bg-dark" style="padding-bottom: 59%;"></div>
                </div>
              </div>
            </div>
            <div class="row mt-1">
              <div class="col-md-12 mb-2 text-muted">
                  <small>Eyes</small>
                  <hr class="mb-1 mt-1">
                </div>
                <div class="col-md-6 mb-3">
                  <!-- {{ episodeData.episodeDetails.generalExams }} -->
                  <label for="exampleFormControlSelect1">{{ episodeData.episodeDetails.generalExams[0].name }}</label><br>
                  <button class="btn mb-2 mr-2" :class="option.isActive ? 'btn-dark' : 'btn-light'" v-for="(option, oIndex) in episodeData.episodeDetails.generalExams[0].options" :key="oIndex">
                    {{ option.name }}
                  </button>
                </div>
                <div class="col-md-6 mb-3">
                  <label for="exampleFormControlSelect1">{{ episodeData.episodeDetails.generalExams[1].name }}</label><br>
                  <button class="btn mb-2 mr-2" :class="option.isActive ? 'btn-dark' : 'btn-light'" v-for="(option, oIndex) in episodeData.episodeDetails.generalExams[1].options" :key="oIndex">
                    {{ option.name }}
                  </button>
                </div>
                <div class="col-md-12 mt-4 mb-2 text-muted">
                  <small>Hands</small>
                  <hr class="mb-1 mt-1">
                </div>
                <div class="col-md-6 mb-3">
                  <label for="exampleFormControlSelect1">{{ episodeData.episodeDetails.generalExams[2].name }}</label><br>
                  <button class="btn mb-2 mr-2" :class="option.isActive ? 'btn-dark' : 'btn-light'" v-for="(option, oIndex) in episodeData.episodeDetails.generalExams[2].options" :key="oIndex">
                    {{ option.name }}
                  </button>
                </div>
                <div class="col-md-6 mb-3">
                  <label for="exampleFormControlSelect1">{{ episodeData.episodeDetails.generalExams[3].name }}</label><br>
                  <button class="btn mb-2 mr-2" :class="option.isActive ? 'btn-dark' : 'btn-light'" v-for="(option, oIndex) in episodeData.episodeDetails.generalExams[3].options" :key="oIndex">
                    {{ option.name }}
                  </button>
                </div>
                <div class="col-md-12 mt-4 mb-2 text-muted">
                  <small>Legs</small>
                  <hr class="mb-1 mt-1">
                </div>
                <div class="col-md-6 mb-3">
                  <label for="exampleFormControlSelect1">{{ episodeData.episodeDetails.generalExams[4].name }}</label><br>
                  <button class="btn mb-2 mr-2" :class="option.isActive ? 'btn-dark' : 'btn-light'" v-for="(option, oIndex) in episodeData.episodeDetails.generalExams[4].options" :key="oIndex">
                    {{ option.name }}
                  </button>
                </div>
            </div>
            <!-- <div class="row mt-1">
              <div class="col-md-6 text-left">
                <small>First Recorded: January 1, 2022</small>
              </div>
              <div class="col-md-6 text-right">
                <small>Last Updated: January 20, 2022</small>
              </div>
            </div> -->
          </div>
          <!-- </transition> -->
          <!-- <transition name="u-fade" mode="out-in"> -->
            <div class="w-100 bg-white mb-3 mt-0 px-3 pt-3 pb-3" style="min-height: 200px;" v-if="subTabs[3].isActive">
              <div class="row">
                <div class="col-md-12 text-muted small mb-0">
                  Specific Exams
                  <hr>
                </div>
                <div class="col-md-12">
                  <div class="position-relative">
                    <div class="position-absolute">
                      <img src="/anatomy_sketch.svg" class="w-100" alt="">
                    </div>
                    <div class="w-100 bg-dark" style="padding-bottom: 59%;"></div>
                  </div>
                </div>
              </div>
              <!-- xxx
              {{ episodeData.episodeDetails }} -->
              <div class="row" v-for="(organ, index) in episodeData.episodeDetails.specificExams" :key="index">
                <div class="col-md-12 mb-2 text-muted">
                  <small>{{ organ.name }}</small>
                  <hr class="mb-1 mt-1">
                </div>
                <div class="col-md-6 mb-3" v-for="(question, qIndex) in organ.questions" :key="qIndex">
                  <div v-if="question.type === 'text'">
                    <label for="exampleFormControlSelect1">{{ question.title }}</label><br>
                    <input type="text" class="p-2 w-100" placeholder="Describe in the subject area in further detail">
                  </div>
                  <div v-else>
                    <label for="exampleFormControlSelect1">{{ question.title }}</label><br>
                    <button v-for="(option, oIndex) in question.options" :key="oIndex" class="btn mb-2 mr-2" :class="option.isActive ? 'btn-dark' : 'btn-light'">
                      {{ option.name }}
                    </button>
                  </div>
                </div>
              </div>
              <div v-if="episodeData.episodeDetails.specificExams.length === 0" class="row">
                <div class="col-md-12 my-4 small text-center">
                  There are no specific complaint questions.
                </div>
              </div>
            </div>
          <!-- </transition> -->
          <div class="w-100 bg-white mb-3 mt-0 px-3 pt-3 pb-3" style="min-height: 200px;" v-if="subTabs[4].isActive">
            <div class="row mt-1">
              <div class="col-md-12">
                <div class="small text-muted mb-2">
                  Additional Photos
                </div>
                <br><br>
                <!-- {{ this.$store.state.currPatient.episodes[0].complaint.addPhotos }} -->
              </div>
            </div>
            <!-- <div class="row mt-1">
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
          <!-- <div v-if="editable" class="container px-0">
            <div class="row">
              <div class="col-md-6">
                <button class="w-100 btn btn-dark rounded font-weight-bold py-3 px-0 mb-2 text-uppercase">Edit Complaint</button>     
              </div>
              <div class="col-md-6">
                <button disabled class="w-100 btn btn-dark rounded font-weight-bold py-3 px-0 mb-2 text-uppercase">Save Changes</button>     
              </div>
            </div>
          </div> -->
        </div>
      </div>
    </div>
    <!-- {{ editable }} -->
    <div class="container" v-if="editable === true">
      <div class="row">
        <div class="col-md-6">
          <button @click="editable = true" :disabled="!editable" class="w-100 btn btn-dark rounded font-weight-bold py-3 mb-2  text-uppercase">Edit Complaint Description</button>     
        </div>
        <div class="col-md-6 mb-3">
          <nuxt-link to="/md/">
            <button @click="editable = false;" :disabled="!editable" class="w-100 btn btn-dark rounded font-weight-bold py-3 mb-2  text-uppercase">Save Complaint Description</button>     
          </nuxt-link>
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


    <!-- {{ showDocsFeedback }} -->
    <transition name="u-fade" mode="out-in"> 
    <div v-if="!showDocsFeedback" class="w-100 bg-white py-4 mb-3" key="no-feedback">
      <div class="row">
        <div class="col-md-12">
          <div class="small text-center">
            This patient visit does not yet have feedback.
          </div>
        </div>
      </div>
    </div>
    
    <div v-else class="w-100 bg-white pt-3 pb-3 mb-3" style="min-height: 30px;" key="has-feedback">
      <div class="container">
        <div class="row mb-4">
          <div class="col-md-12">
            <div class="small text-muted">
              Prescriptions
            </div>
          </div>
          <div class="col-md-12">
            <div class="w-100 bg-white mt-0 pt-3">
              <table class="table table-sm table-hover w-100 table-responsive-01">
                <thead>
                  <tr>
                    <th scope="col"></th>
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
                  <!-- <tr class="pointer" style="height: 40px;">
                    <td class="py-3 px-3 text-center" colspan="9">
                      <small>
                        Medicine has not yet been prescribed.
                      </small>
                    </td>
                  </tr> -->
                  <tr class="pointer" v-for="(medicine, index) in episodeData.feedback.medicine" :key="index" style="height: 40px;">
                    <td><input type="checkbox" name="" id=""></td>
                    <td style="width: 17%;">{{ medicine.medicine }}</td>
                    <td style="width: 8%;">{{ medicine.unit }}</td>
                    <td style="width: 11%;">{{ medicine.morning }}</td>
                    <td style="width: 11%;">{{ medicine.afternoon }}</td>
                    <td style="width: 11%;">{{ medicine.evening }}</td>
                    <td style="width: 11%;">{{ medicine.dinner }}</td>
                    <td style="width: 11%;">{{ medicine.other }}</td>
                    <td style="width: 11%;">{{ medicine.duration }}</td>
                    <td style="width: 11%;">{{ medicine.time }}</td>
                  </tr>
                  <tr class="pointer" style="height: 40px;" v-if="editable">
                    <td></td>
                    <td><input type="text" class="w-100" placeholder="Medicine" v-model="newMedicineData.medicine"></td>
                    <td><input type="text" class="w-100" placeholder="Unit" v-model="newMedicineData.unit"></td>
                    <td><input type="text" class="w-100" placeholder="Morning" v-model="newMedicineData.morning"></td>
                    <td><input type="text" class="w-100" placeholder="Afternoon" v-model="newMedicineData.afternoon"></td>
                    <td><input type="text" class="w-100" placeholder="Evening" v-model="newMedicineData.evening"></td>
                    <td><input type="text" class="w-100" placeholder="Dinner" v-model="newMedicineData.dinner"></td>
                    <td><input type="text" class="w-100" placeholder="Other" v-model="newMedicineData.other"></td>
                    <td><input type="text" class="w-100" placeholder="Duration" v-model="newMedicineData.duration"></td>
                    <td><input type="text" class="w-100" placeholder="Time" v-model="newMedicineData.time"></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="col-md-6" v-if="editable" @click="saveMedicine()">
            <button class="w-100 btn btn-dark rounded font-weight-bold py-3 px-0 mb-2 text-uppercase">Add New Medicine</button>     
          </div>
          <div class="col-md-6" v-if="editable">
            <nuxt-link to="/ha/profile/new-episode">
              <button disabled class="w-100 btn btn-dark rounded font-weight-bold py-3 px-0 mb-2 text-uppercase">Delete Medicine</button>     
            </nuxt-link>
          </div>
        </div>
        <div v-if="this.visitStatus === 'allocated'" class="row">
          <div class="col-md-12 my-3">
            <div class="small text-muted mb-3">
              Investigations
            </div>
            <transition name="u-fade" mode="out-in">
            <div v-if="feedbackEditable === false" key="not-editable">
              <span v-if="episodeData.feedback.investigations === ''">
                There are no current investigations.
              </span>
              <span v-else key="has-investigations">
                {{ episodeData.feedback.investigations }}
              </span>
            </div>
            <textarea v-else v-model="episodeData.feedback.investigations" key="editable" class="w-100 p-2 mb-3" rows="3" placeholder="Provide a description of your current investigations...">
           </textarea>

            </transition>
            <!-- <div class="text-right w-100">
              <button class="btn btn-dark text-center px-5">Edit Advice</button>
              <button class="btn btn-dark text-center px-5">Save Advice</button>
            </div> -->
          </div>
        </div>
        <div v-if="this.visitStatus === 'allocated'" class="row">
          <div class="col-md-12 my-3">
            <div class="small text-muted mb-3">
              Advice
            </div>
            <transition name="u-fade" mode="out-in">
            <div v-if="feedbackEditable === false">
              <span v-if="episodeData.feedback.advice === ''">
                There is no current advice.
              </span>
              <span>
                {{ episodeData.feedback.advice }}
              </span>
            </div>
            <textarea v-else v-model="episodeData.feedback.advice" class="w-100 p-2 mb-3" rows="3"  placeholder="Provide a description of your current advice...">
            </textarea>
            </transition>
            <!-- <div class="text-right w-100">
              <button class="btn btn-dark text-center px-5">Edit Advice</button>
              <button class="btn btn-dark text-center px-5">Save Advice</button>
            </div> -->
          </div>
        </div>
        <div v-if="this.visitStatus === 'allocated'" class="row">
          <div class="col-md-12 my-3">
            <div class="small text-muted mb-3">
              Diagnosis
            </div>

            <transition name="u-fade" mode="out-in">
            <div v-if="feedbackEditable === false">
              <span v-if="episodeData.feedback.diagnosis === ''">
                There is not a current diagnosis.
              </span>
              <span>
                {{ episodeData.feedback.diagnosis }}
              </span>
            </div>
            <textarea v-else v-model="episodeData.feedback.diagnosis" class="w-100 p-2" rows="3"  placeholder="Provide a description of your current diagnosis...">
            </textarea>
            </transition>
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
      <div class="container">
        <div class="row mt-3">
          <div class="col-md-6" v-if="editable">
            <!-- <nuxt-link to="/ha/profile/new-episode"> -->
              <button :disabled="feedbackEditable" @click="feedbackEditable = !feedbackEditable" class="w-100 btn btn-dark rounded font-weight-bold py-3 px-0 mb-2 text-uppercase">Edit Investigations, Advice, Diagnosis</button>     
            <!-- </nuxt-link> -->
          </div>
          <div class="col-md-6" v-if="editable">
            <!-- <nuxt-link to="/ha/profile/new-episode"> -->
            <!-- :disabled="myFeedback.investigations === '' && myFeedback.advice === '' && myFeedback.diagnosis === ''" -->
              <button @click="updateFeedback(); feedbackEditable = false" :disabled="!feedbackEditable" class="w-100 btn btn-dark rounded font-weight-bold py-3 px-0 mb-2 text-uppercase">Save Investigations, Advice, Diagnosis</button>     
            <!-- </nuxt-link> -->
          </div>
        </div>
        
      </div>
    </div>
    </transition>

    <div v-if="showDocsFeedback === true">
      <div class="container" v-if="this.$store.state.currPatient.status === 'allocated'">
        <div class="row">
          <div class="col-md-12">
            <button @click="showDocsFeedback = false; editable = !editable" :disabled="!editable" class="w-100 btn btn-dark rounded font-weight-bold py-3 mb-2  text-uppercase">Save Episode Feedback</button>     
          </div>
          <div class="col-md-12 mb-3">
            <nuxt-link to="/md/">
              <button @click="editable = false; releasePatient()" :disabled="!editable" class="w-100 btn btn-dark rounded font-weight-bold py-3 mb-2  text-uppercase">Mark Patient Released</button>     
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
  computed: {
    currEpisodeGetter () {
      const episodeID = this.$route.query.id

      return this.$store.state.currPatient.episodes.find(episode => episode.episodeID === episodeID)
    }
  },
  mounted() {
    this.$store.commit('updatePath', [
      {
        title: 'Doctor\'s Dashboard',
        url: '/md'
      },
      {
        title: 'Patient\'s Profile',
        url: '/md/profile'
      },
      {
        title: 'Episode 1',
        url: '/md/profile'
      }
    ])

    // get episode data
    // set episode data
    this.getEpisodeData()

    // get episode data, set episode data
    const episodeID = this.$route.query.id

    if ( this.$store.state.currPatient.id !== '') {
      this.episodeData = this.$store.state.currPatient.episodes.find(episode => episode.episodeID === episodeID )

      if (this.episodeData.feedback.hasFeedback ) {
        this.showDocsFeedback = true
      }
    }
  },
  methods: {
    getEpisodeData() {
      const episodeID = this.$route.query.id

      if ( this.$store.state.currPatient.id !== '') {
        // const copy = Object.assign({}, )
        this.episodeData = JSON.parse(JSON.stringify(this.currEpisodeGetter))

        if (this.episodeData.feedback.hasFeedback ) {
          this.showDocsFeedback = true
        }
      }
    },
    updateFeedback() {
      const clusterID = this.$store.state.currCluster
      const patientID = this.$store.state.currPatient.id
      const episodeID = this.$store.state.currPatient.episodes[1].episodeID
      const feedback = this.episodeData.feedback

      feedback.hasFeedback = true

      this.$store.commit('updateFeedback', {
        clusterID: clusterID,
        patientID: patientID,
        episodeID: episodeID,
        feedback: feedback
      })


      this.getEpisodeData()
    },
    showAlert: function (msg) {
      confirm(msg)
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
    },
    saveMedicine: function () {
      let clusterID = this.$store.state.currCluster
      let patientID = this.$store.state.currPatient.id
      let episodeID = this.$route.query.id

      let newMedicine = {
        clusterID: clusterID,
        patientID: patientID,
        episodeID: episodeID,
        newMedicine: this.newMedicineData
      }

      this.$store.commit('addMedicineToEpisode', newMedicine)
      this.getEpisodeData() 
    },
    releasePatient: function () {
      const episodeInfo = {
        clusterID: this.$store.state.currCluster,
        patientID: this.$store.state.currPatient.id,
        episodeID: this.$route.query.id
      }

      confirm('The patient episode has been released.')
      this.$store.commit('releasePatient', episodeInfo)
    }
  },
  data() {
    return {
      newMedicineData: {
        medicine: 'Ooga booga',
        unit: '',
        morning: '',
        afternoon: '',
        evening: '',
        dinner: '',
        other: '',
        duration: '',
        time: ''
      },
      episodeData: {
        episodeDetails: {
          chiefComplaints: '',
          generalExams: []
        }
      },
      editable: false,
      list: [],
      feedbackEditable: false,
      visitStatus: 'allocated',
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

.table-responsive-01 {
  display: block;
  width: 100%;
}
</style>
