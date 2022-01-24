import itemRouter from './item';

const apiPrefix = '/api/v1';

const routes = [ itemRouter ];

export default (app) => {
  routes.forEach((route) => app.use(apiPrefix, route));
  return app;
};
