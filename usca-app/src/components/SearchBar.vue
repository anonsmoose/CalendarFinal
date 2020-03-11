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
                @select="option => selected = option">
                <template slot="empty">No results found</template>
            </b-autocomplete>
        </b-field>
    </section>
</template>

<script>

import Vue from 'vue'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

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
        }
    }
</script>
