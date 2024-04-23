<template>
    <div class="modal-overlay" v-if="show">
        <div class="modal-container">
            <div class="modal-header">
                <span class="close" @click="closeModal">&times;</span>
                <h2>{{ title }}</h2>
            </div>
            <div class="modal-body">
                <slot></slot>
            </div>
            <div class="modal-footer">
                <button @click="closeModal">Cancel</button>
                <button @click="handleAction">{{actionLabel}}</button>
            </div>
        </div>
  </div>
</template>

<script>
export default {
    name: 'GenericModal',
    props: {
        show: {
            type: Boolean,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        actionLabel: {
            type: String,
            required: true
        },
        handleAction: {
            type: Function,
            required: true
        }
    },
    methods: {
        closeModal() {
            this.$emit('close');
        }
    }
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
}
</style>