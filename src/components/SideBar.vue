<template>
  <div class="sidebar">
    <img src="../assets/green-1968582_1920.png" alt="Worldenergy theme image" class="sidebar-image">
    <router-link to="/">Home</router-link>
    <router-link to="/about">About</router-link>
    <router-link to="/about">Contact</router-link>
  </div>
</template>


<style>
.sidebar {
  background-color: #333;
  color: #fff;
  width: 200px;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
}

.sidebar-image {
  width: 100%;
  height: 170px;
}

.sidebar a {
  display: block;
  padding: 10px;
  color: #fff;
  text-decoration: none;
}

.sidebar a:hover {
  background-color: #444;
}
</style>
