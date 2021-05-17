'use strict';

import * as _collections from '../collections.js';

const SPACE = ' ';

const serialize = (val, config, indentation, depth, refs, printer) => {
  const stringedValue = val.toString();

  if (
    stringedValue === 'ArrayContaining' ||
    stringedValue === 'ArrayNotContaining'
  ) {
    if (++depth > config.maxDepth) {
      return '[' + stringedValue + ']';
    }

    return (
      stringedValue +
      SPACE +
      '[' +
      (0, _collections.printListItems)(
        val.sample,
        config,
        indentation,
        depth,
        refs,
        printer
      ) +
      ']'
    );
  }

  if (
    stringedValue === 'ObjectContaining' ||
    stringedValue === 'ObjectNotContaining'
  ) {
    if (++depth > config.maxDepth) {
      return '[' + stringedValue + ']';
    }

    return (
      stringedValue +
      SPACE +
      '{' +
      (0, _collections.printObjectProperties)(
        val.sample,
        config,
        indentation,
        depth,
        refs,
        printer
      ) +
      '}'
    );
  }

  if (
    stringedValue === 'StringMatching' ||
    stringedValue === 'StringNotMatching'
  ) {
    return (
      stringedValue +
      SPACE +
      printer(val.sample, config, indentation, depth, refs)
    );
  }

  if (
    stringedValue === 'StringContaining' ||
    stringedValue === 'StringNotContaining'
  ) {
    return (
      stringedValue +
      SPACE +
      printer(val.sample, config, indentation, depth, refs)
    );
  }

  return val.toAsymmetricMatcher();
};

export default serialize;
