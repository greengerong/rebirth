import {
  Attribute,
  Directive,
  ElementRef,
  Input,
  Optional,
  Query,
  QueryList,
  Renderer,
  OnInit
} from '@angular/core';
import { isPresent } from '@angular/core/src/facade/lang';
import { Router, RouterLink } from '@angular/router-deprecated';

@Directive({
  selector: '[routerActive]'
})
export class RouterActiveDirective implements OnInit {
  routerActiveAttr: string = 'active';

  /* tslint:disable:no-attribute-parameter-decorator */
  constructor(
    private router: Router,
    private element: ElementRef,
    private renderer: Renderer,
    @Query(RouterLink) private routerLink: QueryList<RouterLink>,
    @Optional() @Attribute('router-active') routerActiveAttr?: string) {

    this.routerActiveAttr = routerActiveAttr || this.routerActiveAttr;

  }
  /* tslint:enable:no-attribute-parameter-decorator */

  ngOnInit() {
    this.routerLink.changes.subscribe(() => {
      if (this.routerLink.first) {
        this._updateClass();
        this._findRootRouter().subscribe(() => {
          this._updateClass();
        });
      }
    });
  }

  private _findRootRouter(): Router {
    let router: Router = this.router;
    while (isPresent(router.parent)) {
      router = router.parent;
    }
    return router;
  }

  private _updateClass() {
    let active = this.routerLink.first.isRouteActive;
    this.renderer.setElementClass(this.element.nativeElement, this.routerActiveAttr, active);
  }
}
