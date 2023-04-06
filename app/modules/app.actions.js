import {Action, Actions} from "../framework/actions";
import {Todo} from "./app.state";

Actions.addAction(
	new Action("addTodo", [Dispatch.payloadTypes.first((t) => t.key === "title")], (title, state) => {
		const todo = new Todo(title, false, state.idLedger || 1);
		state.todos.push(todo);
		state.idLedger += 1;

		return { ...state, todos: [...state.todos] };
	})
);
