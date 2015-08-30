### Looping timeouts

Consider the code below:

```
for (var i = 0; i <= 3; i++) {
  setTimeout(function () {
    console.log(i);
  }, i * 1000);
}
```

We might expect this code to print:

```
0
// (0 second delay)
1
// (1 second delay)
2
// (2 second delay)
3
```

Why does this code not work as expected? How can we fix it?


### Asynchronous looping

What happens when you try to run this code?

```
for (var i = 0; i < 1000 * 1000; i++) {
    console.log('my favorite number is %s', i);
}
```

How can we prevent the browser from locking up but still perform this loop? See example in `big_loops` folder.
