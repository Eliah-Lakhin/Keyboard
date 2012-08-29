void function(){


var keyNames = {
 Unknown           :   0,
 Mouse1            :   1,
 Mouse2            :   2,
 Break             :   3,
 Mouse3            :   4,
 Mouse4            :   5,
 Mouse5            :   6,
 Backspace         :   8,
 Tab               :   9,
 Clear             :  12,
 Enter             :  13,
 Shift             :  16,
 Control           :  17,
 Alt               :  18,
 Pause             :  19,
 CapsLock          :  20,
 IMEHangul         :  21,
 IMEJunja          :  23,
 IMEFinal          :  24,
 IMEKanji          :  25,
 Escape            :  27,
 IMEConvert        :  28,
 IMENonconvert     :  29,
 IMEAccept         :  30,
 IMEModechange     :  31,
 Space             :  32,
 PageUp            :  33,
 PageDown          :  34,
 End               :  35,
 Home              :  36,
 Left              :  37,
 Up                :  38,
 Right             :  39,
 Down              :  40,
 Select            :  41,
 Print             :  42,
 Execute           :  43,
 Snapshot          :  44,
 Insert            :  45,
 Delete            :  46,
 Help              :  47,
 0                 :  48,
 1                 :  49,
 2                 :  50,
 3                 :  51,
 4                 :  52,
 5                 :  53,
 6                 :  54,
 7                 :  55,
 8                 :  56,
 9                 :  57,
 A                 :  65,
 B                 :  66,
 C                 :  67,
 D                 :  68,
 E                 :  69,
 F                 :  70,
 G                 :  71,
 H                 :  72,
 I                 :  73,
 J                 :  74,
 K                 :  75,
 L                 :  76,
 M                 :  77,
 N                 :  78,
 O                 :  79,
 P                 :  80,
 Q                 :  81,
 R                 :  82,
 S                 :  83,
 T                 :  84,
 U                 :  85,
 V                 :  86,
 W                 :  87,
 X                 :  88,
 Y                 :  89,
 Z                 :  90,
 MetaLeft          :  91,
 MetaRight         :  92,
 Menu              :  93,
 Sleep             :  95,
 Num0              :  96,
 Num1              :  97,
 Num2              :  98,
 Num3              :  99,
 Num4              : 100,
 Num5              : 101,
 Num6              : 102,
 Num7              : 103,
 Num8              : 104,
 Num9              : 105,
'Num*'             : 106,
'Num+'             : 107,
 NumEnter          : 108,
'Num-'             : 109,
'Num.'             : 110,
'Num/'             : 111,
 F1                : 112,
 F2                : 113,
 F3                : 114,
 F4                : 115,
 F5                : 116,
 F6                : 117,
 F7                : 118,
 F8                : 119,
 F9                : 120,
 F10               : 121,
 F11               : 122,
 F12               : 123,
 F13               : 124,
 F14               : 125,
 F15               : 126,
 F16               : 127,
 F17               : 128,
 F18               : 129,
 F19               : 130,
 F20               : 131,
 F21               : 132,
 F22               : 133,
 F23               : 134,
 F24               : 135,
 NumLock           : 144,
 ScrollLock        : 145,
 ShiftLeft         : 160,
 ShiftRight        : 161,
 ControlLeft       : 162,
 ControlRight      : 163,
 AltLeft           : 164,
 AltRight          : 165,
 BrowserBack       : 166,
 BrowserForward    : 167,
 BrowserRefresh    : 168,
 BrowserStop       : 169,
 BrowserSearch     : 170,
 BrowserFavorites  : 171,
 BrowserHome       : 172,
 VolumeMute        : 173,
 VolumeDown        : 174,
 VolumeUp          : 175,
 NextTrack         : 176,
 PrevTrack         : 177,
 Stop              : 178,
 PlayPause         : 179,
 LaunchMail        : 180,
 LaunchMediaSelect : 181,
 LaunchApp1        : 182,
 LaunchApp2        : 183,
 ';'               : 186,
 '='               : 187,
 ','               : 188,
 '-'               : 189,
 '.'               : 190,
 '/'               : 191,
 '`'               : 192,
 '['               : 219,
 '\\'              : 220,
 ']'               : 221,
 '\\'              : 222,
 Meta              : 223,
 AltGr             : 226,
 IMEProcess        : 229,
 0x00              : 231,
 Attention         : 246,
 Crsel             : 247,
 Exsel             : 248,
 EraseEOF          : 249,
 Play              : 250,
 Zoom              : 251,
 NoName            : 252,
 Clear             : 254,
};

var keyCodes = {};
for (var k in keyNames)
  keyCodes[keyNames[k]] = k;


var shiftNumpad = {
  12: 101,
  13: 108,
  33: 105,
  34: 99,
  35: 97,
  36: 103,
  37: 100,
  38: 104,
  39: 102,
  40: 98,
  45: 96,
};

function whatKey(evt){
  var key = keyCodes[evt.keyCode];
  evt.shift = evt.shiftKey;
  if (key) {
    if (evt.keyLocation === 3) {
      var mapped = shiftNumpad[evt.keyCode];
      if (mapped) {
        evt.shift = evt.shiftKey && evt.keyCode !== 13;
        return keyCodes[mapped];
      }
    }
    return key;
  } else if (evt.keyIdentifier) {
    return evt.keyIdentifier;
  } else {
    return String.fromCharCode(evt.keyCode);
  }
}

function Keyboard(view){
  var self = this;
  this.keys = {};
  this.view = view;
  this.ctrl = false;
  this.shift = false;
  this.alt = false;
  this.meta = false;

  var down = Object.create(null);

  view.addEventListener('keydown', function(e){
    self.update(e);
    e.name = whatKey(e);
    if (down[e.name]) {
      e.action = 'repeat';
      self.emit(e);
    } else {
      e.action = 'activate';
      down[e.name] = true;
      self.lastKey = e.name;
      self.emit(e);
    }
  }, true);
  view.addEventListener('keyup', function(e){
    self.update(e);
    e.action = 'release';
    self.lastKey = e.name = whatKey(e);
    self.emit(e);
    down[e.name] = null;
  }, true);
  view.addEventListener('keypress', function(e){
    self.update(e);
    e.action = 'press';
    self.lastKey = e.name = String.fromCharCode(e.keyCode);
    self.emit(e);
  }, true);
}

Keyboard.LOCATION = {
  STANDARD : 0,
  LEFT     : 1,
  RIGHT    : 2,
  NUMPAD   : 3,
  MOBILE   : 4,
  JOYSTICK : 5
};

Keyboard.keyCodes = keyCodes;
Keyboard.keyNames = keyNames;

Keyboard.prototype = {
  constructor: Keyboard,
  update: function update(evt){
    this.lastEvent = evt;
    this.ctrl = evt.ctrlKey;
    this.shift = evt.shift;
    this.alt = evt.altKey;
    this.meta = evt.metaKey;
    this.altgr = evt.altGraphKey;
  },
  emit: function emit(evt){
    var listeners = this.keys['*'];
    if (listeners) {
      for (var i=0; i < listeners.length; i++) {
        listeners[i](evt);
      }
    }

    listeners = this.keys[this.lastKey];
    if (listeners) {
      for (var i=0; i < listeners.length; i++) {
        listeners[i](evt);
      }
    }
  },
  on: function on(bind, listener){
    var self = this,
        current = 0,
        events = [],
        keys = bind.split('->');

    if (bind === '*') {

      var listeners = this.keys['*'] || (this.keys['*'] = []);
      listeners.push(function(evt){
        listener.call(self, evt);
      });

    } else if (keys.length > 1) {

      keys.forEach(function(key, index){
        var listeners = self.keys[key] || (self.keys[key] = []);
        listeners.push(function(evt){
          if (evt.action === 'activate' && events.length === index) {
            events.push(evt);
            if (index === keys.length - 1) {
              listener.apply(self, events);
              events.length = 0;
            }
          } else {
            events.length = 0;
          }
        });
      });

    } else if ((keys = bind.split('+')).length > 1) {

      keys.forEach(function(key, index){
        var listeners = self.keys[key] || (self.keys[key] = []);
        listeners.push(function(evt){
          if (evt.action === 'activate') {
            current++;
            events[index] = evt;
            if (events.length === keys.length) {
              listener.apply(self, events);
              events.length = 0;
            }
          } else if (evt.action === 'release') {
            current--;
            events[index] = null;
          }
        });
      });

    } else {
      var listeners = self.keys[bind] || (self.keys[bind] = []);
      listeners.push(function(evt){
        listener.call(self, evt);
      });
    }
  }
};

window.Keyboard = Keyboard;
window.keyboard = new Keyboard(window);
}();
