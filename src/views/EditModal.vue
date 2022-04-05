<template>
  <ion-modal
    :is-open="shouldOpen"
    @did-dismiss="onEditModalDidDismiss"
  >
    <edit-toolbar :mode="mode" />
    <image-swiper />
    <ion-input
      class="title-input ion-padding"
      type="text"
      placeholder="Title"
      :value="title"
      @change="onInput($event, 'title')"
    />
    <ion-input
      class="content-input ion-padding"
      type="text"
      placeholder="Content"
      :value="content"
      @change="onInput($event, 'content')"
    />
    <fab-list />
  </ion-modal>
</template>

<script lang="ts">
export enum EditModalMode {
  Create = 'create',
  Edit= 'edit',
}
</script>

<script setup lang="ts">
import { computed } from 'vue';
import { IonModal, IonInput } from '@ionic/vue';
import { useRoute } from 'vue-router';
import { useListStore } from '@/store/list';
import EditToolbar from '@/components/EditModal/EditToolbar.vue';
import ImageSwiper from '@/components/EditModal/ImageSwiper.vue';
import FabList from '@/components/EditModal/FabList.vue';

const listStore = useListStore();
const id = computed(() => Number(route.params.id));

const route = useRoute();
const shouldOpen = computed(() => route.matched.some(r => {
  if (r.name === 'new') return true;
  else if (r.name === 'edit' && id.value && listStore.loadEditing(id.value)) {
    return true;
  }
  else return false;
}));
  
const mode = computed(() => String(route.name) as EditModalMode);

const title = computed(() => listStore.editing.title);
const content = computed(() => listStore.editing.content);

const onEditModalDidDismiss = () => { listStore.save(); }

const onInput = (event: Event, key: string) => { 
  const value = (event?.currentTarget as HTMLInputElement)?.value;
  listStore.editItem({ [key]: value });
};
</script>

<style scoped lang="scss">
.title-input {
  font-size: 32px;
}
.content-input {
  font-size: 20px;
}
</style>
