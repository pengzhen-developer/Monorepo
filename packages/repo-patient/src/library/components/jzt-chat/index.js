import JztChat from './src/chat';

JztChat.install = function(Vue) {
  Vue.component(JztChat.name, JztChat);
};

export default JztChat;
