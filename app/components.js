import Page2 from './page2';

export default function components() {
  return function(app) {
    app.registerComponent("Page1", Page2);
  }
}
