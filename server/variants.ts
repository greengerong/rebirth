import { CurrentUserTransition } from './current-user-transition.service';

export interface Variants {
  currentUser: string;
}

export const variants = {
  currentUser: { // select a locale based on renderUri arguments
    transition: CurrentUserTransition
  }
};

export function transformVariants(request): Variants {
  return {
    currentUser: JSON.parse(request.cookies['currentUser']) || {}
  };
};
