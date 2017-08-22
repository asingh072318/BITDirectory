import { State, Effect, Actions } from "jumpstate";

export const vajra = State("VajraApp", {
  // Initial State should be starts with the key 'initial': ...
  initial: {
    contact: []
  },
  getContact(state, payload) {
    var finCont = [];
    Object.keys(payload.Contacts).map((each, key) => {
      var piece = { name: "", number: [] };
      piece.name = each;
      piece.number = payload.Contacts[each];
      finCont.push(piece);
    });
    state.contact = finCont;
    return { ...state };
  }
});
