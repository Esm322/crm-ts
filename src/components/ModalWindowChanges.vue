<template>
  <ModalWindow>
    <div class="modal__header">
      <h3 class="modal__title">
        Изменить данные
      </h3>
      <span class="modal__id-title">
        ID: {{ client!.id }}
      </span>
      <button class="btn-reset" @click="close">
        <span class="close" id="close">
          <CloseModalSVG />
        </span>
      </button>
    </div>
    <form id="form" class="form form__modal">
      <div class="form__inputs">
        <label class="form__label">
          <span class="label__input-title">
            Фамилия*
          </span>
          <input type="text" id="input-firstname" class="label__input" name="second-name"
            :class="{ 'error-border': errors.error.errorSecondName && activeClient.secondName === '' }"
            v-model="activeClient.secondName">
        </label>
        <label class="form__label">
          <span class="label__input-title">
            Имя*
          </span>
          <input type="text" id="input-secondname" class="label__input" name="first-name"
            :class="{ 'error-border': errors.error.errorFirstName && activeClient.firstName === '' }"
            v-model="activeClient.firstName">
        </label>
        <label class="form__label">
          <span class="label__input-title">
            Отчество
          </span>
          <input type="text" id="input-thirdname" class="label__input" name="third-name"
            v-model="activeClient.thirdName">
        </label>
      </div>
    </form>
    <div id="form__add-contact" class="form__add-contact">
      <div class="add-contact__wrapper-contacts" v-show="copyContacts.length > 0"
        :class="{ 'add-contact__wrapper-contacts--active': copyContacts.length > 1 }">
        <ModalWindowAddBlock v-for="(contact, i) in activeClient.addBlocks" :key="i"
          :length="activeClient.addBlocks.length" v-model:select-value="contact.selectValue"
          v-model:input-value="contact.inputValue" />
      </div>

      <button class="add-contact__add-btn btn-reset" @click.prevent="pushAddBlock">
        <AddContactSVG />
        Добавить контакт
      </button>
    </div>

    <div class="errors-block">
      <p class="error-block" v-if="errors.error.errorSecondName">
        {{ errors.error.errorSecondName }}
      </p>

      <p class="error-block" v-if="errors.error.errorFirstName">
        {{ errors.error.errorFirstName }}
      </p>
    </div>

    <div class="form__wrapper-btn-save">
      <button id="btn-save-contact" class="wrapper-btn-save__btn-save btn-reset" form="form" @click.prevent="checkForm">
        Сохранить
      </button>
    </div>
    <button id="btn-cancel-contact" class="btns__btn-cancel btn-reset" style="width: 100px;"
      @click.prevent="deleteActiveClient(client!.id)">

      Удалить клиента
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

import cloneDeep from 'lodash.clonedeep';
import useCheckForm from '@/composables/useCheckForm';
import ModalWindow from './ModalWindow.vue';
import ModalWindowAddBlock from './ModalWindowAddBlock.vue';
import AddContactSVG from './SVGComponents/AddContactSVG.vue';
import CloseModalSVG from './SVGComponents/CloseModalSVG.vue';

import type { IContacts, IErrors } from '@/models/ObjectModels';
import type { INewClient } from '@/models/ClientModel';
import type { ICallNull } from '@/models/CallFuncModels';

type TNewClient = {
  addBlocks: IContacts[],
  firstName: string,
  secondName: string,
  thirdName: string,
}

const store = useClientsStore();

const props = defineProps<{
  activeClientChange: { client: INewClient | null },
  clients: INewClient[],
}>();

const client = computed<INewClient | undefined>((): INewClient | undefined => {
  let client;

  if (props.activeClientChange!) {
    client = props.clients.find((item) => props.activeClientChange.client !== null ? item.id === props.activeClientChange.client.id : null)
  }

  return client;
});

const errors = reactive<IErrors>({
  error: {
    errorFirstName: '',
    errorSecondName: '',
  },
});
const activeClient = reactive<TNewClient>({
  addBlocks: client.value ? client.value.contacts : [],
  firstName: client.value ? client.value.firstName : '',
  secondName: client.value ? client.value.secondName : '',
  thirdName: client.value ? client.value.thirdName : '',
});

const copyClient = cloneDeep<INewClient>(client.value);

const copyContacts = computed<IContacts[]>((): IContacts[] => client.value ? client.value.contacts : []);

const closeModal = inject<ICallNull>('closeModal');

const close = (): void => {
  store.initialContacts(client.value!.id, copyClient.contacts);
  closeModal!();
};

const change = (): void => {
  store.changeClient(
    client.value!.id,
    activeClient.firstName,
    activeClient.secondName,
    activeClient.thirdName,
    activeClient.addBlocks,
  );

  closeModal!();
};

const checkForm = (): void => {
  useCheckForm(
    activeClient.firstName,
    activeClient.secondName,
    errors,
    change,
  );
};

const deleteActiveClient = (id: number): void => {
  store.deleteClient(id);
  closeModal!();
};

const pushAddBlock = (): void => {
  activeClient.addBlocks.push({
    block: ModalWindowAddBlock,
    selectValue: 'phone',
    inputValue: '',
  });
};
</script>
