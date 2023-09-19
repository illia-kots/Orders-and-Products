import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import {
  Navigate,
  Route,
  HashRouter as Router,
  Routes,
} from 'react-router-dom';

import { App } from './App';
import { store } from './app/store';
import { NotFoundPage } from './pages/NotFoundPage';
import { OrdersPage } from './pages/OrdersPage';
import { ProductsPage } from './pages/ProductsPage';

import '@fortawesome/fontawesome-free/css/all.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <Router>
      <Routes>
        <Route
          path="/"
          element={<App />}
        >
          <Route
            path="*"
            element={<NotFoundPage />}
          />

          <Route
            path="/"
            element={<Navigate to="orders" replace />}
          />

          <Route
            path="orders"
            element={<OrdersPage />}
          />

          <Route
            path="products"
            element={<ProductsPage />}
          />
        </Route>
      </Routes>
    </Router>
  </Provider>,
);
