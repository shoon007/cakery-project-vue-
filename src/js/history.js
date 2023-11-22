import axios from "axios";
import homeNavBar from "../views/HomeNavBar.vue";
import { mapGetters } from "vuex";
import moment from "moment";

export default {
    data() {
        return {
            accountImg: null,
            historyData: [],
            loadingStatus: false,
            tokenStatus: false,
            count: 0,
        };
    },
    components: {
        homeNavBar,
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
        formatDate(date) {
            if (date) {
                return moment(String(date)).format("MMM-D-YYYY");
            }
        },
        cartHistory() {
            this.loadingStatus = true;
            let data = {
                user_id: this.storageUserData.id,
            };

            axios.post("http://localhost:8000/api/cart/history", data)
                .then((response) => {
                    this.historyData = response.data.history;
                    this.loadingStatus = false;
                })
                .catch((error) => {
                    console.log(error);
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
    },
    mounted() {
        this.checkToken();
        this.cartHistory();
        this.cartCount();
        this.accountProfile();
    },
};