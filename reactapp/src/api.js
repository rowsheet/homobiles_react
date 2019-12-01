var Api = {
    /*
     * An example async function to simulate network latency.
     * Simply tests weather input value == 'test'.
     * Returns a Promise by calling either `resolve()` or `reject()`.
     */
    test: async function(value) {
        console.log("Api.test()");
        var promise = new Promise(function(resolve, reject) {
            setTimeout(
                function() {
                    console.log("value: " + value);
                    if (value == "test") {
                        resolve("FROM API: ok, value = 'test'");
                    } else {
                        reject("bad, value != 'test', instead: " + value);
                    }
                },
                1000
            );
        });
        return promise;
    }
}

export default Api;
