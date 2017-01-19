import React from 'react';
import timezones from '../data/timezones';
import map from 'lodash/map';
import classNames from 'classnames';
import validateInput from '../../backend/shared/validations/signup';
import TextFieldGroup from './TextFieldGroup';

class SignupForm extends React.Component {
	state = {
		username: '',
		email: '',
		password: '',
		passwordConfirmation: '',
		timezone: '',
		errors: {},
		isLoading: false,
	};

	isValid = () => {
		const { errors, isValid } = validateInput(this.state);

		if(!isValid) {
			this.setState({ errors });
		}

		return isValid;
	};

	onChange = (e) => {
		this.setState({[e.target.name]: e.target.value})
	};

	onSubmit = (e) => {
		e.preventDefault();

		if(this.isValid()) {
			this.setState({ errors: {}, isLoading: true });
			this.props.userSignupRequest(this.state)
				.then(
					() => {
						this.props.addFlashMessage({
							type: 'success',
							text: 'Succesfully signed up. Welcome!'
						});
						this.context.router.push('/');
					},
					({ data }) => this.setState({ errors: data, isLoading: false })
				)
				.catch(err => console.log(err));
		}
	};

	render() {
		const { errors } = this.state;
		const options = map(timezones, (val, key) =>
			<option key={val} value={val}>{key}</option>
		);
		return (
			<form onSubmit={this.onSubmit}>
				<h1>Join our community!</h1>
				
				<TextFieldGroup
					error={errors.username}
					field="username"
					value={this.state.username}
					label="Username"
					onChange={this.onChange}
				/>

				<TextFieldGroup
					error={errors.email}
					field="email"
					value={this.state.email}
					label="Email"
					onChange={this.onChange}
					type="email"
				/>

				<TextFieldGroup
					error={errors.password}
					field="password"
					value={this.state.password}
					label="Password"
					onChange={this.onChange}
					type="password"
				/>

				<TextFieldGroup
					error={errors.passwordConfirmation}
					field="passwordConfirmation"
					value={this.state.passwordConfirmation}
					label="Password confirmation"
					onChange={this.onChange}
					type="password"
				/>

				<div className={classNames('form-group', { 'has-error': errors.timezone })}>
					<label className="control-label">Timezone</label>
					<select
						type="text"
						name="timezone"
						className="form-control"
						value={this.state.timezone}
						onChange={this.onChange}
					>
						<option value="" disabled>Choose your timezone</option>
						{options}
					</select>
					{errors.timezone && <span className="help-block">{errors.timezone }</span>}
				</div>

				<div className="form-group">
					<button disabled={this.state.isLoading} type="submit" className="btn btn-primary btn-lg">Sign Up</button>
				</div>
			</form>
		)
	}
}

SignupForm.propTypes = {
	userSignupRequest: React.PropTypes.func.isRequired,
	addFlashMessage: React.PropTypes.func.isRequired,
};

SignupForm.contextTypes = {
	router: React.PropTypes.object.isRequired
};

export default SignupForm;