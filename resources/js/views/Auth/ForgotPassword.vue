<template>
    <div>
        <div class="alert" v-if="invalidCredentials">
            <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>
            Invalid Credentials
        </div>
        <validation-errors v-if="validationErrors" :errors="validationErrors"></validation-errors>
        <div class="forgot-page">
            <form action="" class="form">
                <my-input type="text" placeholder="email address" v-model="user.email" />
                <my-button type="submit" @click.prevent="sendForgotPassword">Send email</my-button>
                <router-link to="/login">
                    <p class="message">Go to login page <a href="#">Sign In</a></p>
                </router-link>
            </form>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import MyButton from "../../components/ui/MyButton";
export default {
    name: "forgot-password",
    components: {MyButton},
    created() {
        this.checkUserState();
    },
    data(){
        return {
            user: {
                email: "",
            }
        }
    },
    computed: {
        ...mapGetters({
            invalidCredentials: 'auth/invalidCredentials',
            validationErrors: 'auth/errors'
        })
    },
    methods: {
        ...mapActions({
            checkUserState: 'auth/setLoggedInstate',
            forgotPassword: 'auth/forgotPassword',
        }),
        sendForgotPassword(){
            this.$store.dispatch('auth/forgotPassword', this.user)
        },
        checkUserState(){
            this.$store.dispatch('auth/setLoggedInstate', this.user);
        },
    },

}
</script>

<style lang="scss">
.forgot-page{
    width: 360px;
    padding: 8% 0 0;
    margin: auto;
    display: flex;
}

.alert{
    padding: 20px;
    background-color: #f44336;
    color: white;
    margin-bottom: 15px;
}
.closebtn{
    margin-left: 15px;
    color: white;
    font-weight: bold;
    float: right;
    font-size: 22px;
    line-height: 20px;
    cursor: pointer;
    transition: 0.3s;

}
.closebtn:hover{
    color: black;

}
</style>
