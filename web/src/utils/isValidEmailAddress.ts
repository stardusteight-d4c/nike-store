export const isValidEmailAddress = (EMAIL: string) => {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(EMAIL)) {
    return true
  }
  return false
}
