<template>
  <nav class="panel">
    <p class="panel-heading">Course time selector</p>
    <p class="panel-tabs">
      <a class="is-active">Lectures</a>
      <a>Tutorials</a>
      <a>Practicals</a>
    </p>
    <a class="panel-block is-active">
      <span class="panel-icon">
        <i class="fas fa-book" aria-hidden="true"></i>
      </span>

      <div class="columns">
        <div class="column">
          <b-switch>Lecture 0101</b-switch>
        </div>
      </div>
    </a>
    <a class="panel-block">
      <span class="panel-icon">
        <i class="fas fa-book" aria-hidden="true"></i>
      </span>
      <b-switch>Lecture 0103</b-switch>
    </a>
    <a class="panel-block">
      <span class="panel-icon">
        <i class="fas fa-book" aria-hidden="true"></i>
      </span>
      <b-switch>Lecture 0103</b-switch>
    </a>
    <div class="panel-block">
      <button class="button is-link is-outlined is-fullwidth">Reset all filters</button>
    </div>
  </nav>
</template>



<script>
import Vue from 'vue'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

export default {
    methods:
    {
        act()
        {
            console.log("here");
        }
    } 
}

</script>




























































