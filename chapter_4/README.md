## Play with Async.js

### Setup

Run the included node server.

```bash
cd server
make run
```

### Problem 1

Write a client to request the text of the "Row, row, row your boat" poem from the server. Each line of the poem can be retrieved with a seprate HTTP request:

```bash
# Line 1
curl http://localhost:3200/poem/row/0

# Line 2
curl http://localhost:3200/poem/row/1

# Line 3
curl http://localhost:3200/poem/row/2

# Line 4
curl http://localhost:3200/poem/row/3
```

Ensure your client prints out the lines in the poem in the correct order. Output should be:

```
Row, row, row your boat,
Gently down the stream.
Merrily, merrily, merrily, merrily,
Life is but a dream.
```
Also, your program should complete within 6 seconds.

### Problem 2

Write another client to request the text of the extended version of "Row, row, row your boat". The first URL to request is:

```
curl http://localhost:3200/poem/row-long
```

You will receive a JSON response giving you the path to request for the first line of the poem. Each subsequent will give you the current verse, and the path for the next verse. You should follow these paths until you have the complete poem printed out.
