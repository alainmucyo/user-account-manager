<template>
  <button :disabled="loading || disabled"
          :class="`${classes?classes:''} bg-blue-600 disabled:bg-blue-400  hover:bg-blue-500
          duration-100 py-2.5 text-center focus:rotate-2 focus:ring-purple-600
          focus:ring-opacity-50 font-semibold px-3 ${!loading?'px-6':''} md:py-2 float-right
          text-white rounded leading-tight text-xl md:text-base font-sans mt-4
          font-medium tracking-wide ${loading?'cursor-wait':''} `"
  >
    <span class="spinner-border spinner-border-sm mr-1" role="status" aria-hidden="true" v-if="loading"></span>
    {{ loading ? loading_text : text }}
  </button>
</template>

<script>
export default {
  name: "submit-button",
  props: ["loading", "text", "loading_text", "classes", "disabled"]
}
</script>

<style scoped>
@keyframes spinner-border {
  to {
    transform: rotate(360deg);
  }
}

.spinner-border {
  display: inline-block;
  width: 2rem;
  height: 2rem;
  vertical-align: text-bottom;
  border: 0.25em solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  animation: 0.75s linear infinite spinner-border;
}

.spinner-border-sm {
  width: 1rem;
  height: 1rem;
  border-width: 0.2em;
}

@keyframes spinner-grow {
  0% {
    transform: scale(0);
  }
  50% {
    opacity: 1;
    transform: none;
  }
}

.spinner-grow {
  display: inline-block;
  width: 2rem;
  height: 2rem;
  vertical-align: text-bottom;
  background-color: currentColor;
  border-radius: 50%;
  opacity: 0;
  animation: 0.75s linear infinite spinner-grow;
}

.spinner-grow-sm {
  width: 1rem;
  height: 1rem;
}

@media (prefers-reduced-motion: reduce) {
  .spinner-border, .spinner-grow {
    animation-duration: 1.5s;
  }
}
</style>