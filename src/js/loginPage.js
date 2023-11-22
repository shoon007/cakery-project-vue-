import axios from "axios";
import { mapGetters } from "vuex";
import navBar from "../views/NavBarPage.vue";
export default {
    components: {
        navBar,
    },
    data() {
        return {
            form: {
                email: "",
                password: "",
            },
            requireMessage: false,
            validationMessage: false,
        };
    },
    computed: {
        ...mapGetters(["storageToken", "storageUserData"]),
    },
    methods: {
        homePage() {
            this.$router.push({
                name: "homePage",
            });
        },
        resetForm() {
            this.form.email = "";
            this.form.password = "";
        },
        login() {
            if (this.form.email != "" && this.form.password != "") {

                axios.post("http://localhost:8000/api/customer/login", this.form)
                    .then((response) => {
                        this.requireMessage = false;
                        if (response.data.token == null) {
                            this.validationMessage = true;
                            this.resetForm();
                        } else {
                            this.$store.dispatch("setToken", response.data.token);
                            this.$store.dispatch("setUserData", response.data.customer);
                            this.homePage();
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            } else {
                this.requireMessage = true;
                this.resetForm();
            }
        },
    },
};