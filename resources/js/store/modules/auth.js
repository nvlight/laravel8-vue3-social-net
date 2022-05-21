import axios from "axios";

const state = {
    userDetails: {},
    loggedIn: false,
}

const actions = {

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
