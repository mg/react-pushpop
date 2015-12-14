import React from 'react'
import TestUtils from 'react-addons-test-utils'
import { expect } from 'chai'

import { Push, Pop } from './pushpop.jsx'

describe('Push-Pop ->', () => {
  it('pushes prop down tree as context', () => {
    class A extends React.Component {
      render() {
        return <div>{this.props.children}</div>
      }
    }

    let AWithContext= Push('test', React.PropTypes.number)(A)

    let val= 0
    class B extends React.Component {
      static contextTypes= {
        test: React.PropTypes.number,
      }
      render() {
        val= this.context.test
        return null
      }
    }

    expect(val).to.equal(0)
    TestUtils.renderIntoDocument(
      <AWithContext test={1}>
        <div>
          <B/>
        </div>
      </AWithContext>
    )
    expect(val).to.equal(1)
  })

  it('lifts from context as prop', () => {
    class A extends React.Component {
      render() {
        return <div>{this.props.children}</div>
      }
    }
    let AWithContext= Push('test', React.PropTypes.number)(A)

    let val= 0
    class B extends React.Component {
      render() {
        val= this.props.test
        return null
      }
    }
    let BPicksFromContext= Pop('test', React.PropTypes.number)(B)

    expect(val).to.equal(0)
    TestUtils.renderIntoDocument(
      <AWithContext test={1}>
        <div>
          <BPicksFromContext/>
        </div>
      </AWithContext>
    )
    expect(val).to.equal(1)
  })
})
