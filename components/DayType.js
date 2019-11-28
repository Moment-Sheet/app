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
  isWeekend,
} from './TimeUtil'
import { styles } from './Styles'

let interval

class CustomText extends Component {
  state = {
    type: 'Loading...',
  }

  componentDidMount = () => {
    const date = getDate()
    fetch(`https://moment-sheet.glitch.me/holiday/?input_date=${date}`)
      .then(res => res.json())
      .then(json => {
        if (isWeekend()) {
          this.setState({ type: 'Weekend' })
        } else if (json.event.includes('Closed')) {
          this.setState({ type: 'Schools Closed' })
        } else if (json.event === '3') {
          this.setState({ type: 'Half Day' })
        } else {
          this.setState({ type: json.event })
        }
      })
  }

  render = () => (
    <>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={['#FFFA8E', '#FF6B00']}
        style={styles.card}
      >
        <View style={{ marginRight: 30 }}>
          <Text style={styles.cardContent}>{this.state.type}</Text>
        </View>
      </LinearGradient>
    </>
  )
}
export default CustomText
