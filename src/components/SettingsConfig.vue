<script setup lang="ts">
import type { Config } from '@/types';
import DialogModal from './DialogModal.vue';
import { reactive, ref } from 'vue';
import CommonButton from './CommonButton.vue';
const emit = defineEmits(['save']);
const props = defineProps<{
  settings: {
    shake: boolean,
    vibrate: boolean,
    animate: boolean,
    sound: boolean
  }
}>();
const configDialog = ref<InstanceType<typeof DialogModal>>();
const dialogSettings = reactive<Config>({
  shake: true,
  vibrate: true,
  animate: true,
  sound: true
});

function copyProps(): void {
  dialogSettings.shake = props.settings.shake;
  dialogSettings.vibrate = props.settings.vibrate;
  dialogSettings.animate = props.settings.animate;
  dialogSettings.sound = props.settings.sound;
}

function openSettings(): void {
  copyProps()
  configDialog.value?.show();
}

function saveChanges(): void {
  emit('save', dialogSettings);
}
function cancelChanges(): void {
  configDialog.value?.close()
}
</script>
<template>
  <CommonButton @click="openSettings()">settings</CommonButton>
  <DialogModal ref="configDialog" :confirm-text="'save'" :show-cancel="true" @confirm="saveChanges()"
    @cancel="cancelChanges()" title="settings">
    <label><input type="checkbox" class="sr-only" v-model="dialogSettings.shake" /> shake screen on hit</label>
    <label><input type="checkbox" class="sr-only" v-model="dialogSettings.vibrate" /> vibrate device on hit</label>
    <label><input type="checkbox" class="sr-only" v-model="dialogSettings.animate" /> animated water</label>
    <label><input type="checkbox" class="sr-only" v-model="dialogSettings.sound" /> sound</label>
  </DialogModal>
</template>
<style scoped>
label {
  display: block;
  padding: .25rem;
  border: 2px solid transparent;
  font-size: 1rem;
  margin: .25rem 0;
  padding: .25rem .5rem;
}

label:hover {
  cursor: pointer;
}

label:has(:checked) {
  background-color: orange;
  border: 2px solid yellow;
  color: #000;
}
</style>
