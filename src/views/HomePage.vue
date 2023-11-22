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
   
        <div class="d-flex justify-content-center align-items-center">
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
          <h2 class="ms-3 postlist-count" v-if="postLists.length>0">(Total- {{postLists.length}}) </h2> 
        </div>


      <div class="icons-div">
        <div class="search-container">
          <input
            placeholder="Search..."
            type="text"
            name="text"
            class="input search"
            v-model="searchKey"
            @keyup.enter="search()"
          />
          <button @click="search()">
            <i class="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>

        <div class="noti-div" @click="cartPage()">
          <i class="fa-solid fa-cart-shopping cart"></i>
          <div class="noti" v-if="count > 0" style="right: 2rem">
            {{ count }}
          </div>
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

    <section class="main">
      
      <div class="sidebar-menu">
        <button class="cta" style="cursor: default; margin: 0rem">
          <h2 class="hover-underline-animation">
            Categories - {{ categoryLists.length }}
          </h2>
        </button>
        <div class="sidebar wrap" v-if="loadingStatus">
          <div class="sidebar container1">
            <div class="sec">
              <div class="bars">
                <div class="sidebar bar skeleton"></div>
                <div class="sidebar bar skeleton"></div>
                <div class="sidebar bar skeleton"></div>
                <div class="sidebar bar skeleton"></div>
                <div class="sidebar bar skeleton"></div>
                <div class="sidebar bar skeleton"></div>
                <div class="sidebar bar skeleton"></div>
                <div class="sidebar bar skeleton"></div>
                <div class="sidebar bar skeleton"></div>
                <div class="sidebar bar skeleton"></div>
              </div>
            </div>
          </div>
        </div>

        <ul v-if="!loadingStatus">
          <span>
            <li class="list title" @click="getAllPost()">
              <span style="color: #fff">All</span>
            </li>
          </span>
          <a v-for="(category, index) in categoryLists" :key="index">
            <li class="list" @click="categorySearch(category.id)">
              <span>{{ category.name }} </span>
            </li>
          </a>

          <span>
            <li class="list title" @click="bestSeller()">
              <span>Our best seller cakes</span>
            </li>
          </span>
        </ul>
      </div>
      <div class="postcard-container" v-if="loadingStatus">
        <div class="postcard loading">
          <div class="image"></div>
          <div class="content">
            <h4></h4>
            <div class="d-flex">
              <h5></h5>
            </div>
            <div class="description"></div>
          </div>
        </div>
        <div class="postcard loading">
          <div class="image"></div>
          <div class="content">
            <h4></h4>
            <div class="d-flex">
              <h5></h5>
            </div>
            <div class="description"></div>
          </div>
        </div>
        <div class="postcard loading">
          <div class="image"></div>
          <div class="content">
            <h4></h4>
            <div class="d-flex">
              <h5></h5>
            </div>
            <div class="description"></div>
          </div>
        </div>
        <div class="postcard loading">
          <div class="image"></div>
          <div class="content">
            <h4></h4>
            <div class="d-flex">
              <h5></h5>
            </div>
            <div class="description"></div>
          </div>
        </div>
        <div class="postcard loading">
          <div class="image"></div>
          <div class="content">
            <h4></h4>
            <div class="d-flex">
              <h5></h5>
            </div>
            <div class="description"></div>
          </div>
        </div>
        <div class="postcard loading">
          <div class="image"></div>
          <div class="content">
            <h4></h4>
            <div class="d-flex">
              <h5></h5>
            </div>
            <div class="description"></div>
          </div>
        </div>
      </div>
 
   
     
       <div class="main-products" v-if="!loadingStatus">
        <div
          class="outstock"
          v-if="postLists.length === 0 && inputSearchStatus == true"
        >
          <h4>
            Sorry, we don’t have any stock called {{ result
            }}<i class="fa-solid fa-hands-praying ms-3"></i>
          </h4>
        </div>
        <div
          class="outstock"
          v-if="postLists.length === 0 && categorySearchStatus == true"
        >
          <h4>
            Sorry, we don’t have any stock left in this category<i
              class="fa-solid fa-hands-praying ms-3"
            ></i>
          </h4>
        </div>
       
     
     
     
        <div id="myDIV" v-else  v-for="(post, index) in postLists" :key="index">
          <div class="card-container">
            <div class="card">
              <div class="icon">
                <img :src="post.image" alt="" />
              </div>

              <p class="title">{{ post.name }}</p>
              <div class="cake-info">
                <span>{{ post.price }} kyats</span>
              </div>
              <button
                class="add-to-cart"
                @click="animationBtn($event, post.id)"
              >
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
              <button class="text" @click="postDetails(post.id)">
                Check out for more details
              </button>
            </div>
          </div>
        </div>
      </div>
     
    </section>
  </div>
</template>
<script src="../js/homePage.js"></script>
