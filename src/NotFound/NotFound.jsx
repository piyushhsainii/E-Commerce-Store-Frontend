import React from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom'
import './404Page.css';

const NotFound = () => {
  return (
    <div className="not-found-container">
      <h1 className="not-found-heading">404</h1>
      <div className="not-found-content">
        <p className="not-found-message">Page not found</p>
        <p className="not-found-submessage">
          Sorry, but the page you are looking for might be in another castle.
        </p>
        <p className="not-found-action">
          Go back to <a href="/" className="not-found-link">home</a>.
        </p>
      </div>
    </div>
  )
}

export default NotFound