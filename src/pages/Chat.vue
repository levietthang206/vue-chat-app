<template>
  <b-row>
    <b-col cols="12">
      <b-jumbotron class="jbt" header="Vue Chat App" lead="Writen by levietthang">
        <hr class="my-4">
        <h2>
          <p>Tên phòng</p>
          {{roomName}}
        </h2>
        <div class="messages chat-box" v-chat-scroll="{always: true, smooth: true}">
          <b-list-group>
            <b-list-group-item class="chat-item" v-for="(message, index) in messages" :key="index">
              <!-- Kiểm tra người vừa chat là bản thân hay bạn bè -->
              <div class="chat-message text-right" v-if="message.nickName === nickName">
                <div class="right-bubble">
                  <span class="msg-name">{{message.viewName}}</span>
                  <span class="msg-date">{{message.sendDate}}</span>
                  <p text-wrap>{{message.message}}</p>
                </div>
              </div>
              <div class="chat-message text-left" text-left v-if="message.nickName !== nickName">
                <div class="left-bubble">
                  <span class="msg-name">{{message.viewName}}</span>
                  <span class="msg-date">{{message.sendDate}}</span>
                  <p text-wrap>{{message.message}}</p>
                </div>
              </div>
            </b-list-group-item>
          </b-list-group>
          <CreateMessage />
        </div>
      </b-jumbotron>
    </b-col>
  </b-row>
</template>

<script>
import firebase, { firestore } from 'firebase/app'
import moment from 'moment' // chuyển timestamp thành thời gian thực
import 'firebase/firestore'
import CreateMessage from './../components/CreateMessage' // component nhập và gửi tin nhắn
export default {
  components: {
    CreateMessage
  },
  data() {
    return {
      roomName: this.$route.params.roomName,
      nickName: this.$route.params.nickName,
      messages: [],
    }
  },
  created() {
    // đọc tin nhắn từ firestore
    let ref = firebase.firestore().collection('chatrooms').doc(this.roomName).collection('messages').orderBy('sendDate');
    // sử dụng hàm onSnapshot để đọc dữ liệu mõi khi có thay đổi dữ liệu thời gian thực
    ref.onSnapshot(snapshot => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          let doc = change.doc
          // đẩy tin nhắn mới vào trong mảng messages
          this.messages.push({
            nickName: doc.data().name,
            viewName: doc.data().viewName,
            message: doc.data().message,
            sendDate: moment(doc.data().sendDate).format('LTS')
          })
        }
      });
    })
  },
}
</script>

<style scoped>
.jbt {
  position: fixed;
  width: 50%;
  left: 0px;
  top: 0px;
  height: 100%;
}
.chat-box {
  height: 100%;
  width: 100%;
  overflow: scroll;
  position: fixed;
  right: 0px;
  width: 50%;
  top: 0px;
}
.chat-item {
  border: none;
}
.chat-status {
  min-height: 49px;
}
.chat-status .chat-date {
  display: block;
  font-size: 10px;
  font-style: italic;
  color: #999;
  height: 15px;
  left: 10%;
  right:10%;
}
.chat-status .chat-content-center {
  padding: 5px 10px;
  background-color: #e1e1f7;
  border-radius: 6px;
  font-size: 12px;
  color: #555;
  height: 34px;
  left: 10%;
  right:10%;
}
.chat-message {
  width: 80%;
  min-height: 40px;
}
.chat-message .right-bubble {
  position: relative;
  background: #dcf8c6;
  border-top-left-radius: .4em;
  border-bottom-left-radius: .4em;
  border-bottom-right-radius: .4em;
  padding: 5px 10px 10px;
  left: 15%;
}
.chat-message .right-bubble span.msg-name {
  font-size: 12px;
  font-weight: bold;
  color: green;
  display: block;
}
.chat-message .right-bubble span.msg-date {
  font-size: 10px;
  display: block;
}
.chat-message .right-bubble:after {
  content: '';
  position: absolute;
  right: 0;
  top: 0;
  width: 0;
  height: 0;
  border: 27px solid transparent;
  border-left-color: #dcf8c6;
  border-right: 0;
  border-top: 0;
  margin-top: -0.5px;
  margin-right: -27px;
}
.chat-message .left-bubble {
  position: relative;
  background: #efefef;
  border-top-right-radius: .4em;
  border-bottom-left-radius: .4em;
  border-bottom-right-radius: .4em;
  padding: 5px 10px 10px;
  left: 5%;
}
.chat-message .left-bubble span.msg-name {
  font-size: 12px;
  font-weight: bold;
  color: blue;
  display: block;
}
.chat-message .left-bubble span.msg-date {
  font-size: 10px;
  display: block;
}
.chat-message .left-bubble:after {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 0;
  height: 0;
  border: 27px solid transparent;
  border-right-color: #efefef;
  border-left: 0;
  border-top: 0;
  margin-top: -0.5px;
  margin-left: -27px;
}
</style>