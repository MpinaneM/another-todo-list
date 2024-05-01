<template>
    <div class="signup">
        <form @submit.prevent="authUser('signup')">
            <div>
                <label for="email">Email:</label>
                <input type="text" id="email" v-model="email" />
                <FieldErrorMessage
                    v-if="formErrors.email"
                    :errorMessage="formErrors.email"
                />
            </div>
            <div>
                <label for="password">Password:</label>
                <input type="password" id="password" v-model="password" />
                <FieldErrorMessage
                    v-if="formErrors.password"
                    :errorMessage="formErrors.password"
                />
            </div>
            <div>
                <label for="confirm_password">Confirm password:</label>
                <input
                    type="password"
                    id="confirm_password"
                    v-model="confirm_password"
                />
                <FieldErrorMessage
                    v-if="formErrors.confirm_password"
                    :errorMessage="formErrors.confirm_password"
                />
            </div>
            <button type="submit">Sign up</button>
        </form>
    </div>
</template>

<script>
import authMixin from "../../utils/mixins/auth/authMixin";
import FieldErrorMessage from "../FieldErrorMessage/FieldErrorMessage.vue";

export default {
    mixins: [authMixin],
    components: {
        FieldErrorMessage,
    },
    data() {
        return {
            confirm_password: "",
        };
    },
    methods: {
        validateForm() {
            this.composeValidators(
                [this.checkEmptyFields, this.checkPasswordsMatch],
                {
                    email: this.email,
                    password: this.password,
                    confirm_password: this.confirm_password,
                }
            );
        },
    },
};
</script>
