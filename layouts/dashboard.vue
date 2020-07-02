<template>
  <div>    
    <!-- Header -->
    <div class="fixed-top">
      <div class="w-100 bg-dark text-white">
        <div class="container bg-dark">
          <div class="row py-2">
            <div class="col-md-12 pt-2"> 
              <span class="font-weight-bold" style="font-size: 24px;">
                <nuxt-link to="/" class="text-white text-decoration-none">UD.</nuxt-link>
              </span>
              <div class="float-right pt-1 dropdown d-inline">
                <span class="dropdown-toggle dropdown-no-caret pointer" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  jane.doe@udayhealth.org
                </span>
                <div class="dropdown-menu">
                  <nuxt-link to="/ha/edit-profile" class="dropdown-item">Edit Profile</nuxt-link>
                  <nuxt-link to="/ha/edit-password" class="dropdown-item">Change Password</nuxt-link>
                </div>
                  | 
                <nuxt-link to="/" class="text-white">Logout</nuxt-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Start Body -->
    <div style="margin-top: 72px;">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <small>
              <!-- {{ currPath }} -->
              <span v-for="(path,index) in currPath" :key="index">
                <span v-if="index !== currPath.length - 1">
                  <nuxt-link :to="path.url" class="text-muted">
                    {{ path.title }}</nuxt-link> 
                </span>
                <span v-else>
                  {{ path.title }}
                </span>
                <span v-if="index !== currPath.length - 1"> > </span>
              </span>
            </small>
            <div class="float-right d-inline">
              <small>Cluster 0001</small>
            </div>
            <!-- Lorem ipsum dolor sit amet. {{ counter }} <button @click="increment()">Click</button> <br> -->
            <!-- <button @click="increment()">Click</button> -->
          </div>
          <div class="col-md-12">
            <hr>
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
    // routerViewKey () {
    //   return this.$route.fullPath
    // }
  },
  data() {
    return {
      path: [
        // {
        //   title: 'Dashboard',
        //   url: '/ha'
        // },
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

.underline {
  border-bottom: 2px solid #aaa;
}

.dropdown-no-caret:after { content: none }

.u-fade-enter-active, .u-fade-leave-active {
  transition: opacity .4s;
}
.u-fade-enter, .u-fade-leave-active {
  opacity: 0;
}

tr.pointer td, tr.pointer th {
  padding-top: 7px;
}
</style>
