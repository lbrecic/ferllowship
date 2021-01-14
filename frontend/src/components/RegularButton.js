import React from 'react';


class RegularButton extends React.Component {

  render() {
    return (
      <div className="regularButton">
        <button className="btn">
          {this.props.text}
        </button>
      </div>
    );
  }

}

export default RegularButton;