/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react'
import { Text, StyleSheet } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import NormalSchedule from '../schedules/normal'
import { stringToSeconds, formatTimeHHMMSS, secondsToString } from './TimeUtil'

let interval

const styles = StyleSheet.create({
  test: {
    margin: 10,
    padding: 20,
    backgroundColor: 'red',
    borderRadius: 5,
  },
})

function getPeriod() {
  const d = new Date()

  const currSeconds = stringToSeconds(formatTimeHHMMSS(d))

  const scheduleToUse = NormalSchedule // Change schedule based on day
  for (const key of Object.keys(NormalSchedule)) {
    const startSeconds = parseInt(
      stringToSeconds(NormalSchedule[key].start),
      10,
    )
    const endSeconds = stringToSeconds(NormalSchedule[key].end)

    if (currSeconds > stringToSeconds(NormalSchedule.period6.end)) {
      console.log('over')
      return 'School Over'
    }

    if (currSeconds >= startSeconds && currSeconds <= endSeconds) {
      console.log('class')
      return key
    }

    if (currSeconds <= startSeconds) {
      console.log('in between')
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
  }

  componentDidMount = () => {
    interval = setInterval(() => {
      this.setState({ period: getPeriod() }, () => {
        console.log(`state: ${this.state.period}`)
        const f = this.state.period.split(':')
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
        colors={['#AD00FF', '#FF589E']}
        style={styles.test}
      >
        <Text style={{ fontSize: 40, textAlign: 'center' }}>
          {this.state.period}
        </Text>
      </LinearGradient>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={['#42FF00', '#00FFF0']}
        style={styles.test}
      >
        <Text style={{ fontSize: 40, textAlign: 'center' }}>
          {this.state.timeTill}
        </Text>
      </LinearGradient>
    </>
  )
}
export default CustomText
