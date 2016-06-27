import { Label } from './label.model';
import { User } from'./user.model';

export class QuestionModel {
  id: number;
  title: string;
  url: string;
  labels: Label[];
  user: User;
  comments: number;
  closed_at: string;
  state: string;
  updated_at: string;
  events_url: string;
  html_url: string;
  comments_url: string;
}
