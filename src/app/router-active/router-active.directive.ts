import {
  Attribute,
  Directive,
  ElementRef,
  Input,
  Optional,
  Query,
  QueryList,
  Renderer
} from '@angular/core';
import { isPresent } from '@angular/core/src/facade/lang';
import { Instruction, Router, RouterLink } from '@angular/router-deprecated';

/**
 * RouterActive dynamically finds the first element with routerLink and toggles the active class
 *
 * ## Use
 *
 * ```
 * <li router-active="active"><a [routerLink]=" ['/Home'] ">Home</a></li>
 * <li [routerActive]=" activeStringValue "><a [routerLink]=" ['/Home'] ">Home</a></li>
 * ```
 */
@Directive({
  selector: '[router-active]'
})
export class RouterActive {
  routerActiveAttr: string = 'active';

  constructor(
    private router: Router,
    private element: ElementRef,
    private renderer: Renderer,
    @Query(RouterLink) private routerLink: QueryList<RouterLink>,
    @Optional() @Attribute('router-active') routerActiveAttr?: string) {

    this.routerActiveAttr = routerActiveAttr || this.routerActiveAttr;

  }

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
