import React from "react";
import { Switch, Redirect, Route } from "react-router-dom";

import { IRoute } from "./typing";

interface IOpts {
  routes: IRoute[];
  extraProps?: object;
}

const render = ({
  route,
  opts,
  props,
}: {
  route: IRoute;
  opts: IOpts;
  props: object;
}) => {
  const routes = renderRoutes({
    ...opts,
    routes: route.routes || [],
  });

  const { component: Component, wrappers } = route;
  if (Component) {
    const newProps = {
      ...props,
      ...opts.extraProps,
      route,
    };
    let ret = <Component {...newProps}>{routes}</Component>;

    if (wrappers) {
      let len = wrappers.length - 1;
      while (len >= 0) {
        ret = React.createElement(wrappers[len], newProps, ret);
        len -= 1;
      }
    }
    return ret;
  } else {
    return routes;
  }
};

const getRouteElement = ({
  route,
  index,
  opts,
}: {
  route: IRoute;
  index: number;
  opts: IOpts;
}) => {
  const routeProps = {
    key: route.key || String(index),
    exact: route.exact,
    strict: route.strict,
    sensitive: route.sensitive,
    path: route.path,
  };
  if (route.redirect) {
    return <Redirect {...routeProps} from={route.path} to={route.redirect} />;
  } else {
    return (
      <Route
        {...routeProps}
        render={(props: object) => {
          return render({ route, opts, props });
        }}
      />
    );
  }
};

const renderRoutes = (opts: IOpts) =>
  opts.routes ? (
    <Switch>
      {opts.routes.map((route, index) =>
        getRouteElement({
          route,
          index,
          opts,
        })
      )}
    </Switch>
  ) : null;

export default renderRoutes;
