import React, {useState} from "react";
import {StyleSheet, Text, View} from "react-native";
import {Colors} from "react-native/Libraries/NewAppScreen";
// import {initWssConnection} from "./ws";
// import {tmp} from "./ws";
import axios from "axios/index";
import {compareArrays, httpCall} from "./utils";
import WebSocket from "isomorphic-ws";


const Messages = ({messages = [], style = {}}) => {
    const [messages_, setMessages_] = useState(messages);
    // console.log("Messages: tmp: ", tmp)
    console.log("Messages: axios: ", axios)
    console.log("Messages: axios.get: ", axios.get)
    // NetInfo.fetch().then(state => {
    //     console.log("Connection type", state.type);
    //     console.log("Is connected?", state.isConnected);
    // });

    httpCall(data => {
        console.log("onfulfilled: typeof [r.data]: ", typeof [data])
        console.log("onfulfilled: typeof [r.data]: ", typeof [data])
        console.log("onfulfilled: [r.data] instanceof Array: ", [data] instanceof Array)
        // console.log("[r.data].equals: ", [data].equals)
        if (!compareArrays([data], messages_)) {
            setMessages_([data])
            alert(1)
        }
    });

    let wss = new WebSocket(serverUrl)
    console.log("wss: ", wss)
    wss.onopen = () => wss.send("ping")
    wss.onmessage = ({ data }) => {
        try {
            // alert(data)
            console.log(data)
            // if ('function' === typeof f) {
            //     f(data)
            // }
        } catch (e) { // usually this error should be processing of response to 'ping' (which is required in order to keeping subscription alive)
            console.log('error during processing message', data)
            console.log(e)
        }
    };

    // alert("tmp: " + tmp)
    // initWssConnection()
    // useEffect(() => {
    //     console.log("hello from useEffect; starting initWssConnection")
    //     initWssConnection(m => {
    //     console.log("hello from useEffect; messages_ before: ", messages_)
    //     let newMessages = messages_.concat([m])
    //     console.log("hello from useEffect; messages_ after: ", newMessages)
    //     setMessages_(newMessages)})
    // }, [])

    return (<View style={style}>
        <Text>"asdasd"</Text>
        {messages_.map((message, index) => {
            return <Text
                key={index}
                style={[
                    styles.sectionTitle,
                    {
                        // todo differ between my and bot's messages
                        color: false ? Colors.white : Colors.black,
                    },
                ]}>
                {message}
            </Text>
        })}
    </View>)
}

const styles = StyleSheet.create({
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
    },
    highlight: {
        fontWeight: '700',
    },
});

export default Messages;


const serverUrl = "ws://206.189.101.71:8088"
export function initWssConnection (f) {
    console.log("hello from initWssConnection; WebSocket: ", WebSocket)
    console.log("hello from initWssConnection; new WebSocket(serverUrl): ", new WebSocket())
    const wss = new WebSocket(serverUrl)
    console.log('initializing wss connection at', new Date());
    console.log(wss)
    global.wss = wss;
    //
    // wss.onopen = () => {
    //     wss.send("ping");
    // };

    // wss.onmessage = ({ data }) => {
    //     try {
    //         // alert(data)
    //         if ('function' === typeof f) {
    //             f(data)
    //         }
    //     } catch (e) { // usually this error should be processing of response to 'ping' (which is required in order to keeping subscription alive)
    //         console.log('error during processing message', data)
    //         console.log(e)
    //     }
    // };
    //
    // wss.onclose = function close() {
    //     console.log('disconnected');
    //     if (global.shouldBeAlive) {
    //         console.log('trying to reconnect at', new Date());
    //         initWssConnection()
    //     }
    // };

    return wss
}