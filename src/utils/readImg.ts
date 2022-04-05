import { base64Header } from "@/models/ListItem";

export const readImg = (img: string) => (base64Header.concat(img));
