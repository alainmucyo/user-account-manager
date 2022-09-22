<template>
  <form method="post" @submit.prevent="submit">
    <h2 class="text-gray-600 text-md">Create A New Transaction</h2>
    <div class="mt-2 grid grid-cols-3 gap-2">
      <form-input label="Amount($)" type="number" :hide-label="true" v-model="amount"></form-input>
      <form-input label="Description" type="text" :hide-label="true" v-model="description"></form-input>
      <select v-model="type"
              class="text-sm sm:text-base bg-white border w-full h-11 rounded placeholder-gray-400 focus:border-indigo-400 focus:outline-none py-1 px-4">
        <option value="withdraw">Withdraw</option>
        <option value="deposit">Deposit</option>
      </select>
    </div>
    <submit-button text="Add Transaction" :loading="loading" loading_text="Adding Transaction..."></submit-button>
  </form>
</template>

<script>
import FormInput from "@/components/shared/form-input";
import SubmitButton from "@/components/shared/submit-button";
import axios from "axios";

export default {
  name: "transaction-form",
  components: {SubmitButton, FormInput},
  data() {
    return {
      amount: null,
      description: null,
      loading: false,
      type: 'deposit'
    }
  },
  methods: {
    async submit() {
      try {
        this.loading = true;
        const {data} = await axios.post("/transactions", {
          amount: this.amount,
          type: this.type,
          description: this.description
        });

        this.amount = null;
        this.description = null;
        this.type = 'deposit';
        this.$emit("transaction-created", data);
      } catch (e) {
        if (e.response.status === 422) {
          alert(e.response.data.message)
        }
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
