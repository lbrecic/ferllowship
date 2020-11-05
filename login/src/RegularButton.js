import React from 'react';


class RegularButton extends React.Component {
  constructor(props){
    super(props);
  }
  
  render() {
    return ( 
    <div className="regularButton" >
        <button className="btn"
        disabled={this.props.disabled}
        >
          {this.props.text}
        </button>
    </div>
    );
  }
}

export default RegularButton;