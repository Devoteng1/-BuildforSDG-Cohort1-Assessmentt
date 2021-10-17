const rewire = require("rewire")
const server = rewire("./server")
const logData = server.__get__("logData")
// @ponicode
describe("logData", () => {
    test("0", () => {
        let callFunction = () => {
            logData("DELETE", "C:\\\\path\\to\\folder\\", "01:04:03")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            logData("POST", "/path/to/file", 9)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            logData("POST", "./path/to/file", "2017-09-29T23:01:00.000Z")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            logData("POST", "path/to/file.ext", "01:04:03")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            logData("POST", ".", 11)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            logData(undefined, undefined, undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})
