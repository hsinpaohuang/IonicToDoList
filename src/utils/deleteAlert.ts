import { alertController } from "@ionic/vue";

export default async (deleteHandler: () => void) => {
  const alert = await alertController.create({
    message: 'Do you really want to delete this item?',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
      },
      {
        text: 'Delete',
        role: 'confirm',
        handler: deleteHandler,
      }
    ]
  });
  return alert.present();
};
