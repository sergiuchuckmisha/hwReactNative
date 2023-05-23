import {initWssConnection} from "./ws";


it('renders correctly', done => {
    function f(data) {
        console.log(data)
        expect(data).toBe("pong")
        global.wss.close()
        done()
    }
    initWssConnection(f)
});
