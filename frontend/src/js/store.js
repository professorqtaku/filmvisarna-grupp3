import { createStore } from 'vuex'

const state = {
  movies: [],
  salons: [],
  user: null,
  //holds the current show
  currentUserTickets: [],
  //all the shows for the specific movie
  currentShows: [],
  currentSalon: [],
  //the movie the user selected
  selectedMovie: {},
  selectedSeatsAmount: '',
  clearTheSeats: false,
  showById: ''

}

const mutations = {
  setMovie(state, movies) {
    state.movies = movies
  },
  setSelectedMovie(state, movie) {
    state.selectedMovie = movie
  },
  setUser(state, user) {
    state.user = user
  },
  setSalons(state, list) {
    state.salons = list
  },
  addCurrentUserTickets(state, tickets) {
    state.currentUserTickets.push(tickets)
  },
  setCurrentUserTickets(state, tickets) {
    state.currentUserTickets = tickets
  },
  setCurrentShow(state, shows) {
    state.currentShows = shows
  },
  setCurrentSalon(state, salon) {
    state.currentSalon = salon
  },
  setSelectedSeatsAmount(state, amount) {
    state.selectedSeatsAmount = amount;
  },
  decreaseSeats(state) {
    state.selectedSeatsAmount--;
  },
  clearSeats(state) {
    state.selectedSeatsAmount = '';
  },
  updateClearTheSeats(state) {
    state.clearTheSeats = !state.clearTheSeats
  },
  setShowById(state, showById) {
    state.showById = showById
  }
}

const actions = {
  async fetchMovie(store) {
    let list = await fetch("/rest/movie");
    list = await list.json();
    store.commit("setMovie", list);
  },

  async register(store, member) {
    let newUser = {
      firstName: member.name,
      lastName: member.lastName,
      email: member.email,
      password: member.password,
    };
    let user = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify(newUser),
    });
    try {
      user = await user.json();
      store.commit("setUser", user);
      return true
    } catch (error) {
      console.warn("Bad credentials");
      return false
    }
  },

  async login(store, credentials) {
    let user = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });

    try {
      user = await user.json();
      await store.commit("setUser", user);
    } catch (error) {
      console.warn("Bad credentials");
      await store.commit("setUser", null);
    }
  },

  async whoAmI(store) {
    let user = await fetch("/api/whoami");
    try {
      user = await user.json();
      store.commit("setUser", user);
    } catch (error) { console.warn("Bad credentials"); }
  },

  async addTicket(store, ticket) {
    let newTicket = {
      price: ticket.price,
      timeStamp: ticket.timeStamp,
      seats: ticket.seats,
      userId: ticket.userId,
      showId: ticket.showId,
      movieId: state.selectedMovie.id,
      salonName: ticket.salonName
    };
    let response = await fetch("/rest/ticket", {
      method: "POST",
      body: JSON.stringify(newTicket),
    });

    try {
      response = await response.json();
      return true
    } catch (error) {
      console.warn("Seats already taken");
      return false
    }
  },

  async fetchTicketsFromUser(store, userId) {
    let list = await fetch("/rest/user/get-ticket/" + userId);
    list = await list.json();
    if (list.length) {
      store.commit("setCurrentUserTickets", list);
    } else {
      store.commit("setCurrentUserTickets", []);
    }
  },

  async fetchShows(store, movieId) {
    let list = await fetch("/rest/movie/get-show/" + movieId);
    list = await list.json();
    if (list.length) {
      store.commit("setCurrentShow", list);
    } else {
      store.commit("setCurrentShow", []);
    }
  },

  async fetchShowById(store, showId) {
    let show = await fetch("/rest/show/" + showId)
    show = await show.json()
  
    store.commit("setShowById", show);
  },

  async fetchSalons(store) {
    let list = await fetch("/rest/salon");
    list = await list.json();

    store.commit("setSalons", list);
  },

  async fetchSpecificSalon(store, showId) {
    let list = await fetch("/rest/show/get-salon/" + showId);
    try {
      list = await list.json();
      store.commit("setCurrentSalon", list);
    } catch (error) {
      console.warn("No show found");
    }
  },

  async increaseSeatsInShow(store, showInfo) {
    fetch(
      "/rest/show/increase-seats/" + showInfo.showId + "/" + showInfo.seats,
      {
        method: "PUT",
      }
    );
  },
};

export default createStore({ state, mutations, actions })