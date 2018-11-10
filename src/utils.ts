export const promisedSetState = (that, newState) => {
  return new Promise((resolve) => {
    that.setState(newState, () => {
      resolve()
    });
  });
}

