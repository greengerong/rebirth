import { RouteReuseStrategy, DetachedRouteHandle, ActivatedRouteSnapshot } from '@angular/router';

export class RebirthRouterReuseStrategy implements RouteReuseStrategy {
  handlers: { [key: string]: DetachedRouteHandle } = {};

  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    console.log('RebirthRouterReuseStrategy:shouldDetach', route);
    return true;
  }

  store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
    console.log('RebirthRouterReuseStrategy:store', route, handle);
    this.handlers[route.routeConfig.path] = handle;
  }

  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    console.log('RebirthRouterReuseStrategy:shouldAttach', route);
    return !!route.routeConfig && !!this.handlers[route.routeConfig.path];
  }

  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
    console.log('RebirthRouterReuseStrategy:retrieve', route);
    return route.routeConfig ? this.handlers[route.routeConfig.path] : null;
  }

  shouldReuseRoute(future: ActivatedRouteSnapshot, current: ActivatedRouteSnapshot): boolean {
    console.log('RebirthRouterReuseStrategy:shouldReuseRoute', future, current);
    return future.routeConfig === current.routeConfig;
  }

}
