import { Http, Headers, Jsonp, URLSearchParams, Response, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable }     from 'rxjs/Observable';
import { QuestionModel} from './question.model';

@Injectable()
export class QuestionService {
  private static GITHUB_ISSUES_API_URL = 'https://api.github.com/repos/greengerong/rebirth-question/issues?callback=JSONP_CALLBACK&access_token=33de78a8fa1b4d011476381066fdae829548ebb4';
  constructor(private jsonp: Jsonp) {

  }

  getQuestions(): Observable<QuestionModel[]> {
    const search = new URLSearchParams();
    let day = new Date();
    day.setMonth(day.getMonth() - 1);
    search.set('since', day.toISOString());
    return this.jsonp
      .get(QuestionService.GITHUB_ISSUES_API_URL, { search })
      .map(res => res.json().data);
  }
}
