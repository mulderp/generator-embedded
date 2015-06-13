# generator-embedded

Getting faster to a blinking LED with HTTP and the Firmata protocol.

This generator offers:

* a simple server template that wraps the Firmata module
* a websocket connection

# How to use

## HTTP

Put a LED on some Arduino pin, and run:

    $ curl localhost:3474/api/6/check

## WebSockets

Put a simple switch on Arduino pin 5, and run:

    $ wscat -c ws://localhost:3474
    connected (press CTRL+C to quit)
      < {"state": 1}

# License

MIT (C) 2015 Patrick Mulder
