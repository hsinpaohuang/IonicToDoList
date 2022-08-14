import { base64Header } from "@src/models/ListItem";

export const readImg = (img: string) => (base64Header.concat(img));
