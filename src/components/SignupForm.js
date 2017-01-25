import React from 'react';
import timezones from '../data/timezones';
import map from 'lodash/map';
import classNames from 'classnames';
import validateInput from '../../backend/shared/validations/signup';
import TextFieldGroup from './TextFieldGroup';
import isEmpty from 'lodash/isEmpty';

class SignupForm extends React.Component {
	state = {
		username: '',
		email: '',
		password: '',
		passwordConfirmation: '',
		timezone: '',
		errors: {},
		isLoading: false,
		invalid: false,
	};

	isValid = () => {
		const { errors, isValid } = validateInput(this.state);

		if(!isValid) {
			this.setState({ errors });
		}

		return isValid;
	};

	checkUserExists = (e) => {
		const { name, value } = e.target;
		if(value !== '') {
			this.props.doesUserExist(value).then(res => {
				let errors = {...this.state.errors};
				let invalid;
				if(res.data.user) {
					errors[name] = `That ${name} is already in use.`;
				} else {
					delete errors[name];

				}
				this.setState({ errors, invalid: !isEmpty(errors) });
			})
		}
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
					checkUserExists={this.checkUserExists}
					label="Username"
					onChange={this.onChange}
				/>

				<TextFieldGroup
					error={errors.email}
					field="email"
					value={this.state.email}
					label="Email"
					onChange={this.onChange}
					checkUserExists={this.checkUserExists}
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
					<button disabled={this.state.isLoading || this.state.invalid} type="submit" className="btn btn-primary btn-lg">Sign Up</button>
				</div>
			</form>
		)
	}
}

SignupForm.propTypes = {
	userSignupRequest: React.PropTypes.func.isRequired,
	addFlashMessage: React.PropTypes.func.isRequired,
	doesUserExist: React.PropTypes.func.isRequired,
};

SignupForm.contextTypes = {
	router: React.PropTypes.object.isRequired
};

export default SignupForm;