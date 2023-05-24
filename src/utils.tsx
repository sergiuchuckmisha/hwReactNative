import axios from "axios";
import WebSocket from "isomorphic-ws";

export const serverUrlWs = "ws://206.189.101.71:8088"

export function compareArrays(ar1: any[], ar2: any[]) {
    return JSON.stringify(ar1) === JSON.stringify(ar2);
}

export function httpCall(onfulfilled: (data: any) => void) {
    axios.get(`http://206.189.101.71:8080/`)
        .then(r => onfulfilled(r.data))
}

export function initWebSocketConnection(onMessage: (data: any) => void) {
    global.wss = new WebSocket(serverUrlWs)
    console.log("global.wss: ", global.wss)
    global.wss.onopen = () => wss.send("ping")
    global.wss.onmessage = ({data}) => {
        try {
            // alert(data)
            console.log(data)
            onMessage(data)
            // if ('function' === typeof f) {
            //     f(data)
            // }
        } catch (e) { // usually this error should be processing of response to 'ping' (which is required in order to keeping subscription alive)
            console.log('error during processing message', data)
            console.log(e)
        }
    };
}
