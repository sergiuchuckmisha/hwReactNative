import {initWssConnection} from "./ws";
import axios from "axios";


it('renders correctly', done => {
    function f(data) {
        console.log(data)
        expect(data).toBe("pong")
        global.wss.close()
        done()
    }
    initWssConnection(f)
});

it('axios.get', done => {
    console.log("axios.get: ", axios.get)
    axios
        .get(`http://206.189.101.71:8080/`)
        .then(r => {
            console.log(r)
            done()
        })
});

it('tmp', () => {
    console.log([1] instanceof Array)
    console.log([1].equals)
});
