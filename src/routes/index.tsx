import { BrowserRouter as Router, Route, Routes as Switch } from 'react-router-dom';
import { Layout } from '../containers/Layout';
import { Weather } from './Weather';

const routesMap = [
  {
    path: '/home',
    component: Weather
  }
];

export const Routes = () => {
  return (
    <Router>
      <Layout>
        <Switch>
          {routesMap.map((route, index) => (
            <Route key={index} path={route.path} element={<route.component />} />
          ))}
          <Route path="*" element={<Weather />} />
        </Switch>
      </Layout>
    </Router>
  );
};
