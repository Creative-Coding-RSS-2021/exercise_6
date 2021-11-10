

export const manageState = (message, cb) => {


    if(!message || !message.command) {
        cb({message: 'no valid massage'})
    }

    switch(message.command) {

        case "SET_STANDBY_URL":
            chrome.storage.local.set({STANDBY_URL: message.payload}, function() {
                
                cb({message: 'ok'})
              });
              
        break;
        case "GET_STANDBY_URL":
            chrome.storage.local.get(['STANDBY_URL'], function(result) {
                console.log('Value currently is ' + result);
                cb(result)
              });
        break;
        default:
            cb({message: `unkownn command ${message.command}`})

    }


}