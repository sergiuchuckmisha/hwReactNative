import * as React from 'react';
import { Text, View, StyleSheet, TextInput, Button, ScrollView } from 'react-native';
import {serverUrlWs} from "./src/utils";


// code is taken (and edited) from
// https://blog.logrocket.com/how-to-implement-websockets-in-react-native/
export default function App() {
    const [serverState, setServerState] = React.useState('Loading...');
    const [messageText, setMessageText] = React.useState('');
    const [disableButton, setDisableButton] = React.useState(true);
    const [inputFieldEmpty, setInputFieldEmpty] = React.useState(true);
    const [serverMessages, setServerMessages] = React.useState([]);
    var ws = React.useRef(new WebSocket(serverUrlWs)).current;


    React.useEffect(() => {
         // serverMessagesList = [];
        ws.onopen = () => {
            setServerState('Connected to the server')
            setDisableButton(false);
            console.log("initializing global.serverMessagesList")
            global.serverMessagesList = [];
        };
        ws.onclose = (e) => {
            setServerState('Disconnected. Check internet or server.')
            setDisableButton(true);
        };
        ws.onerror = (e) => {
            setServerState(e.message);
        };
        ws.onmessage = (e) => {
            console.log("onmessage: global.serverMessagesList before push: ", global.serverMessagesList)
            global.serverMessagesList.push(e.data);
            console.log("onmessage: global.serverMessagesList after push: ", global.serverMessagesList)
            setServerMessages([...global.serverMessagesList])
        };
    }, [])

    const printServerMessages = () => {
        console.log("global.serverMessagesList: ", global.serverMessagesList)
        console.log("serverMessages: ", serverMessages)
    }
    const submitMessage = () => {
        // setServerMessages([messageText])
        ws.send(messageText);
        setMessageText('')
        setInputFieldEmpty(true)


        console.log("messageText: ", messageText)
        console.log("serverMessages: ", serverMessages)
        // let serverMessagesList = [...serverMessages]
        console.log("serverMessagesList: ", global.serverMessagesList)
        global.serverMessagesList.push(messageText);
        console.log("global.serverMessagesList after push: ", global.serverMessagesList)
        setServerMessages([...global.serverMessagesList])
        console.log("serverMessages after set: ", serverMessages)
        console.log("messageText after: ", messageText)
    }
    return (
        <View style={styles.container}>
        <View style={{
        height: 30,
            backgroundColor: '#eeceff',
            padding: 5
    }}>
<Text>{serverState}</Text>
    </View>
    <View style={{
        flexDirection: 'row',
    }}>
<TextInput style={{
        borderWidth: 1,
            borderColor: 'black',
            flexGrow: 1,
            padding: 5,
    }}
    placeholder={'Add Message'}
    onChangeText={text => {
        setMessageText(text)
        setInputFieldEmpty(text.length > 0 ? false : true)
    }}
    value={messageText}
    />
    <Button
    onPress={submitMessage}
    title={'Submit'}
    disabled={disableButton || inputFieldEmpty}
    />
    <Button
    onPress={() => {
        console.log("initializing global.serverMessagesList")
        global.serverMessagesList = [];
        setServerMessages([])
    }}
    title={'Clear chat'}
    disabled={disableButton}
    />
    <Button
    onPress={() => printServerMessages()}
    title={'Print'}
    disabled={disableButton}
    />
    </View>
            <View style={{
                backgroundColor: '#ffeece',
                padding: 5,
                flexGrow: 1
            }}>
                <ScrollView>
                    {
                        serverMessages.map((item, ind) => {
                            return (
                                <Text key={ind}>{item}</Text>
                            )
                        })
                    }
                </ScrollView>
            </View>
    </View>
);
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ecf0f1',
        paddingTop: 30,
        padding: 8,
    },

});
