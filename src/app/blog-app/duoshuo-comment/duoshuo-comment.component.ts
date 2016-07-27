import { Component, ChangeDetectionStrategy, Input, OnInit, ElementRef, Renderer } from '@angular/core';
import { RebirthWindow } from 'rebirth-common';
import { Article } from 'common';

@Component({
  selector: 'duoshuo-comment',
  template: require('./duoshuo-comment.html'),
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DuoShuoCommentComponent implements OnInit {
  @Input() articleItem: Article;
  private duoShuoUrl: string;

  constructor(private elmRef: ElementRef, private renderer: Renderer, private rebirthWindow: RebirthWindow) {
    let protocol = this.rebirthWindow.getOwnerDocument(this.elmRef).location.protocol === 'https:' ? 'https:' : 'http:';
    this.duoShuoUrl = `${protocol}//static.duoshuo.com/embed.js`;
    this.rebirthWindow.getGlobalObject().duoshuoQuery = { short_name: "greengerong" };
  }

  ngOnInit() {
    let duoshuoElm = this.elmRef.nativeElement.querySelector('.ds-thread');

    this.rebirthWindow.createScript(`${this.duoShuoUrl}?rn=${Math.random()}`,
      this.renderer, this.elmRef, () => {
        this.rebirthWindow.getGlobalObject().DUOSHUO.EmbedThread(duoshuoElm);
      });
  }
}
