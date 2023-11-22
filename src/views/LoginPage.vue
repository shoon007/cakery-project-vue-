<template>
  <navBar></navBar>
  <section class="forms">
    <div class="login">
      <p href="" class="btn">Sign In</p>

      <div class="inputBox">
        <input
          type="text"
          class="email"
          required="required"
          v-model="form.email"
        />
        <span class="user">Email</span>
      </div>
      <div class="inputBox">
        <input
          type="password"
          required="required"
          v-model="form.password"
          maxlength="8"
          @keyup.enter="login()"
        />
        <span>Password</span>
      </div>

      <small v-if="validationMessage" class="error"
        >The credentials do not match.Try again!</small
      >
      <small v-if="requireMessage" class="error"
        >Please fill out all information!
      </small>
      <button class="enter" id="enterBtn" @click="login()">Enter</button>
      <span
        >Don't have an account yet?
        <router-link to="registerPage"> Sign up here!</router-link>
      </span>
    </div>
  </section>
</template>
<script src="../js/loginPage.js"></script>
