import {initEfficiently} from './src/framework/root';
import App from './app/app';

let rootElement = document.getElementById('react');

initEfficiently(rootElement, App);
