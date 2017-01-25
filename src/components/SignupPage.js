import React from 'react';
import SignupForm from './SignupForm';
import { connect } from 'react-redux';
import { userSignupRequest, doesUserExist } from '../actions/signupActions';
import { addFlashMessage } from '../actions/flashMessages';

class SignupPage extends React.Component {
	render() {
		const { userSignupRequest, addFlashMessage, doesUserExist } = this.props;
		return (
			<div className="row">
				<div className="col-md-4 col-md-offset-4">
					<SignupForm
						userSignupRequest={userSignupRequest}
						addFlashMessage={addFlashMessage}
						doesUserExist={doesUserExist}
					/>
				</div>
			</div>
		)
	}
}

SignupForm.propTypes = {
	userSignupRequest: React.PropTypes.func.isRequired,
	addFlashMessage: React.PropTypes.func.isRequired,
	doesUserExist: React.PropTypes.func.isRequired,
};

export default connect(null, { userSignupRequest, addFlashMessage, doesUserExist })(SignupPage);