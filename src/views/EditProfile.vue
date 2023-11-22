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
  <div v-else>
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
            v-if="account.image == null"
            class="user"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasRight"
            aria-controls="offcanvasRight"
            :src="require('@/assets/user-default.png')"
            alt=""
          />
          <img
            v-else
            :src="account.image"
            alt=""
            class="user"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasRight"
            aria-controls="offcanvasRight"
          />
        </div>
      </div>
    </nav>
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
    <section class="edit-account">
      <div class="">
        <div class="cart alert-box">
          <p v-if="updateSuccess">Account is successfully updated!</p>
        </div>

        <div class="title-div">
          <button class="title"><span>Account edit page</span></button>
        </div>
        <div class="profile-edit" v-if="loadingStatus">
          <div class="postcard loading">
            <div class="image"></div>
            <div class="content">
              <div class="buttons-container">
                <h4 class="row"></h4>
                <h4 class="row"></h4>
              </div>
              <h4></h4>
              <h4></h4>
              <h4></h4>
            </div>
          </div>
        </div>
        <form v-else>
          <div class="account">
            <div id="img-preview">
              <img v-if="showImage" :src="account.image" alt="" id="preview" />
              <img
                v-else
                :src="require('@/assets/user-default.png')"
                alt=""
                id="preview"
              />
            </div>
            <div class="buttons-container">
              <input
                type="file"
                id="choose-file"
                name="choose-file"
                accept="image/*"
                @change="onChange"
              />
              <label for="choose-file" class="buttonDownload"
                >Upload img
              </label>
              <button type="button" class="delete-button" @click="deleteImg()">
                <span class="delete-button__text">Delete</span>
                <span class="delete-button__icon"
                  ><svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="512"
                    viewBox="0 0 512 512"
                    height="512"
                    class="svg"
                  >
                    <title></title>
                    <path
                      style="
                        fill: none;
                        stroke: #323232;
                        stroke-linecap: round;
                        stroke-linejoin: round;
                        stroke-width: 32px;
                      "
                      d="M112,112l20,320c.95,18.49,14.4,32,32,32H348c17.67,0,30.87-13.51,32-32l20-320"
                    ></path>
                    <line
                      y2="112"
                      y1="112"
                      x2="432"
                      x1="80"
                      style="
                        stroke: #323232;
                        stroke-linecap: round;
                        stroke-miterlimit: 10;
                        stroke-width: 32px;
                      "
                    ></line>
                    <path
                      style="
                        fill: none;
                        stroke: #323232;
                        stroke-linecap: round;
                        stroke-linejoin: round;
                        stroke-width: 32px;
                      "
                      d="M192,112V72h0a23.93,23.93,0,0,1,24-24h80a23.93,23.93,0,0,1,24,24h0v40"
                    ></path>
                    <line
                      y2="400"
                      y1="176"
                      x2="256"
                      x1="256"
                      style="
                        fill: none;
                        stroke: #323232;
                        stroke-linecap: round;
                        stroke-linejoin: round;
                        stroke-width: 32px;
                      "
                    ></line>
                    <line
                      y2="400"
                      y1="176"
                      x2="192"
                      x1="184"
                      style="
                        fill: none;
                        stroke: #323232;
                        stroke-linecap: round;
                        stroke-linejoin: round;
                        stroke-width: 32px;
                      "
                    ></line>
                    <line
                      y2="400"
                      y1="176"
                      x2="320"
                      x1="328"
                      style="
                        fill: none;
                        stroke: #323232;
                        stroke-linecap: round;
                        stroke-linejoin: round;
                        stroke-width: 32px;
                      "
                    ></line></svg
                ></span>
              </button>
            </div>
          </div>
          <div class="account-info">
            <div class="input-container">
              <input
                class="input"
                name="text"
                type="text"
                placeholder="Enter name"
                v-model="account.name"
              />
              <label class="label" for="input"> Name</label>
              <div class="topline"></div>
              <div class="underline"></div>
            </div>
          </div>

          <div class="account-info">
            <div class="input-container">
              <input
                ref="userEmailInput"
                class="input"
                name="text"
                type="email"
                placeholder="Enter email"
                v-model="account.email"
                @keyup.enter="checkFileSelected"
              />
              <label class="label" for="input"> Email</label>
              <div class="topline"></div>
              <div class="underline"></div>
            </div>
          </div>
          <p v-if="validationMessage" class="validationMessage">
            Username and email should not be empty!
          </p>
          <p v-if="invalidEmail" class="validationMessage">
            Please enter a valid email!
          </p>
          <div class="account-info">
            <button class="btn" @click="checkFileSelected" type="button">
              <span class="btn-text-one">Update</span>
              <span class="btn-text-two">Sure?</span>
            </button>
          </div>
        </form>
      </div>
    </section>
  </div>
</template>
<script src="../js/accountedit.js"></script>
