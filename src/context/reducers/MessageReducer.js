import { MESSAGE } from "../actions/messageActions";
import messageState from "../states/messageState";

export default function MessageReducer(state, { type, payload }) {

  switch(type) {

    case MESSAGE.UNRECEIVED_COUNT_FETCHED:
      return {
        ...state,
        unreceivedCount: payload.count
      };

    case MESSAGE.RECEIVED:
      return {
        ...state,
        chats: [payload, ...state.chats.filter(i=> i.id !== payload.id)]
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


    case MESSAGE.UNFETCHED:
      return {
        ...state,
        chat: messageState.chat,
        chatID: messageState.chatID,
        chatError: messageState.chatError,
        chatLoading: messageState.chatLoading,
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

    default:
      return state;
  }
}
