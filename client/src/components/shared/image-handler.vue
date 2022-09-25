<template>
  <div class="w-full">
    <file-pond
        :name="label"
        :ref="uniqueId"
        :label-idle="label"
        v-bind:allow-multiple="false"
        accepted-file-types="image/jpeg, image/png"
        @init="handleFilePondInit"
        @addfile="oninitfileHandler"
        @removefile="onremovefile"
    />
  </div>
</template>

<script>
import vueFilePond from "vue-filepond";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";

import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";

const FilePond = vueFilePond(
    FilePondPluginFileValidateType,
    FilePondPluginImagePreview
);
export default {
  name: "image-handler",
  props: ["label", "value"],
  data() {
    return {
      uniqueId: '',
    }
  },
  methods: {
    handleFilePondInit: function () {
      console.log("FilePond has initialized");
    },
    makeid: function (length) {
      let result = '';
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      const charactersLength = characters.length;
      for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
      }
      return result;
    },

    oninitfileHandler: function (err) {
      if (err) return
      const file = this.$refs[this.uniqueId].getFiles()[0].file
      const reader = new FileReader()

      let rawImg;
      reader.onloadend = () => {
        rawImg = reader.result;
        this.$emit('input', rawImg);
      }
      reader.readAsDataURL(file);
    },
    onremovefile:function (err){
      console.log("Removing file",err )
      if (err) return
      this.$emit('input', null);
    }
  },
  components: {
    FilePond,
  },
  created() {
    this.uniqueId = this.makeid(10)
  }
}
</script>

<style scoped>

</style>