import {Component, ChangeDetectionStrategy, OnChanges, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'pager',
  styles: [require('./pager.scss')],
  template: require('./pager.html'),
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Pager implements OnChanges {
  @Input() total = 0;
  @Input() pageSize = 10;
  @Input() pageIndex = 1;
  @Output() pageChange = new EventEmitter();

  prev(): void {
    if (this.hasPrev()) {
      this.pageChange.emit(--this.pageIndex);
    }
  }

  next(): void {
    if (this.hasNext()) {
      this.pageChange.emit(++this.pageIndex);
    }
  }

  hasPrev(): boolean {
    return this.pageIndex > 1;
  }

  hasNext(): boolean {
    return this.pageIndex < this.totalPage();
  }

  totalPage(): number {
    return Math.ceil(this.total / this.pageSize);
  }

  ngOnChanges(): void {
    this.pageIndex = Math.max(Math.min(this.pageIndex, this.totalPage()), 1);
  }
}
