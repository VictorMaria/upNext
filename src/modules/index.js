import upNextRouter from './upNext';

const apiPrefix = '/api/v1';

const routes = [ upNextRouter ];

export default (app) => {
  routes.forEach((route) => app.use(apiPrefix, route));
  return app;
};
