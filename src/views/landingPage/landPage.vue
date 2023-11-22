<template>
  <div>
    <div class="box loader-div">
      <div class="container">
        <div class="loader"></div>
        <div class="loader"></div>
        <div class="loader"></div>
      </div>
      <div class="loading">
        <span class="l">L</span>
        <span class="o">o</span>
        <span class="a">a</span>
        <span class="d">d</span>
        <span class="i">i</span>
        <span class="n">n</span>
        <span class="g">g</span>
        <span class="d1">.</span>
        <span class="d2">.</span>
      </div>
    </div>

    <nav>
      <a href="#">
        <div class="logo-img">
          <img
            src="https://webstockreview.net/images/fruit-clipart-cupcake-4.png"
          /><span></span>
          <button class="cti">
            <div class="CTI">CAKE OF PARADISE</div>
          </button>
        </div>
      </a>
      <div class="icons-div">
        <div class="noti-div" @click="homePage()" style="margin-right: 2rem">
          <i class="fa-solid fa-cart-shopping cart"></i>
        </div>
        <router-link to="/loginPage">
          <i class="fa-regular fa-circle-user user"></i>
        </router-link>
      </div>
    </nav>
    <main>
      <div class="">
        <section class="">
          <div class="gate-container">
            <img
              src="https://assets.website-files.com/63482eabc0c973875a125955/634d49bd0d831276e694c562_arch-hero.svg"
              alt=""
              class="gate-img"
            />
            <img
              src="https://assets.website-files.com/63482eabc0c973875a125955/634d49bea83bb6d4ed555dba_ico-sun.svg"
              class="moon"
            />
            <h1 class="title" id="head-title">
              We are obsessed with<span class=""> cakes </span>
            </h1>
            <div class="btn-contianer">
              <button class="btn-shine" @click="homePage()">
                <span>Shop</span>
              </button>
            </div>
            <div class="sweets">
              <img
                src="https://assets.website-files.com/63482eabc0c973875a125955/634d49bf9f22e4ec25017c3e_sweets-03-p-500.webp"
                alt=""
                class="img1 img layer"
                data-speed="5"
              />
              <img
                src="https://assets.website-files.com/63482eabc0c973875a125955/634d49bf6b8822e7075377ac_sweets-01-p-500.webp"
                alt=""
                class="img2 img layer"
                data-speed="-5"
              />
              <img
                src="https://assets.website-files.com/63482eabc0c973875a125955/634d49bffb3ed559548aeac4_sweets-02-p-500.webp"
                alt=""
                class="img3 img layer"
                data-speed="3"
              />
              <img
                src="https://th.bing.com/th/id/R.25bdf243d67a387ebc2b21c8bd4b460b?rik=jXgE%2bsxLPT77Ug&pid=ImgRaw&r=0"
                alt=""
                class="img img4 layer"
                data-speed="-3"
              />
              <img
                src="https://th.bing.com/th/id/R.0b368832dc6d4bf7b999aef2341556e1?rik=d2qxSf8BCJgDxw&pid=ImgRaw&r=0"
                alt=""
                class="img img5 layer"
                data-speed="-4"
              />
            </div>
          </div>
        </section>
      </div>

      <section
        class="wall-container"
        data-aos="fade-up"
        data-aos-duration="600"
      >
        <div class="wall">
          <img
            src="https://assets.website-files.com/63482eabc0c973875a125955/635656504d0d41a833af03d3_texture.webp"
            alt=""
          />
          <div class="attach1-div">
            <img
              src="https://i.pinimg.com/originals/4e/11/34/4e113455c8c113a1f75d055b6a595a80.jpg"
              class="attach1"
              alt=""
            />
          </div>
          <div class="attach2-div">
            <img
              src="https://i.pinimg.com/originals/9f/76/1c/9f761ca7646664d252b8e80cd4f32184.jpg"
              alt=""
              class="attach2"
            />
          </div>
        </div>
        <div class="text-div">
          <p>
            WE CAN CATERTO ALL TASTES, AND MAKE ANY DESSERT YOU LIKE,SO PLEASE
            CONTACT US IF YOU HAVE A SPECIAL REQUEST
          </p>
        </div>
        <div class="video-container">
          <video :src="require('@/assets/cake.mp4')"></video>
          <img
            class="btn"
            @click="video()"
            src="https://th.bing.com/th/id/R.16602cea9a6170346eda53a8bd83d544?rik=WD%2bw%2fhbYJTgJpw&riu=http%3a%2f%2fclipart-library.com%2fimages_k%2fwhite-play-button-transparent%2fwhite-play-button-transparent-10.png&ehk=3RQuvhXxBT2DxWDCz94cLvhbmp0JgYcqczQlaoDPOzs%3d&risl=&pid=ImgRaw&r=0"
            alt=""
          />
        </div>
        <div class="trailer-container active">
          <video :src="require('@/assets/cake.mp4')" controls></video>
          <i class="fas fa-times fa-2x close-icon"></i>
        </div>
        <div
          style="
            background-color: #42230c;
            width: 70%;
            height: 1px;
            position: absolute;
            top: 70%;
            left: 15%;
          "
        ></div>
        <div
          style="
            background-color: #191512;
            width: 70%;
            height: 1px;
            position: absolute;
            top: 71%;
            left: 15%;
          "
        ></div>
        <div
          style="
            background-color: #686765;
            width: 70%;
            height: 1px;
            position: absolute;
            top: 72%;
            left: 15%;
          "
        ></div>
        <div class="award-container">
          <img
            src="https://assets.website-files.com/63482eabc0c973875a125955/6368f4e2df8f850c6b2a407b_award-01.svg"
            alt=""
            class="award1"
          />
          <img
            src="https://assets.website-files.com/63482eabc0c973875a125955/6368f4e264f127a185aaf930_award-02.png"
            alt=""
            class="award2"
          />
          <img
            src="https://assets.website-files.com/63482eabc0c973875a125955/6368f4e2d63c3c5ca18e7fa4_award-03.svg"
            alt=""
            class="award3"
          />
        </div>
      </section>


      <section
        class="wall-container"
        data-aos="fade-up"
        data-aos-duration="600"
      >
        <div class="wall last-container">
          <img
            src="https://assets.website-files.com/63482eabc0c973875a125955/635656504d0d41a833af03d3_texture.webp"
            alt=""
          />
          <img
            class="slice-cake"
            src="https://assets.website-files.com/63482eabc0c973875a125955/634d49bec54c301fb3f48935_cake-p-500.webp"
            alt=""
          />
          <img
            class="part"
            src="https://assets.website-files.com/63482eabc0c973875a125955/634d49c00007a1479a368e29_cake-piece-p-500.webp"
            alt=""
          />
        </div>
        <div class="para-container">
          <h1>Our taste comes true</h1>
          <p>We can cater to all tastes, and make any dessert you like</p>
        </div>
        <div class="tasty-cake">
          <p>JUST TAKE A BITE!</p>
          <div class="img-div">
            <img
              src="https://images.pexels.com/photos/3081657/pexels-photo-3081657.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt=""
            />
          </div>
        </div>
      </section>

      <section>
        <footer class="footer">
          <div class="footer-text">
            <img
              src="https://th.bing.com/th/id/R.31ccd8442de1a3d82d6cc5220aa28b82?rik=TdW7enEyGjWTKw&riu=http%3a%2f%2fpre14.deviantart.net%2fd23d%2fth%2fpre%2ff%2f2014%2f049%2f8%2f6%2fcake_logo_vector___commission___by_frequencyspark-d7701qi.png&ehk=DViW81qSjSH7%2bORw9tOIttKtvVChKTbML01pwfYjjaI%3d&risl=&pid=ImgRaw&r=0"
              alt=""
            />
            <small>
              2023 COF
              <br />
              &copy; All rights reserved
            </small>
          </div>
          <div class="social-medias">
            <button class="Btn">
              <span class="svgContainer">
                <i class="fa-brands fa-facebook"></i>
              </span>
              <span class="BG" style="background-color: #0165e1"></span>
            </button>
            <button class="Btn">
              <span class="svgContainer">
                <i class="fa-brands fa-instagram svgIcon"></i>
              </span>
              <span
                class="BG"
                style="
                  background: linear-gradient(
                    45deg,
                    #f09433 0%,
                    #e6683c 25%,
                    #dc2743 50%,
                    #cc2366 75%,
                    #bc1888 100%
                  );
                "
              ></span>
            </button>
            <button class="Btn">
              <span class="svgContainer">
                <i class="fa-brands fa-twitter"></i>
              </span>
              <span class="BG" style="background-color: #1d9bf0"></span>
            </button>
            <button class="Btn">
              <span class="svgContainer">
                <i class="fa-brands fa-linkedin-in"></i>
              </span>
              <span class="BG" style="background-color: #0a66c2"></span>
            </button>
            <button class="Btn">
              <span class="svgContainer">
                <i class="fa-brands fa-dribbble"></i>
              </span>
              <span class="BG" style="background-color: #bc1888"></span>
            </button>
          </div>
          <small
            >Yangon: +9597951127322 <br />
            cakery_paradise.com</small
          >
        </footer>
      </section>
    </main>
  </div>
</template>
<script>
export default {
  name: "landPage",
  methods: {
    video() {
      const trailerContainerEl = document.querySelector(".trailer-container");
      trailerContainerEl.classList.remove("active");
      const closeIconEl = document.querySelector(".close-icon");
      const videoEl = document.querySelector("video");

      closeIconEl.addEventListener("click", () => {
        trailerContainerEl.classList.add("active");

        videoEl.pause();
        videoEl.currentTime = 0;
      });
    },
    homePage() {
      this.$router.push({
        name: "homePage",
      });
    },
  },
  mounted: function () {
    const loaderDiv = document.querySelector(".loader-div");
    window.onload = function () {
      setTimeout(function () {
        loaderDiv.classList.add("loader-hidden");
      }, 5000);
    };
    setTimeout(function () {
      loaderDiv.classList.add("loader-hidden");
    }, 5000);
  },
};
</script>
