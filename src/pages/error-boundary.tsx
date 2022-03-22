/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends React.Component<{}, ErrorBoundaryState> {
  constructor(props: Readonly<{}>) {
    super(props);
    this.state = {hasError: false};
  }

  static getDerivedStateFromError(error: any) {
    console.log(
      '🚀 ~ file: error-boundary.tsx ~ line 15 ~ ErrorBoundary ~ getDerivedStateFromError ~ error',
      error,
    );
    return {hasError: true};
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.log(
      '🚀 ~ file: error-boundary.tsx ~ line 23 ~ ErrorBoundary ~ componentDidCatch ~ errorInfo',
      errorInfo,
    );
    console.log(
      '🚀 ~ file: error-boundary.tsx ~ line 23 ~ ErrorBoundary ~ componentDidCatch ~ error',
      error,
    );
  }

  render() {
    if (this.state.hasError) {
      return <h1>Error Boundary</h1>;
    }
    return this.props.children;
  }
}
