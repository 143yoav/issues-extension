chrome.action.onClicked.addListener((tab) => {
    chrome.tabs.sendMessage(tab.id, {action: 'sortIssues'}, (response) => {
      console.log(response?.status);
    });
  });