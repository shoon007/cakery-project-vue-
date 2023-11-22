import axios from "axios";
import { mapGetters } from "vuex";

import homeNavBar from "../views/HomeNavBar.vue";
export default {
    name: "postDetails",
    data() {
        return {
            postId: 0,
            post: {},
            showStatus: true,
            viewCount: 0,
            count: 0,
            accountImg: null,
            qty: 1,
            tokenStatus: false,
            loadingStatus: false,
            isChecked: false,
            likeCount: 0,
        };
    },
    computed: {
        ...mapGetters(["storageToken", "storageUserData"]),
    },
    components: {
        homeNavBar,
    },
    methods: {
        checkToken() {
            if (
                this.storageToken != null &&
                this.storageToken != undefined &&
                this.storageToken != ""
            ) {
                this.tokenStatus = true;
            } else {
                this.tokenStatus = false;
            }
        },
        animationBtn(id) {
            const btn = document.querySelector(".add-to-cart");
            btn.classList.toggle("added");
            const notiDiv = document.querySelector(".noti-div");
            notiDiv.classList.remove("shake-animation");

            if (btn.classList.contains("added")) {
                this.count += 1;
                let data = {
                    user_id: this.storageUserData.id,
                    post_id: id,
                    quantity: this.qty,
                };

                axios.post("http://localhost:8000/api/product/order", data)
                    .then(() => {
                        const notiDiv = document.querySelector(".noti-div");
                        notiDiv.classList.remove("shake-animation");
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        },
        loadPost(id) {
            this.loadingStatus = true;
            let post = {
                postId: id,
            };

            axios.post("http://localhost:8000/api/post/details", post)
                .then((response) => {
                    this.loadingStatus = false;
                    response.data.post.image =
                        "http://localhost:8000/storage/" + response.data.post.image;
                    this.post = response.data.post;
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        OpenBox() {
            this.showStatus = true;
        },
        cartPage() {
            this.$router.push({
                name: "cartPage",
            });
        },
        cartCount() {
            let data = {
                user_id: this.storageUserData.id,
            };

            axios.post("http://localhost:8000/api/cart/count", data)
                .then((response) => {
                    this.count = response.data.count.length;
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        accountProfile() {
            let data = {
                userId: this.storageUserData.id,
            };


            axios.post("http://localhost:8000/api/account/edit/", data)
                .then((response) => {
                    if (response.data.customerAccount.image !== null) {
                        response.data.customerAccount.image =
                            "http://localhost:8000/storage/images/" +
                            response.data.customerAccount.image;
                    }
                    this.accountImg = response.data.customerAccount.image;
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        minus() {
            if (this.qty > 1) {
                this.qty -= 1;
            }
        },
        plus() {
            this.qty += 1;
        },
        viewCounting() {
            let data = {
                user_id: this.storageUserData.id,
                post_id: this.$route.params.postId,
            };

            axios.post("http://localhost:8000/api/post/actionLog", data)
                .then((response) => {
                    this.viewCount = response.data.post.length;
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        addLike() {
            if (this.isChecked) {
                let data = {
                    user_id: this.storageUserData.id,
                    post_id: this.$route.params.postId,
                };
                axios.post("http://localhost:8000/api/add/like/", data);
            } else {
                let data = {
                    user_id: this.storageUserData.id,
                    post_id: this.$route.params.postId,
                };
                axios.post("http://localhost:8000/api/remove/like/", data);
            }
            this.likeCounting();
        },
        postLike() {
            let data = {
                user_id: this.storageUserData.id,
                post_id: this.$route.params.postId,
            };

            axios.post("http://localhost:8000/api/post/like", data)
                .then((response) => {
                    if (response.data.status) {
                        this.isChecked = true;
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        likeCounting() {
            let data = {
                post_id: this.$route.params.postId,
            };

            axios.post("http://localhost:8000/api/like/count", data)
                .then((response) => {
                    this.likeCount = response.data.likeCount.length;
                })
                .catch((error) => {
                    console.log(error);
                });
        },
    },
    mounted() {
        this.viewCounting();
        this.postLike();
        this.likeCounting();
        this.loadPost(this.$route.params.postId);
        this.postId = this.$route.params.postId;
        this.cartCount();
        this.accountProfile();
        this.checkToken();
    },
};