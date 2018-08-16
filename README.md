# Lighting Control App

## Installation

You'll need Node.js, npm, and Android Studio.

```
# if you need exponent:
npm install -g exp

# the rest:
npm install
exp prepare-detached-build
exp publish
```

## Running in development

First, start the exponent server:

```
exp start
```

Then open Android Studio, make sure Gradle is synced, and run the app.

## Debugging Redux Actions

- Install and start [React Native Debugger](https://github.com/jhen0409/react-native-debugger).
- Run `open "rndebugger://set-debugger-loc?host=localhost&port=19001"`
- Press Command+M in the Android Emulator and pick "Debug JS Remotely"

## Misc notes

We're using a [forked version of react-slider](https://github.com/streamplace/react-native-slider)
that allows for us to put content on the slider thumb thingy.
