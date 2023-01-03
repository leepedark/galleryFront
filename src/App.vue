<template>
  <Header/>
  <RouterView/>
  <Footer/>
</template>

<script>
// import Home from "@/pages/Home.vue";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import axios from "axios";
import store from "@/scripts/store";
import {useRoute} from "vue-router";
import {watch} from "vue";

export default {
  name: 'App',
  components: {
    Footer,
    Header,
    // Home
  },

  setup() {
    const check = () => {
      axios.get("/api/account/check").then((res) => {
        if (res.data) {
          store.commit("setAccount", res.data || 0);
        }
      }).catch(() => {
        console.log("로그인필요")
      })
    }
    const route = useRoute();

    watch(route, () => check());
  }

}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
