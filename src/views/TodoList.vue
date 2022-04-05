<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ type }}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <preview-cards />
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import PreviewCards from '@/components/TodoList/PreviewCards.vue';
import { ListItemType } from '@/models/ListItem';

const router = useRouter();
const type = useRoute().params.type as ListItemType;
if (!Object.values(ListItemType).includes(type)) {
  router.replace('/');
}
</script>
