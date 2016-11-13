export function pickByRange(config) {
    return function (limit) {
        const sortedRanges = Object.keys(config).sort((a, b) => a - b);
        const range = sortedRanges.filter(range => limit < range)[0];
        let validRange;

        if (range) {
            validRange = Math.min(
                Math.max(
                    parseInt(sortedRanges[0]), range),
                    parseInt(sortedRanges.slice(-1))
                );
        } else {
            validRange = sortedRanges.slice(-1);
        }

        return config[validRange];
    }
}