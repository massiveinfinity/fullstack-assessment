import m from 'mithril';

/**
  * @param {String} color - button color
  * @param {String} text - text for button
  * @param {Object} attrs - attributes for button, eg style, className
  */
export default class Button {
  static render(options) {
    const { color, text, attrs } = options;
    return m('button.btn.btn-' + color, attrs, text);
  }
}
