import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

import './PageNavLink.scss';

type Props = {
  to: string,
  text: string,
};

export const PageNavLink: React.FC<Props> = ({
  to,
  text,
}) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => classNames(
        'navBar__item',
        {
          'navBar__item--active': isActive,
        },
      )}
    >
      {text}
    </NavLink>
  );
};
