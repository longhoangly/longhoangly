'use strict';

import diff from '../external/diff-sequences.js';

import format from '../external/pretty-format.js';

export function getNumLines(jsonObject) {

    return format(jsonObject, { indent: 0 /*, other options*/ }).split('\n').length;
};

export function getDiffLines(a, b) {

    const aLinesIn = JsonFromObjWithNewLines(a).split('\n');
    const bLinesIn = JsonFromObjWithNewLines(b).split('\n');

    return compareTwoArray(aLinesIn, bLinesIn)
};

export function compareTwoArray(aLinesIn, bLinesIn) {

    const aLength = aLinesIn.length; // Validate: aLinesUn.length === aLength
    const bLength = bLinesIn.length; // Validate: bLinesUn.length === bLength

    const isCommon = (aIndex, bIndex) => aLinesIn[aIndex] === bLinesIn[bIndex];

    // Only because the GitHub Flavored Markdown doc collapses adjacent spaces,
    // this example code and the following table represent spaces as middle dots.
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