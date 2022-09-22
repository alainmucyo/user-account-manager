<template>
  <div class="mt-4" style="overflow-x: auto;width: 100%">
    <br>
    <br>
    <data-table v-if="loading || transactions.length!=0" :title="`Transactions (${transactions.length})`"
                :columns="columns"
                :rows="mappedTransactions"></data-table>
  </div>
</template>

<script>
import DataTable from "vue-materialize-datatable";

export default {
  name: "transactions-list",
  components: {DataTable},
  props: ["transactions"],
  data() {
    return {
      loading: false,
      columns: [
        {
          field: "amount",
          label: "Amount"
        },
        {
          field: "description",
          label: "Description"
        },

        {
          field: "type",
          label: "Transaction Type"
        },
        {
          field: "created_at",
          label: "Created At"
        }
      ]
    }
  },
  computed: {
    mappedTransactions() {
      return this.transactions.map(c => {
        return {
          ...c,
          created_at: new Date(c.created_at).toLocaleString(),
          amount: "$" + Number(c.amount).toLocaleString(),
          type: `${c.type.toUpperCase()}`
        };
      });
    },
  }
}
</script>

<style scoped>

</style>