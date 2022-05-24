import axios from "axios";

const state = {
    userDetails: {},
    isLoggedIn: true,
    errors: [],
    invalidCredentials: '',
}

const actions = {

    registerUser(ctx, user){
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
                    //reject(error)
                    if(error.response.status === 422){
                        ctx.commit('setErrors', error.response.data.errors)
                    }
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
                    //reject(error)
                    //console.log(error.response)
                    if (error.response.data.error){
                        ctx.commit('setInvalidCredentials', error.response.data.error)
                    }else if(error.response.status === 422){
                        ctx.commit('setErrors', error.response.data.errors)
                    }
                })
        })
    },

    logoutUser(ctx){
        return new Promise( (resolve) => {
            localStorage.removeItem('token');
            ctx.commit('auth/setLoggedIn', false);
            resolve(true);
            window.location.replace('login');
        })
    },

    setLoggedInstate(ctx){
        return new Promise( (resolve) => {
            if (localStorage.getItem('token')){
                ctx.commit('setLoggedIn', true);
                resolve(true)
            }
            ctx.commit('setLoggedIn', false);
            resolve(false)
        })
    }
}

const mutations = {
    setLoggedIn(state, payload){
        state.isLoggedIn = payload;
    },
    setErrors(state, errors){
        state.errors = errors
    },
    setInvalidCredentials(state, invalidCredentials){
        state.invalidCredentials = invalidCredentials
    }
}

const getters = {
    loggedIn(state){
        return state.isLoggedIn
    },
    userDetails(state){
        return state.userDetails;
    },
    errors(state){
        return state.errors
    },
    invalidCredentials(state){
        return state.invalidCredentials;
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters,
}
