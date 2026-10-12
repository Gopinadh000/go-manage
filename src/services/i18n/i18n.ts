import i18n from  "i18next";
import {initReactI18next} from  "react-i18next";


import en from "./locales/en.json";
import hi from  "./locales/hi.json";
import te from "./locales/te.json";
import es from "./locales/es.json";

const savedLanguage = localStorage.getItem("appLanguage") || "en";


i18n.use(initReactI18next).init({
    resources: {
         en: { translation: en },
      hi: { translation: hi },
      te: { translation: te },
      es: { translation: es },
    },

    lng :  ["en", "hi", "te", "es"].includes(savedLanguage)
      ? savedLanguage
      : "en",

     fallbackLng: "en",

     interpolation: {
      escapeValue: false,
    },
})