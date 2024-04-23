<template>
    <header>
      <router-link to="/"> <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" /></router-link>
     

      <div>
        <nav>
          <router-link to="/">Home</router-link>
          <router-link to="/about">About</router-link>
        </nav>
      </div>
    </header>
</template>

<script>
export default {
    name: 'AppHeader',
};
</script>

<style scoped>
header {
  display: flex;
    background-color: #f2f2f2;
    padding: 20px;
    text-align: center;
}
</style>