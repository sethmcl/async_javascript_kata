### Asynchronous looping

What happens when you try to run this code?

```
for (var i = 0; i < 1000 * 500; i++) {
    console.log('my favorite number is %s', i);
}
```

How can we prevent the browser from locking up but still perform this loop? Use the code in this folder as a starting point.
