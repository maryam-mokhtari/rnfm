import React, {Component} from 'react'
import {connect} from 'react-redux'

class App extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div style={{minHeight: '100vh', position: 'relative'}}>
        <div style={{paddingBottom: 40}}>
          {this.props.children}
        </div>
        <div style={{
          color: 'grey', fontSize: '0.9em', textAlign: 'center',
          position: 'absolute', bottom: 0, left: 0, width: '100%',
          paddingBottom: 20
        }}>
          Powered by <a href="/">PersianGig</a> IaaS Cloud Platform
        </div>
      </div>
    )
  }
}

export default (App)
