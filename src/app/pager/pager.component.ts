import {Component, ChangeDetectionStrategy, OnChanges, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'pager',
  styles: [require('./pager.scss')],
  template: require('./pager.html'),
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Pager implements OnChanges {
  private _currentPage = 0;
  @Input() noOfPages = 0;
  @Input() page = 0;
  @Output() pageChange = new EventEmitter();

  prev(): void {
    if (this.hasPrev()) {
      this.pageChange.emit(--this._currentPage)
    }
  }

  next(): void {
    if (this.hasNext()) {
      this.pageChange.emit(++this._currentPage)
    }
  }

  hasPrev(): boolean { return this._currentPage > 0; }

  hasNext(): boolean { return this._currentPage < this.noOfPages - 1; }

  ngOnChanges(): void { this._currentPage = Math.max(Math.min(this.page, this.noOfPages - 1), 0) }
}
