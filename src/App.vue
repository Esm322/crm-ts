<template>
  <header class="header offset">
    <div class="container header__container">
      <a href="index.html" class="header__logo">
        <img src="/src/assets/img/logo-1024.svg" alt="CRM skb." class="logo-svg">
      </a>
      <form class="form header__form" id="header-form">
        <label class="form__label">
          <input class="form__input" id="header-input" type="text" placeholder="Поиск" v-model="searchValue">
        </label>
      </form>
    </div>
  </header>

  <RouterView :key="$route.fullPath" />

  <footer></footer>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { RouterView } from 'vue-router'
import { useClientsStore } from '@/stores/clients';


const searchValue = ref('');

onMounted(() => {
  const store = useClientsStore();

  window.addEventListener('input', () => {
    if (searchValue.value) {
      store.$patch({
        searchValueStore: searchValue.value,
      });
    } else {
      store.$patch({
        searchValueStore: '',
      });
    }
  });
});
</script>
