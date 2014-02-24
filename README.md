# Keyboard
An object that gives the keyboard a first class identity, normalizes keyboard events across browsers, and allows binding to multiple keys.

## Example Usage

```javascript
// create a new Keyboard object that is scoped to a specific DOM element or the window
var kb = new Keyboard(window);

// when both ctrl+a are pressed together
kb.on('ctrl+a', 'activate', function(e){ /***/ });

// when a, then be, then c are pressed in sequence and released
kb.on('a->b->c', 'release', function(e){ /***/ });

// when any key is first pressed (including modifiers such as shift/control/etc.)
kb.on('*', 'activate', function(e){ /***/ })

// when any key is activated, pressed, repeats, released
kb.on('*', function(e){
  console.log(e.action); // one of ['activate', 'repeat', 'release', 'press']
});
```

## API

* __new Keyboard(view)__  
    *view*: a Window, Document, or Element which will be listened to

* __keyboard.on(keyCombo, [filter], callback)__  
    *keyCombo*: a string that can be any key name or a combination of key names separated by '+' or '->'. The '+' combinator requires the keys be held together, '->' requires they be pressed in a specific sequence.  

    *filter*: optional and must be one
    *   *activate*: when a key is first depressed
    *   *repeat*: when a keydown due to the key being held down
    *   *release*: fires on keyup
    *   *press*: fires on keypress

    *callback*: called with the keyboardEvent object if the keyCombo was a single key, or an array of keyboardEvent objects if the keyCombo was a combinator.

* __keyboardEvent.action__  
    What type of action the event originated from. Same as the above filter types.

## Support and Contribution

This project "Keyboard2" was forked from the Brandon Benvie's project "Keyboard"(https://github.com/Benvie/Keyboard) on Feb 24, 2014 by Ilya Lakhin by the terms of MIT license, since the author has abandoned original project, and doesn't manage neither Issues, nor email requests.

The motivation of this fork was support of CommonJS interface for Browserify and RequireJS. But as far Brandon is away(I hope he is ok) I will manage the project: fix bugs, implement new features by request etc. So please feel free to contribute in this project, or ask support in any form convenient for you.

When Brendon return back, I believe we will push all the changes made in the Keyboard2 to the original project back.

 * [Issue tracker](https://github.com/Eliah-Lakhin/Keyboard2/issues).
 * My email and jabber: eliah.lakhin [at] gmail.com.
 * My skype: "eliah.lakhin".
