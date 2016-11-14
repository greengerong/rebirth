import { Injectable, ComponentRef, ViewContainerRef, Injector, ComponentFactoryResolver } from '@angular/core';
import { LoadingComponent } from './loading.component';

@Injectable()
export class LoadingService {
  public defaultViewContainerRef: ViewContainerRef;
  private cmpRef: ComponentRef<LoadingComponent>;
  private loaded: boolean;

  constructor(private componentFactoryResolver: ComponentFactoryResolver, private injector: Injector) {

  }

  show(viewContainer?: ViewContainerRef): void {
    viewContainer = viewContainer || this.defaultViewContainerRef;
    if (!this.loaded) {
      this.loaded = true;
      let componentFactory = this.componentFactoryResolver.resolveComponentFactory(LoadingComponent);
      this.cmpRef = viewContainer.createComponent(componentFactory, viewContainer.length, this.injector);
      this.cmpRef.instance.show();
    }
  }

  hide(): void {
    this.loaded = false;
    this.cmpRef.destroy();
  }

}
