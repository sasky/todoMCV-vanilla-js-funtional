// import { it, expect } from "vitest";
// import { Message, update, generateDefaultState } from "../js/app";

// // in-source test suites
// it("canAddTodos", () => {
//     // When we add one todo
// 	let state = update(generateDefaultState(), Message.AddTodo, { todoTitle: "first todo" });

// 	expect(state).toEqual({
// 		todos: [
// 			{
// 				title: "first todo",
// 				completed: false,
// 				id: 1,
// 			},
// 		],
// 		idLedger: 2,
// 		page: "all",
// 	});
//     // when we add another todo
// 	state = update(state, Message.AddTodo, { todoTitle: "second todo" });
// 	expect(state).toEqual({
// 		todos: [
// 			{
// 				title: "first todo",
// 				completed: false,
// 				id: 1,
// 			},
// 			{
// 				title: "second todo",
// 				completed: false,
// 				id: 2,
// 			},
// 		],
// 		idLedger: 3,
// 		page: "all",
// 	});
// });

// it("canCompleteATodo", () => {
//     // given we have two todos
// 	let state = update(generateDefaultState(), Message.AddTodo, { todoTitle: "first todo" });
// 	state = update(state, Message.AddTodo, { todoTitle: "second todo" });

//     // when we toggle toggle the first one complete
// 	state = update(state, Message.ToggleCompleteTodo, { todoID: 1 });
// 	expect(state).toEqual({
// 		todos: [
// 			{
// 				title: "first todo",
// 				completed: true,
// 				id: 1,
// 			},
// 			{
// 				title: "second todo",
// 				completed: false,
// 				id: 2,
// 			},
// 		],
// 		idLedger: 3,
// 		page: "all",
// 	});
// });

// it("canCompleteATodo", () => {
//     // give we have two todos 
// 	let state = update(generateDefaultState(), Message.AddTodo, { todoTitle: "first todo" });
// 	state = update(state, Message.AddTodo, { todoTitle: "second todo" });

//     // when we update the second todo
// 	state = update(state, Message.UpdateTodo, { todoTitle: "updated second todo", todoID:2 });
// 	expect(state).toEqual({
// 		todos: [
// 			{
// 				title: "first todo",
// 				completed: false,
// 				id: 1,
// 			},
// 			{
// 				title: "updated second todo",
// 				completed: false,
// 				id: 2,
// 			},
// 		],
// 		idLedger: 3,
// 		page: "all",
// 	});
// });

// it("canClearCompletedTodos", () => {
//     // Given we have a few todo items
// 	let state = update(generateDefaultState(), Message.AddTodo, { todoTitle: "one" });
// 	state = update(state, Message.AddTodo, { todoTitle: "two" });
// 	state = update(state, Message.AddTodo, { todoTitle: "three" });
// 	state = update(state, Message.AddTodo, { todoTitle: "four" });
// 	state = update(state, Message.AddTodo, { todoTitle: "five" });

//     // Given we mark the odd ones as completed
// 	state = update(state, Message.ToggleCompleteTodo, { todoID: 1 });
// 	state = update(state, Message.ToggleCompleteTodo, { todoID: 3 });
// 	state = update(state, Message.ToggleCompleteTodo, { todoID: 5 });

//     // When we call the clear completed message
    
// 	state = update(state, Message.ClearCompletedTodos, {  });

// 	expect(state).toEqual({
// 		todos: [
// 			{
// 				title: "two",
// 				completed: false,
// 				id: 2,
// 			},
// 			{
// 				title: "four",
// 				completed: false,
// 				id: 4,
// 			},
// 		],
// 		idLedger: 6, 
// 		page: "all",
// 	});
// });

// it("canRemoveTodos", () => {
//     // Given we have a few todo items
// 	let state = update(generateDefaultState(), Message.AddTodo, { todoTitle: "one" });
// 	state = update(state, Message.AddTodo, { todoTitle: "two" });
// 	state = update(state, Message.AddTodo, { todoTitle: "three" });
// 	state = update(state, Message.AddTodo, { todoTitle: "four" });
// 	state = update(state, Message.AddTodo, { todoTitle: "five" });

//     // When we remove the even todos
// 	state = update(state, Message.RemoveTodo, { todoID: 2 });
// 	state = update(state, Message.RemoveTodo, { todoID: 4 });

//     // then we should have three todos, with a idLedger of 6
// 	expect(state).toEqual({
// 		todos: [
// 			{
// 				title: "one",
// 				completed: false,
// 				id: 1,
// 			},
// 			{
// 				title: "three",
// 				completed: false,
// 				id: 3,
// 			},
// 			{
// 				title: "five",
// 				completed: false,
// 				id: 5,
// 			},
// 		],
// 		idLedger: 6, 
// 		page: "all",
// 	});
// });
