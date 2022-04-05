import { defineStore } from 'pinia';

export interface State {
  imgSrc?: string;
}

export const usePreviewImageStore = defineStore('previewImage', {
  state: (): State => ({ imgSrc: undefined }),
  getters: {
    getPreviewImage: (state: State): State['imgSrc'] => state.imgSrc,
  },
  actions: {
    setPreviewImage(imgSrc: State['imgSrc']) {
      this.imgSrc = imgSrc;
    },
  }
})
