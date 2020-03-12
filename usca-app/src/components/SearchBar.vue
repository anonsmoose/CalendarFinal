<template>
    <section>
        <p class="content"><b>Selected:</b> {{ selected }}</p>
        <b-field @click="test" label="Search for a course">
            <b-autocomplete
                rounded
                v-model="name"
                :data="filteredDataArray"
                placeholder="CSC301"
                icon="magnify"
                clearable
                @select="test()">
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

Vue.use(Buefy)

    export default {
        data() {
            return {
                data: [
                    'CSC301',
                    'CSC338',
                    'CSC343',
                    'STA107',
                    'STA256',
                    'STA260',
                    'STA302',
                    'STA313',
                    'CSC411',
                    'MAT301',
                    'MAT388',
                    'MAT382'
                ],
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
            test()
            {
                console.log("we can call this from the search bar!");
                  bus.$emit('messageSent');
            }
        }
    }
</script>
