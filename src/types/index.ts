export type Article = {
  storyId: string;
  viewCount: number;
  publishedDate: string;
  story: ArticleStory;
};

export type ArticleStory = {
  headline: string;
  images: ArticleImage[];
  intro: string;
  section: string; // Add more explicit types
  url: string;
};

export type ArticleImage = {
  caption: string;
  size: string;
  src: string;
  type: string;
};
