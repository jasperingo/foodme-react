import { io } from "socket.io-client";
import Fetch from "./Fetch";

export default class MessageRepository {

  static socket = null;

  constructor(apiToken = null) {
    MessageRepository.createSocket(apiToken);
  }

  static createSocket(apiToken = null) {
    if (this.socket === null) {
      this.socket = io(Fetch.API_DOMAIN, {
        extraHeaders: {
          Authorization: `Bearer ${apiToken}`
        }
      });
    }
  }

  getUnreceivedCount() {
    MessageRepository.socket.emit('unreceived_messages_count');
  }

  onGetUnreceivedCount(listener) {
    MessageRepository.socket.once('unreceived_messages_count', listener);
  }

  onGetMessage(listener) {
    MessageRepository.socket.on('message', listener);
    return function() {
      MessageRepository.socket.off('message', listener);
    }
  }

  getMessageRecipients(lastDate) {
    MessageRepository.socket.emit('message_recipients', lastDate, Fetch.PAGE_LIMIT_BIG);
  }

  onGetMessageRecipients(listener) {
    MessageRepository.socket.on('message_recipients', listener);
    return function() {
      MessageRepository.socket.off('message_recipients', listener);
    }
  }

  getMessageRecipient(id) {
    MessageRepository.socket.emit('message_recipient', id);
  }

  onGetMessageRecipient(listener) {
    MessageRepository.socket.on('message_recipient', listener);
    return function() {
      MessageRepository.socket.off('message_recipient', listener);
    }
  }

  getMessages(id, lastDate) {
    MessageRepository.socket.emit('messages', id, lastDate, Fetch.PAGE_LIMIT_BIG);
  }

  onGetMessages(listener) {
    MessageRepository.socket.on('messages', listener);
    return function() {
      MessageRepository.socket.off('messages', listener);
    }
  }

}
