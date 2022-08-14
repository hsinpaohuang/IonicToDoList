<template>
  <ion-fab
    horizontal="end"
    vertical="bottom"
  >
    <ion-fab-button color="tertiary">
      <ion-icon :icon="add" />
    </ion-fab-button>
    <ion-fab-list side="top">
      <ion-fab-button @click="onCameraClick">
        <ion-icon :icon="cameraOutline" />
      </ion-fab-button>
      <ion-fab-button>
        <label for="upload-image">
          <ion-icon :icon="imageOutline" />
          <input
            id="upload-image"
            ref="uploadImage"
            type="file"
            accept="image/*"
            class="force-hidden"
            @change="onImageUpload"
          >
        </label>
      </ion-fab-button>
    </ion-fab-list>
  </ion-fab>
</template>

<script setup lang="ts">
import { IonFab, IonIcon, IonFabList, IonFabButton } from '@ionic/vue';
import { add, cameraOutline, imageOutline } from 'ionicons/icons';
import { useListStore } from '@src/store/list';
import { useCamera } from '@src/utils/useCamera';

const listStore = useListStore();
const onImageUpload = (e: Event) => {
  const files = (e.target as HTMLInputElement).files;
  if (files?.length) {
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.addEventListener('loadend', () => {
      listStore.uploadImage(reader.result as string);
    });
  }
};

const { takePhoto } = useCamera();
const onCameraClick = async () => {
  const photo = await takePhoto();
  listStore.uploadImage(photo);
};
</script>

<style scoped lang="scss">
ion-icon {
  font-size: 24px;
}
</style>
