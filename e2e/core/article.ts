export interface Article {
  title: Promise<string>;
  author?: Promise<string>;
  date?: Promise<string>;
  tags?: any;
}
