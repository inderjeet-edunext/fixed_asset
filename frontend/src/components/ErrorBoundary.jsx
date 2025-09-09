import React from 'react';
import { MdError, MdRefresh } from 'react-icons/md';
import Button from './ui/Button';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error details
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    
    // Log to error reporting service
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
          <div className="max-w-md w-full text-center space-y-6">
            <div className="flex justify-center">
              <div className="p-4 bg-error/10 rounded-full">
                <MdError className="w-12 h-12 text-error" />
              </div>
            </div>
            
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-text-primary">
                Oops! Something went wrong
              </h1>
              <p className="text-text-muted">
                We're sorry, but something unexpected happened. Please try refreshing the page.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                onClick={this.handleReset}
                variant="primary"
                className="min-w-[120px]"
              >
                Try Again
              </Button>
              <Button
                onClick={this.handleReload}
                variant="outline"
                icon={MdRefresh}
                className="min-w-[120px]"
              >
                Reload Page
              </Button>
            </div>
            
            {import.meta.env.MODE === 'development' && this.state.error && (
              <details className="mt-8 text-left bg-surface p-4 rounded-lg border">
                <summary className="cursor-pointer font-medium text-text-primary mb-2">
                  Error Details (Development Only)
                </summary>
                <div className="space-y-2 text-sm text-text-muted">
                  <div>
                    <strong>Error:</strong> {this.state.error.toString()}
                  </div>
                  <div>
                    <strong>Stack Trace:</strong>
                    <pre className="mt-1 p-2 bg-background rounded text-xs overflow-auto">
                      {this.state.errorInfo.componentStack}
                    </pre>
                  </div>
                </div>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;