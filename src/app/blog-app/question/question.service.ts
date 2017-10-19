import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { QuestionModel } from './question.model';
import { Cacheable } from 'rebirth-storage';
import { RebirthHttp, JSONP, Query } from 'rebirth-http';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class QuestionService extends RebirthHttp {
  constructor(http: HttpClient) {
    super(http);
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
