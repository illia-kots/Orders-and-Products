import { NavBar } from '../NavBar';
import './NavigationMenu.scss';

export const NavigationMenu = () => {
  return (
    <div className="page__navigation-menu navigation-menu">
      <div className="navigation-menu__container">
        <div className="navigation-menu__user">
          <div className="
            icon
            fa-regular
            fa-user
            fa-2xl
            text-success"
          />
        </div>

        <nav className="navigation-menu__nav">
          <NavBar />
        </nav>
      </div>
    </div>
  );
};
