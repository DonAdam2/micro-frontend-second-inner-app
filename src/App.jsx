import React from 'react';
import { hot } from 'react-hot-loader/root';
// required for babel polyfills
import 'regenerator-runtime/runtime';
//error boundary
import { ErrorBoundary } from 'react-error-boundary';
//error boundary fallback
import ErrorBoundaryFallback from './js/generic/ErrorBoundaryFallback';
//styles
import './scss/global.scss';
//components
import TestComponent from './js/containers/TestComponent';

const App = () => (
	<ErrorBoundary
		FallbackComponent={ErrorBoundaryFallback}
		onReset={() => {
			//Reset the state of your app so the error doesn't happen again
			console.log('Try again clicked');
		}}
	>
		<TestComponent />
	</ErrorBoundary>
);

export default hot(App);
