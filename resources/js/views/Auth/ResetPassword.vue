<template>
    <div>
        <div class="alert" v-if="invalidCredentials">
            <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>
            Invalid Credentials
        </div>
        <validation-errors v-if="validationErrors" :errors="validationErrors"></validation-errors>
        <div class="reset-page">
            <form action="" class="form">
                <my-input type="text" placeholder="email address" v-model="user.email" />
                <my-input type="text" placeholder="new password" v-model="user.password" />
                <my-input type="text" placeholder="password confirm" v-model="user.password_confirmation" />
                <my-button type="submit" @click.prevent="sendForgotPassword">Reset password</my-button>
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
    name: "reset-password",
    components: {MyButton},
    created() {
        this.checkUserState();
    },
    data(){
        return {
            user: {
                email: "",
                password: "",
                password_confirmation: "",
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
            resetPassword: 'auth/resetPassword',
        }),
        sendForgotPassword(){
            const token = this.$route.params.token;
            this.resetPassword({...this.user, token })
            window.local.replace('/login');
        },
        checkUserState(){
            this.$store.dispatch('auth/setLoggedInstate', this.user);
        },
    },

}
</script>

<style lang="scss">
.reset-page{
    width: 360px;
    padding: 8% 0 0;
    margin: auto;
    display: flex;
}

</style>
