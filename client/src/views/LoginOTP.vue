<template>
  <div class="flex justify-center items-center px-2 py-2 h-screen">
    <div class="lg:w-2/5 w-full bg-white px-6 py-6 rounded shadow">
      <h1 class="text-gray-700 text-2xl tracking-wide">Confirm your OTP,</h1>
      <h3 class="text-gray-800 text-lg tracking-wide">We have sent OTP to your phone number!</h3>
      <form class="mt-4" @submit.prevent="submit">
        <div class="mb-4 ">
          <form-input label="OTP" type="text" v-model="form.otp"/>
        </div>
        <div class="mb-4 ">
          <div class="flex justify-between items-center">
            <router-link to="/login" class="text-blue-600 hover:text-blue-500 duration-100">Back to login</router-link>
            <submit-button text="Confirm" :loading="loading" loading_text="Confirming..."/>
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
  name: 'LoginOtp',
  components: {SubmitButton, FormInput},
  data() {
    return {
      form: {
        otp: '',
      },
      loading: false,
      failed: false,
      errorMsg: ''
    }
  },
  methods: {
    async submit() {
      try {

        this.loading = true;
        const {data} = await axios.post("/users/confirm-login-otp", {otp: this.form.otp})
        console.log(data)
        const token = data.access_token;
        localStorage.setItem("token", token);
        await this.$store.dispatch("setToken", token)
        await this.$store.dispatch("setAuth", true)
        axios.interceptors.request.use(function (config) {
          config.headers.Authorization = `Bearer ${token}`;
          return config;
        });
        this.$router.push("/")
      } catch (e) {
        this.failed = true;
        if (e.response.status === 400) {
          this.$toast.error(e.response.data.message, {position: "top-right"})
        } else
          this.errorMsg = "Something went wrong."

      } finally {
        this.loading = false;
      }

    }
  }
}
</script>