import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

export const useCamera = () => {
  const takePhoto = async (): Promise<string> => {
    const photo = await Camera.getPhoto({
      source: CameraSource.Camera,
      resultType: CameraResultType.Base64,
      quality: 70,
    });
    return photo.base64String as string;
  };

  return { takePhoto };
};
