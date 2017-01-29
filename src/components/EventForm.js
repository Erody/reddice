import React from 'react';
import TextFieldGroup from './TextFieldGroup';
import { connect } from 'react-redux';
import { createEvent } from '../actions/eventActions';

class EventForm extends React.Component {
	state = {
		title: '',
		errors: {},
		isLoading: false,
	};

	onChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	onSubmit = (e) => {
		e.preventDefault();
		this.props.createEvent(this.state);
	};

	render() {
		const { title, errors, isLoading } = this.state;
		return (
			<div>
				<form onSubmit={this.onSubmit}>
					<h1>Create New Game Event</h1>

					<TextFieldGroup
						field="title"
						value={title}
						label="Event Title"
						onChange={this.onChange}
						error={errors.title}
					/>

					<button type="submit" className="btn btn-primary">Create</button>
				</form>
			</div>
		)
	}
}

EventForm.propTypes = {
	createEvent: React.PropTypes.func.isRequired,
};


export default connect(null, { createEvent })(EventForm);