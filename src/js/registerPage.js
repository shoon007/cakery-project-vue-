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
                name: "",
                email: "",
                password: "",
                confirmPassword: "",
            },
            requireMessage: false,
            emailValidation: false,
            confirmPasswordValidation: false,
            emailExist: false,
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
        emptyInputs() {
            this.form.name = "";
            this.form.email = "";
            this.form.password = "";
            this.form.confirmPassword = "";
        },
        register() {
            if (
                this.form.name !== "" &&
                this.form.email != "" &&
                this.form.password != "" &&
                this.form.confirmPassword
            ) {
                const regex = new RegExp(
                    "^[a-zA-Z0-9_\\-\\.]+@[a-zA-Z0-9_\\-\\.]+\\.[a-zA-Z]{2,5}$"
                );
                if (regex.test(this.form.email)) {
                    if (this.form.password === this.form.confirmPassword) {
                        axios.post("http://localhost:8000/api/customer/register", this.form)
                            .then((response) => {
                                if (response.data.token == null) {
                                    this.emailExist = true;
                                    this.emptyInputs();
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
                        this.confirmPasswordValidation = true;
                        this.emailValidation = false;
                        this.requireMessage = false;
                        this.emailExist = false;
                        this.emptyInputs();
                    }
                } else {
                    this.emailValidation = true;
                    this.requireMessage = false;
                    this.confirmPasswordValidation = false;
                    this.emailExist = false;
                    this.emptyInputs();
                }
            } else {
                this.requireMessage = true;
                this.emailValidation = false;
                this.confirmPasswordValidation = false;
                this.emailExist = false;
                this.emptyInputs();
            }
        },
    },
};