<template>
  <div class="" v-if="!tokenStatus">
    <nav>
      <router-link to="/">
        <div class="logo-img">
          <img
            src="https://webstockreview.net/images/fruit-clipart-cupcake-4.png"
          /><span></span>
          <button class="cti">
            <div class="CTI">CAKE OF PARADISE</div>
          </button>
        </div>
      </router-link>

      <div class="icons-div">
        <div class="noti-div" style="margin-right: 2rem">
          <i class="fa-solid fa-cart-shopping cart"></i>
        </div>
        <router-link to="/loginPage">
          <i class="fa-regular fa-circle-user user"></i>
        </router-link>
      </div>
    </nav>
    <div class="permission">
      <h3 class="">Please log in first to go shopping!</h3>
      <router-link to="/loginPage">
        <button class="cta">
          <span class="hover-underline-animation login">Login here! </span>
        </button>
      </router-link>
    </div>
  </div>

  <div class="" v-else>
    <nav>
      <router-link to="/homePage">
        <div class="logo-img">
          <img
            src="https://webstockreview.net/images/fruit-clipart-cupcake-4.png"
          /><span></span>
          <button class="cti">
            <div class="CTI">CAKE OF PARADISE</div>
          </button>
        </div>
      </router-link>
      <div class="icons-div">
        <div class="noti-div" @click="cartPage()" style="margin-right: 2rem">
          <i class="fa-solid fa-cart-shopping cart"></i>
          <div class="noti" v-if="count > 0">{{ count }}</div>
        </div>

        <div class="profile-container" v-if="loadingStatus">
          <div class="postcard loading">
            <div class="image"></div>
          </div>
        </div>
        <div class="" v-else>
          <img
            v-if="accountImg == null"
            class="user"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasRight"
            aria-controls="offcanvasRight"
            :src="require('@/assets/user-default.png')"
            alt=""
          />
          <img
            v-else
            :src="accountImg"
            alt=""
            class="user"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasRight"
            aria-controls="offcanvasRight"
          />
        </div>
      </div>
    </nav>
    <homeNavBar></homeNavBar>
    <section class="contact-container">
      <div class="cart alert-box">
        <p>
          Thank you for your message. We have received it and will get back to
          you as soon as possible.
        </p>
      </div>
      <div class="d-flex justify-content-center align-items-center">
        <button class="cta" style="cursor: default">
          <h3 class="hover-underline-animation">Contact Us</h3>
        </button>
      </div>
      <form action="">
        <div class="form__group-container">
          <div class="form__group field">
            <input
              type="input"
              class="form__field"
              placeholder="Name"
              maxlength="10"
              v-model="user.name"
            />
            <label for="name" class="form__label">Name</label>
          </div>
          <div class="form__group field">
            <input
              type="email"
              class="form__field"
              placeholder="Email"
              maxlength="25"
              v-model="user.email"
            />
            <label for="name" class="form__label">Email</label>
          </div>
        </div>
        <div class="form__group-container">
          <div class="form__group field">
            <input
              type="input"
              pattern="\d+"
              class="form__field phone"
              placeholder="Phone"
              maxlength="11"
              oninput="if(this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
              v-model="user.phone"
            />
            <label for="name" class="form__label">Phone</label>
          </div>
          <div class="form__group field">
            <input
              type="input"
              class="form__field"
              placeholder="Address"
              maxlength="20"
              v-model="user.address"
            />
            <label for="name" class="form__label">Address</label>
          </div>
        </div>
        <div class="d-flex align-items-center justify-content-center mb-3">
          <div class="form__group field message">
            <input
              type="input"
              class="form__field"
              placeholder="Message"
              v-model="text"
              maxlength="1000"
              @keyup.enter="sendMessage()"
            />
            <label for="name" class="form__label">Message</label>
            <small class="message-count">
              {{ characterCount }}/{{ maxCharacters }}</small
            >
            <p class="error-message text-danger" v-if="validationMessage">
              Please fill all information!
            </p>
            <p class="error-message text-danger" v-if="validateEmail">
              Please enter a valid email!
            </p>
            <p class="error-message text-danger" v-if="checkInfo">
              Please provide the email and name that was used to create this
              account!
            </p>
          </div>
        </div>

        <div class="d-flex align-items-center justify-content-center">
          <button class="send-btn" id="bt" type="button" @click="sendMessage()">
            <div class="svg-wrapper-1">
              <div class="svg-wrapper">
                <svg
                  height="25"
                  width="25"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M0 0h24v24H0z" fill="none"></path>
                  <path
                    d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
                    fill="currentColor"
                  ></path>
                </svg>
              </div>
            </div>
            <span>Send</span>
          </button>
        </div>
      </form>
    </section>
  </div>
</template>

<script src="../js/contact.js"></script>
