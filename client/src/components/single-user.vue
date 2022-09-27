<template>
  <tr class="mb-2">

    <td>{{ i + 1 }}.</td>
    <td class="p-2">
      <div class="text-left">{{ user.firstName }} {{ user.lastName }}</div>
    </td>
    <td class="p-2">
      <div class="text-left">{{ user.phoneNumber }}</div>
    </td>
    <td class="p-2">
      <div class="text-left">{{ user.email }}</div>
    </td>
    <td class="p-2">
      <span v-if="user.state"
            :class="`text-xs ${state.color} ${state.background} rounded px-1 py-0.5 font-semibold`">{{
          state.state.toLowerCase()
        }}</span>
    </td>
    <td class="p-2"><a class="text-blue-600 hover:text-blue-500 duration-100" @click.prevent="more" href="#">More</a>
    </td>
  </tr>
</template>

<script>
import UserModal from "@/components/user-modal";

export default {
  name: "single-user",
  props: ["user", "i"],
  computed: {
    state() {
      if (this.user.state.toLowerCase().includes("pending")) {
        return {state: "Pending", background: "bg-blue-200", color: "text-blue-800"}
      }
      if (this.user.state.toLowerCase().includes("unverified")) {
        return {state: "Unverified", background: "bg-red-200", color: "text-red-800"}
      }
      return {state: "Verified", background: "bg-green-200", color: "text-green-800"}
    }
  },

  methods: {
    more() {
      this.$modal.show(UserModal, {user: this.user})
    }
  }
}
</script>

<style scoped>

</style>