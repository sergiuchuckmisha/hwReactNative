import {compareArrays} from "./utils";


it('tmp', () => {
    console.log([1] instanceof Array)
});


describe('compareArrays', () => {
    it('positive', () => {
        expect(compareArrays([1], [1])).toBe(true)
    });
    it('negative', () => {
        expect(compareArrays([1], ["1"])).toBe(false)
    });
})


