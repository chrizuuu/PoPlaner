import React from "react"
import { View, StyleSheet } from "react-native"
import { Icon } from "react-native-vector-icons"
import sharedStyles from "../../styles/shared"
import colors from "../../styles/colorsLightTheme"

function FooterList({
  leftIcon,
  leftIconOnPress,
  rightIcon,
  rightIconOnPress,
}) {
  const styles = StyleSheet.create({
    footer: {
      alignItems: "center",
      flexDirection: "row",
      width: "100%",
      justifyContent: leftIcon && rightIcon ? "space-between" : "flex-end",
      borderTopColor: colors.secondColor,
      borderTopWidth: 1,
      backgroundColor: colors.primeColor,
    },
  })

  return (
    <View style={[styles.footer, sharedStyles.padding10]}>
      {leftIcon && leftIconOnPress ? (
        <Icon
          type="ionicon"
          name={leftIcon}
          size={28}
          onPress={leftIconOnPress}
        />
      ) : (
        <View />
      )}

      {rightIcon && rightIconOnPress ? (
        <Icon
          type="ionicon"
          name={rightIcon}
          size={28}
          onPress={rightIconOnPress}
        />
      ) : (
        <View />
      )}
    </View>
  )
}

export default FooterList
