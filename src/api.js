/*
 * Note: Always RESOLVE the promise if there is ANY data from the API server.
 * If the API servier is DOWN, then REJECT the promise.
 *
 * ONLY REJECT THE PRMOISE IF THE API SERVER IS DOWN!!!
 */
var Api = {
    /*
     * An example API route.
     * Simply tests weather input value == 'test'.
     * Returns a Promise by calling either `resolve()` or `reject()`.
     *
     * RETURNS: JSON
     */
    test: async function(value) {
        var promise = new Promise(function(resolve, reject) {
            fetch("/api/v1/test/test/test/", {
                method: "post",
                body: JSON.stringify({
                    value: value,
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then(
                response => resolve(response),
                error => reject(),
            );
        });
        return promise;
    }
}

export default Api;
