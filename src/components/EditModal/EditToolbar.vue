<template>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-button
          shape="round"
          @click="onDismiss"
        >
          <ion-icon :icon="chevronBack" />
        </ion-button>
      </ion-buttons>
      <ion-buttons
        v-if="isEditMode"
        slot="end"
      >
        <ion-button
          shape="round"
          @click="onComplete"
        >
          <ion-icon :icon="checkbox" />
        </ion-button>
        <ion-button
          shape="round"
          @click="onArchive"
        >
          <ion-icon :icon="archive" />
        </ion-button>
        <ion-button
          shape="round"
          @click="onDelete"
        >
          <ion-icon :icon="trash" />
        </ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
</template>

<script setup lang="ts">
import { IonHeader, IonToolbar, IonButtons, IonButton, IonIcon } from '@ionic/vue';
import { chevronBack, checkbox, archive, trash } from 'ionicons/icons';
import { useRouter } from 'vue-router';
import { useListStore } from '@src/store/list';
import deleteAlert from '@src/utils/deleteAlert';
import { EditModalMode } from '@src/views/EditModal.vue';
import { ListItemType } from '@src/models/ListItem';

interface EditToolbarProps {
  mode: EditModalMode;
}

const { mode } = defineProps<EditToolbarProps>();
const isEditMode = mode === EditModalMode.Edit;

const listStore = useListStore();
const id = listStore.editing.id;

const router = useRouter();
const onDismiss = () => {
  router.go(-1);
};
const onComplete = () => {
  if (id) {
    listStore.toggleComplete(id);
  }
  router.push(`/${ListItemType.Completed}`);
};
const onArchive = () => {
  if (id) {
    listStore.toggleArchive(id);
    router.push(`/${ListItemType.Archived}`);
  }};
const onDelete = async () => {
  deleteAlert(() => {
    if (id) {
      listStore.toggleArchive(id);
    }
    router.go(-1);
  });
};
</script>

<style scoped lang="scss">
ion-toolbar {
  padding: 0 0.5em;
}
ion-header {
  margin-bottom: 1em;
}
</style>
