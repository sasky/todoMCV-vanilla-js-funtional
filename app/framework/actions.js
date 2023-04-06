
export class Action {
	#message = ""
	#payloadTypes = []
	#reducer = (state) => state
    constructor(message, payloadTypes, reducer) {
        this.#message = message;
        this.#payloadTypes = payloadTypes
        this.#reducer = reducer;
    }
    get message() { return this.#message; }
    get payloadTypes() { return this.#payloadTypes; }
    get reducer() { return this.message; }
}

let actions = [];
export class Actions  {
	static addAction = (action) => {
		if (action instanceof Action) {
			actions.push(action);
		} else {
			throw new Error("action must be a instance of an Action");
		}
	}
	static getActions = () => actions
};
