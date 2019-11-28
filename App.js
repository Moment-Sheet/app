import React from 'react'
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  StatusBar,
} from 'react-native'

import { Colors } from 'react-native/Libraries/NewAppScreen'

import Period from './components/TimeTill'
import DayPeriod from './components/DayPeriod'
import Date from './components/Date'
import TimeTill from './components/TimeTill'
import DayType from './components/DayType'

const App = () => (
  <>
    <StatusBar barStyle="dark-content" />
    <SafeAreaView>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}
      >
        <View style={styles.body}>
          <Date />
          <DayType />
          <DayPeriod />
          <TimeTill />
        </View>
      </ScrollView>
    </SafeAreaView>
  </>
)

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  body: {
    backgroundColor: Colors.white,
  },
})

export default App
