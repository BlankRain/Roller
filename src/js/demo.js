const Roller = require('./roller.js')
function hello(arg1) {
    console.log('call hello', arg1)
    return "hello call"
}
function world(params) {
    console.log('call world')
    return "good job"
}

var x = new Roller()
x.start(hello).to(world).build().listen(3000)
