<template>
  <tbody class="table__tbody" id="client-list">
    <TransitionGroup @enter="onEnter" @leave="onLeave">
      <ClientItem v-for="client in props.clients" :key="client.id" :id="client.id" :full-name=client.fullName
        :date="client.newdCreateDate" :edit="client.newEditDate" :contacts="client.contacts" :client="client" />
    </TransitionGroup>
  </tbody>
</template>

<script setup lang="ts">
import gsap from 'gsap';
import ClientItem from './ClientItem.vue';
import type { INewClient } from '@/models/ClientModel';

const props = defineProps<{
  clients: INewClient[],
}>();

const onEnter = (el: any, done: any) => {
  gsap.from(el, {
    duration: 0.3,
    x: -50,
    opacity: 0,
    delay: 0.2,
    onComplete: done,
  });
};

const onLeave = (el: any, done: any) => {
  gsap.to(el, {
    duration: 0.3,
    x: 50,
    opacity: 0,
    delay: 0.2,
    onComplete: done,
  });
};
</script>
