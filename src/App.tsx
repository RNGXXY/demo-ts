import React from 'react';
import { HashRouter } from 'react-router-dom';
import renderRoutes from './router/renderRoutes';
import routes from './router';

function App() {
  return <HashRouter>{renderRoutes({ routes })}</HashRouter>;
}

export default App;
