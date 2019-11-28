/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react'
import { Text } from 'react-native'
import TimeUtil from './TimeUtil'

function timeTest() {
  const d = new Date()
  const date = TimeUtil.formatTimeHHMMSS(d)
  const seconds = TimeUtil.stringToSeconds(date)
  const string = TimeUtil.secondsToString(seconds)

  console.log('test')
  console.log(`curr time: ${date}`)
  console.log(`string to seconds: ${seconds}`)
  console.log(`seconds to String: ${string}`)
}

class CustomText extends Component {
  componentDidMount() {
    timeTest()
  }

  componentDidUpdate() {
    timeTest()
  }

  render = () => (
    <>
      <Text>a</Text>
    </>
  )
}
export default CustomText
