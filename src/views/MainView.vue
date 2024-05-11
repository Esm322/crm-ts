<template>
  <main class="main offset">
    <section class="clients">
      <h1 class="hidden">skb.</h1>
      <div class="container">

        <h2 class="title">
          Клиенты
        </h2>

        <table class="table" id="table">

          <thead class="table__thead">
            <tr class="table__thead-tr">
              <th data-th="id" class="table__thead-tr-th table__thead-tr-th-sort-filter" @click="sortId">
                ID
                <DownArrowSVG v-if="dirId === 1 || dirId === 0" />
                <UpArrowSVG v-if="dirId === 2" />
              </th>
              <th data-th="name" class="table__thead-tr-th table__thead-tr-th-sort-filter" @click="sortFullName">
                Фамилия Имя Отчество
                <DownArrowSVG v-if="dirFullName === 0 || dirFullName === 1" style="margin-left: 3px;" />
                <UpArrowSVG v-if="dirFullName === 2" style="margin-left: 3px;" />
                <AlphabetSVG style="margin-left: 3px;" />
              </th>
              <th data-th="createDate" class="table__thead-tr-th table__thead-tr-th-sort-filter"
                @click="sortDateCreated">
                Дата и время создания
                <DownArrowSVG v-if="dirCreate === 0 || dirCreate === 1" />
                <UpArrowSVG v-if="dirCreate === 2" />
              </th>
              <th data-th="changesDate" class="table__thead-tr-th table__thead-tr-th-sort-filter"
                @click="sortDateEdited">
                Последние изменения
                <DownArrowSVG v-if="dirEdit === 0 || dirEdit === 1" />
                <UpArrowSVG v-if="dirEdit === 2" />
              </th>
              <th class="table__thead-tr-th">
                Контакты
              </th>
              <th class="table__thead-tr-th">
                Действия
              </th>
              <th class="table__thead-tr-th">
              </th>
            </tr>
          </thead>

          <ClientTableTbody :clients="useClients" />

        </table>

        <button class="add-client btn-reset" id="add" @click="showModalAdd">
          <AddSVG />
          Добавить клиента
        </button>

        <ModalWindowAdd v-if="isModalAddVisible" :clients="useClients" />

        <ModalWindowChanges v-if="isModalChangeVisible" :clients="useClients"
          :active-client-change="activeClientChange" />

        <ModalWindowDelete v-if="isModalDeleteVisible" :clients="useClients"
          :active-client-delete="activeClientDelete" />

      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import {
  ref,
  watch,
  provide,
  reactive,
} from 'vue';

import useClientsData from '@/composables/useClients';
import useFilteredClientsData from '@/composables/useFilteredClients';
import useSortId from '@/composables/useSortId';
import useSortFullName from '@/composables/useSortFullName';
import useSortDateCreated from '@/composables/useSortDateCreated';
import useSortDateEdited from '@/composables/useSortDateEdited';

import ModalWindowAdd from '@/components/ModalWindowAdd.vue';
import ModalWindowChanges from '@/components/ModalWindowChanges.vue';
import ModalWindowDelete from '@/components/ModalWindowDelete.vue';
import ClientTableTbody from '@/components/ClientTableTbody.vue';
import DownArrowSVG from '@/components/SVGComponents/DownArrowSVG.vue';
import UpArrowSVG from '@/components/SVGComponents/UpArrowSVG.vue';
import AlphabetSVG from '@/components/SVGComponents/AlphabetSVG.vue';
import AddSVG from '@/components/SVGComponents/AddSVG.vue';

import type { INewClient } from '@/models/ClientModel';

const activeClientChange = reactive<{ client: null | INewClient }>({
  client: null
});

const activeClientDelete = reactive<{ client: null | INewClient }>({
  client: null
});
const isModalAddVisible = ref(false);
const isModalChangeVisible = ref(false);
const isModalDeleteVisible = ref(false);
const dirId = ref(0);
const isDirId = ref(false);
const dirFullName = ref(0);
const isDirFullName = ref(false);
const dirCreate = ref(0);
const isDirCreate = ref(false);
const dirEdit = ref(0);
const isDirEdit = ref(false);

const { useFilteredClients } = useFilteredClientsData(
  dirId,
  isDirId,
  dirFullName,
  isDirFullName,
  dirCreate,
  isDirCreate,
  dirEdit,
  isDirEdit,
);

const { useClients } = useClientsData(
  useFilteredClients,
);

const sortId = (): void => useSortId(
  dirId,
  isDirId,
  dirFullName,
  isDirFullName,
  dirCreate,
  isDirCreate,
  dirEdit,
  isDirEdit,
);

const sortFullName = (): void => useSortFullName(
  dirId,
  isDirId,
  dirFullName,
  isDirFullName,
  dirCreate,
  isDirCreate,
  dirEdit,
  isDirEdit,
);

const sortDateCreated = (): void => useSortDateCreated(
  dirId,
  isDirId,
  dirFullName,
  isDirFullName,
  dirCreate,
  isDirCreate,
  dirEdit,
  isDirEdit,
);

const sortDateEdited = (): void => useSortDateEdited(
  dirId,
  isDirId,
  dirFullName,
  isDirFullName,
  dirCreate,
  isDirCreate,
  dirEdit,
  isDirEdit,
);

const showModalAdd = (): void => {
  isModalAddVisible.value = true;
};

const showModalChange = (value: INewClient): void => {
  isModalChangeVisible.value = true;
  activeClientChange.client = value;
};

const showModalDelete = (value: INewClient): void => {
  isModalDeleteVisible.value = true;
  activeClientDelete.client = value;
};

const closeModal = (): void => {
  isModalAddVisible.value = false;
  isModalChangeVisible.value = false;
  isModalDeleteVisible.value = false;
  activeClientChange.client = null;
  activeClientDelete.client = null;
};

watch(
  () => isModalAddVisible.value || isModalChangeVisible.value || isModalDeleteVisible.value,
  (val) => document.body.classList.toggle('no-overflow', val),
  { immediate: true },
);

provide('showModalChange', showModalChange);
provide('showModalDelete', showModalDelete);
provide('closeModal', closeModal);
</script>
