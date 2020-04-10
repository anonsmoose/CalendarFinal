
<template>
  <div class="Course Information">
    <p class="title">Course Information</p>
    <p style="font-size:15px"> {{courseDescription}} </p>
    <p> Prerequisites: {{coursePrerequisites}} </p>
    <p> Exclusions: {{courseExclusions}} </p>
  </div>
</template>


<script>
import Vue from "vue";
import Buefy from "buefy";
import "buefy/dist/buefy.css";
Vue.use(Buefy, { defaultIconPack: 'fa'})
import { bus } from "../main";
import axios from "axios";

export default {
  data() {
    return {
      courseDescription: "",
      coursePrerequisites: "",
      courseExclusions: ""
    };
  },
  methods: {
  },
  created() {
    bus.$on("course selected", course => {
      this.courseDescription = course.courseData.description;
      this.coursePrerequisites = course.courseData.prerequisites;
      this.courseExclusions = course.courseData.exclusions;

      bus.$emit("information loaded");
      
    });
  }
};
</script>