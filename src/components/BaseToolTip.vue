<template>
  <span class="tooltip">
    <span class="tooltip-maincontent">
      <PhoneSVG v-if="props.selectValue === 'phone' || props.selectValue === 'additional-phone'" />
      <VkSVG v-else-if="props.selectValue === 'Vk'" />
      <EmailSVG v-else-if="props.selectValue === 'Email'" />
      <SocialMediaSVG v-else-if="props.selectValue === 'Twitter'" />
    </span>
    <span class="popup">
      <span style="font-weight:400;font-size:12px;pointer-events:none;">
        {{ (props.selectValue === 'phone' || props.selectValue === 'additional-phone')
          ? 'Телефон' : props.selectValue }}:
      </span>
      <span style="color:#B89EFF;font-weight:700;font-size:12px;padding-left:5px;">
        {{ inputValue }}
      </span>
    </span>
  </span>
</template>

<script setup lang="ts">
import PhoneSVG from './SVGComponents/PhoneSVG.vue';
import EmailSVG from './SVGComponents/EmailSVG.vue';
import VkSVG from './SVGComponents/VkSVG.vue';
import SocialMediaSVG from './SVGComponents/SocialMediaSVG.vue';

const props = defineProps<{
  selectValue: string,
  inputValue: string,
}>();
</script>

<style>
.tooltip {
  position: relative;
  display: inline-block;
  width: 16px;
  height: 16px;
}

.popup {
  display: flex;
  align-items: center;
  position: absolute;
  padding: 7px 18px;
  min-width: 200px;
  min-height: 37px;
  visibility: hidden;
  background-color: #111111;
  color: #fff;
  transition: visibility .1s ease-in-out;
  transform: translate(-47%, -180%);
}

.tooltip-maincontent {
  display: inline-block;
  width: 16px;
  height: 16px;
}

.tooltip-maincontent:hover+.popup {
  visibility: visible;
}

.tooltip .popup::after {
  content: " ";
  position: absolute;
  top: 98%;
  left: 50%;
  margin-left: -5px;
  border-width: 7px;
  border-style: solid;
  border-color: #111111 transparent transparent transparent;
}
</style>
