import globalHook from "use-global-hook";
import * as actions from "../actions";

const initialState = {
    nachname: "",
    straße: "", 
    nummer: "", 
    postleitzahl: "", 
    ort: "",
    email: "",
    nachricht: "",
    status: "",
    telefon: "", 
    fruitTypeIds: [],    
}

const useGlobal = globalHook(initialState, actions);

export default useGlobal;
