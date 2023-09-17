import { ApplicationError } from '@/protocols';

export function badRequestFound(): ApplicationError {
  return {
    name: 'Bad-Request',
    message: 'No result for this search!',
  };
}
