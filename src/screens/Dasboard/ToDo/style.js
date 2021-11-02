import { StyleSheet, Dimensions } from "react-native"
import colors from "../../../styles/colorsLightTheme"

const windowHeight = Dimensions.get("window").height

const ToDoSTyles = StyleSheet.create({
  tasksListContainer: {
    flex: 1,
    width: "100%",
    height: windowHeight,
    backgroundColor: colors.secondColor,
  },
  backdropPressable: {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 60,
  },
})

export default ToDoSTyles
