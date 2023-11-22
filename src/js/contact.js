import axios from "axios";
import homeNavBar from "../views/HomeNavBar.vue";
import { mapGetters } from "vuex";

export default {
    data() {
        return {
            loadingStatus: false,
            tokenStatus: false,
            count: 0,
            accountImg: null,
            text: "",
            maxCharacters: 1000,
            user: {
                name: "",
                email: "",
                phone: "",
                address: "",
            },
            validationMessage: false,
            validateEmail: false,
            checkInfo: false,
        };
    },
    components: {
        homeNavBar,
    },
    computed: {
        ...mapGetters(["storageToken", "storageUserData"]),
        characterCount() {
            return this.text.length;
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
        sendMessage() {
            if (
                this.user.name !== "" &&
                this.user.email != "" &&
                this.user.phone !== "" &&
                this.user.address &&
                this.text
            ) {
                const regex = new RegExp(
                    "^[a-zA-Z0-9_\\-\\.]+@[a-zA-Z0-9_\\-\\.]+\\.[a-zA-Z]{2,5}$"
                );
                if (regex.test(this.user.email)) {
                    let data = {
                        userId: this.storageUserData.id,
                        name: this.user.name,
                        email: this.user.email,
                        phone: this.user.phone,
                        address: this.user.address,
                        message: this.text,
                    };

                    axios.post("http://localhost:8000/api/check/customerInfo", data)
                        .then((response) => {
                            this.validationMessage = false;
                            this.validateEmail = false;
                            this.checkInfo = false;
                            if (response.data.status) {

                                axios.post("http://localhost:8000/api/customer/contact", data)
                                    .then(() => {
                                        this.user.name = "";
                                        this.user.email = "";
                                        this.user.phone = "";
                                        this.user.address = "";
                                        this.text = "";
                                        this.showAlert();
                                        this.alertAnimation();
                                    })
                                    .catch((error) => {
                                        console.log(error);
                                    });
                            } else {
                                this.checkInfo = true;
                                this.validateEmail = false;
                                this.validationMessage = false;
                            }
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                } else {
                    this.validateEmail = true;
                    this.validationMessage = false;
                    this.checkInfo = false;
                }
            } else {
                this.validationMessage = true;
                this.validateEmail = false;
                this.checkInfo = false;
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
            }, 4000);
        },
    },
    mounted() {
        this.checkToken();
        this.cartCount();
        this.accountProfile();
    },
};