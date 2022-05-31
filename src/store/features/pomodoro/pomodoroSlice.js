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
  reducers: {},
})

export default pomodoroSlice.reducer
