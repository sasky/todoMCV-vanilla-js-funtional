let state = {
  page: "home",
  todos: [],
};
let schemas = [];
export const Page  = {
    ALL: "all",
    FILTERED: "filtered",
}

export class State {
  #page = ""
  #idLedger = 0;
  #todos = [];
  constructor(state) {
  }
  set page(page = ''){

      this.#page = page;
  }

  toObject() {
    return {
      page: this.#page,
      idLedger: this.#idLedger,
      todos: this.#todos,
    };
  }
  // or perhaps json encode-> decode for a deeper copy
  // get state() {return Object.freeze({...state})}
  // 		 new State(JSON.parse(window.localStorage.getItem(engine.config.localStorageKey)));
}
