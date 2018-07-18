export default class Car {
  constructor() {
    this.engine = true;
    this.wheels = 4
  }

  getWheels() {
    return this.wheels;
  }
}


/**
// Compiles to ES5
 
const Car = (() => {
  function Car() {
    this.engine = true;
    this.wheels = 4;
  }

  Car.prototype.getWheels() = () => {
    return this.wheels;
  }
})();

*/
