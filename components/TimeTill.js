/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import NormalSchedule from '../schedules/normal'
import { stringToSeconds, formatTimeHHMMSS, secondsToString } from './TimeUtil'
import { styles } from './Styles'

let interval

function getPeriod() {
  const d = new Date()
  const n = d.toLocaleTimeString()

  const currSeconds = stringToSeconds(formatTimeHHMMSS(d))

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

function timetill(end) {
  const d = new Date()

  const currSeconds = stringToSeconds(formatTimeHHMMSS(d))
  end = stringToSeconds(end)
  if (!getPeriod().includes('BETWEEN')) {
    return secondsToString(end - currSeconds)
  }

  return secondsToString(end - currSeconds)
}

class CustomText extends Component {
  state = {
    period: 'oof',
    timeTill: 'N/A',
    inBetween: true,
  }

  componentDidMount = () => {
    interval = setInterval(() => {
      this.setState({ period: getPeriod() }, () => {
        const f = this.state.period.split(':')

        if (f[0] === 'Going to') {
          this.setState({ inBetween: true })
        } else {
          this.setState({ inBetween: false })
        }

        if (f[0] === 'Going to') {
          this.setState({
            timeTill: timetill(NormalSchedule[f[1]].start),
          })
        } else {
          for (const key of Object.keys(NormalSchedule)) {
            if (key === this.state.period) {
              this.setState({
                timeTill: timetill(NormalSchedule[key].end),
              })
            }
          }
        }
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
        colors={['#6CEDFF', '#0B71EA']}
        style={styles.card}
      >
        <View style={{ marginRight: 30 }}>
          <Text style={styles.cardTitle}>
            {this.state.inBetween
              ? 'Time until class starts'
              : 'Time until class ends'}
          </Text>

          <Text style={styles.cardContent}>
            <Text>
              {`${this.state.timeTill.split(':')[1]}`}
              <Text style={{ fontSize: 20 }}> min </Text>
              {`${this.state.timeTill.split(':')[2]}`}
              <Text style={{ fontSize: 20 }}> sec</Text>
            </Text>
          </Text>
        </View>
      </LinearGradient>
    </>
  )
}
export default CustomText
