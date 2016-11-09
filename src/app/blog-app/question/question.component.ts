import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { QuestionService } from './question.service';
import { QuestionModel } from './question.model';
import  { LoadService } from '../../core/loading/loading.service';

@Component({
  selector: 'question',
  styleUrls: ['./question.scss'],
  templateUrl: './question.html'
})
export class QuestionComponent implements OnInit {
  private questions: QuestionModel[];
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
        () => this.loadService.hide()
      );
  }
}
