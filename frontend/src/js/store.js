import { createStore } from 'vuex'

const state = {
  movies: [],
  user: [],
  currentUser: [],
  currentMovie: [],
  online: false 
}

const mutations = {
  setMovie(state, list) { 
    state.movies = list
  },
  setUser(state, list) {
    state.user = list
  },
  addUser(state, user) {
    state.user.push(user);
  },
  addCurrentUser(state, user) {
    state.currentUser.push(user);
  },
  setOnline(state) {
    state.online = true;
  },
  setCurrentMovie(state, movie) {
    state.currentMovie = movie;
  }
}

const actions = {
  async fetchMovie(store) { 
    let list = await fetch('/rest/movie')
    list = await list.json();

    console.log(list);
    store.commit('setMovie', list)
  },
  async fetchUsers(store) {
    let list = await fetch('/rest/user')
    list = await list.json();

    console.log(list);
    store.commit('setUser', list)
  },
  async addUser(store, user) {
    let newUser =
    {
      firstName: user.name,
      lastName: user.lastName,
      email: user.email,
      password: user.password
    };
    let response = await fetch('/rest/user', {
      method: 'POST',
      body: JSON.stringify(newUser)
    })
    store.commit('addUser', newUser);
  }
}

export default createStore({ state, mutations, actions })