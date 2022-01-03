/* eslint-disable global-require */

import { I18nManager } from "react-native"
import * as RNLocalize from "react-native-localize"
import i18n from "i18n-js"
import memoize from "lodash.memoize"

const translation = {
  en: () => require("./en.json"),
  pl: () => require("./pl.json"),
}

const strings = memoize(
  (key, config) => i18n.t(key, config),
  (key, config) => (config ? key + JSON.stringify(config) : key)
)

const setI18Config = () => {
  const fallback = { languageTag: "en", isRTL: false }
  const { languageTag, isRTL } = RNLocalize.findBestAvailableLanguage(
    Object.keys(translation) || fallback
  )
  strings.cache.clear()
  I18nManager.forceRTL(isRTL)
  i18n.translations = { [languageTag]: translation[languageTag]() }
  i18n.locale = languageTag
}

export { setI18Config, strings }
