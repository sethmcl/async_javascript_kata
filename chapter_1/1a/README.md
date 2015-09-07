### Looping timeouts

Consider the code below:

```
for (var i = 1; i < 5; i++) {
  setTimeout(function () {
    console.log(i);
  }, i * 1000);
}
```

We might expect this code to print:

```
// (1 second delay)
1
// (2 second delay)
2
// (3 second delay)
3
// (4 second delay)
4
```

Why does this code not work as expected? How can we fix it? You may work off of the example code in `index.html` and `script.js`.
