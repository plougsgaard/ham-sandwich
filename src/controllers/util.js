export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export const isValidUUID = s => /[a-f,A-F,0-9]{8}-([a-f,A-F,0-9]{4}-){3}[a-f,A-F,0-9]{12}/.test(s)
