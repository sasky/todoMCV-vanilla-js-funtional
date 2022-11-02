interface Dispatch {
	message: any;
	payload: any;
}
interface Module {
    model: any;
    update: any;
    Init: any;
    view: any;
}

const engine = {
    config: {
        rootEl: document.body,
    }
	dispatch: (message, payload) => {
		const updateEvent = new CustomEvent<Dispatch>("dispatch", {
			detail: { message: message, payload: payload },
		});
		engine.config.rootEl.dispatchEvent(updateEvent);
	},
	init: (app: Module) => {
        let state = app.generateDefaultState();
        //  CustomEvent for updating the state

        document.addEventListener("dispatch", ((event: CustomEvent<Dispatch>) => {
            const message = event.detail.message;
            const payload = event.detail.payload;
            state = app.update(state, message, payload);
            console.log("state Listener", state);
            app.view(state);
        }) as EventListener);
	},
};

engine.init(app);
