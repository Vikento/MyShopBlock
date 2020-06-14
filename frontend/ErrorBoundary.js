import React from "react";

// to get the error and refresh page in case of crash because
// of forgotten to take in account some modification on the 
// table/view/ field ...

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
	console.log("error ErrorBoundary class constructor - 29");
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
	console.log("error ErrorBoundary getDerivedStateFromError l34 - error : " + error);
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
	console.log("error ErrorBoundary componentDidCatch l40 - error : " + error + " - info : " +  errorInfo);
 //   logErrorToMyService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
	  	console.log("error ErrorBoundary Render l47 - error : ");
		window.location.reload();
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children; 
  }
}

 
export default ErrorBoundary;