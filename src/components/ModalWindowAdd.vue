<template>
  <ModalWindow>
    <div class="modal__header">
      <h3 class="modal__title">
        Новый клиент
      </h3>
      <span class="modal__id-title">
        ID: {{ newClientId }}
      </span>
      <button id="btn-cancel" class="btn-reset" @click="closeModal">
        <span class="close" id="close">
          <CloseModalSVG />
        </span>
      </button>
    </div>
    <form id="form" class="form form__modal" method="post" @submit.prevent="checkForm">
      <div class="form__inputs">
        <label class="form__label">
          <span class="label__input-title">
            Фамилия*
          </span>
          <input type="text" id="input-firstname" class="label__input" name="second-name"
            :class="{ 'error-border': errors.error.errorSecondName && newClient.secondName === '' }"
            v-model="newClient.secondName">
        </label>
        <label class="form__label">
          <span class="label__input-title">
            Имя*
          </span>
          <input type="text" id="input-secondname" class="label__input" name="first-name"
            :class="{ 'error-border': errors.error.errorFirstName && newClient.firstName === '' }"
            v-model="newClient.firstName">
        </label>
        <label class="form__label">
          <span class="label__input-title">
            Отчество
          </span>
          <input type="text" id="input-thirdname" class="label__input" name="third-name" v-model="newClient.thirdName">
        </label>
      </div>
    </form>
    <div id="form__add-contact" class="form__add-contact">
      <div class="add-contact__wrapper-contacts" v-show="newClient.addBlocks.length > 0"
        :class="{ 'add-contact__wrapper-contacts--active': newClient.addBlocks.length > 1 }">
        <ModalWindowAddBlock v-for="(block, i) in newClient.addBlocks" :key="i"
          v-model:length="newClient.addBlocks.length" v-model:select-value="block.selectValue"
          v-model:input-value="block.inputValue" />
      </div>

      <button id="add-contact__add-btn" class="add-contact__add-btn btn-reset"
        :disabled="newClient.addBlocks.length === 10"
        :class="{ 'add-contact__add-btn--disabled': newClient.addBlocks.length === 10 }" @click="pushAddBlock">
        <AddContactSVG />
        Добавить контакт
      </button>
    </div>

    <div class="errors-block--active" v-if="errorsBlockActive > 0">
      <p class="error-block" v-if="errors.error.errorSecondName">
        {{ errors.error.errorSecondName }}
      </p>

      <p class="error-block" v-if="errors.error.errorFirstName">
        {{ errors.error.errorFirstName }}
      </p>
    </div>

    <div class="form__wrapper-btn-save">
      <button id="btn-save" class="wrapper-btn-save__btn-save btn-reset" form="form" @click="checkForm">
        Сохранить
      </button>
    </div>
    <button id="btn-cancel-contact" class="btns__btn-cancel btn-reset" @click="closeModal">
      Отмена
    </button>
  </ModalWindow>
</template>

<script setup lang="ts">
import {
  reactive,
  computed,
  inject,
} from 'vue';
import { useClientsStore } from '@/stores/clients';

import idCreation from '@/helpers/idCreation';

import useCheckForm from '@/composables/useCheckForm';

import ModalWindow from './ModalWindow.vue';
import ModalWindowAddBlock from './ModalWindowAddBlock.vue';
import AddContactSVG from './SVGComponents/AddContactSVG.vue';
import CloseModalSVG from './SVGComponents/CloseModalSVG.vue';

import type { INewClient } from '@/models/ClientModel';
import type { ICallBoolean } from '@/models/CallFuncModels';
import type { IContacts, IErrors } from '@/models/ObjectModels';

type TNewClient = {
  addBlocks: IContacts[],
  firstName: string,
  secondName: string,
  thirdName: string,
}

const store = useClientsStore();

const props = defineProps<{
  clients: INewClient[],
}>();
const errors = reactive<IErrors>({
  error: {
    errorFirstName: '',
    errorSecondName: '',
  },
});
const newClient = reactive<TNewClient>({
  addBlocks: [],
  firstName: '',
  secondName: '',
  thirdName: '',
});

const closeModal = inject<ICallBoolean>('closeModal');

const newClientId = computed<number>(() => idCreation(props.clients));

const errorsBlockActive = computed<number>(() => {
  const keys = Object.keys(errors.error);

  return keys.length;
});

const add = (): void => {
  store.addClient(
    newClient.firstName,
    newClient.secondName,
    newClient.thirdName,
    newClient.addBlocks,
  );

  closeModal!();
};

const checkForm = (): void => {
  useCheckForm(
    newClient.firstName,
    newClient.secondName,
    errors,
    add,
  );
};

const pushAddBlock = (): void => {
  newClient.addBlocks.push({
    block: ModalWindowAddBlock,
    selectValue: 'phone',
    inputValue: '',
  });
};
</script>
