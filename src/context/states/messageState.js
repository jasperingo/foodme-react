
const messageState = {

  unreceivedCount: 0,
  
  chats: [],
  chatsLoading: false,
  chatsError: null,
  chatsLoaded: false,
  chatsPage: null,
  chatsEnded: false,

  chat: null,
  chatID: null,
  chatError: null,
  chatLoading: false,

  messages: [],
  messagesLoading: false,
  messagesError: null,
  messagesLoaded: false,
  messagesPage: null,
  messagesEnded: false,
  
};

export default messageState;
