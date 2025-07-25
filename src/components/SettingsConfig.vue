<script setup lang="ts">
import type { Config } from '@/types';
import GameOverModal from './GameOverModal.vue';
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
const configDialog = ref<InstanceType<typeof GameOverModal>>();
const settings = reactive<Config>({
    shake: true,
    vibrate: true,
    animate: true,
    sound: true
});

function copyProps() {
    settings.shake = props.settings.shake;
    settings.vibrate = props.settings.vibrate;
    settings.animate = props.settings.animate;
    settings.sound = props.settings.sound;
}

function openSettings() {
    copyProps()
    configDialog.value?.show();
}

function saveChanges() {
    emit('save', settings);
}
function cancelChanges() {
    configDialog.value?.close()
}
</script>
<template>
    <CommonButton @click="openSettings()">settings</CommonButton>
    <GameOverModal ref="configDialog" :confirm-text="'save'" :show-cancel="true" @confirm="saveChanges()"
        @cancel="cancelChanges()">
        <label><input type="checkbox" v-model="settings.shake" /> shake screen on hit</label>
        <label><input type="checkbox" v-model="settings.vibrate" /> vibrate device on hit</label>
        <label><input type="checkbox" v-model="settings.animate" /> animated water</label>
        <label><input type="checkbox" v-model="settings.sound" /> sound</label>
    </GameOverModal>
</template>
<style scoped>
label {
    display: block;
    padding: .25rem;
    font-size: 1rem;
}
</style>