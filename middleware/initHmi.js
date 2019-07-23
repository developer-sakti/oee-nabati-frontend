// eslint-disable-next-line
const hmi = context => {
  if (process.client) {
    context.store.dispatch('checkHMI', context.req)
  }
}

export default hmi
