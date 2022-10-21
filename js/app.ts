// import { delegate, getURLHash, insertHTML, replaceHTML } from "./helpers.js";
// import { TodoStore, Todo } from "./store.js";

interface DOMElements {
	[index: string]: HTMLElement | HTMLInputElement;
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
    idLedger:number;
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
        idLedger:1,
		page: Page.All,
	};
}

let state = generateDefaultState();
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


