'use strict';

import * as _collections from '../collections.js';

/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable local/ban-types-eventually */
const SPACE = ' ';
const OBJECT_NAMES = ['DOMStringMap', 'NamedNodeMap'];

const isNamedNodeMap = collection =>
  collection.constructor.name === 'NamedNodeMap';

const serialize = (collection, config, indentation, depth, refs, printer) => {
  const name = collection.constructor.name;

  if (++depth > config.maxDepth) {
    return '[' + name + ']';
  }

  return (
    (config.min ? '' : name + SPACE) +
    (OBJECT_NAMES.indexOf(name) !== -1
      ? '{' +
      (0, _collections.printObjectProperties)(
        isNamedNodeMap(collection)
          ? Array.from(collection).reduce((props, attribute) => {
            props[attribute.name] = attribute.value;
            return props;
          }, {})
          : { ...collection },
        config,
        indentation,
        depth,
        refs,
        printer
      ) +
      '}'
      : '[' +
      (0, _collections.printListItems)(
        Array.from(collection),
        config,
        indentation,
        depth,
        refs,
        printer
      ) +
      ']')
  );
};

export default serialize;

