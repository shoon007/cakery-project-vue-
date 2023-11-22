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
    <section class="details">
      <button class="back-btn" onclick="history.back()">
        <svg
          height="16"
          width="16"
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          viewBox="0 0 1024 1024"
        >
          <path
            d="M874.690416 495.52477c0 11.2973-9.168824 20.466124-20.466124 20.466124l-604.773963 0 188.083679 188.083679c7.992021 7.992021 7.992021 20.947078 0 28.939099-4.001127 3.990894-9.240455 5.996574-14.46955 5.996574-5.239328 0-10.478655-1.995447-14.479783-5.996574l-223.00912-223.00912c-3.837398-3.837398-5.996574-9.046027-5.996574-14.46955 0-5.433756 2.159176-10.632151 5.996574-14.46955l223.019353-223.029586c7.992021-7.992021 20.957311-7.992021 28.949332 0 7.992021 8.002254 7.992021 20.957311 0 28.949332l-188.073446 188.073446 604.753497 0C865.521592 475.058646 874.690416 484.217237 874.690416 495.52477z"
          ></path>
        </svg>
        <span>Back</span>
      </button>
      <div class="details-container">
        <div class="loading-container" v-if="loadingStatus">
          <div class="loading-card">
            <div class="loading-img loading-skeleton"></div>
          </div>
        </div>
        <div class="wrap" v-if="loadingStatus">
          <div class="container1">
            <div class="sec">
              <div class="bars">
                <div class="bar skeleton"></div>
                <div class="bar b1 skeleton"></div>
                <div class="bar b1 skeleton"></div>
                <div class="bar b2 skeleton"></div>
                <div class="bar b1 skeleton"></div>
                <div class="bar b2 skeleton"></div>
                <div class="bar b1 skeleton"></div>
              </div>
            </div>
          </div>
        </div>

        <div class="cover-img" v-if="!loadingStatus">
          <img :src="post.image" alt="" />
        </div>
        <div class="details-info" v-if="!loadingStatus">
          <h1>{{ post.name }}</h1>
          <small>
            ( <span v-if="viewCount > 1">{{ viewCount }} views</span
            ><span v-else>{{ viewCount }} view</span
            ><i class="fa-solid fa-eye ms-2 me-1"></i>
            &
            <span v-if="likeCount > 1">{{ likeCount }} likes</span>
            <span v-else>{{ likeCount }} like</span
            ><i class="fa-solid fa-thumbs-up ms-2 me-1"></i> )</small
          >
          <p class="price text">
            {{ post.price }} kyats <i class="fa-solid fa-sack-dollar"></i>
          </p>
          <p class="text">
            {{ post.description }}
          </p>
          <div class="counting">
            <div class="count-container me-4">
              <button class="minus" @click="minus()">-</button>
              <span>{{ qty }} </span>
              <button class="plus" @click="plus()">+</button>
            </div>
            <button class="add-to-cart" @click="animationBtn(post.id)">
              <div class="default">Add to cart</div>
              <div class="success">Added</div>
              <div class="cart">
                <div>
                  <div></div>
                  <div></div>
                </div>
              </div>
              <div class="dots"></div>
            </button>
            <label class="like-container">
              <input type="checkbox" v-model="isChecked" @change="addLike" />
              <div class="checkmark">
                <svg
                  viewBox="0 0 50 50"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  class="icon"
                >
                  <path
                    d="M 24.10 6.29 Q 28.34 7.56 28.00 12.00 Q 27.56 15.10 27.13 18.19 A 0.45 0.45 4.5 0 0 27.57 18.70 Q 33.16 18.79 38.75 18.75 Q 42.13 18.97 43.23 21.45 Q 43.91 22.98 43.27 26.05 Q 40.33 40.08 40.19 40.44 Q 38.85 43.75 35.50 43.75 Q 21.75 43.75 7.29 43.75 A 1.03 1.02 0.0 0 1 6.26 42.73 L 6.42 19.43 A 0.54 0.51 -89.4 0 1 6.93 18.90 L 14.74 18.79 A 2.52 2.31 11.6 0 0 16.91 17.49 L 22.04 7.17 A 1.74 1.73 21.6 0 1 24.10 6.29 Z M 21.92 14.42 Q 20.76 16.58 19.74 18.79 Q 18.74 20.93 18.72 23.43 Q 18.65 31.75 18.92 40.06 A 0.52 0.52 88.9 0 0 19.44 40.56 L 35.51 40.50 A 1.87 1.83 5.9 0 0 37.33 39.05 L 40.51 23.94 Q 40.92 22.03 38.96 21.97 L 23.95 21.57 A 0.49 0.47 2.8 0 1 23.47 21.06 Q 23.76 17.64 25.00 12.00 Q 25.58 9.36 24.28 10.12 Q 23.80 10.40 23.50 11.09 Q 22.79 12.80 21.92 14.42 Z M 15.57 22.41 A 0.62 0.62 0 0 0 14.95 21.79 L 10.01 21.79 A 0.62 0.62 0 0 0 9.39 22.41 L 9.39 40.07 A 0.62 0.62 0 0 0 10.01 40.69 L 14.95 40.69 A 0.62 0.62 0 0 0 15.57 40.07 L 15.57 22.41 Z"
                    fill-opacity="1.000"
                  ></path>
                  <circle
                    r="1.51"
                    cy="37.50"
                    cx="12.49"
                    fill-opacity="1.000"
                  ></circle>
                </svg>
              </div>
              <p class="like">Liked!</p>
            </label>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script src="../js/postDetails.js"></script>
