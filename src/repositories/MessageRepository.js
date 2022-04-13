import { io } from "socket.io-client";
import Fetch from "./Fetch";

export default class MessageRepository {

  static repo = null;

  socket = null;

  constructor(apiToken = null) {
    this.socket = io(Fetch.API_DOMAIN, {
      extraHeaders: {
        Authorization: `Bearer ${apiToken}`
      }
    });
  }

  static getInstance(apiToken = null) {
    if (this.repo === null)
      this.repo = new MessageRepository(apiToken);
    
    return this.repo;
  }

  closeSocket() {
    this.socket.disconnect();
    this.socket = null;
  }

  getUnreceivedCount() {
    this.socket.emit('unreceived_messages_count');
  }

  onGetUnreceivedCount(listener) {
    this.socket.once('unreceived_messages_count', listener);
  }

  onGetMessage(listener) {
    this.socket.on('message', listener);
    return (function() {
      this.socket.off('message', listener);
    }).bind(this);
  }

  getMessageRecipients(lastDate) {
    this.socket.emit('message_recipients', lastDate, Fetch.PAGE_LIMIT_BIG);
  }

  onGetMessageRecipients(listener) {
    this.socket.on('message_recipients', listener);
    return (function() {
      this.socket.off('message_recipients', listener);
    }).bind(this);
  }

  getMessageRecipient(id) {
    this.socket.emit('message_recipient', id);
  }

  onGetMessageRecipient(listener) {
    this.socket.on('message_recipient', listener);
    return (function() {
      this.socket.off('message_recipient', listener);
    }).bind(this);
  }

  onGetApplicationSupport(listener) {
    this.socket.on('application_support', listener);
    return (function() {
      this.socket.off('application_support', listener);
    }).bind(this);
  }

  getApplicationSupport() {
    this.socket.emit('application_support');
  }

  getMessages(id, lastDate) {
    this.socket.emit('messages', id, lastDate, Fetch.PAGE_LIMIT_BIG);
  }

  onGetMessages(listener) {
    this.socket.on('messages', listener);
    return (function() {
      this.socket.off('messages', listener);
    }).bind(this);
  }

  createMessage(receiverId, content) {
    this.socket.emit('message', receiverId, content);
  }

  onMessageCreated(listener) {
    this.socket.on('message_created', listener);
    return (function() {
      this.socket.off('message_created', listener);
    }).bind(this);
  }

  updateMessageDeliveryStatus(receiverId) {
    this.socket.emit('messages_update_delivery_status', receiverId);
  }

}
