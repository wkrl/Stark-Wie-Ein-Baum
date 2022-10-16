// State.status' value wird zurückgesetzt, um Message Component erneut anzeigen zu können
export const removeStatus = (store) => {
  const copy = {...store.state, status: ""};
  store.setState(copy);
};

// Value eines keys im state wird geupdated 
export const updateState = (store, key, value) => {
  const copy = {...store.state, [`${key}`]: value};
  store.setState(copy);
};
