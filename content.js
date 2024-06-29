function sortIssues() {
  // Get the container and the list of issues
  const container = document.querySelectorAll('[data-testid="issue.issue-view.views.common.child-issues-panel.issues-container"]')[0];
  if (!container) return;

  const issuesList = container.children[0];
  const issues = Array.from(issuesList.children);

  // Priority order
  const priorityOrder = ['Highest', 'High', 'Medium', 'Low', 'Lowest'];

  // Sort issues based on priority
  issues.sort((a, b) => {
    const getPriority = (element) => {
      const priorityElement = element.querySelector('img[alt^="Priority:"]');
      return priorityElement ? priorityElement.alt.split(': ')[1] : '';
    };

    const priorityA = getPriority(a);
    const priorityB = getPriority(b);

    return priorityOrder.indexOf(priorityA) - priorityOrder.indexOf(priorityB);
  });

  // Remove existing issues from the list
  while (issuesList.firstChild) {
    issuesList.removeChild(issuesList.firstChild);
  }

  // Append sorted issues back to the list
  issues.forEach((issue) => issuesList.appendChild(issue));
}

// Listen for messages from the background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'sortIssues') {
    sortIssues();
    sendResponse({ status: 'Issues sorted' });
  }
});
