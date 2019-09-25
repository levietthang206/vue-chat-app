<template>
  <footer class="sticky-footer">
    <b-form @submit.prevent="onSubmit">
      <b-input-group>
          <b-form-input id="message" v-model.trim="data.message" placeholder="Enter your message"></b-form-input>
          <b-button type="submit" variant="dark" :disabled="!data.message">Send</b-button>
      </b-input-group>
    </b-form>
  </footer>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/firestore'
export default {
  name: 'CreateMessage',
  data () {
    return {
      roomName: this.$route.params.roomName,
      nickName: this.$route.params.nickName,
      viewName: JSON.parse(localStorage.getItem('currentUser')).viewname,
      data: { message:'' },
    }
  },
  methods: {
    // Hàm xử lí gửi tin nhắn
    onSubmit() {
      // đẩy tin nhắn mới lên doccument
      let newMessage = firebase.firestore().collection('chatrooms').doc(this.roomName).collection('messages').add({
          message: this.data.message,
          name: this.nickName,
          viewName: this.viewName,
          sendDate: Date.now()
      }).then(()=>{
        // Sau khi gửi, làm mới ô chat
          this.data.message = '';
      })
    }
  }
}
</script>

<style scoped>
</style>
