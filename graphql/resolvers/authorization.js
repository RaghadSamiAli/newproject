import { skip } from 'graphql-resolvers';
import { ForbiddenError ,PersistedQueryNotFoundError} from 'apollo-server-express';

export const isAuthenticated = (parent, args, { me }) =>
  me ? skip : new ForbiddenError('Not authenticated as user');

  export const isAuthenticatedlogin = (parent, args, { me }, next) =>{
    return !me ? skip : new ForbiddenError('Already Authenticated');
  };
  export const isAdmin = (parent, args, { me },{ db, session }, next) =>{
      return  me.role === 513 ? skip : new ForbiddenError('You dont have permession to view this');
  };
  export const isNotAdmin = (parent, args, { me },{ db, session }, next) =>{
    return  me.role != 513 ? skip : new ForbiddenError('You are admin, You cannot operate this query');
};
export const isSessionAuthenticated = (session) => {
  return session.user != undefined;
};