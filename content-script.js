
let renderStandBy

const importRenderStandBy = async () => {
  const src = chrome.extension.getURL('src/particles.js');
  const module =  await import(src);
  renderStandBy = module.renderStandBy
  
}
(importRenderStandBy)();


const URL = window.location.href

chrome.runtime.onMessage.addListener(
    function(request, _, sendResponse) {
      
        if(request.standByIn) {
            const sec = request.standByIn

            chrome.runtime.sendMessage({command: "SET_STANDBY_URL", payload: URL}, (response) => {
                console.log('content script standby response', response)
            })
            
            
            setTimeout(renderStandBy, sec * 1000)

        }
        
        sendResponse({farewell: "goodbye"});
    }
  );


chrome.runtime.sendMessage({command: "GET_STANDBY_URL"}, async function(response) {

    console.log('backend response', response)
    if(response && response.STANDBY_URL && response.STANDBY_URL === URL) {
        
        await importRenderStandBy()
        
        renderStandBy()

    }
    return true
  });