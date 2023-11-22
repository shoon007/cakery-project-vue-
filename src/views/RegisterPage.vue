<template>
  <navBar></navBar>
  <section class="forms">
    <div class="register">
      <p href="" class="btn">Sign Up</p>
      <div class="inputBox">
        <input
          type="text"
          required="required"
          v-model="form.name"
          maxlength="20"
        />
        <span>Username</span>
      </div>
      <div class="inputBox">
        <input type="text" required="required" v-model="form.email" />
        <span class="user">Email</span>
        <small v-if="emailValidation" class="error"
          >Please enter a valid email!</small
        >
        <small v-if="emailExist" class="error"
          >The email is already taken!Try again!</small
        >
      </div>
      <div class="inputBox">
        <input
          type="password"
          required="required"
          v-model="form.password"
          maxlength="8"
        />
        <span>Password</span>
      </div>
      <div class="inputBox">
        <input
          type="password"
          required="required"
          v-model="form.confirmPassword"
          maxlength="8"
          @keyup.enter="register()"
        />
        <span>Confirm password</span>
        <small v-if="confirmPasswordValidation" class="error"
          >Password and confirm password need to be same!</small
        >
      </div>

      <small v-if="requireMessage" class="error"
        >Please fill out all information!</small
      >
      <button class="enter" id="enterBtn" @click="register()">Enter</button>
      <span>
        Already have an account ?
        <router-link to="loginPage">Sign in here! </router-link></span
      >
    </div>
  </section>
</template>
<script src="../js/registerPage.js"></script>
