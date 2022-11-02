import { delegate, getURLHash, insertHTML, replaceHTML } from "./helpers.js";
// import { TodoStore, Todo } from "./store.js";

interface DOMElements {
	input: HTMLInputElement;
	toggleAllBtn: HTMLInputElement;
	clearBtn: HTMLElement;
	list: HTMLElement;
	main: HTMLElement;
	footer: HTMLElement;
	count: HTMLElement;
	filterLinks: NodeListOf<HTMLElement>;
}

// STATE
export interface Todo {
	id: number;
	title: string;
	completed: boolean;
}
export enum Page {
	All = "all",
	Active = "active",
	Completed = "completed",
}
export interface State {
	todos: Array<Todo>;
	idLedger: number;
	page: Page;
}

// UPDATE
export enum Message {
	AddTodo = "addTodo",
	RemoveTodo = "removeTodo",
	UpdateTodo = "updateTodo",
	ToggleCompleteTodo = "toggleCompleteTodo",
	ClearCompletedTodos = "clearCompletedTodos",
	ChangePage = "changePage",
}
export interface Payload {
	todoID?: number;
	todoTitle?: string;
	page?: Page;
}

export function generateDefaultState(): State {
	return {
		todos: [],
		idLedger: 1,
		page: Page.All,
	};
}

export function update(state: State, message: Message, payload: Payload): State {
	const id = payload?.todoID ?? 0;
	const title = payload?.todoTitle ?? "";
	const page = payload?.page ?? "";

	if (message === Message.AddTodo) {
		if (!title) {
			throw "payload.todoTitle must be set when sending an AddTodo event";
		}
		const todo: Todo = {
			title: title,
			completed: false,
			id: state.idLedger || 1,
		};
		state.todos.push(todo);
		state.idLedger += 1;
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
	// build the dom elements needed for dom manipulation of pre rendered html
	const domElements: DOMElements = {
		toggleAllBtn: el.querySelector('[data-todo="toggle-all"]') as HTMLInputElement,
		input: el.querySelector('[data-todo="new"]') as HTMLInputElement,
		clearBtn: el.querySelector('[data-todo="clear-completed"]') as HTMLElement,
		list: el.querySelector('[data-todo="list"]') as HTMLElement,
		main: el.querySelector('[data-todo="main"]') as HTMLElement,
		footer: el.querySelector('[data-todo="footer"]') as HTMLElement,
		count: el.querySelector('[data-todo="count"]') as HTMLElement,
		filterLinks: el.querySelectorAll(`[data-todo="filters"] a`) as NodeListOf<HTMLElement>,
	};
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

	//

	// render the view
	render(state, domElements);
	// set up global update event
}
