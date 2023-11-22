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
    <section class="history cart-table">
      <button class="cta" style="cursor: default">
        <h3 class="hover-underline-animation">Cart History</h3>
      </button>
      <div class="history loading-container" v-if="loadingStatus">
        <div class="loading-card">
          <div class="loading-img loading-skeleton"></div>
        </div>
      </div>
      <div class="history-container" v-else>
        <div class="empty-cart" v-if="historyData.length == 0">
          <i class="fa-solid fa-cart-shopping"></i>
          <h4 style="width: 100%; text-align: center">
            Your cart history is empty!
          </h4>

          <a class="fancy" @click="homePage">
            <span class="top-key"></span>
            <span class="text">Keep Shopping!</span>
            <span class="bottom-key-1"></span>
            <span class="bottom-key-2"></span>
          </a>
        </div>
        <table v-else>
          <thead>
          
            <td>Order Code</td>
            <td>Total Price</td>
            <td>Status</td>
            <td>Date</td>
          </thead>
          <tbody>
            <tr v-for="(data, index) in historyData" :key="index">
            
              <td>{{ data.order_code }}</td>
              <td>{{ data.total_price }} kyats</td>
              <td>
                <div class="loader-div" v-if="data.status == 0">
                  <span>Pending</span>
                  <div class="loader">
                    <div class="bar1"></div>
                    <div class="bar2"></div>
                    <div class="bar3"></div>
                    <div class="bar4"></div>
                    <div class="bar5"></div>
                    <div class="bar6"></div>
                    <div class="bar7"></div>
                    <div class="bar8"></div>
                    <div class="bar9"></div>
                    <div class="bar10"></div>
                    <div class="bar11"></div>
                    <div class="bar12"></div>
                  </div>
                </div>
                <div class="loader-div" v-else-if="data.status == 1">
                  <span class="success"
                    >Success <i class="fa-solid fa-check success"></i
                  ></span>
                </div>
                <div class="loader-div" v-else-if="data.status == 2">
                  <span class="fail"
                    >Failed <i class="fa-solid fa-ban fail"></i
                  ></span>
                </div>
              </td>
              <td>{{ formatDate(data.created_at) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script src="../js/history.js"></script>
