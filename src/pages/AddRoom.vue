<template>
    <b-row>
        <b-col cols="12">
            <b-jumbotron header="Vue Chat App" lead="Writen by levietthang">
                <hr class="my-4">
                <h2>
                    Add Room
                    <b-link @click="$router.go(-1)">Room List</b-link>
                </h2>
                <b-jumbotron>
                    <b-form @submit.prevent="onSubmit">
                        <b-form-group>
                            <b-form-input id="roomname" v-model.trim="room.roomName" placeholder="Enter Room Name"></b-form-input>
                        </b-form-group>
                        <b-button type="submit" variant="dark" :disabled="!room.roomName">Save</b-button>
                    </b-form>
                </b-jumbotron>
            </b-jumbotron>
        </b-col>
    </b-row>
</template>

<script>
export default {
    name: 'AddRoom',
    data() {
        return {
            room: { 
                roomName: '' 
            },
        }
    },
    methods: {
        onSubmit() {
            // let db = firebase.firestore();
            // db.collection('chatrooms').doc(this.room.roomName).set({}).then(function () {
            //     console.log('Document Added ');
            // })
            // .catch(function (error) {
            //     console.error('Error adding document: ', error);
            // });;
        }
    }
}
</script>

<style scoped>

</style>