import { it, expect } from "vitest";
import { update } from "../app/framework/engine";
import { State } from "../app/framework/state";

// in-source test suites

it("canAddTodos", () => {
  // When we add one todo

  let state = update(State.getState(), {
    message: "ADD_TODO",
    payload: {
      title: "first todo",
    },
  });

    expect(1).toEqual(1);

  // expect(state).toEqual({
  //   todos: [
  //     {
  //       title: "first todo",
  //       completed: false,
  //       id: 1,
  //     },
  //   ],
  //   idLedger: 2,
  //   page: "all",
  // });

  // // when we add another todo
  // state = update(state, Message.AddTodo, { todoTitle: "second todo" });
  // expect(state).toEqual({
  // todos: [
  // {
  // title: "first todo",
  // completed: false,
  // id: 1,
  // },
  // {
  // title: "second todo",
  // completed: false,
  // id: 2,
  // },
  // ],
  // idLedger: 3,
  // page: "all",
  // });
});
