import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { QuestionService } from './question.service';
import { QuestionModel } from './question.model';
import  { LoadService } from '../loading';

@Component({
  selector: 'question',
  providers: [QuestionService],
  directives: [],
  styles: [require('./question.scss')],
  template: require('./question.html')
})
export class QuestionComponent implements OnInit {
  private questions: QuestionModel[] = [];
  private error: any;

  constructor(private questionService: QuestionService,
              private  loadService: LoadService,
              private viewContainer: ViewContainerRef) {

  }

  ngOnInit() {
    this.loadService.show(this.viewContainer);
    this.questionService.getQuestions()
      .subscribe(
        result => {
          this.questions = result;
        },
        (error) => {
          this.error = error;
        },
        () => this.loadService.hide());
  }
}
