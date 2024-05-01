<template>
    <div class="login">
        <form @submit.prevent="authUser('login')">
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
            <button type="submit">Login</button>
        </form>
    </div>
</template>

<script>
import authMixin from "../../utils/mixins/auth/authMixin";
import FieldErrorMessage from "../FieldErrorMessage/FieldErrorMessage.vue";

export default {
    components: {
        FieldErrorMessage,
    },
    mixins: [authMixin],
    methods: {
        validateForm() {
            this.composeValidators([this.checkEmptyFields], {
                email: this.email,
                password: this.password,
            });
        },
    },
};
</script>
