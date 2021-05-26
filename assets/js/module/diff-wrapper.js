'use strict';

import diff from '../external/diff-sequences.js';

export function getNumLines(jsonObject) {

    return JsonFromObjWithNewLines(jsonObject).split('\n').length;
};

// Diffs from objects
export function getDiffLines(objA, objB) {

    const aLinesIn = JsonFromObjWithNewLines(objA).split('\n');
    const bLinesIn = JsonFromObjWithNewLines(objB).split('\n');

    return compareTwoArray(aLinesIn, bLinesIn)
};

export function compareTwoArray(aLinesIn, bLinesIn) {

    const aLength = aLinesIn.length;
    const bLength = bLinesIn.length;

    const isCommon = (aIndex, bIndex) => aLinesIn[aIndex] === bLinesIn[bIndex];

    let aIndex = 0;
    let bIndex = 0;

    const aDiff = new Map();
    const bDiff = new Map();
    const common = new Map();

    const foundSubsequence = (nCommon, aCommon, bCommon) => {
        for (; aIndex !== aCommon; aIndex += 1) {
            aDiff.set(aIndex, aLinesIn[aIndex]) // in a but no in b
        }
        for (; bIndex !== bCommon; bIndex += 1) {
            bDiff.set(bIndex, bLinesIn[bIndex]) // in b but no in a
        }
        for (; nCommon !== 0; nCommon -= 1, aIndex += 1, bIndex += 1) {
            common.set(bIndex, bLinesIn[bIndex]) // in both
        }
    };

    diff(aLength, bLength, isCommon, foundSubsequence);

    // After the last common subsequence, push remaining change lines.
    for (; aIndex !== aLength; aIndex += 1) {
        aDiff.set(aIndex, aLinesIn[aIndex])
    }
    for (; bIndex !== bLength; bIndex += 1) {
        bDiff.set(bIndex, bLinesIn[bIndex])
    }

    return { aDiff, bDiff, common };
};