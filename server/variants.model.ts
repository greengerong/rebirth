import { TransitionCurrentUser } from './current-user.transition';
export interface Variants {
  currentUser: string;
}

export const variants = {
  currentUser: { // select a locale based on renderUri arguments
    transition: TransitionCurrentUser
  }
}
