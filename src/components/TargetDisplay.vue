<script setup lang="ts">
const props = defineProps<{
    targets: Array<{ name: string, length: number }>
}>();
</script>
<template>
    <div id="targetcontainer">
        <template v-for="target in targets">
            <div class="squid" :class="{ 'dead': !target.length }"></div>
        </template>
    </div>
</template>
<style lang="css" scoped>
.squid {
    width: 74px;
    background-image: url('/squid.svg');
    aspect-ratio: 1;
    background-size: cover;
}

@media (orientation: portrait) {
    #targetcontainer {
        display: flex;
    }
}

.dead {
    /* brightness(0.45) saturate(10) hue-rotate(130deg) */
    background-image: url('/defeated.svg');
}
</style>