import React from 'react';
import classnames from 'classnames';

var divStyle = {
  "font-size":"14px",
   "font-style":"bold"
};
class FlashMessage extends React.Component {
  constructor(props){
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.props.deleteFlashMessage(this.props.message.id)
  }

  render() {
    const { id, type, text } = this.props.message;
    return (
      <div style={divStyle} className={classnames('alert', {
        'alert-success': type === 'success',
        'alert-danger': type === 'error'
      })}>
        <button onClick={this.onClick} className="close"><span>&times;</span></button>
        {text}
      </div>
    );
  }
}

FlashMessage.propTypes = {
  message : React.PropTypes.object.isRequired,
  deleteFlashMessage : React.PropTypes.func.isRequired
}

export default FlashMessage