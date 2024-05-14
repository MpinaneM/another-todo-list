<template>
    <router-link
        :to="to"
        class="self-center hover:bg-[#41b7841c] px-3 py-2"
        :class="{ active: isActive }"
    >
        <slot></slot>
    </router-link>
</template>

<script>
export default {
    name: "RouteLink",
    props: {
        to: {
            type: Object,
            required: true,
            validation: (value) => {
                if (typeof value !== "object") {
                    return new Error("The prop 'to' must be an object");
                }
                if (!value.name && !value.path) {
                    return new Error(
                        "The prop 'to' must have a 'name' or 'path' property"
                    );
                }
            },
        },
    },
    computed: {
        isActive() {
            return (
                this.$route.name === this.to.name ||
                this.$route.path === this.to.path
            );
        },
    },
};
</script>

<style scoped>
.active {
    @apply border-b-4 border-solid border-[#41b783];
}
</style>
