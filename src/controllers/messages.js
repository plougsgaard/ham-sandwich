const fakeMessages = [
  {markup: 'I do not like cherries..'},
  {markup: 'But I like bananas. Yep.'}
]

export const getMessages = async (ctx) => {
  ctx.body = fakeMessages
}
