const ROLES = {
  X: "x",
  O: "o"
}

const otherRole = role => Object.values(ROLES).find(r => r !== role)

export { ROLES, otherRole }
