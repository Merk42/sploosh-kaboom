<script setup lang="ts">
import type { Display } from '@/types';
import { computed } from 'vue';
const props = defineProps<{
    displays: Display
}>();

const orientations = computed<Display>(() => {
    return {
        squid1: orientFromGrid(props.displays.squid1),
        squid2: orientFromGrid(props.displays.squid2),
        squid3: orientFromGrid(props.displays.squid3),
    }
})

function orientFromGrid(grid: string): string {
    const CELLS = grid.split(' / ');
    return CELLS[0] === CELLS[2] ? 'h' : 'v'
}

</script>
<template>
    <div id="squid1" :style="{ 'grid-area': displays.squid1 }" :class="orientations.squid1"></div>
    <div id="squid2" :style="{ 'grid-area': displays.squid2 }" :class="orientations.squid2"></div>
    <div id="squid3" :style="{ 'grid-area': displays.squid3 }" :class="orientations.squid3"></div>
</template>
<style scoped>
#squid1,
#squid2,
#squid3 {
    background-image: url('/gridsquid-v.svg');
    background-size: 100% 100%;
    position: relative;
}

#squid1.h,
#squid2.h,
#squid3.h {
    background-image: url('/gridsquid-h.svg');
}

#squid2.v {
    transform: scaleY(1.5);
}

#squid3.v {
    transform: scaleY(2);
}

#squid2.h {
    transform: scaleX(1.5);
}

#squid3.h {
    transform: scaleX(2);
}
</style>