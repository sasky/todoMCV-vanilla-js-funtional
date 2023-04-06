import {Actions} from "./actions";
import {State} from "./state";

export  const update =(state = {}, dispatcher) =>{

    console.log('DISPATCHER', dispatcher);
    const  actions = Actions.getActions();
    console.log('ACTIONS', actions);
    actions.forEach((action) => {
    if(dispatcher.message === action.message) {

        state = action.reducer(state,dispatcher.payload)
    } 


    })
    return state;
}

// class Config {
//   static rootEl = document.body;
//   static localStorageKey = "todoMVCFunctional";
// }

// const router = (state) => {
//   // set the state
//   return state;
// };

// let state = State.getState();


// const dispatchEventCallback = (event) => {
//   const dispatcher = event.detail;
//   state = update(state, dispatcher);
//   // app.view(state);
// };



// document.addEventListener("dispatch", dispatchEventCallback);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


// const	init (app) => {
// // if (!app instanceof Module) {
// // 	throw "app must be a Module";
// // }
// // let state = engine.store(state);
// // if (!state.empty()) {
// // 	// saved state is empty, so get the default from the module
// // 	state = app.model(state);
// // }
// // app.view(state);

// //  CustomEvent for updating the state
//    let state = {};

// };
