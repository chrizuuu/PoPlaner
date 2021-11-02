/* eslint-disable global-require */

import { I18nManager } from "react-native"
import * as Localization from "expo-localization"
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
  const languageTag =
    Localization.locale.search(/-|_/) !== -1
      ? Localization.locale.slice(0, 2)
      : Localization.locale

  strings.cache.clear()
  I18nManager.forceRTL(Localization.isRTL)
  i18n.defaultLocale = "pl"
  i18n.translations = { [languageTag]: translation[languageTag]() }
  i18n.locale = languageTag
  i18n.fallbacks = true
}

export { setI18Config, strings }
