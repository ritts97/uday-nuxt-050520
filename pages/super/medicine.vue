<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-md-12 text-center">
          Medicine Stock
          <hr>
        </div>
      </div>
    </div>
    <!-- <div class="container">
      <div class="row">
        <div class="col-md-12 rounded">
          <div class="w-100 bg-white mb-3 mt-0 px-3 pt-3 pb-3" v-if="tabs[0].isActive">
            <div class="container">
              <div class="row my-3 text-center">
                <div class="col-md-12">
                  <img src="/medicine-stock.svg" class="w-100" alt="">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> -->
    <div class="container mb-3">
      <div class="row">
        <div class="col-md-6 mt-2">
          <!-- <nuxt-link to="/super/"> -->
            <button @click="showAlert('New medicine has been successfully added to stock.')" class="w-100 btn btn-dark rounded font-weight-bold py-3 mb-1  text-uppercase">Add New Medicine</button>
          <!-- </nuxt-link> -->
        </div>
        <div class="col-md-6 mt-2">
          <!-- <nuxt-link to="/super/"> -->
            <button @click="showAlert('Medicine has been successfully removed from stock.')" class="w-100 btn btn-dark rounded font-weight-bold py-3 mb-1  text-uppercase">Remove Medicine</button>
          <!-- </nuxt-link> -->
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row mt-0">
        <div class="col-md-12">
          <ul class="list-inline mb-2">
            <li class="list-inline-item pointer" >
              <div class="px-2 mr-2 pb-1 mb-1 underline" role="button">
                Cluster 1
              </div>
            </li>
             <li class="list-inline-item pointer" >
              <div class="px-2 mr-2 pb-1 mb-1" role="button">
                Cluster 2
              </div>
            </li>
             <li class="list-inline-item pointer" >
              <div class="px-2 mr-2 pb-1 mb-1" role="button">
                Cluster 3
              </div>
            </li>
             <li class="list-inline-item pointer" >
              <div class="px-2 mr-2 pb-1 mb-1" role="button">
                Cluster 4
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <div class="w-100 bg-white mb-3 mt-0 px-3 pt-3 pb-3">
            <table class="table table-sm table-hover mt-3">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Name</th>
                  <th scope="col">Type</th>
                  <th scope="col">Batch</th>
                  <th scope="col">Expiry</th>
                  <th scope="col">Stock</th>
                  <th scope="col">MRP</th>
                  <th scope="col">GST</th>
                  <th scope="col">Dis. Rate</th>
                  <th scope="col">Crit. Value</th>
                </tr>
              </thead>
              <tbody>
                <tr class="pointer">
                  <td>AAU</td>
                  <td>Lorazepam</td>
                  <td>AAU</td>
                  <td>135</td>
                  <td>12/22</td>
                  <td>99</td>
                  <td>$99</td>
                  <td>$99</td>
                  <td>0%</td>
                  <td>10</td>
                </tr>
                <tr class="pointer">
                  <td>AAU</td>
                  <td>Lorazepam</td>
                  <td>AAU</td>
                  <td>135</td>
                  <td>12/22</td>
                  <td>99</td>
                  <td>$99</td>
                  <td>$99</td>
                  <td>0%</td>
                  <td>10</td>
                </tr>
                <tr class="pointer">
                  <td>AAU</td>
                  <td>Lorazepam</td>
                  <td>AAU</td>
                  <td>135</td>
                  <td>12/22</td>
                  <td>99</td>
                  <td>$99</td>
                  <td>$99</td>
                  <td>0%</td>
                  <td>10</td>
                </tr>
                <tr class="pointer">
                  <td>AAU</td>
                  <td>Lorazepam</td>
                  <td>AAU</td>
                  <td>135</td>
                  <td>12/22</td>
                  <td>99</td>
                  <td>$99</td>
                  <td>$99</td>
                  <td>0%</td>
                  <td>10</td>
                </tr>
                <tr class="pointer" style="background-color: salmon;">
                  <td>AAU</td>
                  <td>Lorazepam</td>
                  <td>AAU</td>
                  <td>135</td>
                  <td>12/22</td>
                  <td>99</td>
                  <td>$99</td>
                  <td>$99</td>
                  <td>0%</td>
                  <td>10</td>
                </tr>
                <tr class="pointer" style="background-color: salmon;">
                  <td>AAU</td>
                  <td>Lorazepam</td>
                  <td>AAU</td>
                  <td>135</td>
                  <td>12/22</td>
                  <td>99</td>
                  <td>$99</td>
                  <td>$99</td>
                  <td>0%</td>
                  <td>10</td>
                </tr>
                <tr class="pointer" style="background-color: salmon;">
                  <td>AAU</td>
                  <td>Lorazepam</td>
                  <td>AAU</td>
                  <td>135</td>
                  <td>12/22</td>
                  <td>99</td>
                  <td>$99</td>
                  <td>$99</td>
                  <td>0%</td>
                  <td>10</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="container mb-3">
      <div class="row">
        <div class="col-md-12">
          <nuxt-link to="/super">
            <button @click="showAlert('New Admin has been successfully registered.')" class="w-100 btn btn-dark rounded font-weight-bold py-3 mb-1  text-uppercase">
              Register New Admin
            </button>
          </nuxt-link>
        </div>
      </div>
    </div> -->
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
        title: 'View Medicine Stock',
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
