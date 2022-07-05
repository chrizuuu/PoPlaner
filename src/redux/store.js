import { configureStore } from "@reduxjs/toolkit"
import pomodoroReducer from "./features/pomodoro/pomodoroSlice"

export default configureStore({
  reducer: {
    pomodoro: pomodoroReducer,
  },
})
