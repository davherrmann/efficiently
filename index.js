import {initEfficiently, serverDispatch} from 'efficiently-core';
import App from './app/app';

let rootElement = document.getElementById('react');

initEfficiently(rootElement, App, serverDispatch);
