<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
    total: number;
    remaining: number;
}>();

const used = computed(() => {
    return props.total - props.remaining;
})
</script>
<template>
    <div>
        <template v-for="x in total">
            <span :class="{ 'index': (x - 1) === used }"></span>
        </template>
    </div>
</template>
<style scoped>
div {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    width: 150px;
}

@media (orientation: portrait) {
    div {
        grid-template-columns: repeat(8, minmax(0, 1fr));
        width: 400px;
    }
}

span {
    display: inline-block;
    width: 50px;
    height: 50px;
    background-image: url('/bomb.svg');
    filter: grayscale(1) contrast(0.65);
}

.index,
.index~span {
    filter: grayscale(0) contrast(1);
}
</style>