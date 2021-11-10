import {manageState} from "./state.js"


chrome.runtime.onMessage.addListener(
    function(message, _, sendResponse) {

        
        manageState(message, sendResponse)
        
        return true
        
    }
)