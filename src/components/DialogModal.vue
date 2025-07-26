<script setup lang="ts">
import { computed, ref } from 'vue';
import CommonButton from './CommonButton.vue';

const dialog = ref<HTMLDialogElement>();

const props = defineProps({
    confirmText: {
        type: String,
        default: 'Confirm',
    },
    cancelText: {
        type: String,
        default: 'Cancel',
    },
    hideConfirm: {
        type: Boolean,
        default: false,
    },
    showCancel: {
        type: Boolean,
        default: false,
    },
    classes: {
        type: String,
        default: '',
    },
    title: {
        type: String,
        default: ''
    }
});

const emit = defineEmits(['confirm', 'cancel']);

const cancel = () => {
    dialog.value?.close();
    emit('cancel');
};

const confirm = () => {
    dialog.value?.close();
    emit('confirm');
};

const visible = ref(false);

const showModal = () => {
    dialog.value?.showModal();
    visible.value = true;
};

defineExpose({
    show: showModal,
    close: (returnVal?: string): void => dialog.value?.close(returnVal),
    visible,
});

const titleid = computed(() => {
    return `${props.title.replace(" ", "")}-title`;
})
</script>

<template>
    <dialog ref="dialog" class="modal modal-bottom sm:modal-middle" @close="visible = false" :aria-labelledby="titleid">
        <form method="dialog" :class="{
            'modal-box rounded-none p-4': true,
            [props.classes]: props.classes,
        }">
            <header>
                <h1 :id="titleid"><span>{{ props.title }}</span></h1>
            </header>
            <main>
                <slot />
            </main>
            <footer v-if="!props.hideConfirm || props.showCancel">
                <slot name="footer" />
                <slot name="actionButtons">
                    <CommonButton v-if="props.showCancel" value="false" class="btn" @click.prevent="cancel">
                        {{ props.cancelText }}
                    </CommonButton>
                    <CommonButton v-if="!props.hideConfirm" value="true" class="btn btn-primary"
                        @click.prevent="confirm">
                        {{ props.confirmText }}
                    </CommonButton>
                </slot>
            </footer>
        </form>
        <!--
        <form method="dialog" class="modal-backdrop">
            <button>close</button>
        </form>
        -->
    </dialog>
</template>

<style scoped>
dialog {
    --_shadow: 1rem;
    --_padding: 4rem;
    margin: auto;
    border-image-source: url('/dialog.svg');
    border-image-slice: 12 12 12 12 fill;
    border-image-width: 10px 10px 10px 10px;
    border-image-repeat: round;
    background-color: transparent;
    padding: var(--_padding);
    filter: drop-shadow(var(--_shadow) var(--_shadow) 0px rgba(0, 0, 0, 0.5));
}

dialog {
    animation: dismiss .4s;
}

dialog[open] {
    animation: call .4s;
}

@keyframes call {
    from {
        transform: translateY(-100vh)
    }

    to {
        transform: translateY(0vh)
    }
}

@keyframes dismiss {
    from {
        display: block;
        transform: translateY(0vh)
    }

    to {
        display: none;
        transform: translateY(-100vh)
    }
}

h1 {
    text-align: center;
    margin-bottom: 1rem;
}

h1 span {
    color: yellow;
    -webkit-text-stroke: 1px black;
    text-transform: uppercase;
    padding: .5rem;
    background-color: #3e7f2d;
}

form {
    max-height: calc(100dvh - calc(var(--_padding) * 2));
    display: grid;
    grid-template-rows: auto 1fr auto;
}

main {
    overflow: auto;
}

footer {
    margin-top: 1rem;
    display: flex;
    justify-content: space-between;
}
</style>