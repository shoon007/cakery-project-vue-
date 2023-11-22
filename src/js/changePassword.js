import axios from "axios";
import homeNavBar from "../views/HomeNavBar.vue";
import { mapGetters } from "vuex";

export default {
    components: {
        homeNavBar,
    },
    data() {
        return {
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
            passwordValidation: false,
            countValidation: false,
            sameValidation: false,
            updateStatus: false,
            oldPasswordValidation: false,
            count: 0,
            accountImg: null,
            tokenStatus: false,
        };
    },
    computed: {
        ...mapGetters(["storageToken", "storageUserData"]),
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
        showAlert() {
            const alertBox = document.querySelector(".alert-box");
            alertBox.style.display = "block";
        },
        alertAnimation() {
            const alertBox = document.querySelector(".alert-box");
            setTimeout(() => {
                alertBox.style.display = "none";
            }, 3000);
        },
        reset() {
            this.sameValidation = false;
            this.countValidation = false;
            this.passwordValidation = false;
        },
        resetInputs() {
            this.oldPassword = "";
            this.newPassword = "";
            this.confirmPassword = "";
        },
        changePassword() {
            if (
                this.oldPassword !== "" &&
                this.newPassword != "" &&
                this.confirmPassword
            ) {
                if (this.newPassword.length > 6) {
                    if (this.newPassword === this.confirmPassword) {
                        let data = {
                            userId: this.storageUserData.id,
                            oldPassword: this.oldPassword,
                            newPassword: this.newPassword,
                        };

                        axios.post("http://localhost:8000/api/changePassword", data)
                            .then((response) => {
                                if (response.data.updatePassword) {
                                    this.updateStatus = true;
                                    this.oldPasswordValidation = false;
                                    this.sameValidation = false;
                                    this.countValidation = false;
                                    this.passwordValidation = false;
                                } else {
                                    this.oldPasswordValidation = true;
                                    this.updateStatus = false;
                                    this.sameValidation = false;
                                    this.countValidation = false;
                                    this.passwordValidation = false;
                                }

                                this.reset();
                                this.resetInputs();
                                this.showAlert();
                                this.alertAnimation();
                            })
                            .catch((error) => {
                                console.log(error);
                            });
                    } else {
                        this.sameValidation = true;
                        this.countValidation = false;
                        this.passwordValidation = false;
                        this.updateStatus = false;
                        this.oldPasswordValidation = false;
                        this.resetInputs();
                    }
                } else {
                    this.countValidation = true;
                    this.passwordValidation = false;
                    this.sameValidation = false;
                    this.updateStatus = false;
                    this.oldPasswordValidation = false;
                    this.resetInputs();
                }
            } else {
                this.passwordValidation = true;
                this.sameValidation = false;
                this.countValidation = false;
                this.updateStatus = false;
                this.oldPasswordValidation = false;
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
    },
    mounted() {
        this.cartCount();
        this.accountProfile();
        this.checkToken();
    },
};