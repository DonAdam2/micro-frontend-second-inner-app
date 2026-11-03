//error boundary
import { ErrorBoundary } from 'react-error-boundary';
import { Route, Routes } from 'react-router-dom';
//error boundary fallback
import ErrorBoundaryFallback from './js/generic/ErrorBoundaryFallback';
//styles
import './scss/global.scss';
//components
import TestComponent from './js/containers/TestComponent';
import OptionalRouter from './js/components/shared/OptionalRouter';

const App = () => (
  <ErrorBoundary
    FallbackComponent={ErrorBoundaryFallback}
    onReset={() => {
      //Reset the state of your app so the error doesn't happen again
      console.log('Try again clicked');
    }}
  >
    <OptionalRouter>
      {/*routes are relative to the url where the current app is rendered:
      /first standalone, /carousel/first inside the container app (its route is /carousel/*)*/}
      <Routes>
        <Route path=":tab?" element={<TestComponent />} />
      </Routes>
    </OptionalRouter>
  </ErrorBoundary>
);

export default App;
