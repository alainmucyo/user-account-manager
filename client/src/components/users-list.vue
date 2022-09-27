<template>
  <div v-if="users.length>0">
    <h2 class="text-gray-700 text-lg tracking-wide mb-5 font-bold">Registered users</h2>
    <table class="table-auto">
      <thead class="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
      <tr>
        <th></th>
        <th class="p-2"><p class="font-semibold text-left">Names</p></th>
        <th class="p-2"><p class="font-semibold text-left">Phone</p></th>
        <th class="p-2"><p class="font-semibold text-left">Email</p></th>
        <th class="p-2"><p class="font-semibold text-left">Status</p></th>
        <th></th>
      </tr>
      </thead>
      <tbody class="text-sm divide-y divide-gray-100">
      <single-user v-for="(user,i) in users" :key="user.id" :user="user" :i="i"></single-user>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";
import SingleUser from "@/components/single-user";
import {GlobalEventEmitter} from "@/utils/event-bus";

export default {
  name: "users-list",
  components: {SingleUser},
  data() {
    return {
      users: []
    }
  },
  methods: {
    async loadUsers() {
      const {data} = await axios.get("/users");
      this.users = data;
    }
  },
  created() {
    this.loadUsers();
    GlobalEventEmitter.$on("loadUser", () => {
      console.log("Received event");
      console.log(this.user);
      this.loadUsers()
    })
  }
}
</script>

<style scoped>

</style>