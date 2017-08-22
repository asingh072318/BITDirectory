import { State, Effect, Actions } from "jumpstate";

export const vajra = State("VajraApp", {
  // Initial State should be starts with the key 'initial': ...
  initial: {
    games: [],
    images: {},
    apiStatus: 100
  },
  updateGames(state, payload) {
    state.games = payload;
    return { ...state };
  },
  updateImages(state, payload) {
    state.images = payload;
    state.apiStatus = 200;
    return { ...state };
  },
  // Action 1
  getTodos(state, payload) {
    // merging the new todos to todos list
    let todos = payload;
    return todos;
  },
  // Action 2
  addTodo(state, todo) {
    return [...state, todo];
  },
  // Action 3
  removeTodo(state, todoId) {
    try {
      let todoIndex = state.findIndex(todo => todo.id === todoId);
      state.splice(todoIndex, 1);
    } catch (error) {
      console.log(error);
    }
    return todos;
  }
});
