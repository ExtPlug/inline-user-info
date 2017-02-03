import Plugin from 'extplug/Plugin';
import Events from 'plug/core/Events';
import $ from 'jquery';
import style from './style.css';

const DATA_KEY = 'extplug-inline-user-info-added';

const UserInfo = Plugin.extend({
  name: 'Inline User Info',
  description: 'Displays user IDs and levels inline in chat and user rollovers.',

  style,

  enable() {
    this.listenTo(Events, 'chat:afterreceive', this.onMessage);
  },

  onMessage(message, el) {
    if (!message.uid || el.data(DATA_KEY)) return;
    const user = API.getUser(message.uid);
    const un = el.find('.un');

    if (el.hasClass('inline')) {
      const text = user
        ? `ID: ${message.uid} | Level: ${user.level}`
        : `ID: ${message.uid}`;
      un.attr('data-tooltip', text);
    } else {
      const uid = $('<span />')
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

export default UserInfo;
