type Image = {
  ns: number;
  title: string;
};

type Page = {
  pageid: number;
  ns: number;
  title: string;
  images: Image[];
};

type Pages = {
  [key: string]: Page;
};

type Query = {
  pages: Pages;
};

type Continue = {
  imcontinue: string;
  continue: string;
};

type ImageFromWikipedia = {
  continue: Continue;
  query: Query;
};

export {ImageFromWikipedia};
