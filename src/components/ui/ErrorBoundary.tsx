"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertCircle, RefreshCw } from "lucide-react";
import Button from "./Button";
import Container from "./Container";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <Container className="py-20">
          <div className="max-w-2xl mx-auto text-center">
            <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-6" />
            <h1 className="font-display text-3xl font-bold mb-4 text-neutral-900">
              Qualcosa è andato storto
            </h1>
            <p className="text-neutral-600 mb-8">
              Si è verificato un errore imprevisto. Per favore riprova.
            </p>
            {this.state.error && (
              <details className="mb-8 text-left">
                <summary className="cursor-pointer text-sm text-neutral-500 mb-2">
                  Dettagli errore
                </summary>
                <pre className="text-xs bg-neutral-100 p-4 rounded overflow-auto">
                  {this.state.error.message}
                </pre>
              </details>
            )}
            <Button variant="primary" onClick={this.handleReset}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Riprova
            </Button>
          </div>
        </Container>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
