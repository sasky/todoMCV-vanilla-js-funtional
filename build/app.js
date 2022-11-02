import { replaceHTML } from "./helpers.js";
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
        idLedger: 1,
        page: Page.All,
    };
}
export function update(state, message, payload) {
    var _a, _b, _c;
    const id = (_a = payload === null || payload === void 0 ? void 0 : payload.todoID) !== null && _a !== void 0 ? _a : 0;
    const title = (_b = payload === null || payload === void 0 ? void 0 : payload.todoTitle) !== null && _b !== void 0 ? _b : "";
    const page = (_c = payload === null || payload === void 0 ? void 0 : payload.page) !== null && _c !== void 0 ? _c : "";
    if (message === Message.AddTodo) {
        if (!title) {
            throw "payload.todoTitle must be set when sending an AddTodo event";
        }
        const todo = {
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
function toggleVisible(el, show) {
    el.style.display = show ? "block" : "none";
}
export function render(state, domElements) {
    const hasTodos = !!state.todos.length;
    const hasCompletedTodos = state.todos.some((t) => t.completed);
    const isAllTodosCompleted = state.todos.every((todo) => todo.completed);
    const numActiveTodos = state.todos.filter((t) => !t.completed).length;
    toggleVisible(domElements.main, hasTodos);
    toggleVisible(domElements.footer, hasTodos);
    toggleVisible(domElements.clearBtn, hasCompletedTodos);
    domElements.toggleAllBtn.checked = isAllTodosCompleted;
    replaceHTML(domElements.count, `
			<strong>${numActiveTodos}</strong>
			${numActiveTodos === 1 ? "item" : "items"} left
        `);
    domElements.filterLinks.forEach((el) => {
        if (el.matches(`[href="#/${state.page}"]`)) {
            el.classList.add("selected");
        }
        else {
            el.classList.remove("selected");
        }
    });
}
function dispatch(message, payload) {
    const updateEvent = new CustomEvent("dispatch", {
        detail: { message: message, payload: payload },
    });
    document.dispatchEvent(updateEvent);
}
export function init(el) {
    const domElements = {
        toggleAllBtn: el.querySelector('[data-todo="toggle-all"]'),
        input: el.querySelector('[data-todo="new"]'),
        clearBtn: el.querySelector('[data-todo="clear-completed"]'),
        list: el.querySelector('[data-todo="list"]'),
        main: el.querySelector('[data-todo="main"]'),
        footer: el.querySelector('[data-todo="footer"]'),
        count: el.querySelector('[data-todo="count"]'),
        filterLinks: el.querySelectorAll(`[data-todo="filters"] a`),
    };
    let state = generateDefaultState();
    document.addEventListener("dispatch", ((event) => {
        const message = event.detail.message;
        const payload = event.detail.payload;
        state = update(state, message, payload);
        console.log("state Listener", state);
        render(state, domElements);
    }));
    domElements.input.addEventListener("keyup", (e) => {
        const value = e.target.value;
        if (e.key === "Enter" && value.length) {
            dispatch(Message.AddTodo, { todoTitle: value });
            domElements.input.value = "";
        }
    });
    render(state, domElements);
}
init(document.body);
//# sourceMappingURL=app.js.map