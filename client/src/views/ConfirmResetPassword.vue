<template>
  <div class="flex justify-center px-2 py-2 items-center h-screen">
    <div class="lg:w-2/5  w-full bg-white px-6 py-6 rounded shadow">
      <h1 class="text-gray-700 text-2xl tracking-wide">Confirm reset password,</h1>
      <h3 class="text-gray-800 text-lg tracking-wide">Please provide OTP that was sent to your phone number and new password!</h3>
      <form class="mt-4" @submit.prevent="submit">

        <div class="mb-4 ">
          <form-input label="OTP" type="text" v-model="form.otp"/>
        </div>
        <div class="mb-4 ">
          <form-input label="Password" type="password" v-model="form.password"/>
        </div>
        <div class="mb-4 ">
          <form-input label="Confirm Password" type="password" v-model="form.confirm_password"/>
          <span class="text-red-500 text-sm" v-if="errorMsg!=''">{{ errorMsg }}</span>
        </div>
        <div class="mb-4 ">
          <div class="flex justify-between items-center">
            <router-link to="/reset-password" class="text-blue-600 hover:text-blue-500 duration-100">Back!</router-link>
            <submit-button text="Reset Password" :loading="loading" loading_text="Resetting password..."/>
          </div>
        </div>
      </form>

    </div>
  </div>
</template>

<script>
import FormInput from "../components/shared/form-input";
import SubmitButton from "../components/shared/submit-button";
import axios from "axios";

export default {
  name: 'ConfirmResetPassword',
  components: {SubmitButton, FormInput},
  data() {
    return {
      form: {
        otp: '',
        password: '',
        confirm_password: '',
      },
      loading: false,
      failed: false,
      errorMsg: ''
    }
  },
  methods: {
    async submit() {
      if (this.form.password != this.form.confirm_password) {
        console.log("Not equal");
        this.errorMsg = "Password confirmation doesn't match";
        return;
      }

      try {
        this.loading = true;
        const {data} = await axios.post("/users/confirm-password-reset-otp", this.form)
        console.log(data);
        this.$router.push("/login")
      } catch (e) {
        this.failed = true;
        if (e.response.status === 400) {
          const msg = e.response.data.message
          this.errorMsg = typeof msg == "string" ? msg : msg[0]
        } else
          this.errorMsg = "Something went wrong."

      } finally {
        this.loading = false;
      }

    }
  }
}
</script>