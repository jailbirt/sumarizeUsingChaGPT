chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'sendText') {
    const inputField = document.querySelector('textarea[placeholder="Send a message."]');
    const sendButtonSvg = document.querySelector('button > svg');
    const sendButton = sendButtonSvg ? sendButtonSvg.parentElement : null;

    if (inputField && sendButton) {
      inputField.value = request.text;
      sendButton.click();
    }
  }
});
