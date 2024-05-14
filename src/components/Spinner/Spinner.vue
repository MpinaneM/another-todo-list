<template>
    <span class="flex justify-center items-center">
        <span
            :style="{
                width: `${size}px`,
                height: `${size}px`,
                borderColor: color,
            }"
            class="animate-spin rounded-full border-t-2 border-b-2"
        ></span>
    </span>
</template>

<script>
export default {
    name: "Spinner",
    props: {
        size: {
            type: Number,
            default: 24,
        },
        color: {
            type: String,
            default: "#41b783",
        },
    },
};
</script>
