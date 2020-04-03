<template>
  <section>
    <p class="content">
      <b>Selected:</b>
      {{ selected }}
    </p>
    <b-field label="Search for a course">
      <b-autocomplete
        rounded
        v-model="name"
        :data="filteredDataArray"
        placeholder="CSC301"
        icon="magnify"
        clearable
        @select="sendData($event)"
        @input="getCourses($event)"
      >
        <template slot="empty">No results found</template>
      </b-autocomplete>
    </b-field>
  </section>
</template>

<script>
import Vue from "vue";
import Buefy from "buefy";
import "buefy/dist/buefy.css";
import { bus } from "@/main.ts";
import axios from "axios";

const courseData = [];
const selectedCourseData = [];

Vue.use(Buefy);

export default {
  data() {
    return {
      data: courseData,
      name: "",
      selected: null,
      selectedCourseD: selectedCourseData
    };
  },

  computed: {
    filteredDataArray() {
      return this.data.filter(option => {
        return (
          option
            .toString()
            .toLowerCase()
            .indexOf(this.name.toLowerCase()) >= 0
        );
      });
    }
  },
  methods: {
    getCourses(input) {
      if (input != "") {
        axios.get("http://localhost:3000/getCourse/" + input).then(res => {
          let i = 0;
          while (i < res.data.length) {
            courseData[i] = res.data[i].courseCodeLong;
            i += 1;
          }
          // console.log(res.data);
          courseData.__ob__.dep.notify();
        });
      }
    },
    sendData(selectedCourse) {
      let courseD = {};
      console.log("hello");
      if (selectedCourse != "") {
        axios
          .get("http://localhost:3000/getCourse/" + selectedCourse.slice(0, 9))
          .then(res => {
            // let i = 0;
            // while (i < res.data.length) {
            //     selectedCourseData[i] = res.data[i];
            //     i += 1;

            // console.log("lets test");
            // console.log(res.data);
            // console.log(res.data[0]);
            // console.log(res.data[0].lectures);
            // console.log(Object.keys(res.data[0].lectures).length);

            const requesturls = [];
            const requests = [];
            for (const [key, value] of Object.entries(res.data[0].lectures)) {
                requesturls.push('http://localhost:3000/getProfessor/' + res.data[0].campus + "/"
                + value[0].professor.charAt(0) + "/" + value[0].professor.slice(value[0].professor.lastIndexOf(" ") + 1));
            // console.log(res.data[0].campus);
              // console.log(key, value);
            //   console.log(value[0].professor.charAt(0));
            //   console.log(value[0].professor.slice(value[0].professor.lastIndexOf(" ") + 1))
              // console.log("END END");
              


            }
            // console.log(requesturls);
            let i = 0;
            while (i < requesturls.length)
            {
                requests.push(axios.get(requesturls[i]));
                i+=1;
            }

        
            // console.log(requests);
            courseD = res.data[0];
            // const requestOne = axios.get(
            //   "http://localhost:3000/getProfessor/UTM/A/Weir"
            // );
            return axios.all(requests);
            // return axios.get('http://localhost:3000/getProfessor/' + course.campus + "/" + this.lectures[i].professor.charAt(0) + "/" + this.lectures[i].professor.slice(2));

            // console.log("about to emit");
            // bus.$emit('course selected', res.data[0]);
          })
          .then(res2 => {
            // console.log('Response', courseD);
            // console.log('Response', res2);
            bus.$emit("course selected", {
              courseData: courseD,
              professorData: res2
            });
          });
      }
    }
  }
};
</script>
