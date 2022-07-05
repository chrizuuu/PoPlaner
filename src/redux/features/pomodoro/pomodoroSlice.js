/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit"

export const pomodoroSlice = createSlice({
  name: "pomodoro",
  initialState: {
    focusTime: 25,
    shortBreak: 5,
    longBreak: 15,
    workingSessions: 4,
    autoStartPomodoro: false,
    autoStartBreak: false,
  },
  reducers: {
    changeFocusTime: (state, action) => {
      state.focusTime = action.payload
    },
    changeShortBreak: (state, action) => {
      state.shortBreak = action.payload
    },
    changeLongBreak: (state, action) => {
      state.longBreak = action.payload
    },
    changeWorkingSessions: (state, action) => {
      state.workingSessions = action.payload
    },
    toggleAutoStartPomodoro: state => {
      state.autoStartPomodoro = !state.autoStartPomodoro
    },
    toggleAutoStartBreak: state => {
      state.autoStartBreak = !state.autoStartBreak
    },
  },
})

export const {
  changeFocusTime,
  changeShortBreak,
  changeLongBreak,
  changeWorkingSessions,
  toggleAutoStartPomodoro,
  toggleAutoStartBreak,
} = pomodoroSlice.actions

export default pomodoroSlice.reducer
