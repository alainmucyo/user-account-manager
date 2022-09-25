<template>
  <div>
    <h2 class="text-gray-700 text-lg tracking-wide">Provide your details to get your account verified!</h2>
    <form class="mt-10" @submit.prevent="submit">
      <div class="mb-4 ">
        <form-input label="National ID or Passport number" type="text" v-model="form.nid_passport"/>
      </div>

      <div class="mb-8">
        <image-handler label="Upload National ID or Passport image" v-model="form.document_image"/>
        <span class="text-red-500 text-sm" v-if="errorMsg!=''">{{ errorMsg }}</span>
      </div>
      <submit-button text="Submit" loading_text="Submitting" :loading="loading"
                     :disabled="form.nid_passport.trim()==='' || form.document_image==null"/>
    </form>
  </div>
</template>

<script>
import SubmitButton from "@/components/shared/submit-button";
import axios from "axios";
import ImageHandler from "@/components/shared/image-handler";
import FormInput from "@/components/shared/form-input";

export default {
  name: "user-details-form",
  components: {FormInput, ImageHandler, SubmitButton},
  data() {
    return {
      form: {
        nid_passport: "",
        document_image: null
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
        const {data} = await axios.post("/user-detail/user-details", this.form)
        console.log(data)
        this.$toast.success("Your document received successfully, it is going to be reviewed.", {position: "top-right", duration:50000})
        this.$emit("saved")
      } catch (e) {
        this.failed = true;
        if (e.response.status === 400) {
          this.$toast.warning(e.response.data.message, {position: "top-right"})
        } else
          this.errorMsg = "Something went wrong."

      } finally {
        this.loading = false;
      }

    }
  }
}
</script>

<style scoped>

</style>