import { ArticleImage } from "../types";

export const findThumbnailImage = (images: ArticleImage[]) => {
  const thumbnailImage = images.find((image) => image.type === "Thumbnail 1:1");

  return thumbnailImage;
};
