import { Outlet } from 'react-router-dom';

import { Header } from './components/Header';
import { NavigationMenu } from './components/NavigationMenu';
import './App.scss';

export const App: React.FC = () => {
  return (
    <div className="App page">
      <Header />

      <main className="page__main row mx-0">
        <div className="col-md-2 px-0">
          <NavigationMenu />
        </div>

        <div className="col-md-9 px-0 mx-auto mt-5">
          <div className="container px-0">
            <div>
              <Outlet />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
