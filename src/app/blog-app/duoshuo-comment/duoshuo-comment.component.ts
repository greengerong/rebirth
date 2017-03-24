import { Component, ChangeDetectionStrategy, Input, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { Article, RebirthWindow } from '../../core';

@Component({
  selector: 'duoshuo-comment',
  templateUrl: './duoshuo-comment.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DuoShuoCommentComponent implements OnInit {
  @Input() articleItem: Article;
  private duoShuoUrl: string;

  constructor(private elmRef: ElementRef, private renderer: Renderer2, private rebirthWindow: RebirthWindow) {
    const protocol = this.rebirthWindow.getOwnerDocument(this.elmRef).location.protocol === 'https:' ? 'https:' : 'http:';
    this.duoShuoUrl = `${protocol}//static.duoshuo.com/embed.js`;
    this.rebirthWindow.getGlobalObject().duoshuoQuery = { short_name: 'greengerong' };
  }

  ngOnInit() {
    const duoshuoElm = this.elmRef.nativeElement.querySelector('.ds-thread');

    this.rebirthWindow.createScript(`${this.duoShuoUrl}?rn=${Math.random()}`,
      this.renderer, this.elmRef, () => {
        this.rebirthWindow.getGlobalObject().DUOSHUO.EmbedThread(duoshuoElm);
      });
  }
}
