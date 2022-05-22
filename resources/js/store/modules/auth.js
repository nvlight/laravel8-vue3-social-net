import axios from "axios";

const state = {
    userDetails: {},
    loggedIn: false,
}

const actions = {

    registerUser({}, user){
        return new Promise((resolve, reject) => {
            axios
                .post(
                '/api/register', {
                    name:  user.name,
                    email: user.email,
                    password: user.password,
                    password_confirmation: user.password_confirmation,
                })
                .then( response => {
                    if (response.data) {
                        window.location.replace('/login')
                        resolve(response)
                    }else{
                        reject(response)
                    }
                })
                .catch( (error) => {
                    reject(error)
                })
        });
    },

    loginUser(ctx, payload){
        return new Promise( (resolve, reject) => {
            axios
                .post('/api/login', payload)
                .then( response => {
                    if (response.data.access_token) {
                        localStorage.setItem('token', response.data.access_token)
                        window.location.replace('/dashboard')
                    }else{
                        reject(response)
                    }
                })
                .catch( (error) => {
                    reject(error)
                })
        })
    }
}

const mutations = {

}

const getters = {
    loggedIn(state){
        return state.loggedIn
    },
    userDetails(state){
        return state.userDetails;
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters,
}
