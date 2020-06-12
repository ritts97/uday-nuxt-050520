<template>
  <div>    
    <!-- Header -->
    <div class="fixed-top">
      <div class="w-100 bg-dark text-white">
        <div class="container bg-dark">
          <div class="row py-2">
            <div class="col-md-6 font-weight-bold pt-2" style="font-size: 24px;"> 
              <nuxt-link to="/" class="text-white text-decoration-none">UD.</nuxt-link>
            </div>
            <div class="col-md-6 py-3 text-right">
              <div class="dropdown d-inline">
                <span class="dropdown-toggle dropdown-no-caret pointer" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  jane.doe@udayhealth.org
                </span>
                <div class="dropdown-menu">
                  <a href="/ha/mis-reports" class="dropdown-item">Link</a>
                  <span class="dropdown-item" @click="sendAlert('123')">MIS Reports</span>
                  <span class="dropdown-item" @click="sendAlert('1234')">MIS Reports</span>
                  <span class="dropdown-item" @click="sendAlert('1235')">MIS Reports</span>
                  <div class="dropdown-divider"></div>
                  <nuxt-link to="/ha/edit-profile" class="dropdown-item">Edit Profile</nuxt-link>
                  <nuxt-link to="/ha/edit-profile" class="dropdown-item">Change Password</nuxt-link>
                </div>
              </div>
              | Logout
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Start Body -->
    <div style="margin-top: 84px;">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <small>
              <!-- {{ currPath }} -->
              <span v-for="(path,index) in currPath" :key="index">
                <span v-if="index !== currPath.length - 1">
                  <nuxt-link :to="path.url" class="text-muted">
                    {{ path.title }}
                  </nuxt-link> 
                </span>
                <span v-else>
                  {{ path.title }}
                </span>
                <span v-if="index !== currPath.length - 1"> > </span>
              </span>
            </small>
            <!-- Lorem ipsum dolor sit amet. {{ counter }} <button @click="increment()">Click</button> <br> -->
            <!-- <button @click="increment()">Click</button> -->
          </div>
        </div>
      </div>
      <transition name="u-fade" mode="out-in">
        <nuxt  />
        <!-- :key="routerViewKey" -->
      </transition>
    </div>

    <!-- Footer -->
    <div class="container text-center mb-4">
      <div class="row">
        <div class="col-md-12 text-secondary">
          <small>
            UdayHealth.org is a virtual, telemedicine application organized by medical professionals and volunteers worldwide.
          </small>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  computed: {
    counter () {
      return this.$store.state.counter
    },
    currPath () {
      return this.$store.state.currPath
    },
    routerViewKey () {
      return this.$route.fullPath
    }
  },
  data() {
    return {
      path: [
        {
          title: 'Dashboard',
          url: '/ha'
        },
      ]
    }
  },
  mounted () {
    this.setPath()

    // alert('123')
  },
  methods: {
    setPath () {
      // this.$store.commit('increment', this.path)
    },
    sendAlert (msg) {
      alert(msg)
    }
  }
}
</script>

<style>
html, body {
  background-color: #eee;
}

.dropdown-no-caret:after { content: none }

.u-fade-enter-active, .u-fade-leave-active {
  transition: opacity .4s;
}
.u-fade-enter, .u-fade-leave-active {
  opacity: 0;
}
</style>
