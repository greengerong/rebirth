import {
  Injectable,
  ComponentRef,
  ViewContainerRef,
  Injector,
  Compiler, NgModuleFactory
} from '@angular/core';
import { LoadingModule } from './loading.module';
import { LoadingComponent } from './loading.component';

@Injectable()
export class LoadService {
  public defaultViewContainerRef: ViewContainerRef;
  private cmpRef: ComponentRef<LoadingComponent>;
  private loaded: boolean;

  constructor(private compiler: Compiler, private injector: Injector) {

  }

  show(viewContainer?: ViewContainerRef): void {
    viewContainer = viewContainer || this.defaultViewContainerRef;
    if (!this.loaded) {
      this.loaded = true;
      this.compiler.compileModuleAsync(LoadingModule)
        .then((factory: NgModuleFactory<LoadingModule>) => {
          let componentFactory = factory.create(this.injector)
            .componentFactoryResolver
            .resolveComponentFactory(LoadingComponent);

          return this.cmpRef = viewContainer.createComponent(componentFactory, 0, this.injector);
        })
        .then((cmpRef: ComponentRef<LoadingComponent>) => {
          viewContainer.element.nativeElement.appendChild(cmpRef.location.nativeElement);
          cmpRef.instance.show();
        });
    }
  }

  hide(): void {
    this.loaded = false;
    this.cmpRef.destroy();
  }

}
