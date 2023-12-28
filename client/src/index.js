import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';

const root = ReactDOM.createRoot(document.getElementById('root'));
const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

if (process.env.REACT_APP_AUTH0_DOMAIN) {
	console.log('Auth0 Domain:', process.env.REACT_APP_AUTH0_DOMAIN);
} else {
	console.error('REACT_APP_AUTH0_DOMAIN is not defined.');
}
root.render(
	<React.StrictMode>
		<Auth0Provider
			domain={domain}
			clientId={clientId}
			authorizationParams={{ redirect_uri: window.location.origin }}
		>
			<App />
		</Auth0Provider>
	</React.StrictMode>
);
