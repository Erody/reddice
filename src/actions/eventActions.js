import axios from 'axios';

export function createEvent(data) {
	return dispatch => {
		axios.post('/api/events', data);
	}
}