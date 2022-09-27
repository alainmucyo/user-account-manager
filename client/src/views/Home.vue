<template>
  <div class="flex justify-center py-6 px-3">
    <div class="lg:w-1/2 w-full bg-white rounded p-4 shadow">
      <div v-if="user" class="mb-2 flex justify-between items-center">
        <div>
          <h1 class="text-xl text-gray-600">Hello <b>{{ user.firstName }}</b>!
          </h1>
          <b class="text-gray-600 text-sm">Account state: </b>
          <span v-if="user.state"
                :class="`text-sm ${state.color} ${state.background} rounded px-3 py-1 font-semibold`">{{
              state.state.toUpperCase()
            }}</span>
        </div>

        <div class="relative" v-if="user.profilePicture">
          <img :src="user.profilePicture" class="w-20 h-20 rounded-full">

          <span
              class="top-0 left-14 absolute  w-5 h-5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
        </div>
        <a href="#" @click.prevent="logout" class="text-red-600">Logout</a>
      </div>
      <hr class="my-6 ">
      <user-details-form v-if="user && state.state=='Unverified' && user.role==='user'" @saved="loadUser"/>
      <user v-if="user && state.state!='Unverified' && user.role==='user'" :user="user"/>
      <users-list v-if="user &&  user.role==='admin'"/>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import UserDetailsForm from "@/components/user-details-form";
import User from "@/components/user";
import UsersList from "@/components/users-list";
// import {GlobalEventEmitter} from "@/utils/event-bus";

export default {
  name: 'Home',
  components: {UsersList, User, UserDetailsForm},
  data() {
    return {
      transactions: [],
      user: null
    }
  },
  methods: {
    async loadUser() {
      try {
        const {data} = await axios.get("/users/check");
        this.user = data;
      } catch (e) {
        if (e.response.status === 401) {
          this.logout()
        }
      }

    },

    logout() {
      localStorage.removeItem("token");
      this.$store.dispatch("setAuth", false);
      this.$store.dispatch("setToken", '');
      this.$router.push("/login")
    }
  },
  computed: {
    state() {
      if (!this.user) return {state: "Loading...", background: "", color: ""}
      if (this.user.state.toLowerCase().includes("pending")) {
        return {state: "Pending", background: "bg-blue-200", color: "text-blue-800"}
      }
      if (this.user.state.toLowerCase().includes("unverified")) {
        return {state: "Unverified", background: "bg-red-200", color: "text-red-800"}
      }
      return {state: "Verified", background: "bg-green-200", color: "text-green-800"}
    }
  },
  created() {
    this.loadUser();

  }
}
</script>