export default class Differ {
  diff(obj1, obj2) {
    if (this.isFunction(obj1) || this.isFunction(obj2)) {
      throw 'Invalid argument. Function given, object expected.';
    }
    if (this.isValue(obj1) || this.isValue(obj2)) {
      return obj1 === obj2 ? undefined : obj2;
    }

    var diff = {};
    for (var key in obj2) {
      if (this.isFunction(obj2[key]) || ('undefined' != typeof(diff[key]))) {
        continue;
      }

      let nestedDiff = this.diff(obj1[key], obj2[key]);
      if (nestedDiff != undefined && (Object.keys(nestedDiff).length > 0 || !this.isObject(nestedDiff))) {
      	diff[key] = nestedDiff;
      }
    }

    return diff;
  }

  isFunction(obj) {
    return {}.toString.apply(obj) === '[object Function]';
  }
  isArray(obj) {
    return {}.toString.apply(obj) === '[object Array]';
  }
  isObject(obj) {
    return {}.toString.apply(obj) === '[object Object]';
  }
  isValue(obj) {
    return !this.isObject(obj) && !this.isArray(obj);
  }
}
