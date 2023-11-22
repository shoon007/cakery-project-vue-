import axios from "axios";
import { mapGetters } from "vuex";
import homeNavBar from "../views/HomeNavBar.vue";

export default {
    components: {
        homeNavBar,
    },
    data() {
        return {
            postLists: {},
            categoryLists: {},
            tokenStatus: false,
            buttons: document.querySelectorAll(".add-to-cart"),
            count: 0,
            accountImg: null,
            loadingStatus: false,
            searchKey: "",
            result: "",
            categorySearchStatus: false,
            inputSearchStatus: false,
        };
    },
    computed: {
        ...mapGetters(["storageToken", "storageUserData"]),
    },
    methods: {
        animationBtn(event, id) {
            // Remove the class from all buttons
            this.buttons.forEach((btn) => {
                btn.classList.remove("added");
            });
            // Add the class to the clicked button
            event.currentTarget.classList.toggle("added");
            if (event.currentTarget.classList.contains("added")) {
                //add animation
                const notiDiv = document.querySelector(".noti-div");
                notiDiv.classList.add("shake-animation");
                this.count += 1;
                let data = {
                    user_id: this.storageUserData.id,
                    post_id: id,
                    quantity: 1,
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
        cartPage() {
            this.$router.push({
                name: "cartPage",
            });
        },
        homePage() {
            this.$router.push({
                name: "homePage",
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
        getAllPost() {
            this.loadingStatus = true;

            axios.get("http://localhost:8000/api/getAllPost")
                .then((response) => {
                    this.loadingStatus = false;
                    for (let i = 0; i < response.data.post.length; i++) {
                        response.data.post[i].image =
                            "http://localhost:8000/storage/" + response.data.post[i].image;
                    }

                    this.postLists = response.data.post;
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        loadCategory() {

            axios.get("http://localhost:8000/api/getAllCategory")
                .then((response) => {
                    this.categoryLists = response.data.category;
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        categorySearch(searchKey) {
            let search = {
                key: searchKey,
            };


            axios.post("http://localhost:8000/api/category/search", search)
                .then((response) => {
                    for (let i = 0; i < response.data.result.length; i++) {
                        response.data.result[i].image =
                            "http://localhost:8000/storage/" + response.data.result[i].image;
                    }
                    this.postLists = response.data.result;
                    this.categorySearchStatus = true;
                    this.inputSearchStatus = false;
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        postDetails(id) {
            this.$router.push({
                name: "postDetails",
                params: {
                    postId: id,
                },
            });
        },
        bestSeller() {
            this.loadingStatus = true;

            axios.get("http://localhost:8000/api/bestSeller/cakes")
                .then((response) => {
                    this.loadingStatus = false;
                    for (let i = 0; i < response.data.result.length; i++) {
                        response.data.result[i].image =
                            "http://localhost:8000/storage/" + response.data.result[i].image;
                    }

                    this.postLists = response.data.result;
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        search() {
            let search = {
                key: this.searchKey,
            };

            axios.post("http://localhost:8000/api/product/search", search)
                .then((response) => {
                    for (let i = 0; i < response.data.result.length; i++) {
                        response.data.result[i].image =
                            "http://localhost:8000/storage/" + response.data.result[i].image;
                    }
                    this.postLists = response.data.result;
                    this.result = this.searchKey;
                    this.inputSearchStatus = true;
                    this.categorySearchStatus = false;
                })
                .catch((error) => {
                    console.log(error);
                });
        },

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

        logout() {
            this.$store.dispatch("setToken", "");
            this.$router.push({
                name: "loginPage",
            });
        },
    },
    mounted() {
        this.checkToken();
        this.getAllPost();
        this.loadCategory();
        this.cartCount();
        this.accountProfile();

    },
};