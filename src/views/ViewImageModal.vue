<template>
  <ion-modal
    :is-open="previewImage"
  >
    <swiper
      v-if="previewImage"
      :modules="[Zoom]"
      :autoplay="true"
      :zoom="true"
    >
      <swiper-slide>
        <div class="swiper-zoom-container">        
          <ion-img
            :src="readImg(previewImage || '')"
            class="swiper-zoom-target"
          />
        </div>
      </swiper-slide>
    </swiper>
    <ion-fab
      vertical="top"
      horizontal="start"
      edge="true"
    >
      <ion-fab-button @click="onClose">
        <ion-icon :icon="close" />
      </ion-fab-button>
    </ion-fab>
  </ion-modal>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { IonModal, IonFab, IonFabButton, IonIcon, IonImg } from '@ionic/vue';
import { close } from 'ionicons/icons';
import { Zoom } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/vue';
import '@ionic/vue/css/ionic-swiper.css';
import 'swiper/scss';
import 'swiper/scss/autoplay';
import 'swiper/css/zoom';
import { usePreviewImageStore } from '@/store/previewImage';
import { readImg } from '@/utils/readImg';

const previewImageStore = usePreviewImageStore();
const previewImage = computed(() => previewImageStore.getPreviewImage);
const onClose = () => { previewImageStore.setPreviewImage(undefined); }
</script>

<style scoped lang="scss">
ion-img {
  height: 100vh;
  width: 100vw;
}

ion-fab {
  top: 0;
  left: 0;
  ion-fab-button {
    --background: transparent;
    --box-shadow: none;
  }
}
</style>
