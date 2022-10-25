# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here
- The `hashData` method would throw if a non-string value is passed in, so I added a check to ensure that the `data` parameter is a string. 
- The `hashData` method is now more readable and can be reused in other places.
- The `hashData` method is now more testable.
- The `hashData` method is now more flexible and can be used to hash data with different algorithms and encodings.
- The `deterministicPartitionKey` method is now more readable and can be reused in other places.
- The `deterministicPartitionKey` is now more testable.