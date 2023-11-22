<template>
  <div>
    <div
      class="offcanvas offcanvas-end"
      tabindex="-1"
      id="offcanvasRight"
      aria-labelledby="offcanvasRightLabel"
    >
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="offcanvasRightLabel">
          <span>Hello!</span> {{ account.name }}
        </h5>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div class="offcanvas-body">
        <div class="user-profile">
          <img
            v-if="account.image == null"
            :src="require('@/assets/user-default.png')"
            alt=""
          />
          <img v-else :src="account.image" alt="" />
        </div>
        <div class="user-info">
          <p>{{ account.email }}</p>

          <div class="buttons-container">
            <div class="button">
              <i class="fa-solid fa-house"></i>
              <router-link to="/homePage">
                <button class="info-btn">Home</button>
              </router-link>
            </div>
            <div class="button">
              <i class="fa-regular fa-circle-user"></i>
              <router-link to="/userAccount">
                <button class="info-btn">Edit profile</button>
              </router-link>
            </div>
            <div class="button">
              <i class="fa-solid fa-key"></i>
              <router-link to="/changePassword">
                <button class="info-btn">Change password</button>
              </router-link>
            </div>
            <div class="button">
              <i class="fa-solid fa-clock-rotate-left"></i>
              <button class="info-btn" @click="history()">History</button>
            </div>
            <div class="button">
              <i class="fa-regular fa-comment"></i>
              <button class="info-btn" @click="contact()">Contact</button>
            </div>
            <div class="button">
              <i class="fa-solid fa-right-from-bracket"></i>
              <button class="info-btn" @click="logout()">Logout</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="../js/homenavbar.js"></script>
