import { BrowserRouter, useInRouterContext } from 'react-router-dom';

/*uses the router of the host app when the current app is rendered inside one (react-router-dom is a shared singleton),
otherwise (standalone or a host without a router) it creates its own router
a nested BrowserRouter would listen to the url separately, so the host router wouldn't know about navigations of the current app*/
const OptionalRouter = ({ children }) =>
  useInRouterContext() ? children : <BrowserRouter>{children}</BrowserRouter>;

export default OptionalRouter;
