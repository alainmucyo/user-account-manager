<template>
  <div class="w-full">
    <label class="text-gray-600 inline-block mb-1" v-if="!hideLabel">{{ label }}</label>
    <input
        :type="type"
        :value="value"
        @input="$emit('input', $event.target.value)"
        required
        class="text-sm sm:text-base relative bg-white w-full border rounded placeholder-gray-400 focus:border-indigo-400 focus:outline-none py-2.5 px-4">
  </div>
</template>

<script>
export default {
  name: "form-input",
  props:["label","type",'value','hideLabel']
}
</script>

<style scoped>

</style>