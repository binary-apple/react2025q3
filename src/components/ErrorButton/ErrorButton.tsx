import { Component } from 'react';

type ErrorState = {
  isError: boolean;
};

class ErrorButton extends Component<object, ErrorState> {
  constructor(props: object) {
    super(props);
    this.state = { isError: false };
  }

  onClick() {
    this.setState({ isError: true });
  }

  render() {
    if (this.state.isError) {
      throw new Error('Something went wrong');
    }
    return (
      <button onClick={() => this.onClick()} data-testid="error-button">
        Error
      </button>
    );
  }
}

export default ErrorButton;
