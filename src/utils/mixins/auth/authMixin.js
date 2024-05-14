import { mapActions } from "vuex";

export default {
    data() {
        return {
            email: "",
            password: "",
            formErrors: {},
        };
    },
    computed: {
        hasFormErrors() {
            return Object.keys(this.formErrors).length;
        },
        hasRequestError() {
            return this.requestError !== "";
        },
    },

    methods: {
        ...mapActions("auth", {
            authenticateUser: "AUTH_USER",
            setAuthErrorMessage: "SET_AUTH_ERROR_MESSAGE",
        }),
        checkEmptyFields({ payload, errors }) {
            for (const key in payload) {
                if (payload[key] === "") {
                    errors[key] = "This field is required.";
                }
            }
            return errors;
        },
        checkPasswordsMatch({ payload, errors }) {
            if (
                payload.password !== payload.confirm_password &&
                !errors.password &&
                !errors.confirm_password
            ) {
                errors["confirm_password"] = "Passwords do not match.";
            }
            return errors;
        },
        composeValidators(validators, payload) {
            const errors = validators.reduce((errors, validator) => {
                return validator({ payload, errors });
            }, {});

            this.formErrors = errors;
        },
        validateForm() {
            throw new Error("Method not implemented.");
        },
        clearFormErrors() {
            this.formErrors = {};
        },
        async authUser(mode) {
            try {
                this.setAuthErrorMessage("");
                this.validateForm();
                if (!this.hasFormErrors) {
                    await this.authenticateUser({
                        email: this.email,
                        password: this.password,
                        mode,
                    });
                    this.$router.push({ name: "home" });
                }
            } catch (error) {
                this.setAuthErrorMessage(
                    "An error occurred. Please try again."
                );
            }
        },
    },
    deactivated() {
        this.clearFormErrors();
    },
};
