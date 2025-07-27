<script setup lang="ts">
defineProps<{
  targets: Array<{ name: string, length: number }>
}>();
</script>
<template>
  <div id="targetcontainer">
    <template v-for="target in targets" :key="target.name">
      <div class="target" :class="{ 'dead': !target.length }">
        <div class="squid"></div>

        <div class="explosion"></div>
      </div>
    </template>
  </div>
</template>
<style lang="css" scoped>
.target,
.explosion,
.squid {
  width: 74px;
  aspect-ratio: 1;
  background-size: cover;
}

.target {
  display: grid;
}

.explosion {
  background-image: url('/kaboom.svg');
  transform: scale(0);
  transition: transform .2s;
}

.squid {
  background-image: url('/squid.svg');
  transition: filter .2s;
}

.explosion,
.squid {
  grid-row: 1;
  grid-column: 1;
}

.dead .explosion {
  transform: scale(1);
}

.dead .squid {
  filter: brightness(0.45) saturate(10) hue-rotate(130deg);
}


@media (orientation: portrait) {
  #targetcontainer {
    display: flex;
  }
}
</style>
