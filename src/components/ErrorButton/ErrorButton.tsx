import { Component } from 'react';

class ErrorButton extends Component {
  render() {
    return (
      <button
        onClick={() => {
          throw new Error('Error!');
        }}
      >
        Error
      </button>
    );
  }
}

export default ErrorButton;
