export function getFormattedDate(): string {
  const date = new Date();
  return `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`;
}

export interface UserProfile {
  firstName: string;
  lastName: string;
  imageUrl: string;
}

export function extractProfileData(rawProfileData: any): UserProfile {
  const firstName = rawProfileData["firstName"]["localized"]["en_US"];
  const lastName = rawProfileData["lastName"]["localized"]["en_US"];
  const imageUrl = rawProfileData["profilePicture"]["displayImage~"]["elements"][2]["identifiers"][0]["identifier"];
  const profileData = { firstName, lastName, imageUrl };
  return profileData;
}


export function extractEmailData(rawEmailData: any) {
  return rawEmailData["elements"][0]["handle~"];
}