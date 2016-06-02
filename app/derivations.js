export default function derivations() {
  return function(app) {
    app.registerDerivation("lengthGreaterThanFour", (value) => value && value.length > 4);
  }
}
