const Roller = require('./roller.js')
function hello(params) {
    console.log('call hello')
    return "hello call"
}
function world(params) {
    console.log('call world')
    return "good job"
}

var x = new Roller()
x.start(hello).to(world).build().listen(3000)

var y = new Roller()
y.start(world).to(hello).build().listen(4000)
