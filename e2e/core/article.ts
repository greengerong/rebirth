export interface Article {
  title: wdpromise.Promise<string>,
  author: wdpromise.Promise<string>,
  date: wdpromise.Promise<string>,
  tags: any,
}
