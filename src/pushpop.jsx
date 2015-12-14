import React from 'react'

export function Push(name, type, defValue) {
  return function (Component) {
    let c= class extends React.Component {
      static propTypes= {
      }

      static childContextTypes= {
      }

      render() {
        return <Component {...this.props}/>
      }

      getChildContext() {
        var contextObject= {}
        contextObject[name]= this.props[name]
        return contextObject
      }
    }

    c.propTypes[name]= type

    if(defValue) {
      c.defaultProps= {}
      c.defaultProps[name]= defValue
    }

    c.childContextTypes[name]= type

    return c
  }
}

export function Pop(name, type, execute) {
  return function (Component) {
    let c= class extends React.Component {
      static contextTypes= {
      }

      render() {
        let propFromContext= {}
        if(execute) propFromContext[name]= this.context[name]()
        else propFromContext[name]= this.context[name]
        return <Component {...this.props} {...propFromContext}/>
      }
    }
    c.contextTypes[name]= type

    return c
  }
}
