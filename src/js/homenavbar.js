import axios from "axios";
import { mapGetters } from "vuex";
export default {
    data() {
        return {
            account: "",
            count: 0,
        };
    },
    computed: {
        ...mapGetters(["storageToken", "storageUserData"]),
    },
    methods: {
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
                    this.account = response.data.customerAccount;
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
        contact() {
            this.$router.push({
                name: "contactPage",
            });
        },
    },
    mounted() {
        this.accountProfile();
    },
};