import { Http, Headers, Jsonp, URLSearchParams, Response, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable }     from 'rxjs/Observable';
import { QuestionModel } from './question.model';
import { Cacheable, StorageType } from 'rebirth-storage';
import { RebirthHttp, JSONP, Query } from 'rebirth-http';
import { environment } from '../../../environments/environment';

@Injectable()
export class QuestionService extends RebirthHttp {
  constructor(jsonp: Jsonp) {
    super({ jsonp });
  }

  @Cacheable({ pool: 'question' })
  getQuestions(): Observable<QuestionModel[]> {
    const day = new Date();
    day.setMonth(day.getMonth() - 1);
    return this.innerGetQuestions(day.toISOString())
      .map(res => res.json().data);
  }

  @JSONP(environment.question.url)
  private innerGetQuestions(@Query('since') since: string) {
    return null;
  }
}
