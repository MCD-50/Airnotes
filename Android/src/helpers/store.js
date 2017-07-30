import Fluxify from 'fluxify';

export default Fluxify.createStore({
	id: 'NoteClient',
	initialState: {
		currentPath: '/splash',
		isLoading: false,
		notes: [],
		tasks: [],
		title: 'Note'
	},
	actionCallbacks: {
		updateCurrentPath:(updater, payload)=>{
			updater.set({ currentPath: payload });
		},
		updateIsLoading:(updater, payload)=>{
			updater.set({ isLoading: payload });
		},
		updateNotes: (updater, payload) => {
			updater.set({ notes: payload.slice() });
		},
		updateTasks: (updater, payload) => {
			updater.set({ tasks: payload.slice() });
		},
		updateTitle: (updater, payload) => {
			updater.set({ title: payload });
		}
	}
});