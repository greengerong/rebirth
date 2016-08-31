import { Component, ViewEncapsulation, ViewContainerRef } from '@angular/core';
import { RebirthHttpProvider } from 'rebirth-http';
import { environment } from 'environments';
import { LoadService } from  './shared';

@Component({
  selector: 'app',
  pipes: [],
  providers: [LoadService],
  directives: [],
  encapsulation: ViewEncapsulation.None,
  styles: [
    require('normalize.css'),
    require('./app.scss'),
    require('codemirror/lib/codemirror.css'),
    require('codemirror/lib/codemirror.css'),
    require('codemirror/theme/base16-dark.css'),
    require('codemirror/theme/base16-light.css'),
    require('codemirror/theme/monokai.css'),
    require('codemirror/theme/seti.css'),
    require('codemirror/addon/search/matchesonscrollbar.css'),
    require('codemirror/addon/dialog/dialog.css'),
    require('codemirror/addon/display/fullscreen.css'),
    require('highlight.js/styles/github.css')
  ],
  template: '<router-outlet></router-outlet>'
})
export class AppComponent {

  constructor(private rebirthHttpProvider: RebirthHttpProvider, private viewContainer: ViewContainerRef,
              private loadService: LoadService) {

    loadService.defaultViewContainerRef = viewContainer;

    rebirthHttpProvider
      .baseUrl(environment.api.host)
      .json()
      .addInterceptor({
        request: request => {
          console.log('全局拦截器(request)', request);
        },
        response: (stream) => stream.map(response => {
          console.log('全局拦截器(response)', response);
          return response;
        })
      })
      .addInterceptor({
        request: () => {
          loadService.show();
        },
        response: (stream) => stream.do(() => null, () => loadService.hide(), () => loadService.hide())
      });
  }
}
