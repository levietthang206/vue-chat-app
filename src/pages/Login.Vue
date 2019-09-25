<template>
    <b-row>
        <b-col cols="12">
            <b-jumbotron header="Vue Chat App" lead="Writen by levietthang">
                <hr class="my-4">
                <h2>Login</h2>
                <b-form @submit.prevent="onSubmit">
                    <b-form-group>
                        <b-form-input id="nickname" v-model.trim="login.nickname" placeholder="Enter your nickname (Viết liền, không dấu)"></b-form-input>
                        <b-form-input id="viewname" v-model.trim="login.viewname" placeholder="Enter your tên hiển thị"></b-form-input>
                    </b-form-group>
                    <b-button type="submit" variant="dark" :disabled="!login.nickname" >Login</b-button>
                </b-form>
            </b-jumbotron>
        </b-col>
    </b-row>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/firestore'
export default {
    name: 'Login',
    data() {
        return {
            login: {
                nickname: '',   // nickname
                viewname: ''    // tên hiển thị
            }
        }
    },
    created() {
    // Quay lại trang chủ, người dùng phải nhập lại nickname để vào lại, không tự động đăng nhập lần sau
        if(localStorage.getItem('currentUser')) {
            localStorage.removeItem('currentUser')
        }
    },
    methods: {
        onSubmit() {
            // Lưu thông tin user (nickname, tên hiển thị) lên firestore
            let refUser = firebase.firestore().collection("users").doc(this.login.nickname).set({
                nickname: this.login.nickname,
                viewname: this.login.viewname
            }).then(()=>{
            // Đăng kí thành công, chuyển sang trang danh sách các phòng
                localStorage.setItem('currentUser', JSON.stringify(this.login))
                this.$router.push({name: 'RoomList', params: { login: this.login }})
            })
        }
    }
}
</script>

<style scoped>

</style>