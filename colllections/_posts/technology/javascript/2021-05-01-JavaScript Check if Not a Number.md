---
author: Long
layout: code_horizontal
tags: ["javascript"]
excerpt_separator: <!--short_desc-->
---

There are multiple ways to check if a variable is a number in JavaScript and here are some common ways.
<!--short_desc-->

- **isNaN( variable )** : This function name stands for "is Not a Number". If the variable is a number, it will return FALSE! Otherwise, it would be TRUE.

- **typeof( operand )** : The typeof operator returns a string indicating the type of the unevaluated operand

- **match( regex )** : The match() method retrieves the result of matching a string against a regular expression

The function **isNaN()** is a better way, be used in most cases.  
But **typeof()** and **match()** are also nice to try.

Becareful when using **typeof()** because it will return "string" if the number is declared as a string! 
_e.g. let number = "numberA"_

While **match()** is only available for variables which declared in string type.

```javascript

    let number = 100;
    let isNumber = isNaN(number);
    console.log("scenario 1:", isNumber);
    // expected: false

    let numberInStringType = "100";
    isNumber = isNaN(numberInStringType);
    console.log("scenario 2:", isNumber);
    // expected: false

    number = 100;
    let type = typeof number;
    console.log("scenario 3:", type);
    // expected: "number"

    numberInStringType = "100";
    type = typeof numberInStringType;
    console.log("scenario 4 (failure):", type);
    // expected: "number" but received "string" 
    // => To fix this issue, we can use regular expression to check if the string is a number!  
    // regex to match a number (in string type)
    let matches = numberInStringType.match(/^\d+$/g);
    isNumber = matches.length > 0;
    console.log("scenario 4 (fixed):", isNumber);
    // expected: true

```