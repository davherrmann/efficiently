import Immutable from 'seamless-immutable';

export default class Merger {
  merge(destination, source) {
    for (var property in source) {
      if (source[property] && source[property].constructor &&
       source[property].constructor === Object) {
        destination[property] = destination[property] || {};
        this.merge(destination[property], source[property]);
      } else {
        destination[property] = source[property];
      }
    }
    return destination;
  }
}
