/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import NormalSchedule from '../schedules/normal'
import {
  stringToSeconds,
  formatTimeHHMMSS,
  secondsToString,
  getDate,
} from './TimeUtil'

let interval

const styles = StyleSheet.create({
  test: {
    margin: 10,
    padding: 20,
    backgroundColor: 'red',
    borderRadius: 15,
    flex: 1,
    flexDirection: 'row',
  },
})

class CustomText extends Component {
  state = {
    date: '',
  }

  componentDidMount = () => {
    const date = getDate()
    this.setState({ date: getDate() })
  }

  render = () => (
    <>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={['#FF87F3', '#F62A2A']}
        style={styles.test}
      >
        <View>
          <Text style={{ fontSize: 20 }}>MomentSheet™ for HCPSS</Text>
          <Text style={{ fontSize: 40, fontWeight: 'bold' }}>
            {this.state.date}
          </Text>
        </View>
      </LinearGradient>
    </>
  )
}
export default CustomText
