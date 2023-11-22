import axios from "axios";
import homeNavBar from "../views/HomeNavBar.vue";
import { mapGetters } from "vuex";
export default {
    data() {
        return {
            account: "",
            updateSuccess: false,
            validationMessage: false,
            image: null,
            showImage: false,
            count: 0,
            tokenStatus: false,
            loadingStatus: false,
            invalidEmail: false,
        };
    },
    components: {
        homeNavBar,
    },
    computed: {
        ...mapGetters(["storageToken", "storageUserData"]),
    },
    methods: {
        cartPage() {
            this.$router.push({
                name: "cartPage",
            });
        },
        contact() {
            this.$router.push({
                name: "contactPage",
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

        showAlert() {
            const alertBox = document.querySelector(".alert-box");
            alertBox.style.display = "block";
        },
        alertAnimation() {
            const alertBox = document.querySelector(".alert-box");
            setTimeout(() => {
                alertBox.style.display = "none";
            }, 2000);
        },
        onChange(event) {
            this.image = event.target.files[0];
            const file = event.target.files[0];
            if (file) {
                const url = window.URL.createObjectURL(file);
                document.getElementById("preview").src = url;
            }
        },
        accountEdit() {
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
                        this.showImage = true;
                    }
                    this.account = response.data.customerAccount;
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        accountUpdating() {

            axios.post(
                    `http://localhost:8000/api/account/update/${this.account.id}/${this.account.name}/${this.account.email}`
                )
                .then(() => {
                    this.updateSuccess = true;
                    this.showAlert();
                    this.alertAnimation();
                    this.validationMessage = false;
                    this.invalidEmail = false;
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        checkFileSelected() {
            if (this.account.name == "" && this.account.email == "") {
                this.validationMessage = true;
                this.invalidEmail = false;
            } else {
                const regex = new RegExp(
                    "^[a-zA-Z0-9_\\-\\.]+@[a-zA-Z0-9_\\-\\.]+\\.[a-zA-Z]{2,5}$"
                );
                if (regex.test(this.account.email)) {
                    if (this.image == null) {
                        this.accountUpdating();
                    } else {
                        const fd = new FormData();
                        fd.append("image", this.image);


                        axios.post(
                                `http://localhost:8000/api/account/update/${this.account.id}/${this.account.name}/${this.account.email}`,
                                fd, {
                                    headers: { "Content-Type": "multipart/form-data" },
                                }
                            )
                            .then(() => {
                                this.updateSuccess = true;
                                this.showAlert();
                                this.alertAnimation();
                                this.accountEdit();
                                this.validationMessage = false;
                                this.invalidEmail = false;
                            });
                    }
                } else {
                    this.invalidEmail = true;
                    this.validationMessage = false;
                }
            }
        },
        deleteImg() {
            if (this.showImage) {
                let data = {
                    userId: this.storageUserData.id,
                };

                axios.post("http://localhost:8000/api/profile/delete", data)
                    .then((response) => {
                        this.accountEdit();
                        this.showImage = false;
                        this.validationMessage = false;
                        this.invalidEmail = false;
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

        logout() {
            this.$store.dispatch("setToken", "");
            this.$router.push({
                name: "loginPage",
            });
        },
        history() {
            this.$router.push({
                name: "historyPage",
            });
        },
    },
    mounted() {
        this.accountEdit();
        this.cartCount();
        this.checkToken();
    },
};