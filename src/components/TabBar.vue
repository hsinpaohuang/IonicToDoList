<template>
  <ion-tabs>
    <ion-router-outlet />
    <ion-tab-bar slot="bottom">
      <ion-tab-button
        tab="todo"
        href="/todo"
      >
        <ion-icon :icon="clipboard" />
        <ion-label>To Do</ion-label>
      </ion-tab-button>
        
      <ion-tab-button
        tab="completed"
        href="/completed"
      >
        <ion-icon :icon="checkbox" />
        <ion-label>Completed</ion-label>
      </ion-tab-button>
      
      <ion-tab-button
        tab="archived"
        href="/archived"
      >
        <ion-icon :icon="archive" />
        <ion-label>Archived</ion-label>
      </ion-tab-button>
    </ion-tab-bar>
  </ion-tabs>
</template>

<script setup lang="ts">
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonRouterOutlet } from '@ionic/vue';
import { clipboard, checkbox, archive } from 'ionicons/icons';
</script>
