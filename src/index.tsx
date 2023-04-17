import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import ErrorBoundary from '@/components/error-boundary/lego'
import App from './app'
import { Provider } from 'react-redux'
import store from '@/store'
// import "../public/index.css";
// import "@arco-design/web-react/dist/css/arco.css";
// import "@arco-design/web-react/dist/css/index.less";
// import "./app.scss";

// function App() {
//   return <div className="title">"hello world"</div>;
// }

const root = document.getElementById('root')

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        {/* 绑定store */}
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>,
  root
)
