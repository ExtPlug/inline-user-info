define(function (require, exports, module) {

  const Plugin = require('extplug/Plugin');

  const UserInfo = Plugin.extend({
    name: 'Moderation: User Info',
    description: 'Displays user IDs and levels inline in chat and user rollovers.',

    enable() {
      // code to start your plugin
    },

    disable() {
      // code to undo what you did in enable()
    }
  });

  module.exports = UserInfo;

});
