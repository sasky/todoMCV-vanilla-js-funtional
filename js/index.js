"use strict";
// helpers

// STATE
// class Todo {
// 	id: = 0
// 	title = ''
// 	completed = false
// }

// export function generateDefaultState(): State {
// 	return {
// 		todos: [],
// 		idLedger: 1,
// 		page: Page.All,
// 	};
// }

export class Dispatch {
	#message = "";
	get message() {
		return this.#message;
	}
	#payload = {};
	get payload() {
		return this.#payload;
	}
	static payloadTypes = [
		{ type: "string", key: "title" },
		{ type: "number", key: "id" },
		{ type: "string", key: "page" },
    ];
	static validMessagesAndPayloads = {
		addTodo: [this.payloadType.todoTitle],
		removeTodo: [this.payloadType.todoID],
		updateTodo: [this.payloadType.todoTitle, this.payloadType.todoID],
		toggleCompleteTodo: [this.payloadType.todoID],
		clearCompletedTodos: [],
		changePage: [this.payloadType.page],
	};
	constructor(message, payload) {
		this.#setMessage(message);
		this.#setPayload(payload);
	}

	#setPayload(payload) {
		this.validMessagesAndPayloads[this.#message].map((validation) => {
			if (!payload[validation.key] || type_of(payload[validation.key]) !== validation.type) {
				throw (
					"a payload associated with the message" +
					this.#message +
					" must contain a payload with a key of " +
					validation.key +
					" and is of type " +
					validation.type
				);
			}
		});
		this.#payload = payload;
	}
	#setMessage(message) {
		if (
			this.validMessagesAndPayloads[message] !== undefined &&
			type_of(this.validMessagesAndPayloads[message]) === "array"
		) {
			this.#message = message;
		} else {
			throw (
				"message must be one of these strings: " +
				Object.keys(this.validMessagesAndPayloads).join(", ")
			);
		}
	}
}

class Module {
	model = () => {};
	update = () => {};
	init = () => {};
	view = () => {};
}

export class State {
	#page = "all";
	get page() {
		return this.#page;
	}
	#todos = [];
	set page(page) {
		if (["all", "active", "completed"].includes(page)) {
			this.page = page;
		} else {
			throw "page must be a string of all, active, completed";
		}
	}
	empty() {
		return Object.keys(this.app).length === 0;
	}
}

const engine = {
	config: {
		rootEl: document.body,
		localStorageKey: "todoMVCFunctional",
	},
	store: (state) => {
		if (!state instanceof State) {
			throw "state must be a State instance";
		}
		if (state.length) {
			window.localStorage.setItem(engine.config.localStorageKey, JSON.stringify(state));
		}

		return new State(JSON.parse(window.localStorage.getItem(engine.config.localStorageKey)));
	},
	router: (state) => {
		// set the state
		return state;
	},
	dispatch: (dispatch) => {
		if (!dispatch instanceof Dispatch) {
			throw "payload must be a Payload";
		}
		const updateEvent = new CustomEvent("dispatch", {
			detail: dispatch,
		});
		engine.config.rootEl.dispatchEvent(updateEvent);
	},
	init: (app) => {
		if (!app instanceof Module) {
			throw "app must be a Module";
		}
		let state = engine.store(state);
		if (!state.empty()) {
			// saved state is empty, so get the default from the module
			state = app.model(state);
		}
		app.view(state);

		//  CustomEvent for updating the state

		document.addEventListener("dispatch", (event) => {
			// todo, check you can get a class from the event object
			const dispatch = event.detail;
			console.log(dispatch instanceof Dispatch);
			console.log(type_of(dispatch));
			state = app.update(state, dispatch);
			console.log("state Listener", state);
			app.view(state);
		});
	},
};

engine.init(app);
