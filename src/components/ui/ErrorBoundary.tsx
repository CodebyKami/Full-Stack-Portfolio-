import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      hasError: false,
      error: null
    };
  }

  public static getDerivedStateFromError(error: any): any {
    return { hasError: true, error };
  }

  public componentDidCatch(error: any, errorInfo: any) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    const { hasError, error } = this.state as any;
    
    if (hasError) {
      return (
        <div className="min-h-[400px] flex flex-col items-center justify-center p-8 text-center bg-surface rounded-[40px] border border-border">
          <div className="h-20 w-20 rounded-full bg-red-500/10 flex items-center justify-center mb-6">
            <AlertTriangle className="h-10 w-10 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-4">Something went wrong</h2>
          <p className="text-muted max-w-md mb-8">
            {error?.message || "An unexpected error occurred while rendering this section."}
          </p>
          <Button 
            onClick={() => window.location.reload()}
            className="btn-primary h-12 px-8"
          >
            Reload Page
          </Button>
        </div>
      );
    }

    return (this.props as any).children;
  }
}
