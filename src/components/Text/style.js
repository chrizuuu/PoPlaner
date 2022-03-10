import { StyleSheet } from "react-native"
import colors from "../../styles/colorsLightTheme"

const styleText = StyleSheet.create({
  header: {
    fontSize: 34,
    color: colors.textColor,
    fontWeight: "700",
    marginTop: 20,
    opacity: 0.8,
  },

  subHeader: {
    opacity: 0.7,
    marginBottom: 20,
    fontSize: 16,
  },

  textDefaultStyle: {
    fontSize: 14,
    color: "#242424",
  },
})

export default styleText
