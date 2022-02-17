<template>
  <div class="separator" :style="{ left: `${ left }px` }">
    <div 
      class="separator__button"
      :class="{ 
        'separator__button-limit': isMove && (left == maxOffsetX || left == minOffsetX),
        'separator__button-center': isMove && left == (minOffsetX + maxOffsetX)/2 - 3,
        'separator__button-active': isMove,
      }"
      @mousedown="startMove"
    />
  </div>
</template>

<script>
export default {
  name: 'BoxSeparator',

  props: {
    left: Number,
    maxOffsetX: Number,
    minOffsetX: {
      type: Number,
      default: 400,
    },
  },

  data: () => ({
    isMove: false,
  }),

  methods: {
    setLeft({ x }) {
      requestAnimationFrame(() => {
        const max = Math.min(x, this.maxOffsetX);
        const min = Math.max(this.minOffsetX, max);
        this.$emit('setOffsetX', min);
      })
    },

    startMove() {
      this.isMove = true;
      this.$emit('move', this.isMove);
      document.addEventListener('mousemove', this.setLeft);
      document.addEventListener('mouseup', this.stopMove);
    },

    stopMove() {
      this.isMove = false;
      this.$emit('move', this.isMove);
      document.removeEventListener('mousemove', this.setLeft);
      document.removeEventListener('mouseup', this.stopMove);
    },
  },
}
</script>

<style lang="scss" scoped>
.separator {
  position: fixed;
  top: 0;
  height: 100vh;
  width: 6px;
  background-color: #222;
  z-index: 100;
  &:hover {
    .separator__button {
      opacity: 1;
    }
  }
  &__button {
    opacity: .5;
    position: absolute;
    width: 12px;
    height: 50px;
    background-color: #333;
    top: calc(50vh - 25px);
    left: -3px;
    cursor: col-resize;
    &-active {
      background-color: yellowgreen
    }
    &-limit {
      background-color: crimson !important;
    }
    &-center {
      background-color: DarkTurquoise !important;
    }
  }
}
</style>