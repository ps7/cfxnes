const obj = {a: 1, b: 2};

window.test = function test() {
  console.log({...obj, c: 3}, 'x');
}
