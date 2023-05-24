import axios from "axios/index";

export function extracted() {
    console.log("App: axios.get: ", axios.get)
    axios.get(`http://206.189.101.71:8080/`).then(r => console.log("App: axios.get: ", r.data))
}