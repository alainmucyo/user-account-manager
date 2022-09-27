<template>
  <button :disabled="loading || disabled" type="button" @click="clicked"
          :class="`${classes?classes:''} ${colors}
          duration-100 py-0.5 text-center focus:rotate-2 focus:ring-purple-600
          focus:ring-opacity-50 font-semibold px-2 ${!loading?'px-4':''} md:py-1 float-right
          text-white rounded leading-tight text-xl md:text-base font-sans mt-4
          font-medium tracking-wide ${loading?'cursor-wait':''}`"
  >
    <span class="spinner-border spinner-border-sm mr-1" role="status" aria-hidden="true" v-if="loading"></span>
    {{ loading ? loading_text : text }}
  </button>
</template>

<script>
import {GlobalEventEmitter} from "@/utils/event-bus";
import axios from "axios";

export default {
  name: "small-button",
  props: ["text", "loading_text", "classes", "disabled", "colors", "state", "user"],
  data() {
    return {
      loading: false,
      done: false
    }
  },
  methods: {
    async clicked() {
      await this.changeState(this.state);

    },
    async changeState(state) {
      try {
        this.loading = true;
        console.log("Change state clicked")
        await axios.put(`/users/update-state/${this.user}`, {state})
        this.$toast.success("State changed successfully!", {position: "top-right"})
        GlobalEventEmitter.$emit("loadUser")

      } catch (e) {
        console.log(e)
        this.$toast.error("Something went wrong")
      } finally {
        this.loading = false
      }
    }
  }
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
  width: 1.5rem;
  height: 1.5rem;
  vertical-align: text-bottom;
  background-color: currentColor;
  border-radius: 50%;
  opacity: 0;
  animation: 0.75s linear infinite spinner-grow;
}

.spinner-grow-sm {
  width: 0.8rem;
  height: 0.8rem;
}

@media (prefers-reduced-motion: reduce) {
  .spinner-border, .spinner-grow {
    animation-duration: 1.5s;
  }
}
</style>