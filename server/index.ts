import express = require('express');

import { ApplicationBuilderFromModule, StateTransition } from 'angular-ssr';

import { Injectable, enableProdMode } from '@angular/core';

import { AppModule } from '../src/app';
import { absoluteUri, configure, listen } from './http';
import { index } from './paths';

enableProdMode();

// @Injectable()
// export class TransitionLocale implements StateTransition<string> {
//   constructor(private service: LocaleService) {
//   }
//
//   transition(locale: string) {
//     this.service.locale(locale);
//   }
// }

export interface Variants {
  locale: string;
}

const builder = new ApplicationBuilderFromModule<Variants, AppModule>(AppModule, index);

// builder.variants({
//   locale: { // select a locale based on renderUri arguments
//     transition: TransitionLocale
//   }
// });

builder.preboot(true);

const application = builder.build();

const http = express();

configure(http);

http.get(/.*/, async (request, response) => {
  try {
    // const options: Variants = { locale: request.cookies['locale'] || 'en-US' };

    let uri = absoluteUri(request);
    console.log(`Render ${uri} from server side`);
    const snapshot = await application.renderUri(uri);

    response.send(snapshot.renderedDocument);
  }
  catch (exception) {
    console.error('Rendering exception', exception);

    response.send(builder.templateDocument()); // fall back on client document
  }
});

listen(http).then(port => console.log(`Load server on http://localhost:${port}`));
