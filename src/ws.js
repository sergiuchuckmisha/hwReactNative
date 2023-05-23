
const WebSocket = require('isomorphic-ws')

const serverUrl = "ws://206.189.101.71:8088"

export function initWssConnection (f) {
    console.log('initializing wss connection at', new Date());
    global.wss = new WebSocket(serverUrl);

    wss.onopen = () => {
        wss.send("ping");
    };

    wss.onmessage = ({ data }) => {
        try {
            // alert(data)
            if ('function' === typeof f) {
                f(data)
            }
        } catch (e) { // usually this error should be processing of response to 'ping' (which is required in order to keeping subscription alive)
            console.log('error during processing message', data)
            console.log(e)
        }
    };

    wss.onclose = function close() {
        console.log('disconnected');
        if (global.shouldBeAlive) {
            console.log('trying to reconnect at', new Date());
            initWssConnection()
        }
    };

    return wss
}