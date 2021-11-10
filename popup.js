const input = document.querySelector('[data-input]')
input.addEventListener('blur', () => {

    // send message on active tab
    chrome.tabs.query(
        {active: true, currentWindow: true}, 
        function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {standByIn: parseInt(input.value)}, function(response) {
            console.log(response.farewell);
            });
      });
      
    
})