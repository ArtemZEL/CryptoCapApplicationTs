import compose from 'compose-function';
import { withRouter } from './with-router';
import { withContainer } from './with-container';
import { withReactQuery } from './with-react-query';

export const withProviders = compose(withRouter, withReactQuery);
export const withContainerProvider = compose(withContainer);
