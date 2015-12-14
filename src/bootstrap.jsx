import React from 'react'

export default class Bootstrap extends React.Component {
  render() {
    let contextObject= {}
    class BootstrapComponent extends React.Component {
      static childContextTypes= {
      }

      render() {
        return <div>{this.props.children}</div>
      }

      getChildContext() {
        return contextObject
      }
    }

    Object.keys(this.props).forEach(prop => {
      if(prop !== 'children') {
        if(prop.endsWith('Type')) {
          BootstrapComponent.childContextTypes[prop.substr(0, prop.length - 4)]= this.props[prop]
        } else {
          contextObject[prop]= this.props[prop]
        }
      }
    })

    return <BootstrapComponent>{this.props.children}</BootstrapComponent>
  }
}
