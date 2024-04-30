<template>
    <div class="modal-overlay">
        <div class="modal-container">
            <div class="modal-header">
                <div>
                    <slot name="header"></slot>
                </div>
                <div class="close" @click="closeModal">
                    <span>&times;</span>
                </div>
            </div>
            <div class="modal-body">
                <slot></slot>
            </div>
            <div class="modal-footer">
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

<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-container {
    background-color: white;
    padding: 20px;
    border-radius: 4px;
    border: 1px solid black;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
    width: 300px;
    height: fit-content;
}

.modal-header {
    display: flex;
    justify-content: space-between;
}

.modal-body {
    margin: 20px 0;
}

.modal-footer {
    display: flex;
    justify-content: flex-end;
}

.modal-footer button:not:first-child {
    margin-left: 10px;
}

.close span {
    cursor: pointer;
    padding: 8px;
    border: 1px solid black;
}

.close span:hover {
    background-color: lightgrey;
}
</style>
