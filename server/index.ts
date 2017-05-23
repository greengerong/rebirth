import express = require('express');

import { ApplicationBuilderFromModule, StateTransition } from 'angular-ssr';

import { Injectable, enableProdMode } from '@angular/core';

import { AppModule } from '../src/app';
import { absoluteUri, configure, listen } from './http';
import { index } from './paths';
import { LoginService } from '../src/app/core/login/login.service';

enableProdMode();

@Injectable()
export class TransitionCurrentUser implements StateTransition<string> {
  constructor(private loginService: LoginService) {
  }

  transition(currentUser: string) {
    this.loginService.setupAuth(currentUser);
  }
}

export interface Variants {
  currentUser: string;
}

const builder = new ApplicationBuilderFromModule<Variants, AppModule>(AppModule, index);

builder.variants({
  currentUser: { // select a locale based on renderUri arguments
    transition: TransitionCurrentUser
  }
});

builder.preboot(true);

const application = builder.build();

const http = express();

configure(http);

http.get(/.*/, async (request, response) => {
  try {
    const options: Variants = { currentUser: JSON.parse(request.cookies['currentUser']) || {} };
    let uri = absoluteUri(request);
    console.log(`Render ${uri} from server side`);
    const snapshot = await application.renderUri(uri, options);

    response.send(snapshot.renderedDocument);
  }
  catch (exception) {
    console.error('Rendering exception', exception);

    response.send(builder.templateDocument()); // fall back on client document
  }
});

listen(http).then(port => console.log(`Load server on http://localhost:${port}`));
