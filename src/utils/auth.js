import settings from "@/settings";
import Cookie from "js-cookie";

export function getToken() {
  return  Cookie.get(settings.tokenName);
}

export function getInviteCode() {
  return  Cookie.get(settings.inviteCode);
}
/**
 *
 * @param {string} token
 */
export function setToken(token) {
  return  Cookie.set(settings.tokenName, token); //设置token

}
/**
 *
 * @param {string||parseInt} id
 */
export function setInviteCode(id) {
  return  Cookie.set(settings.inviteCode, id); //设置邀请人

}

export function removeToken() {

  return Cookie.remove(settings.tokenName);
}

