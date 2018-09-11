const input = `
    (if (> 3 1)
        (dec 8)
        (inc 3))
`;

const scope = {
    ['and'](a, b) {
        return +a && +b;
    },
    ['or'](a, b) {
        return +a || +b;
    },
    ['>'](a, b) {
        return a > b;
    },
    ['<'](a, b) {
        return a < b;
    },
    ['='](a, b) {
        return a < b;
    },
    ['if'](cond, then, el) {
        return cond !== 'false' ? then : el;
    },
    ['dec'](n) {
        return +n - 1;
    },
    ['inc'](n) {
        return +n + 1;
    },
};

function parse(code) {
    const re = /\(([-a-zA-Z\>\<\=]+)([^\(\)]*)\)/;
    const matches = code.match(re);
    if (!matches) {
        return code;
    }

    const [op, argsString] = matches.slice(1);
    const args = argsString.replace(/\s+/g, ' ').trim().split(' ');
    const reduced = code.replace(re, scope[op].apply(null, args));
    return parse(reduced);
}

console.log(parse(input));
