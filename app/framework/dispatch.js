// export class Dispatch {
// 	#message = "";
// 	get message() {
// 		return this.#message;
// 	}
// 	#payload = {};
// 	get payload() {
// 		return this.#payload;
// 	}
// 	static payloadTypes = [
// 		{ type: "string", key: "title" },
// 		{ type: "number", key: "id" },
// 		{ type: "string", key: "page" },
//     ];
// 	constructor(message, payload) {
// 		this.#setMessage(message);
// 		this.#setPayload(payload);
// 	}

import {Actions} from "./actions";

// 	#setPayload(payload) {
// 		this.validMessagesAndPayloads[this.#message].map((validation) => {
// 			if (!payload[validation.key] || type_of(payload[validation.key]) !== validation.type) {
// 				throw (
// 					"a payload associated with the message" +
// 					this.#message +
// 					" must contain a payload with a key of " +
// 					validation.key +
// 					" and is of type " +
// 					validation.type
// 				);
// 			}
// 		});
// 		this.#payload = payload;
// 	}
// 	#setMessage(message) {
// 		if (
// 			this.validMessagesAndPayloads[message] !== undefined &&
// 			type_of(this.validMessagesAndPayloads[message]) === "array"
// 		) {
// 			this.#message = message;
// 		} else {
// 			throw (
// 				"message must be one of these strings: " +
// 				Object.keys(this.validMessagesAndPayloads).join(", ")
// 			);
// 		}
// 	}
// }


const dispatcher = (payload) => {
  const updateEvent = new CustomEvent("dispatch", {
    detail: payload,
  });
  engine.config.rootEl.dispatchEvent(updateEvent);
};
