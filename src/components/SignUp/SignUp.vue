<template>
    <div class="mt-5">
        <form @submit.prevent="authUser('signup')">
            <div class="input-field">
                <input
                    type="text"
                    id="email"
                    v-model="email"
                    placeholder="Enter your email"
                    :class="{ error: formErrors.email }"
                />
                <FieldErrorMessage
                    v-if="formErrors.email"
                    :errorMessage="formErrors.email"
                />
            </div>
            <div class="input-field">
                <input
                    type="password"
                    id="password"
                    v-model="password"
                    placeholder="Create your password"
                    :class="{ error: formErrors.password }"
                />
                <FieldErrorMessage
                    v-if="formErrors.password"
                    :errorMessage="formErrors.password"
                />
            </div>
            <div class="input-field">
                <input
                    type="password"
                    id="confirm_password"
                    v-model="confirm_password"
                    placeholder="Confirm your password"
                    :class="{ error: formErrors.confirm_password }"
                />
                <FieldErrorMessage
                    v-if="formErrors.confirm_password"
                    :errorMessage="formErrors.confirm_password"
                />
            </div>
            <button
                type="submit"
                class="w-full bg-[#41b783] p-2 mb-1 mt-2 text-white hover:bg-[#247954] hover:cursor-pointer rounded-md"
            >
                <template v-if="isLoading">
                    <div>
                        <Spinner :size="20" color="white" />
                    </div>
                </template>
                <template v-else>Sign Up</template>
            </button>
        </form>
    </div>
</template>

<script>
import authMixin from "@/utils/mixins/auth/authMixin";
import FieldErrorMessage from "@/components/FieldErrorMessage/FieldErrorMessage.vue";
import Spinner from "@/components/Spinner/Spinner.vue";
import { mapGetters } from "vuex";

export default {
    mixins: [authMixin],
    components: {
        FieldErrorMessage,
        Spinner,
    },
    data() {
        return {
            confirm_password: "",
        };
    },
    computed: {
        ...mapGetters("auth", ["isLoading"]),
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

<style scoped>
.input-field {
    input {
        @apply w-full p-2 mb-1 border-2 border-gray-200 rounded-md;
    }

    input.error {
        @apply border-red-500;
    }

    @apply mb-2;
}
</style>
