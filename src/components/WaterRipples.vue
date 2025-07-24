<template>
    <svg class="svg">
        <filter id="warp">
            <feTurbulence type="fractalNoise" baseFrequency="0.01" numOctaves="1" result="waves"></feTurbulence>
            <feColorMatrix in="waves" type="hueRotate">
                <animate attributeName="values" values="0;360" dur="2s" repeatCount="indefinite"></animate>
            </feColorMatrix>
            <feDisplacementMap xChannelSelector="R" yChannelSelector="G" scale="20" in="SourceGraphic">
            </feDisplacementMap>
        </filter>
    </svg>
    <div class="image">

    </div>


</template>
<style scoped>
.svg,
.image {
    pointer-events: none;
}

.svg {
    position: absolute;
}

.image {
    filter: url(#warp);
    background-image: url('/water.png');
    background-color: #146aff;
    background-size: 20%;
    position: absolute;
    inset: 0;
    z-index: -1;
}
</style>