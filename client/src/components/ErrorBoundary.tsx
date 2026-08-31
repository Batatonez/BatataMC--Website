import { AlertTriangle, RotateCcw } from "lucide-react";
import { Component, type ReactNode } from "react";

type Props = { children: ReactNode };
type State = { error: Error | null };

class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  render() {
    const { error } = this.state;
    if (!error) return this.props.children;

    return (
      <div className="app-error" role="alert">
        <AlertTriangle size={36} aria-hidden="true" />
        <h1>Algo saiu do lugar</h1>
        <p>
          A página não conseguiu carregar. Recarregar costuma resolver; se
          continuar, avise a equipe do BatataMC.
        </p>

        {import.meta.env.DEV && error.stack && (
          <details>
            <summary>Detalhes técnicos</summary>
            <pre>{error.stack}</pre>
          </details>
        )}

        <button
          type="button"
          className="button button--primary"
          onClick={() => window.location.reload()}
        >
          <RotateCcw size={15} aria-hidden="true" />
          Recarregar página
        </button>
      </div>
    );
  }
}

export default ErrorBoundary;
