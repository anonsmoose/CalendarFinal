<template>
    <section>
        <p class="content"><b>Selected:</b> {{ selected }}</p>
        <b-field label="Search for a course">
            <b-autocomplete
                rounded
                v-model="name"
                :data="filteredDataArray"
                placeholder="CSC301"
                icon="magnify"
                clearable
                @select="test($event)"
                @input="getCourses($event)">
                <template slot="empty">No results found</template>
            </b-autocomplete>
        </b-field>
    </section>
</template>

<script>

import Vue from 'vue'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import { bus } from "@/main.ts";
import axios from 'axios';


const courseData = ['CSC301H5S', 'CSC338H5S', 'CSC343H5S', 'CSC363H5S', 'CSC309H5S']

Vue.use(Buefy)

    export default {
        data() {
            return {
                data: courseData,
                name: '',
                selected: null
            }
        },

        computed: {
            filteredDataArray() {
                return this.data.filter((option) => {
                    return option
                        .toString()
                        .toLowerCase()
                        .indexOf(this.name.toLowerCase()) >= 0
                })
            }
        },
        methods:
        {
            getCourses(input) {

                if (input != "") {
                    axios.get('http://localhost:3000/getCourse/' + input)
                        .then(res => {
                            let i = 0;
                            while (i < res.data.length) {
                                courseData[i] = res.data[i].courseCode;
                                i += 1;
                            }
                            console.log(res.data);
                            courseData.__ob__.dep.notify();
                        });
                }
             }
        }
    }



</script>
