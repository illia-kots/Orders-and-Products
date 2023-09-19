import { TopMenu } from '../TopMenu';
import './Header.scss';

export const Header = () => {
  return (
    <header className="page__header header">
      <div className="container header__container">
        <div className="header__menu">
          <TopMenu />
        </div>
      </div>
    </header>
  );
};
