/**
 * Returns profilt img url
 * @param username
 */
function getProfileImgUrl(username: string) {
  const removeWhiteSpace = username.replace(/\s/g, "");

  return `https://avatars.dicebear.com/api/identicon/${removeWhiteSpace}.svg`;
}

export default getProfileImgUrl;
