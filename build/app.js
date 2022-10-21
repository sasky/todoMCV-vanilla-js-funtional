export var Page;
(function (Page) {
    Page["All"] = "all";
    Page["Active"] = "active";
    Page["Completed"] = "completed";
})(Page || (Page = {}));
export var Message;
(function (Message) {
    Message["AddTodo"] = "addTodo";
    Message["RemoveTodo"] = "removeTodo";
    Message["UpdateTodo"] = "updateTodo";
    Message["ToggleCompleteTodo"] = "toggleCompleteTodo";
    Message["ClearCompletedTodos"] = "clearCompletedTodos";
    Message["ChangePage"] = "changePage";
})(Message || (Message = {}));
export function generateDefaultState() {
    return {
        todos: [],
        page: Page.All,
    };
}
let state = generateDefaultState();
export function update(state, message, payload) {
    var _a, _b, _c;
    const id = (_a = payload === null || payload === void 0 ? void 0 : payload.todoID) !== null && _a !== void 0 ? _a : "";
    const title = (_b = payload === null || payload === void 0 ? void 0 : payload.todoTitle) !== null && _b !== void 0 ? _b : "";
    const page = (_c = payload === null || payload === void 0 ? void 0 : payload.page) !== null && _c !== void 0 ? _c : "";
    if (message === Message.AddTodo) {
        if (!title) {
            throw "payload.todoTitle must be set when sending an AddTodo event";
        }
        const todo = {
            title: title,
            completed: false,
            id: "id_" + Date.now(),
        };
        state.todos.push(todo);
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
        state.todos = state.todos.map((todo) => (todo.id === id ? Object.assign(Object.assign({}, todo), { title: title }) : todo));
    }
    if (message === Message.ToggleCompleteTodo) {
        if (!id) {
            throw "payload.todoID must be set when sending an ToggleCompleteTodo event";
        }
        state.todos = state.todos.map((todo) => todo.id === id ? Object.assign(Object.assign({}, todo), { completed: !todo.completed }) : todo);
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
    const updated = Object.assign(Object.assign({}, state), { todos: [...state.todos] });
    return updated;
}
//# sourceMappingURL=app.js.map