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
    <section class="cart-table">
      <button class="cta" style="cursor: default">
        <h3 class="hover-underline-animation">Shopping Cart</h3>
      </button>
      <div class="cart alert-box">
        <p v-if="successStatus">{{ orderSuccess }}</p>
      </div>

      <div class="loading-grid" v-if="loadingStatus">
        <div class="loading-container">
          <div class="loading-card">
            <div class="loading-img loading-skeleton"></div>
          </div>
        </div>
        <div class="loading-container2">
          <div class="loading-card">
            <div class="loading-img loading-skeleton"></div>
          </div>
        </div>
      </div>

      <div class="cart-container" v-else>
        <div class="empty-cart" v-if="cartLists.length == 0">
          <i class="fa-solid fa-cart-shopping"></i>
          <h4 style="width: 100%; text-align: center">Your cart is empty!</h4>

          <a class="fancy" @click="homePage">
            <span class="top-key"></span>
            <span class="text">Keep Shopping!</span>
            <span class="bottom-key-1"></span>
            <span class="bottom-key-2"></span>
          </a>
        </div>

        <table v-else>
          <thead>
            <th>Image</th>
            <th>Products</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Remove</th>
          </thead>
          <tbody>
            <tr
              v-for="(cart, index) in cartLists"
              :key="index"
              class="cart-row"
            >
              <td>
                <div class="img-div cart-box">
                  <img :src="cart.product_image" alt=" " />
                </div>
              </td>
              <td>
                <div class="cart-box">
                  <span v-if="cart.product_name !== null">
                    {{ cart.product_name }}
                  </span>
                  <span v-else>Product's been removed</span>
                </div>
              </td>
              <td>
                <div class="cart-box">
                  <span v-if="cart.product_price !== null">
                    {{ cart.product_price }} kyats</span
                  >
                  <span v-else>0 kyats</span>
                </div>
              </td>
              <td>
                <div class="cart-box">
                  <button class="minus" @click="minus(cart)">-</button>
                  <span
                    style="min-width: 40px; margin: 0rem; text-align: center"
                    >{{ cart.quantity }}</span
                  >
                  <button class="plus" @click="plus(cart)">+</button>
                </div>
              </td>
              <td>
                <div class="cart-box">
                  <span>{{ cart.quantity * cart.product_price }} kyats</span>
                </div>
              </td>
              <td>
                <div class="delete-btn cart-box" @click="productDelete(cart)">
                  <i class="fa-solid fa-circle-xmark"></i>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <div class="check-out">
          <button class="cta" style="cursor: default">
            <h3 class="hover-underline-animation animate">Checkout here</h3>
          </button>
          <div class="">
            <h5>Subtotal</h5>
            <p>{{ subtotal }} kyats</p>
          </div>
          <div class=" ">
            <h5>Delivery</h5>
            <p>3500 kyats</p>
          </div>
          <div class=" ">
            <h5>Total</h5>
            <p>{{ subtotal + 3500 }} kyats</p>
          </div>
          <div class="buttons-checkout">
            <button class="clear-btn" @click="clearCart()">
              <span>Clear cart</span>
            </button>
            <button class="checkoutBtn" @click="checkout()">
              <span class="text">Proceed to check out </span
              ><span>Thanks!</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script src="../js/cart.js"></script>
