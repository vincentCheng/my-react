import React, { ReactNode } from "react";

type IProps = {
  fallback?: ReactNode | null;
  onError?: () => void;
  children: ReactNode;
};

type IState = {
  isShowErrorComponent: boolean;
};

class ErrorBoundary extends React.Component<IProps, IState> {
  constructor(props: IProps | Readonly<IProps>) {
    super(props);
    this.state = { isShowErrorComponent: false };
    // this.handleRetryClick = this.handleRetryClick.bind(this);
  }

  static getDerivedStateFromError(): IState {
    // Update state so the next render will show the fallback UI.
    return { isShowErrorComponent: true };
  }

  componentDidCatch(error: Error) {
    // You can also log the error to an error reporting service
    // logErrorToMyService(error, errorInfo);
    this.props.onError?.();
  }

  handleRetryClick() {
    this.setState({
      isShowErrorComponent: false,
    });
  }

  uiByHand() {
    return (
      <div>
        <button className="error-retry-btn" onClick={this.handleRetryClick}>
          渲染错误，点击重试!
        </button>
      </div>
    );
  }

  render() {
    const { fallback, children } = this.props;

    return this.state.isShowErrorComponent
      ? // ? fallback ?? <>加载失败，请刷新重试！</>
        fallback ?? <this.uiByHand />
      : children;
  }
}

export default ErrorBoundary;
