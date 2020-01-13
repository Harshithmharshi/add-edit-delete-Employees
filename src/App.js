import React, { Component } from 'react';
import Employee from './Components/Employee';

export default class App extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <h4 className="col-lg-12" style={{ textAlign: 'center', color: 'orange', marginTop: '5px' }}>
            An React web application to manage employees.
          </h4>
          <div className="col-lg-12 col-md-10 col-sm-12 mx-auto">
            <Employee />
          </div>
        </div>
      </div>
    )
  }
}
