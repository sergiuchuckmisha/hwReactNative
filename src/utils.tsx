import axios from "axios";

export function compareArrays(ar1: any[], ar2: any[]) {
    return JSON.stringify(ar1) === JSON.stringify(ar2);
}

export function httpCall(onfulfilled: (data: any) => void) {
    axios.get(`http://206.189.101.71:8080/`)
        .then(r => onfulfilled(r.data))
}