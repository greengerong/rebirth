import { Http, Headers, Jsonp, URLSearchParams, Response, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable }     from 'rxjs/Observable';
import { QuestionModel } from './question.model';
import { Cacheable, StorageType } from 'rebirth-common';
import config from 'config';

@Injectable()
export class QuestionService {
  constructor(private jsonp: Jsonp) {
  }

  @Cacheable({pool: 'question'})
  getQuestions(): Observable<QuestionModel[]> {
    const search = new URLSearchParams();
    let day = new Date();
    day.setMonth(day.getMonth() - 1);
    search.set('since', day.toISOString());
    return this.jsonp
      .get(config.question.url, {search})
      .map(res => res.json().data);
  }
}
