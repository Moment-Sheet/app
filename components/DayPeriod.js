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
import { styles } from './Styles'

let interval

const customStyles = StyleSheet.create({
  test: {
    margin: 10,
    padding: 20,
    borderRadius: 15,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

function getPeriod() {
  const d = new Date()
  const n = d.toLocaleTimeString()

  const currSeconds = stringToSeconds(formatTimeHHMMSS(d))
  // Const currSeconds = stringToSeconds('13:21:00')

  const scheduleToUse = NormalSchedule // Change schedule based on day
  for (const key of Object.keys(NormalSchedule)) {
    const startSeconds = parseInt(
      stringToSeconds(NormalSchedule[key].start),
      10,
    )
    const endSeconds = stringToSeconds(NormalSchedule[key].end)

    if (currSeconds > stringToSeconds(NormalSchedule.period6.end)) {
      return 'School Over'
    }

    if (currSeconds >= startSeconds && currSeconds <= endSeconds) {
      return key
    }

    if (currSeconds <= startSeconds) {
      return `Going to:${key}`
    }
  }

  return 'oof1'
}

class CustomText extends Component {
  state = {
    day: 'Loading...',
    period: 'oof',
  }

  componentDidMount = () => {
    const date = getDate()
    fetch(`https://moment-sheet.glitch.me/day/?input_date=${date}`)
      .then(res => res.json())
      .then(json => {
        this.setState({ day: json.day })
      })

    interval = setInterval(() => {
      this.setState({
        period: getPeriod().includes('Going')
          ? getPeriod().split('d')[1]
          : getPeriod().split('d')[1],
      })
    }, 1000)
  }

  componentWillUnmount() {
    clearInterval(interval)
  }

  render = () => (
    <>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={['#87FFDB', '#00FF0A']}
        style={customStyles.test}
      >
        <View style={{ marginRight: 30 }}>
          <Text style={styles.cardTitle}>A/B Day</Text>
          <Text style={styles.cardContent}>{this.state.day}</Text>
        </View>
        <View style={{ marginLeft: 30 }}>
          <Text style={styles.cardTitle}>Period</Text>
          <Text style={styles.cardContent}>{this.state.period}</Text>
        </View>
      </LinearGradient>
    </>
  )
}
export default CustomText
