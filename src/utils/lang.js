import  lang from "@/settings";
import Cookie from "js-cookie";




export function setLang(data) {

  return Cookie.set(lang,data);
}

export function getLang() {
  //默认为 en-us 美国
   
  return Cookie.get(lang) || navigator.language.toLowerCase();
}