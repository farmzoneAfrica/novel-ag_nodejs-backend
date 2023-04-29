import statesData from '../utils/statesAndLga.json'

export function getStates() {
  return statesData.map((state) => state.state);
}

export function getLGAs(state: string) {
  const stateData = statesData.find((s) => s.state === state);
  if (stateData) {
    return stateData.lgas; 
  } else {
    return "State not found" 
  }
}