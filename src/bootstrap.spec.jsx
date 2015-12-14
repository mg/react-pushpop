import React from 'react'
import TestUtils from 'react-addons-test-utils'
import { expect } from 'chai'

import Bootstrap from './bootstrap.jsx'
import { Pop } from './pushpop.jsx'

describe('Bootstrap ->', () => {
  it('bootstraps an enviroment with one context parameter', () => {
    let val= 0
    class GetTest extends React.Component {
      render() {
        val= this.props.test
        return null
      }
    }
    let PopTest= Pop('test', React.PropTypes.number)(GetTest)

    TestUtils.renderIntoDocument(
      <Bootstrap
        test={1} testType={React.PropTypes.number}
      >
        <PopTest/>
      </Bootstrap>
    )
    expect(val).to.equal(1)
  })

  it('bootstraps an enviroment with two context parameters', () => {
    let val1= 0
    class GetTest1 extends React.Component {
      render() {
        val1= this.props.test1
        return null
      }
    }
    let PopTest1= Pop('test1', React.PropTypes.number)(GetTest1)

    let val2= ''
    class GetTest2 extends React.Component {
      render() {
        val2= this.props.test2
        return null
      }
    }
    let PopTest2= Pop('test2', React.PropTypes.string)(GetTest2)

    TestUtils.renderIntoDocument(
      <Bootstrap
        test1={1} test1Type={React.PropTypes.number}
        test2='Two' test2Type={React.PropTypes.string}
      >
        <PopTest1/>
        <PopTest2/>
      </Bootstrap>
    )
    expect(val1).to.equal(1)
    expect(val2).to.equal('Two')
  })
})
