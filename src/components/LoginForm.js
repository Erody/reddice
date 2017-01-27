import React from 'react';
import TextFieldGroup from './TextFieldGroup';
import validateInput from '../../backend/shared/validations/login';
import { connect } from 'react-redux';
import { login } from '../actions/auth';

class LoginForm extends React.Component {
	state = {
		identifier: '',
		password: '',
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

	onSubmit = (e) => {
		e.preventDefault();
		if(this.isValid()) {
			this.setState({ errors: {}, isLoading: true});
			//request to server
			this.props.login(this.state).then(
				(res) => this.context.router.push('/'),
				(err) => this.setState({ errors: err.data.errors, isLoading: false })
			)
		}
	};

	onChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	render() {
		const { errors, identifier, password, isLoading } = this.state;
		return (
			<form onSubmit={this.onSubmit}>
				<h1>Login</h1>

				{ errors.form && <div className="alert alert-danger">{errors.form}</div> }

				<TextFieldGroup
					field="identifier"
					value={identifier}
					label="Username / Email"
					error={errors.identifier}
					onChange={this.onChange}
				/>

				<TextFieldGroup
					field="password"
					value={password}
					label="Password"
					error={errors.password}
					onChange={this.onChange}
					type="password"
				/>

				<div className="form-group">
					<button className="btn btn-primary btn-lg" disabled={isLoading}>Login</button>
				</div>
			</form>
		)
	}
}

LoginForm.propTypes = {
	login: React.PropTypes.func.isRequired,
};

LoginForm.contextTypes = {
	router: React.PropTypes.object.isRequired,
};

export default connect(null, { login })(LoginForm);