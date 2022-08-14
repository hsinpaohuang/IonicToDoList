<template>
  <ion-app>
    <tab-bar />
    <ion-fab
      slot="fixed"
      vertical="bottom"
      horizontal="end"
    >
      <ion-fab-button class="new-button">
        <router-link to="/new">
          <ion-icon :icon="add" />
        </router-link>
      </ion-fab-button>
    </ion-fab>
    <view-image-modal />
  </ion-app>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { IonApp, IonFab, IonFabButton, IonIcon } from '@ionic/vue';
import { add } from 'ionicons/icons';
import ViewImageModal from '@src/views/ViewImageModal.vue';
import TabBar from '@src/components/TabBar.vue';
import { useListStore } from '@src/store/list';

const listStore = useListStore();
listStore.initialize();

onMounted(() => { console.log('Hello from onMounted') });
</script>

<style lang="scss">
ion-fab {
  margin-bottom: 4em;
}

.force-hidden {
  visibility: hidden;
  opacity: 0;
  position: fixed;
  z-index: -999;
  top: -1px;
  left: -1px;
  width: 0;
  height: 0;
}

ion-fab-button {
  font-size: 24px;
  a {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    ion-icon {
      color: white;
    }
  }
}

ion-input {
  color: var(--ion-color-dark) !important;
}
</style>
