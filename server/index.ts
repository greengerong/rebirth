import express = require('express');

import { ApplicationBuilderFromModule } from 'angular-ssr';
import { enableProdMode } from '@angular/core';
import { AppModule } from '../src/app';
import { absoluteUri, configure, listen } from './http';
import { index } from './paths';
import { transformVariants, Variants, variants } from './variants';
import { RebirthStateReader } from './rebirth-state-reader.service';

enableProdMode();

const builder = new ApplicationBuilderFromModule<Variants, AppModule>(AppModule, index);
builder.variants(variants);
builder.stateReader(RebirthStateReader);
builder.preboot(true);
const application = builder.build();


const http = express();
configure(http);

http.get(/.*/, async (request, response) => {
  try {
    const options: Variants = transformVariants(request);
    let uri = absoluteUri(request);
    console.log(`Render ${uri} from server side with variants ${JSON.stringify(options)}`);
    const snapshot = await application.renderUri(uri, options);
    response.send(snapshot.renderedDocument);
  } catch (exception) {
    console.error('Rendering exception', exception);
    response.send(builder.templateDocument()); // fall back on client document
  }
});

listen(http).then(port => console.log(`Load server on http://localhost:${port}`));
