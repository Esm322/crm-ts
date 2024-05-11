<template>
  <ModalWindow>
    <div class="modal__header">
      <h3 class="modal__title" style="margin: 0 auto;margin-right: auto;">
        Удалить клиента
      </h3>
      <button class="btn-reset" @click="closeModal">
        <span class="close" id="close">
          <CloseModalSVG />
        </span>
      </button>
    </div>
    <p style="text-align: center;padding: 0 80px;margin: 0;margin-bottom: 10px;">
      Вы действительно хотите удалить данного клиента?
    </p>
    <p style="text-align: center;padding: 0 80px;margin: 0;margin-bottom: 25px;font-weight: 700;">
      {{ activeClientDelete.client!.fullName }}
    </p>
    <div class="form__wrapper-btn-save">
      <button id="btn-save-contact" class="wrapper-btn-save__btn-save btn-reset"
        @click="deleteActiveClient(client!.id)">
        Удалить
      </button>
    </div>
    <button id="btn-cancel-contact" class="btns__btn-cancel btn-reset" @click="closeModal">
      Отмена
    </button>
  </ModalWindow>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue';

import { useClientsStore } from '@/stores/clients';

import ModalWindow from './ModalWindow.vue';
import CloseModalSVG from './SVGComponents/CloseModalSVG.vue';

import type { INewClient } from '@/models/ClientModel';
import type { ICallNull } from '@/models/CallFuncModels';

const store = useClientsStore();

const props = defineProps<{
  activeClientDelete: { client: INewClient | null },
  clients: INewClient[],
}>();

const closeModal = inject<ICallNull>('closeModal');

const client = computed<INewClient | undefined>((): INewClient | undefined => {
  let client;

  if (props.activeClientDelete!) {
    client = props.clients.find((item) => props.activeClientDelete.client !== null ? item.id === props.activeClientDelete.client.id : null)
  }

  return client;
});

const deleteActiveClient = (id: number): void => {
  store.deleteClient(id);
  closeModal!();
};
</script>
