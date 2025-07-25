<script setup lang="ts">
import AmmoDisplay from './components/AmmoDisplay.vue';
import SKButton from './components/SKButton.vue';
import TargetDisplay from './components/TargetDisplay.vue';
import GameOverModal from './components/GameOverModal.vue';

import { computed, reactive, ref } from 'vue';
import WaterRipples from './components/WaterRipples.vue';

import sploosh from '/sploosh.wav';
import kaboom from '/kaboom.wav';
import SettingsConfig from './components/SettingsConfig.vue';

interface Config {
  shake: boolean;
  vibrate: boolean;
  animate: boolean;
  sound: boolean
}

const splooshAudio = new Audio(sploosh);
const kaboomAudio = new Audio(kaboom);

const config = reactive<Config>({
  shake: true,
  vibrate: true,
  animate: true,
  sound: true
})
const winDialog = ref<InstanceType<typeof GameOverModal>>();
const loseDialog = ref<InstanceType<typeof GameOverModal>>();
let highscore: number = Number(localStorage.getItem('highscore')) ?? 0;
const newhighscore = ref<boolean>(false);
interface Target {
  [key: string]: number
}
interface Display {
  [key: string]: string
}
const shake = ref<boolean>(false);
const round = ref(0);
const boardSize = 8;
const defaultAmmo = 24;
const targets: Target = reactive({
  "squid1": 2,
  "squid2": 3,
  "squid3": 4
})
const displays: Display = reactive({
  "squid1": '',
  "squid2": '',
  "squid3": ''
})
const ammo = ref<number>(0)
const myReactiveMap = ref(new Map());
const gameover = ref<boolean>(true);

const displayTargets = computed(() => {
  return Object.entries(targets).map(([key, value]) => {
    return {
      name: key,
      length: value
    }
  })
})

const left = computed(() => {
  const initialValue = 0;
  const sumWithInitial = Object.values(targets).reduce(
    (accumulator: number, currentValue: number) => accumulator + currentValue,
    initialValue,
  );
  return sumWithInitial
})

function initGame() {
  highscore = Number(localStorage.getItem('highscore')) ?? 0;
  newhighscore.value = false;
  gameover.value = false;
  round.value = round.value + 1;
  targets.squid1 = 2;
  targets.squid2 = 3;
  targets.squid3 = 4;
  displays.squid1 = '';
  displays.squid2 = '';
  displays.squid3 = '';

  ammo.value = defaultAmmo;
  myReactiveMap.value = new Map();

  placePieces()

}

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

function canFit(CELLS: string[]) {
  for (const CELL of CELLS) {
    if (myReactiveMap.value.has(CELL)) {
      return false
    }
  }
  return true;
}

function setPiece(name: string, cells: string[]) {

  let rowStart = 0;
  let columnStart = 0;
  let rowEnd = 0;
  let columnEnd = 0;
  let orientation = 'h';
  if (cells[0].charAt(0) === cells[1].charAt(0)) {
    orientation = 'v';
  }
  const starts = cells[0].split('').reverse();
  rowStart = Number(starts[0]) + 1;
  columnStart = Number(starts[1]) + 1;
  rowEnd = orientation === 'v' ? rowStart + cells.length : rowStart;
  columnEnd = orientation === 'h' ? columnStart + cells.length : columnStart;
  const gridArea = `${rowStart} / ${columnStart} / ${rowEnd} / ${columnEnd}`;
  displays[name] = gridArea;


  for (const CELL of cells) {
    myReactiveMap.value.set(CELL, name)
  }
}

function placePiece(name: string, length: number) {
  const ORIENTATION = pickOrientation();

  let XLIMIT = boardSize;
  let YLIMIT = boardSize;
  if (ORIENTATION === 'h') {
    XLIMIT = boardSize - length;
  } else {
    YLIMIT = boardSize - length;
  }

  const XPOSIITON = getRandomInt(XLIMIT);
  const YPOSIITON = getRandomInt(YLIMIT);

  const CELLS: string[] = [];
  for (let i = 0; i < length; i++) {
    let XKEY = XPOSIITON;
    let YKEY = YPOSIITON;
    if (ORIENTATION === 'h') {
      XKEY += i;
    } else {
      YKEY += i
    }
    const XYKEY: string = XKEY + '' + YKEY;
    CELLS.push(XYKEY)
  }


  if (canFit(CELLS)) {
    setPiece(name, CELLS)
  } else {
    placePiece(name, length)
  }
}

function placePieces() {
  const pieces = Object.keys(targets);
  for (const piece of pieces) {
    placePiece(piece, targets[piece])
  }
}

function pickOrientation() {
  const result = Math.random();
  if (result < 0.5) {
    return "h";
  } else {
    return "v";
  }
}

function hit(name: string) {
  if (kaboomAudio && config.sound) {
    kaboomAudio.play();
  }
  if (config.vibrate) {
    navigator.vibrate(200);
  }
  if (config.shake) {
    shake.value = true;
  }
  setTimeout(() => {
    shake.value = false;
    ammo.value = ammo.value - 1;
    targets[name] = targets[name] - 1;
    if (left.value <= 0) {
      gameEnd('win');
    }
  }, 300);
}

function miss() {
  if (splooshAudio && config.sound) {
    splooshAudio.play();
  }
  ammo.value = ammo.value - 1;
  if (ammo.value <= 0) {
    // YOU LOSE
    gameEnd('lose')
  }
}

function gameEnd(result: 'win' | 'lose') {
  showSquids();
  if (result === 'win') {
    if (ammo.value > Number(highscore)) {
      newhighscore.value = true;
      localStorage.setItem('highscore', ammo.value.toString());
    }
    winDialog.value?.show();
  } else {
    loseDialog.value?.show();
  }
}

function updateConfig(settings: Config) {
  config.shake = settings.shake;
  config.vibrate = settings.vibrate;
  config.animate = settings.animate;
  config.sound = settings.sound;
  localStorage.setItem('config', JSON.stringify(config));
}

function loadConfig() {
  const STRINGCONFIG = localStorage.getItem('config');
  if (STRINGCONFIG) {
    const PARSEDCONFIG: Config = JSON.parse(STRINGCONFIG);
    config.shake = PARSEDCONFIG.shake;
    config.vibrate = PARSEDCONFIG.vibrate;
    config.animate = PARSEDCONFIG.animate;
    config.sound = PARSEDCONFIG.sound;
  }
}

initGame()

function showSquids() {
  gameover.value = true;
}
</script>

<template>
  <div id="game" :class="{ 'kaboom': shake }">
    <div id="ammo">
      <AmmoDisplay :total="defaultAmmo" :remaining="ammo" />
    </div>
    <div id="container" style="position: relative;">
      <div class="board" :class="{ 'gameover': gameover }">
        <template v-for="y in boardSize">
          <template v-for="x in boardSize">
            <SKButton :map="myReactiveMap" :x="x" :y="y" :round="round" @kaboom="hit" @sploosh="miss" />
          </template>
        </template>
      </div>
      <div class="board" id="squids" v-if="gameover">
        <div id="squid1" :style="{ 'grid-area': displays.squid1 }"></div>
        <div id="squid2" :style="{ 'grid-area': displays.squid2 }"></div>
        <div id="squid3" :style="{ 'grid-area': displays.squid3 }"></div>
      </div>
      <WaterRipples :animate="config.animate" />
    </div>
    <div id="sq">
      <TargetDisplay :targets="displayTargets" />
      <p v-if="highscore">High Score: {{ highscore }}</p>
      <SettingsConfig :settings="config" @save="updateConfig" />
    </div>
  </div>
  <GameOverModal ref="winDialog" :confirm-text="'new game'" @confirm="initGame()" @cancel="initGame()">
    <h1 style="text-align: center;">You Win!</h1>
    <p v-if="newhighscore">New High Score: {{ ammo }}</p>
    <p v-if="ammo === 15">PERFECT!</p>
  </GameOverModal>
  <GameOverModal ref="loseDialog" :confirm-text="'new game'" @confirm="initGame()" @cancel="initGame()">
    <h1 style="text-align: center;">You Lose!</h1>
  </GameOverModal>
</template>

<style scoped>
#game {
  display: grid;
  grid-template-columns: 150px auto 75px;
}

@media (orientation: portrait) {
  #game {
    display: block;
  }
}

@media (orientation: landscape) {

  .board,
  #container {
    max-height: calc(100dvh - calc(var(--_border)*2));
  }
}

#container {
  --_border: 8px;
  display: grid;
  aspect-ratio: 1;
  margin: var(--_border)
}

#container::after {
  content: "";
  display: block;
  position: absolute;
  inset: calc(var(--_border) * -1);
  border: calc(var(--_border) * 2) solid brown;
  z-index: -1;
}

#squids {
  pointer-events: none;
  grid-template-rows: repeat(8, minmax(0, 1fr));
  z-index: -1;
}

.board {
  display: grid;
  grid-template-columns: repeat(8, minmax(0, 1fr));
  grid-area: 1 / 1;
  aspect-ratio: 1;
}

.board.gameover {
  pointer-events: none;
}

#squid1,
#squid2,
#squid3 {
  /*background-image: url('/gridsquid.png'); */
  background-size: cover;
  position: relative;
}

/*
#squid1::before,
#squid2::before,
#squid3::before {
  content: "";
  background-image: url('/gridsquid.png');
  inset: 0;
  position: absolute;
  background-size: contain;
}

#squid2::before {
  transform: rotateX(90deg)
}
*/

#squid1 {
  background-color: green;
}

#squid2 {
  background-color: yellow;
}

#squid3 {
  background-color: red;
}


#game.kaboom {
  animation: tilt-n-move-shaking 0.1s linear;
  animation-iteration-count: 2;
}

@keyframes tilt-n-move-shaking {
  0% {
    transform: translate(0, 0) rotate(0deg);
  }

  25% {
    transform: translate(5px, 5px) rotate(5deg);
  }

  50% {
    transform: translate(0, 0) rotate(0eg);
  }

  75% {
    transform: translate(-5px, 5px) rotate(-5deg);
  }

  100% {
    transform: translate(0, 0) rotate(0deg);
  }
}
</style>
