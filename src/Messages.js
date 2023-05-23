import React, {useEffect, useState} from "react";
import {StyleSheet, Text, View} from "react-native";
import {Colors} from "react-native/Libraries/NewAppScreen";
import {initWssConnection} from "./ws";


const Messages = ({messages = [], newMessage, style = {}}) => {
    const [messages_, setMessages_] = useState(messages);
    // initWssConnection()
    // useEffect(() => {initWssConnection(m => {
    //     console.log("hello from useEffect; messages_ before: ", messages_)
    //     let newMessages = messages_.concat([m])
    //     console.log("hello from useEffect; messages_ after: ", newMessages)
    //     setMessages_(newMessages)})
    // }, [messages_])

    return (<View style={style}>
        <Text>"asdasd"</Text>
        {messages_.map(message => {
            return <Text
                key={message}
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