import { Action, Actions } from "./actions.js";
import { type_of } from "./helpers.js";
import { delegate, getURLHash, insertHTML, replaceHTML } from "./helpers.js";
import { Dispatch } from "./index.js";
import { State } from "./index.js";
// import { TodoStore, Todo } from "./store.js";

class DOMElements {
	toggleAllBtn;
	input;
	clearBtn;
	list;
	main;
	footer;
	count;
	filterLinks;
	constructor(el) {
		// convert an obj into the state class
		this.toggleAllBtn = el.querySelector('[data-todo="toggle-all"]');
		this.input = el.querySelector('[data-todo="new"]');
		this.clearBtn = el.querySelector('[data-todo="clear-completed"]');
		this.list = el.querySelector('[data-todo="list"]');
		this.main = el.querySelector('[data-todo="main"]');
		this.footer = el.querySelector('[data-todo="footer"]');
		this.count = el.querySelector('[data-todo="count"]');
		this.filterLinks = el.querySelectorAll(`[data-todo="filters"] a`);
	}
}
const domElements = new DOMElements(document.body);
// MODEL
class Todo {
	#title = "";
	get title() {
		return this.#title;
	}
	#completed = false;
	get completed() {
		return this.#completed;
	}
	#id = 0;
	get id() {
		return this.#id;
	}
	constructor(title, completed, id) {
		this.#setTitle(title);
		this.#setCompleted(completed);
		this.#setID(id);
	}
	#setTitle(title) {
		if (!type_of(title) === "string" || !title) {
			throw new Error("title must be a string and not empty");
		}
		this.#title = title;
	}
	#setCompleted(completed) {
		if (!type_of(completed) === "boolean") {
			throw new Error("completed must be a boolean");
		}
		this.#completed = completed;
	}
	#setID(id) {
		if (!type_of(id) === "number" || id < 1) {
			throw new Error("id must be a number and not greater than 0");
		}
		this.#id = id;
	}
}

// UPDATES
Actions.addAction(
	new Action("addTodo", [Dispatch.payloadTypes.first((t) => t.key === "title")], (state) => {
		const todo = new Todo(title, false, state.idLedger || 1);
		state.todos.push(todo);
		state.idLedger += 1;

		return { ...state, todos: [...state.todos] };
	})
);
/*
 		removeTodo: [this.payloadType.todoID],
		updateTodo: [this.payloadType.todoTitle, this.payloadType.todoID],
		toggleCompleteTodo: [this.payloadType.todoID],
		clearCompletedTodos: [],
		changePage: [this.payloadType.page],
        */

/*
export function update(state, dispatch) {
		if (!state instanceof State) {
			throw "state must be a State instance";
		}
		if (!dispatch instanceof Dispatch) {
			throw "dispatch must be a Dispatch instance";
		}
    
    const message = dispatch.message;
    const payload = dispatch.dispatch;

	const id = payload?.todoID ?? 0;
	const title = payload?.todoTitle ?? "";
	const page = payload?.page ?? "";
    for (const [validMessageName, _] of Object.entries(Dispatch.validMessagesAndPayloads)) {
	if (message ===  validMessageName && validMessageName === 'addTodo') {
	}

}


	if (message === Message.RemoveTodo) {
		if (!id) {
			throw "payload.todoID must be set when sending an RemoveTodo event";
		}

		state.todos = state.todos.filter((todo) => todo.id !== id);
	}
	if (message === Message.UpdateTodo) {
		if (!id || !title) {
			throw "payload.todoID and payload.title must be set when sending an UpdateTodo event";
		}
		state.todos = state.todos.map((todo) => (todo.id === id ? { ...todo, title: title } : todo));
	}
	if (message === Message.ToggleCompleteTodo) {
		if (!id) {
			throw "payload.todoID must be set when sending an ToggleCompleteTodo event";
		}
		state.todos = state.todos.map((todo) =>
			todo.id === id ? { ...todo, completed: !todo.completed } : todo
		);
	}
	if (message === Message.ClearCompletedTodos) {
		state.todos = state.todos.filter((todo) => !todo.completed);
	}
	if (message === Message.ChangePage) {
		if (!page) {
			throw "payload.page must be set when sending an ChangePage event";
		}
		state.page = page;
	}
	const updated = { ...state, todos: [...state.todos] };
	// console.log("update", message, payload);
	return updated;
}

// VIEW
function toggleVisible(el: HTMLElement, show: boolean) {
	el.style.display = show ? "block" : "none";
}

export function render(state: State, domElements: DOMElements): void {
	const hasTodos = !!state.todos.length;
	const hasCompletedTodos = state.todos.some((t) => t.completed);
	const isAllTodosCompleted = state.todos.every((todo) => todo.completed);
	const numActiveTodos = state.todos.filter((t) => !t.completed).length;

	// set state on pre rendered html
	toggleVisible(domElements.main, hasTodos);
	toggleVisible(domElements.footer, hasTodos);
	toggleVisible(domElements.clearBtn, hasCompletedTodos);
	domElements.toggleAllBtn.checked = isAllTodosCompleted;
	replaceHTML(
		domElements.count,
		`
			<strong>${numActiveTodos}</strong>
			${numActiveTodos === 1 ? "item" : "items"} left
        `
	);

	domElements.filterLinks.forEach((el) => {
		if (el.matches(`[href="#/${state.page}"]`)) {
			el.classList.add("selected");
		} else {
			el.classList.remove("selected");
		}
	});

	// render dynamic html
	//
	//attach event handlers to dynamic html
}

export function init(el: HTMLElement): void {
	//

	// render the view
	render(state, domElements);
	// set up global update event
}

app = new Module();
app.model = () => {};

	app.update = () => {};
	app.init = () => {
        	// build the dom elements needed for dom manipulation of pre rendered html
        //
	// get the page state
	//


	// set up the event listeners on the pre rended state
	domElements.input.addEventListener("keyup", (e: KeyboardEvent) => {
		const value = (e.target as HTMLInputElement).value;
		if (e.key === "Enter" && value.length) {
			dispatch(Message.AddTodo, { todoTitle: value });
			domElements.input.value = "";
		}
	});


    };
	app.view = () => {};
export app;

*/
