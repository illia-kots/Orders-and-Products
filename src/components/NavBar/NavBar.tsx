import navMenuBarList from '../../api/navMenuBar.json';
import { PageNavLink } from '../PageNavLink/PageNavLink';
import './NavBar.scss';

export const NavBar = () => {
  return (
    <div className="navBar">
      {navMenuBarList.map(navItem => (
        <PageNavLink
          key={navItem.title}
          to={navItem.link}
          text={navItem.title}
        />
      ))}
    </div>
  );
};
