<template>
  <div class="text-gray-700 tracking-wide flex justify-between">
    <div>
      <p class="pb-1"><b>First name:</b> {{ user.firstName }}</p>
      <p class="pb-1"><b>Last name:</b> {{ user.lastName }}</p>
      <p class="pb-1"><b>Phone number:</b> {{ user.phoneNumber }}</p>
      <p class="pb-1"><b>Email:</b> {{ user.email }}</p>

      <p class="pb-1"><b>Date of birth:</b> {{ new Date(user.dateOfBirth).toDateString() }}</p>
    </div>
    <div>
       <p class="pb-1"><b>Username:</b> {{ user.username }}</p>
       <p class="pb-1"><b>Gender:</b> {{ user.gender.toUpperCase() }}</p>
       <p class="pb-1"><b>Nationality:</b> {{ user.nationality }}</p>
       <p class="pb-1"><b>Marital status:</b> {{ user.maritalStatus }}</p>
       <p class="pb-1"><b>Account created at:</b> {{  new Date(user.created_at).toDateString() }}</p>
    </div>

  </div>
</template>

<script>
export default {
  name: "user",
  props: ["user"]
}
</script>

<style scoped>

</style>