<template>
  <tr id="client-tr" class="table__tbody-tr">
    <td class="table__tbody-tr-td id">
      {{ props.id }}
    </td>
    <td class="table__tbody-tr-td full-name">
      {{ props.fullName }}
    </td>
    <td class="table__tbody-tr-td date">
      {{ props.date.slice(0, 10) }}
      <span class="time">
        {{ props.date.slice(11, 17) }}
      </span>
    </td>
    <td class="table__tbody-tr-td date-edit">
      {{ props.edit.slice(0, 10) }}
      <span class="time">
        {{ props.edit.slice(11, 17) }}
      </span>
    </td>
    <td class="table__tbody-tr-td contacts">
      <div class="table__tbody-wrapper-contacts">
        <BaseToolTip v-for="contact in props.contacts" :key="contact.selectValue" :select-value="contact.selectValue"
          :input-value="contact.inputValue" />
      </div>
    </td>
    <td class="table__tbody-tr-td edit">
      <button id="btn-change" class="btn-reset" @click="showModalChange!(props.client)">
        <ChangeSVG />
        Изменить
      </button>
    </td>
    <td class="table__tbody-tr-td delete">
      <button id="btn-delete" class="btn-reset" @click="showModalDelete!(props.client)">
        <DeleteSVG />
        Удалить
      </button>
    </td>
  </tr>
</template>

<script setup lang="ts">
import { inject } from 'vue';

import BaseToolTip from './BaseToolTip.vue';
import DeleteSVG from './SVGComponents/DeleteSVG.vue';
import ChangeSVG from './SVGComponents/ChangeSVG.vue';

import type { IContacts } from '@/models/ObjectModels';
import type { ICallClient } from '@/models/CallFuncModels';
import type { INewClient } from '@/models/ClientModel';

const showModalChange = inject<ICallClient>('showModalChange');
const showModalDelete = inject<ICallClient>('showModalDelete');

const props = defineProps<{
  id: number,
  fullName: string,
  date: string,
  edit: string,
  contacts: IContacts[],
  client: INewClient,
}>();
</script>
