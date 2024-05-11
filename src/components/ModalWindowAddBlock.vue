<template>
  <div class="add-contact__contacts" :class="[{ 'add-contact__contacts--active': length > 1 },
  { 'add-contact__contacts--last-active': length === 10 }]">
    <label class="add-contact__label-select">
      <select class="add-contact__select" name="type-contact" v-model="reactiveSelectValue">
        <option value="phone">Телефон</option>
        <option value="additional-phone">Доп. тел.</option>
        <option value="Email">Email</option>
        <option value="Vk">Vk</option>
        <option value="Twitter">Twitter</option>
      </select>
    </label>
    <label class="add-contact__label-input"
      :class="{ 'add-contact__label-input--active-clear': reactiveInputValue.length > 0 }"
      v-if="reactiveSelectValue === 'phone' || reactiveSelectValue === 'additional-phone'">
      <input class="add-contact__input" type="tel" name="contact-data-input" placeholder="Телефон" v-maska
        data-maska="+7 (###) ###-##-##" v-model="reactiveInputValue">
    </label>
    <label class="add-contact__label-input"
      :class="{ 'add-contact__label-input--active-clear': reactiveInputValue.length > 0 }"
      v-else-if="reactiveSelectValue === 'Email'">
      <input class="add-contact__input" type="email" name="contact-data-input" placeholder="Email"
        v-model="reactiveInputValue">
    </label>
    <label class="add-contact__label-input"
      :class="{ 'add-contact__label-input--active-clear': reactiveInputValue.length > 0 }"
      v-else-if="reactiveSelectValue === 'Vk'">
      <input class="add-contact__input" type="text" name="contact-data-input" placeholder="Vkontakte"
        v-model="reactiveInputValue">
    </label>
    <label class="add-contact__label-input"
      :class="{ 'add-contact__label-input--active-clear': reactiveInputValue.length > 0 }"
      v-else-if="reactiveSelectValue === 'Twitter'">
      <input class="add-contact__input" type="text" name="contact-data-input" placeholder="Twitter"
        v-model="reactiveInputValue">
    </label>
    <button class="add-contact__clear-input btn-reset" @click="clearInput" v-show="reactiveInputValue.length > 0">
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { vMaska } from 'maska';

const props = defineProps<{
  length: number,
  selectValue: string,
  inputValue: string,
}>();

const emits = defineEmits(['update:selectValue', 'update:inputValue']);

const reactiveSelectValue = computed<string>({
  get: (): string => props.selectValue,
  set: (val): void => emits('update:selectValue', val),
});

const reactiveInputValue = computed<string>({
  get: (): string => props.inputValue,
  set: (val): void => emits('update:inputValue', val),
});

const clearInput = (): string => reactiveInputValue.value = '';
</script>
