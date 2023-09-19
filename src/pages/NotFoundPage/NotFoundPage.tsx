import { ErrorType } from '../../types/Error';
import './NotFoundPage.scss';

export const NotFoundPage = () => (
  <div className="not-found">
    <span className="not-found__image" />

    <h1 className="not-found__text">
      {ErrorType.PAGE_NOT_FOUND}
    </h1>
  </div>
);
