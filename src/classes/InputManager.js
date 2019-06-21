const KEY = {
  LEFT: 'ArrowLeft',
  RIGHT: 'ArrowRight',
  UP: 'ArrowUp',
  DOWN: 'ArrowDown',
  A: 'a',
  D: 'd',
  W: 'w',
  S: 's',
  SPACE: ' ',
  ENTER: 'Enter',
};

export default class InputManager {
  constructor() {
    this.pressedKeys = {
      left: false,
      right: false,
      up: false,
      down: false,
      space: false,
      enter: false,
    };
  }

  handleKeys(value, e) {
    const keys = this.pressedKeys;
    switch (e.key) {
      case KEY.LEFT:
      case KEY.A:
        keys.left = value;
        break;
      case KEY.RIGHT:
      case KEY.D:
        keys.right = value;
        break;
      case KEY.UP:
      case KEY.W:
        keys.up = value;
        break;
      case KEY.DOWN:
      case KEY.S:
        keys.down = value;
        break;
      case KEY.SPACE:
        keys.space = value;
        break;
      case KEY.ENTER:
        keys.enter = value;
        break;
      default:
        break;
    }

    this.pressedKeys = keys;
  }

  bindKeys() {
    window.addEventListener('keyup', this.handleKeys.bind(this, false));
    window.addEventListener('keydown', this.handleKeys.bind(this, true));
  }

  unbindKeys() {
    window.removeEventListener('keyup', this.handleKeys);
    window.removeEventListener('keydown', this.handleKeys);
  }
}
