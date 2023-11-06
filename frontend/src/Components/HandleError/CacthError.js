import React from 'react';
import ErrorPage from './ErrorPage'; // Your error page component
import { Redirect } from 'react-router-dom';

class ErrorBoundary extends React.Component {
    state = { hasError: false };

    componentDidCatch(error, errorInfo) {
        // Log the error, report it to a service, etc.

        // Set the hasError state to true to trigger the error page rendering
        this.setState({ hasError: true });
    }

    render() {
        if (this.state.hasError) {
            return <Redirect to="/error" />;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
