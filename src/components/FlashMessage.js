import React from 'react';
import classNames from 'classnames';

class FlashMessage extends React.Component {
	onClick = () => {
		this.props.deleteFlashMessage(this.props.message.id);
	};
	render() {
		const { id, type, text } = this.props.message;
		return (
			<div className={classNames('alert', {
				'alert-success': type === 'success',
				'alert-danger': type === 'error',
			})}>
				<button onClick={this.onClick} className="close"><span>&times;</span></button>
				{text}
			</div>
		)
	}
}

FlashMessage.propTypes = {
	message: React.PropTypes.object.isRequired,
	deleteFlashMessage: React.PropTypes.func.isRequired,
};

export default FlashMessage;