/**
 * Roller.js
 * 2018年02月22日15:27:43
 * Brain
 */
const http = require('http')
const url = require('url')
const events = require('events');

function start(f) {
    this._r.push(f)
    return this
}
function to(f) {
    this._r.push(f)
    return this
}
function is404(y, x) {
    return y.eventNames().indexOf(x) == -1
}

function build() {
    var eventEmitter = new events.EventEmitter();
    var handlers = this._r.concat(function end() { })
    handlers.reduce((x, y) => {
        eventEmitter.on(x.name, (routes, params) => {
            var route = routes.shift() || 'end'
            if (is404(eventEmitter, route)) {
                eventEmitter.emit('404', route, params)
                return
            }
            var xr = x(params)
            eventEmitter.emit(route, routes, params.concat(xr))
        })
        return y
    })

    eventEmitter.on('00start-handle-it', (routes, params) => {
        var route = routes.shift()
        if (is404(eventEmitter, route)) {
            eventEmitter.emit('404', route, params)
            return
        }
        eventEmitter.emit(route, routes.slice(), params)
    })

    eventEmitter.on('end', function (routes, params) {
        console.log('on end')
        params[0].writeHead(200, { 'Content-Type': 'application/json' });
        params[0].end(JSON.stringify(params.pop()));
    })
    eventEmitter.on('404', function (route, params) {
        params[0].writeHead(404, { 'Content-Type': 'text/plain' })
        params[0].end(JSON.stringify({ NotFound: "not a valid url" }))
    })


    return {
        listen: (port) => {

            http.createServer(function (request, response) {
                console.log(request.url)
                var path = url.parse(request.url, true)
                var events = path.pathname.split("/").filter(x => x != '')
                var params = path.query
                eventEmitter.emit('00start-handle-it', events, [response, params])
            }).listen(port)
            // 终端打印如下信息  
            console.log('Server running at http://127.0.0.1:', port);
        }
    }
}
function Roller() {
    this._r = []

}
Roller.prototype.to = to
Roller.prototype.start = start
Roller.prototype.build = build
module.exports = Roller