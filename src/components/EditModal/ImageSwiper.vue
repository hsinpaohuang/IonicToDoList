<template>
  <swiper
    :modules="[Autoplay, Zoom]"
    :autoplay="true"
    :zoom="true"
  >
    <swiper-slide
      v-for="(img, index) in images"
      :key="index"
    >
      <div class="swiper-zoom-container">        
        <ion-img
          :src="readImg(img)"
          class="swiper-zoom-target"
          @click="viewImage(img)"
        />
      </div>
    </swiper-slide>
  </swiper>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Autoplay, Zoom } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { IonImg } from '@ionic/vue';
import '@ionic/vue/css/ionic-swiper.css';
import 'swiper/scss';
import 'swiper/scss/autoplay';
import 'swiper/css/zoom';
import { useListStore } from '@/store/list';
import { usePreviewImageStore } from '@/store/previewImage';
import { readImg } from '@/utils/readImg';

const listStore = useListStore();
const images = computed(() => listStore.editing.images);

const previewImageStore = usePreviewImageStore();
const viewImage = (imgSrc: string) => {
  previewImageStore.setPreviewImage(imgSrc);
};
</script>

<style scoped lang="scss">
ion-img {
  max-height: 30vh;
}
</style>
