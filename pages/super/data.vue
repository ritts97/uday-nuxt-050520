<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-md-12 text-center">
          Data Analysis
          <hr>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-md-12 rounded">
          <div class="w-100 bg-white mb-3 mt-0 px-3 pt-3 pb-3" v-if="tabs[0].isActive">
            <div class="container">
              <div class="row my-3 text-center">
                <div class="col-md-12">
                  <img src="/data-anal.svg" class="w-100" alt="">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container mb-3">
      <div class="row">
        <div class="col-md-12">
          <nuxt-link to="/super">
            <button @click="showAlert('Your cluster data has been exported.')" class="w-100 btn btn-dark rounded font-weight-bold py-3 mb-1  text-uppercase">
              Export to File
            </button>
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'dashboard',
  mounted() {
    let path = [
      {
        title: 'Dashboard',
        url: '/super'
      },
      {
        title: 'Data Analysis',
        url: '/ha/register-new'
      },
    ]

    this.$store.commit('increment', path)
  },
  methods: {
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
    showAlert: function (msg) {
      alert(msg)
    }
  },
  data() {
    return {
      list: [],
      tabs: [
        {
          name: 'patients',
          title: 'Demographics',
          isActive: true,
        }
      ]
    }
  },
}
</script>

<style>
</style>
