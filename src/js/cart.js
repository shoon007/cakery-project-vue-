import axios from "axios";
import homeNavBar from "../views/HomeNavBar.vue";
import { mapGetters } from "vuex";

export default {
    data() {
        return {
            count: 0,
            accountImg: null,
            cartLists: [],
            total: "",
            delivery: 3500,
            tokenStatus: false,
            loadingStatus: false,
            successStatus: false,
            orderSuccess: "",
        };
    },
    components: {
        homeNavBar,
    },

    computed: {
        ...mapGetters(["storageToken", "storageUserData"]),

        subtotal() {
            return this.cartLists.reduce(
                (total, cart) => total + cart.quantity * cart.product_price,
                0
            );
        },
        rows() {
            return this.items.length;
        },
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
        homePage() {
            this.$router.push({
                name: "homePage",
            });
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
            this.loadingStatus = true;
            let data = {
                userId: this.storageUserData.id,
            };


            axios.post("http://localhost:8000/api/account/edit/", data)
                .then((response) => {
                    this.loadingStatus = false;
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
        orderList() {
            let data = {
                user_id: this.storageUserData.id,
            };

            axios.post("http://localhost:8000/api/cart/lists", data)
                .then((response) => {
                    for (let i = 0; i < response.data.cart.length; i++) {
                        if (response.data.cart[i].product_image !== null) {
                            response.data.cart[i].product_image =
                                "http://localhost:8000/storage/" +
                                response.data.cart[i].product_image;
                        } else {
                            response.data.cart[i].product_image =
                                "http://localhost:8000/img/img-default.webp";
                        }
                    }
                    this.cartLists = response.data.cart;
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        minus(cart) {
            if (cart.quantity > 1) {
                cart.quantity--;
                this.productQuantity(cart);
            }
        },
        plus(cart) {
            cart.quantity++;
            this.productQuantity(cart);
        },
        productQuantity(cart) {
            let data = {
                user_id: this.storageUserData.id,
                cart_id: cart.id,
                qty: cart.quantity,
            };

            axios.post("http://localhost:8000/api/product/quantity", data);
        },
        productDelete(cart) {
            //deleting cart ui
            const index = this.cartLists.indexOf(cart);
            if (index > -1) {
                this.cartLists.splice(index, 1);
            }
            this.count--;
            this.cartDelete(cart);
        },
        cartDelete(cart) {
            let data = {
                cart_id: cart.id,
            };
            axios.post("http://localhost:8000/api/product/delete", data);
        },
        clear() {
            const cartRow = document.querySelectorAll(".cart-row");
            cartRow.forEach((row) => {
                row.classList.add("hidden");
            });
            this.count = 0;
            this.cartLists.length = 0;
        },
        clearCart() {
            this.clear();
            let data = {
                user_id: this.storageUserData.id,
            };
            axios.post("http://localhost:8000/api/clear/cart", data);
        },
        checkout() {
            let order_code = Math.floor(Math.random() * 100000001);
            let data = {
                cart_list: this.cartLists,
                order_code: order_code,
                total_price: this.subtotal + this.delivery,
                user_id: this.storageUserData.id,
            };
            if (this.cartLists.length > 0) {

                axios.post("http://localhost:8000/api/cartList/checkout", data)
                    .then((response) => {
                        this.successStatus = true;
                        this.orderSuccess = response.data.orderSuccess;
                        this.clear();
                        this.clearCart();
                        this.showAlert();
                        this.alertAnimation();
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        },
        showAlert() {
            const alertBox = document.querySelector(".alert-box");
            alertBox.style.display = "block";
        },
        alertAnimation() {
            const alertBox = document.querySelector(".alert-box");
            setTimeout(() => {
                alertBox.style.display = "none";
            }, 5000);
        },
    },
    mounted() {
        this.accountProfile();
        this.cartCount();
        this.orderList();
        this.checkToken();
    },
};