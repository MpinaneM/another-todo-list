<template>
    <p>{{ errorMessage }}</p>
</template>

<script>
export default {
    name: "FieldErrorMessage",
    props: {
        errorMessage: {
            type: String,
            required: true,
        },
    },
};
</script>

<style scoped>
p {
    color: red;
    font-size: 12px;
}
</style>
