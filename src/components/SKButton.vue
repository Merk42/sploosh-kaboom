<script setup lang="ts">
import { computed, defineEmits, ref, watch } from 'vue';

const emit = defineEmits(['kaboom', 'sploosh']);

const props = defineProps<{
    x: number,
    y: number,
    map: Map<string, string>,
    round: number
}>();
const state = ref('button');

const kk = computed<string>(() => {
    const H = props.x - 1 + '';
    const V = props.y - 1 + '';
    return H + V;
})
function result() {
    if (props.map.has(kk.value)) {
        state.value = 'kaboom';
        emit('kaboom', props.map.get(kk.value));
    } else {
        state.value = 'sploosh';
        emit('sploosh');
    }
}
watch(() => props.round, (newValue, oldValue) => {
    if (newValue !== oldValue) {
        state.value = 'button';
    }
})
</script>
<template>
    <button v-if="state === 'button'" @click="result()"></button>
    <span v-if="state === 'kaboom'" class="kaboom"></span>
    <span v-if="state === 'sploosh'" class="sploosh"></span>
</template>
<style scoped>
button,
span {
    all: unset;
    display: grid;
    /* width: 10ch; */
    border: 0;
    /* height: 10ch; */
    place-content: center;
    border: 1px solid Canvas;

}

.kaboom {
    background-image: url('/kaboom.svg');
    background-size: contain;
}

.sploosh {
    background-image: url('/sploosh.svg');
    background-size: contain;
}

@media (prefers-color-scheme: dark) {
    .sploosh {
        filter: brightness(1.5)
    }
}

button:hover {
    cursor: pointer;
}

button:hover,
button:focus-visible {
    transform: scale(1.25);
    background-image: url('/target.svg');
    background-size: contain;
    border: 0;
}
</style>