

define('extplug/inline-user-info/main',['require','exports','module','extplug/Plugin','plug/core/Events','jquery'],function (require, exports, module) {

  var Plugin = require('extplug/Plugin');
  var Events = require('plug/core/Events');
  var $ = require('jquery');

  var DATA_KEY = 'extplug-inline-user-info-added';

  var UserInfo = Plugin.extend({
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

    enable: function enable() {
      this.listenTo(Events, 'chat:afterreceive', this.onMessage);
    },

    onMessage: function onMessage(message, el) {
      if (!message.uid || el.data(DATA_KEY)) return;
      var user = API.getUser(message.uid);
      var un = el.find('.un');

      if (el.hasClass('inline')) {
        var text = user ? 'ID: ' + message.uid + ' | Level: ' + user.level : 'ID: ' + message.uid;
        un.attr('data-tooltip', text);
      } else {
        var uid = $('<span />').addClass('extplug-inline-id').text('ID: ' + message.uid).insertAfter(un);

        if (user) {
          $('<span />').addClass('extplug-inline-level').text('Level: ' + user.level).insertAfter(uid);
        }
      }

      el.data(DATA_KEY, true);
    }
  });

  module.exports = UserInfo;
});
