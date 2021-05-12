import diff from '../external/diff-sequences.js'; // ECMAScript modules

// Return array of items in longest common subsequence according to Object.is method.
const findCommonItems = (a, b) => {
    const array = [];
    diff(
        a.length,
        b.length,
        (aIndex, bIndex) => Object.is(a[aIndex], b[bIndex]),
        (nCommon, aCommon) => {
            for (; nCommon !== 0; nCommon -= 1, aCommon += 1) {
                array.push(a[aCommon]);
            }
        },
    );
    return array;
};

const commonItems = findCommonItems(
    ['a', 'b', 'c', 'a', 'b', 'b', 'a'],
    ['c', 'b', 'a', 'b', 'a', 'c'],
);

console.log(commonItems)