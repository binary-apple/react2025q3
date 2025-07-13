import { Component, type ReactNode } from 'react';

class ErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean; errorMessage: string }
> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false, errorMessage: '' };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, errorMessage: error.message };
  }

  componentDidCatch(error: Error) {
    this.setState({ hasError: true, errorMessage: error.message });
    console.log(error);
  }

  render() {
    const { hasError } = this.state;
    return hasError ? <div>Something went wrong</div> : this.props.children;
  }
}

export default ErrorBoundary;
