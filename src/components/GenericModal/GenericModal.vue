<template>
    <div
        class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-10"
    >
        <div class="bg-white w-1/4 p-6 rounded-md shadow-md">
            <div class="flex justify-between">
                <div class="text-lg font-semibold self-end">
                    <slot name="header"></slot>
                </div>
                <div
                    class="p-4 h-4 w-4 text-2xl bg-red-600 text-white hover:bg-red-800 justify-center items-center flex hover:cursor-pointer rounded-sm"
                    @click="closeModal"
                >
                    <span>&times;</span>
                </div>
            </div>
            <div class="my-5">
                <slot></slot>
            </div>
            <div class="flex justify-end">
                <slot name="footer"></slot>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "GenericModal",
    methods: {
        closeModal() {
            this.$emit("close");
        },
    },
};
</script>
