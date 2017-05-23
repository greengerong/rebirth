import { CurrentUserTransition } from './current-user-transition.service';
import { PlatformTransition } from './platform-transition.service';

export interface Variants {
  currentUser: string;
  platform: 'server' | 'browser'
}

export const variants = {
  currentUser: { // select a locale based on renderUri arguments
    transition: CurrentUserTransition
  },
  platform: {
    transition: PlatformTransition
  }
};

export function transformVariants(request): Variants {
  return {
    currentUser: JSON.parse(request.cookies['currentUser']) || {},
    platform: 'server'
  };
};
