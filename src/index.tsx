import { createRoot } from 'react-dom/client';
import {Provider} from 'react-redux';
import {store} from './store';
import 'tailwindcss/tailwind.css';
import App from 'components/App';
import { GoogleOAuthProvider } from '@react-oauth/google';
import './styles/globals.css';

const container = document.getElementById('root') as HTMLDivElement
const root = createRoot(container)
const clientId = '194654843404-ti5e6v4it68kr3dksjdmnqf08tthqti0.apps.googleusercontent.com'

root.render(
    <GoogleOAuthProvider clientId={clientId}>
        <Provider store={store}>
        <App />
        </Provider>
    </GoogleOAuthProvider>
);


