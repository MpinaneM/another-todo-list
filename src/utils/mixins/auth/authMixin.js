import { mapActions } from "vuex";

export default {
    data() {
        return {
            email: "",
            password: "",
            incorrectCredentialsError: "",
            requestError: "",
        };
    },
    computed: {
        hasIncorrectCredentials() {
            return this.incorrectCredentialsError !== "";
        },
        hasRequestError() {
            return this.requestError !== "";
        },
    },

    methods: {
        ...mapActions({
            authenticateUser: "AUTH_USER",
        }),
        validateForm() {
            throw Error("Method 'validateForm' must be implemented.");
        },
        async authUser(mode) {
            try {
                this.validateForm();
                if (!this.hasIncorrectCredentials) {
                    await this.authenticateUser({
                        email: this.email,
                        password: this.password,
                        mode,
                    });
                    this.$router.push({ name: "home" });
                }
            } catch (error) {
                console.log("ERRPR", error);
                this.requestError = error.message;
            }
        },
    },
};
