import {type_of} from "../framework/utils";

export class Todo {
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
