import React, {useEffect, useState} from "react";
import {StyleSheet, Text, View} from "react-native";
import {Colors} from "react-native/Libraries/NewAppScreen";
import {initWebSocketConnection} from "./utils";



const Messages = ({messages = [], style = {}}) => {
    const [messages_, setMessages_] = useState(messages);

    useEffect(() => {
        console.log("hello from useEffect; starting initWssConnection")
        initWebSocketConnection(message => {
            // alert(data)
            let newMessages = messages_.concat([message])
            console.log("hello from useEffect; messages_ after: ", newMessages)
            setMessages_(newMessages)
        });
    }, [])

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
