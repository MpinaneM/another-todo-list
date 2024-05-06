<template>
    <div class="mt-5">
        <form @submit.prevent="authUser('login')">
            <div class="input-field">
                <input
                    type="text"
                    id="email"
                    v-model="email"
                    :class="{ error: formErrors.email }"
                    placeholder="Enter your email"
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
                    placeholder="Enter your password"
                    :class="{ error: formErrors.password }"
                />
                <FieldErrorMessage
                    v-if="formErrors.password"
                    :errorMessage="formErrors.password"
                />
            </div>
            <button
                type="submit"
                class="w-full bg-[#41b783] hover:bg-[#247954] hover:cursor-pointer p-2 mb-1 mt-2 text-white rounded-md"
            >
                Login
            </button>
        </form>
    </div>
</template>

<script>
import authMixin from "@/utils/mixins/auth/authMixin";
import FieldErrorMessage from "@/components/FieldErrorMessage/FieldErrorMessage.vue";

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
