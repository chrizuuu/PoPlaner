/* eslint-disable react/jsx-indent */
/* eslint-disable object-shorthand */
import React, { useState, useRef } from "react"
import withObservables from "@nozbe/with-observables"
import { StyleSheet, View, Pressable } from "react-native"
import Icon from "react-native-vector-icons/MaterialIcons"
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  FadeIn,
  FadeOut,
} from "react-native-reanimated"
import { CommonActions, useNavigation } from "@react-navigation/native"
import { TextBold } from "../components/Text/Text"
import ProjectDAO from "../database/DAO/ProjectDAO"
import ProjectInput from "../components/Inputs/ProjectInput"
import ProjectItem from "../components/Items/Project/ProjectItem"

const NavigationProjectsList = ({ projects, style, state }) => {
  const [isVisible, setIsVisible] = useState(false)
  const projectInputRef = useRef()
  const projectsListIconAnimation = useSharedValue("0deg")
  const navigation = useNavigation()

  const projectsListIconStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: projectsListIconAnimation.value }],
  }))

  const focusedCheck = (value) => {
    let actualRoute = state.routes[state.index]

    while (actualRoute.state) {
      actualRoute = actualRoute.state.routes[actualRoute.state.index]
    }

    if (value === actualRoute.key) {
      return true
    }
    return false
  }

  const handleIsVisible = () => {
    const visibility = isVisible
    if (visibility === true) {
      projectsListIconAnimation.value = withTiming("0deg", { duration: 400 })
      setIsVisible(false)
    } else {
      projectsListIconAnimation.value = withTiming("180deg", { duration: 400 })
      setIsVisible(true)
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: "100%",
      paddingHorizontal: 15,
    },
    wrapperHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 5,
    },
    item: {
      height: 50,
      justifyContent: "center",
    },
  })

  return (
    <>
      <View style={[styles.container, { ...style }]}>
        <View style={styles.wrapperHeader}>
          <TextBold fontSize={15}>Projects</TextBold>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Animated.View style={projectsListIconStyle}>
              <Icon
                style={{ marginRight: 5 }}
                name="expand-more"
                size={26}
                color="#484848"
                onPress={() => {
                  handleIsVisible()
                }}
              />
            </Animated.View>
            <Icon
              name="add"
              size={26}
              color="#484848"
              onPress={() => {
                setIsVisible(true)
                projectInputRef.current.openProjectInput()
              }}
            />
          </View>
        </View>
        {isVisible ? (
          <View>
            {projects.map((project) => (
              <Animated.View
                style={styles.item}
                key={project.id}
                entering={FadeIn}
                exiting={FadeOut}
              >
                <Pressable
                  onPress={() => {
                    navigation.dispatch(
                      CommonActions.navigate({
                        name: "Project",
                        key: project.id.toString(),
                        params: {
                          projectID: project.id,
                        },
                      })
                    )
                  }}
                >
                  <ProjectItem
                    project={project}
                    focused={focusedCheck(project.id)}
                  />
                </Pressable>
              </Animated.View>
            ))}
          </View>
        ) : null}
      </View>
      <ProjectInput ref={projectInputRef} />
    </>
  )
}

const allProjects = withObservables([], () => ({
  projects: ProjectDAO.observeAllProjects(),
}))

export default allProjects(NavigationProjectsList)
