<template>
  <div class="flex justify-center py-6 px-3">
    <div class="lg:w-1/2 w-full bg-white rounded p-4 shadow">
      <div v-if="user" class="mb-2 flex justify-between items-center">
        <h1 class="text-xl text-gray-600">Hello <b>{{ user.name }}</b>,
          you have balance of
          <b>${{ Number(user.balance).toLocaleString() }}</b>
        </h1>
        <a href="#" @click.prevent="logout" class="text-red-600">Logout</a>
      </div>

      <div class="mb-2">
        <transaction-form @transaction-created="newTransaction"/>
      </div>
      <div>
        <transactions-list :transactions="transactions"/>
      </div>
    </div>
  </div>
</template>

<script>
import TransactionForm from "@/components/transaction-form";
import TransactionsList from "@/components/transactions-list";
import axios from "axios";

export default {
  name: 'Home',
  components: {TransactionsList, TransactionForm},
  data() {
    return {
      transactions: [],
      user: null
    }
  },
  methods: {
    async loadUser() {
      const {data} = await axios.get("/users/check");
      this.user = data;
    },
    async loadTransactions() {
      const {data} = await axios.get("/transactions");
      this.transactions = data
    },
    newTransaction(transaction) {
      this.transactions.unshift(transaction);
      this.loadUser()
    },
    logout() {
      localStorage.removeItem("token");
      this.$store.dispatch("setAuth", false);
      this.$store.dispatch("setToken", '');
      this.$router.push("/login")
    }
  },
  created() {
    this.loadUser();
    this.loadTransactions()
  }
}
</script>