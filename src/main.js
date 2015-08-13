define(function (require, exports, module) {

  const Plugin = require('extplug/Plugin');
  const Events = require('plug/core/Events');
  const $ = require('jquery');

  const DATA_KEY = 'extplug-inline-user-info-added';

  const UserInfo = Plugin.extend({
    name: 'Inline User Info',
    description: 'Displays user IDs and levels inline in chat and user rollovers.',

    style: {
      '.extplug-inline-id, .extplug-inline-level': {
        'color': '#555d70'
      },
      '#chat-messages': {
        '.extplug-inline-id': {
          'padding-left': '5px'
        },
        '.extplug-inline-level::before': {
          'content': '"|"',
          'padding': '0 3px'
        }
      }
    },

    enable() {
      this.listenTo(Events, 'chat:afterreceive', this.onMessage);
    },

    onMessage(message, el) {
      if (!message.uid || el.data(DATA_KEY)) return;
      let user = API.getUser(message.uid);
      let un = el.find('.un');

      if (el.hasClass('inline')) {
        let text = user ? `ID: ${message.uid} | Level: ${user.level}` :
          `ID: ${message.uid}`;
        un.attr('data-tooltip', text);
      }
      else {
        let uid = $('<span />')
          .addClass('extplug-inline-id')
          .text(`ID: ${message.uid}`)
          .insertAfter(un);

        if (user) {
          $('<span />')
            .addClass('extplug-inline-level')
            .text(`Level: ${user.level}`)
            .insertAfter(uid);
        }
      }

      el.data(DATA_KEY, true);
    }
  });

  module.exports = UserInfo;

});
