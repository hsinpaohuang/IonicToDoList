<template>
  <transition-group :name="transitionName">
    <ion-card 
      v-for="item in list"
      :key="item.id"
    >
      <ion-row class="ion-align-items-center">
        <ion-col size="1">
          <ion-checkbox
            :checked="item.completedAt"
            color="success"
            @ion-change="onCheck(item.id)"
          />
        </ion-col>
        <ion-col @click="onEditItem(item.id)">
          <ion-card-header>
            <ion-card-title>
              {{ item.title }}
            </ion-card-title>
          </ion-card-header>
          <ion-card-content>
            {{ item.content }}
          </ion-card-content>
        </ion-col>
        <ion-col
          size="2"
          class="action-buttons"
        >
          <ion-button
            expand="full"
            size="large"
            fill="clear"
            @click="onArchive(item.id)"
          >
            <ion-icon
              :icon="toggleArchiveButtonIcon(item.type)"
              color="warning"
            />
          </ion-button>
          <ion-button
            expand="full"
            size="large"
            fill="clear"
            @click="onDelete(item.id)"
          >
            <ion-icon
              :icon="trash"
              color="danger"
            />
          </ion-button>
        </ion-col>
      </ion-row>
    </ion-card>
  </transition-group>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonRow, IonCol, IonCheckbox, IonButton, IonIcon } from '@ionic/vue';
import { archive, returnUpBack, trash } from 'ionicons/icons';
import { ListItem, ListItemType } from '@/models/ListItem';
import { useListStore } from '@/store/list';
import deleteAlert from '@/utils/deleteAlert';
import slideDirection, { SlideDirection } from '@/utils/getSlideDirection';

const pageType = useRoute().params.type as ListItemType;

const listStore = useListStore();
const list = computed(() => listStore.getList(pageType));

const transitionName = ref<SlideDirection | 'delete'>('delete');

const router = useRouter();
const onEditItem = (id: number) => {
  router.push({ name: 'edit', params: { id } });
};

const toggleArchiveButtonIcon = (type: ListItemType) =>
  type === ListItemType.Archived
    ? returnUpBack
    : archive;

const onCheck = (id: ListItem['id']) => {
  const result = listStore.toggleComplete(id);
  transitionName.value = slideDirection(result);
};
const onArchive = (id: number) => {
  const result = listStore.toggleArchive(id);
  transitionName.value = slideDirection(result);
};
const onDelete = async (id: number) => {
  deleteAlert(async () => {
    listStore.delete(id);
    transitionName.value = 'delete';
  });
};
</script>

<style scoped lang="scss">
ion-checkbox {
  margin-left: 0.75em;
}

.action-buttons {
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 0;
  ion-button {
    margin: 0;
  }
}

.slide-right-leave-active,
.slide-left-leave-active {
  transition: left 0.15s ease-in;
}
.slide-right-leave-from,
.slide-left-leave-from {
  left: 0;
}
.slide-right-leave-to {
  left: 100%;
}
.slide-left-leave-to {
  left: -100%;
}

.delete-leave-active {
  transition: opacity 0.25s ease-out;
}
.delete-leave-from {
  opacity: 1;
}
.delete-leave-to {
  opacity: 0;
}
</style>
