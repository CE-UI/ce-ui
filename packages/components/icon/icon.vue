<template>
  <span
    class="ce-icon"
    :style="{ fontSize: size + 'px' }"
    @click="onClick($event)"
    @mouseenter="onMouseenter($event)"
    @mouseleave="onMouseleave($event)"
  >
    <svg v-if="symbol" class="ce-icon__symbol" aria-hidden="true">
      <use :xlink:href="`#ce-icon-${name}`" />
    </svg>
    <i
      v-else
      :class="['ce-icon__font', 'ce-icon-' + name]"
      :style="{ color }"
    ></i>
  </span>
</template>
<script lang="ts">
import Vue from 'vue'
import '@lib/utils/iconfont.js'
import Component from 'vue-class-component'
import { Emit, Prop } from 'vue-property-decorator'

@Component({
  name: 'Icon'
})
export default class Icon extends Vue {
  @Prop({ required: false, default: true, type: Boolean })
  private symbol?: boolean
  @Prop({ required: true, type: String }) private name!: string
  @Prop({ required: false, default: 16, type: Number }) private size?: number
  @Prop({ required: false, default: '#222', type: String })
  private color?: string

  @Emit('click')
  onClick(event: MouseEvent): Promise<MouseEvent> {
    if (event instanceof MouseEvent) event.preventDefault()
    return new Promise((reslove) => {
      reslove(event)
    })
  }
  @Emit('enter')
  onMouseenter(event: MouseEvent): Promise<MouseEvent> {
    if (event instanceof MouseEvent) event.preventDefault()
    return new Promise((reslove) => {
      reslove(event)
    })
  }
  @Emit('leave')
  onMouseleave(event: MouseEvent): Promise<MouseEvent> {
    if (event instanceof MouseEvent) event.preventDefault()
    return new Promise((reslove) => {
      reslove(event)
    })
  }
}
</script>
