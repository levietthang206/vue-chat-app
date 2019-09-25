<template>
    <b-row>
        <b-col cols="12">
            <b-jumbotron header="Vue Chat App" lead="Writen by levietthang">
                <hr class="my-4">
                <h2>
                    Room List
                </h2>
                <b-list-group>
                    <!-- Ấn vào phòng, truyền sang Chat.vue nickname, roomName(tên phòng), tên hiển thị -->
                    <b-list-group-item v-for="(room, index) in listRooms" :key="index" :to="{name: 'Chat', params: {nickName: currentUser.nickname, roomId: index, roomName: room.id, viewName: currentUser.viewname}}" action>
                        <p>{{room.id}}</p>
                    </b-list-group-item>
                </b-list-group>
            </b-jumbotron>
        </b-col>
    </b-row>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/firestore'
export default {
    name: 'RoomList',
    data() {
        return {
            listRooms: [], // Lưu danh sách phòng
            currentUser: '' // info người dùng hiện tại
        }
    },
    created() {
        // Đọc danh sách phòng, đẩy vào biến listRoom thông qua nickname của user được lưu trong localStorage, lấy những phòng user được phân quyền
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'))
        firebase.firestore().collection('room_enrollments').where(this.currentUser.nickname, '==', true).get().then((snapShot)=>{
            this.listRooms = snapShot.docs
        })
    },
}
</script>

<style scoped>
.nav-page {
    float: right;
}
</style>