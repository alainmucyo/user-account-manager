<template>
  <div class="px-3 py-3">
    <user :user="user"/>
    <div class="text-gray-700 tracking-wide  mb-4">
      <p class="pb-1" v-if="user.profilePicture"><b>User profile picture:</b>
        <a :href="user.profilePicture" target="_blank"
           class="text-blue-600 hover:text-blue-500 duration-100 tracking-wide"> view</a>
      </p>
      <div v-if="state.state==='Pending'">
        <p class="pb-1"><b>Password/national ID: </b> {{ user.detail.nid_passport }}</p>
        <p class="pb-1"><b>Password/national ID image:</b>
          <a :href="user.detail.document_image" target="_blank"
             class="text-blue-600 hover:text-blue-500 duration-100 tracking-wide"> view</a>
        </p>
        <small-button text="verify" loading_text="Verifying..." classes="ml-2" state="verified" :user="user.id"
                      colors="bg-blue-600 disabled:bg-blue-400  hover:bg-blue-500"/>
        <small-button text="Reject" loading_text="Rejecting..." state="pendingVerification" :user="user.id"
                      colors="bg-red-600 disabled:bg-red-400  hover:bg-red-500"/>
      </div>
    </div>
  </div>
</template>

<script>
import User from "@/components/user";
import SmallButton from "@/components/shared/small-button";
import {GlobalEventEmitter} from "@/utils/event-bus";

export default {
  name: "user-modal",
  components: {SmallButton, User},
  props: ["user"],
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
  created() {
    GlobalEventEmitter.$on("loadUser",()=>{
      this.$emit("close")
    })
  }
}
</script>

<style scoped>

</style>