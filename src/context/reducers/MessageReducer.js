import { MESSAGE } from "../actions/messageActions";
import messageState from "../states/messageState";

export default function MessageReducer(state, { type, payload }) {

  switch(type) {

    case MESSAGE.UNRECEIVED_COUNT_FETCHED:
      return {
        ...state,
        unreceivedCount: payload.count
      };

    case MESSAGE.CHAT_LIST_ERROR_CHANGED:
      return {
        ...state,
        chatsLoading: false,
        chatsError: payload.error
      };

    case MESSAGE.CHAT_LIST_FETCHING:
      return {
        ...state,
        chatsError: null,
        chatsLoading: true
      };

    case MESSAGE.CHAT_LIST_FETCHED: 
      return {
        ...state,
        chatsLoaded: true,
        chatsLoading: false,
        chatsEnded: payload.ended,
        chats: [...state.chats, ...payload.list],
        chatsPage: payload.list.length > 0 ? payload.list[payload.list.length - 1].messages[0].created_at : state.chatsPage
      };

    case MESSAGE.CHAT_READ:
      return {
        ...state,
        chats: state.chats.map(i=> {
          if (i.id === payload.chatId)
            i.messages[0].delivery_status = payload.deliveryStatus;
          
          return i;
        })
      };

    case MESSAGE.UNFETCHED:
      return {
        ...state,
        chat: messageState.chat,
        chatID: messageState.chatID,
        chatError: messageState.chatError,
        chatLoading: messageState.chatLoading,
        messages: messageState.messages,
        messagesLoading: messageState.messagesLoading,
        messagesError: messageState.messagesError,
        messagesLoaded: messageState.messagesLoaded,
        messagesPage: messageState.messagesPage,
        messagesEnded: messageState.messagesEnded
      };

    case MESSAGE.ERROR_CHANGED:
      return {
        ...state,
        chatLoading: false,
        chatID: payload.id, 
        chatError: payload.error
      }
    
    case MESSAGE.FETCHING:
      return {
        ...state,
        chatError: null,
        chatLoading: true
      };

    case MESSAGE.FETCHED:
      return {
        ...state,
        chatLoading: false,
        chat: payload.chat,
        chatID: payload.id
      };


    case MESSAGE.LIST_ERROR_CHANGED:
      return {
        ...state,
        messagesLoading: false,
        messagesError: payload.error
      };

    case MESSAGE.LIST_FETCHING:
      return {
        ...state,
        messagesError: null,
        messagesLoading: true
      };

    case MESSAGE.LIST_FETCHED: 
      return {
        ...state,
        messagesLoaded: true,
        messagesLoading: false,
        messagesEnded: payload.ended,
        messages: [...state.messages, ...payload.list],
        messagesPage: payload.list.length > 0 ? payload.list[payload.list.length - 1].created_at : state.messagesPage
      };

    case MESSAGE.SENT:
      return {
        ...state,
        messages: [payload, ...state.messages]
      };

    case MESSAGE.RECEIVED:
      return {
        ...state,
        chats: [payload.chat, ...state.chats.filter(i=> i.id !== payload.chat.id)],
        unreceivedCount: payload.member.id !== Number(state.chatID) ? (state.unreceivedCount + 1) : state.unreceivedCount,
        messages: payload.member.id === Number(state.chatID) ? 
          [payload.chat.messages[0], ...state.messages.filter(i=> i.id !== payload.chat.messages[0].id)] : state.messages
      };

    case MESSAGE.DELIVERED:
      return {
        ...state,
        chats: [payload.chat, ...state.chats.filter(i=> i.id !== payload.chat.id)],
        messages: state.messages.map((m)=> {
          if (m.clientId === payload.clientId) 
            m.id = payload.chat.messages[0].id;
            
          return m;
        })
      };
  

    default:
      return state;
  }
}
