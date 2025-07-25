<script setup lang="ts">
const props = defineProps({
    variant: {
        type: String,
        default: 'primary', // 'primary', 'secondary', 'danger', etc.
    },
    size: {
        type: String,
        default: 'medium', // 'small', 'medium', 'large'
    },
    disabled: {
        type: Boolean,
        default: false,
    },
});

const emit = defineEmits(['click']);

const handleClick = (event: any) => {
    if (!props.disabled) {
        emit('click', event);
    }
};
</script>
<template>
    <button @click="handleClick">
        <slot></slot>
    </button>
</template>
<style scoped>
button {
    --_shadow: 4px;
    background-image: url('/button.png');
    background-size: 100% 100%;
    background-color: transparent;
    border: none;
    padding: .75rem 1rem;
    filter: drop-shadow(var(--_shadow) var(--_shadow) 0px rgba(0, 0, 0, 0.5));
    text-transform: capitalize;
    font-family: 'rocknrollone';
}

button:hover {
    cursor: pointer;
}

button:active {
    filter: drop-shadow(0px 0px 0px rgba(0, 0, 0, 0.5));
    transform: translate(var(--_shadow), var(--_shadow));
}
</style>