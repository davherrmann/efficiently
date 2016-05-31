// TODO remoteServerDispatch should not be in core
import {remoteServerDispatch, efficiently} from 'efficiently-core';
import App from './app/app';
import components from './app/components';
import derivations from './app/derivations';

const app = efficiently();

// register components
app.use(components());
// register derivations
app.use(derivations());
// register remote server dispatch
app.use((app) => app.setDispatcher(remoteServerDispatch));

app.start(document.getElementById('react'), App);
