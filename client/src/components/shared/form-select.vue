<template>
  <div class="w-full">
    <label class="text-gray-600 inline-block mb-1" for="options">{{ label }}</label>
    <select :value="value"
            @input="$emit('input', $event.target.value)"
        id="options"
            class="text-sm sm:text-base relative bg-white w-full border rounded placeholder-gray-400 focus:border-indigo-400 focus:outline-none py-2.5 px-4">
      <optgroup :label="label">
        <option v-for="option in options" :key="option" :value="option.toLowerCase()">{{ option}}</option>
      </optgroup>
    </select>
  </div>
</template>

<script>
export default {
  name: "form-select",
  props: ["label","options","value"]
}
</script>

<style scoped>

</style>