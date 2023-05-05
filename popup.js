const chatGPTUrl = 'https://chat.openai.com';
//
function readUploadedFileAsText(inputFile) {
  const fileReader = new FileReader();
  return new Promise((resolve, reject) => {
    fileReader.onerror = () => {
      fileReader.abort();
      reject(new DOMException("Problem parsing input file."));
    };
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.readAsText(inputFile);
  });
}

function splitText(text) {
  const maxLength = 4096;
  const parts = [];
  let startIndex = 0;

  while (startIndex < text.length) {
    const chunk = text.slice(startIndex, startIndex + maxLength);
    parts.push(chunk);
    startIndex += maxLength;
  }
  return parts;
}

function createTextChunksList(textChunks) {
  const list = document.createElement('ol');
  list.id = "chunksList";
  textChunks.forEach(chunk => {
    const listItem = document.createElement('li');
    const textarea = document.createElement('textarea');
    textarea.value = chunk;
    textarea.readOnly = true;
    listItem.appendChild(textarea);
    
    const copyButton = document.createElement('button');
    copyButton.textContent = "Copiar y eliminar";
    copyButton.addEventListener('click', async () => {
     try {
	    await navigator.clipboard.writeText(textarea.value);
	    listItem.remove();

	    const openaiTab = await chrome.tabs.query({ url: 'https://chat.openai.com/*' });
	    if (openaiTab.length > 0) {
		    const tabId = openaiTab[0].id;
		    await chrome.windows.update(openaiTab[0].windowId, { focused: true });
		    await chrome.tabs.update(tabId, { active: true });
	    } else {
		    await chrome.tabs.create({ url: chatGPTUrl });
	    }
      } catch (error) {
        console.error('Error al copiar el texto y cambiar a la pestaña de Chat de OpenAI:', error);
      }
    });

    listItem.appendChild(copyButton);

    list.appendChild(listItem);
  });
  return list;
}

document.getElementById("fileInput").addEventListener("change", async (event) => {
  const fileInput = event.target;
  if (fileInput.files.length === 0) {
    return;
  }

  const file = fileInput.files[0];
  try {
    const text = await readUploadedFileAsText(file);
    chrome.storage.local.set({ "selectedFileText": text });
    document.getElementById("selectedFileName").textContent = file.name;
  } catch (err) {
    console.error(err);
  }
});

document.getElementById("summarizeButton").addEventListener("click", async () => {
  chrome.storage.local.get("selectedFileText", async (data) => {
    if (!data.selectedFileText) {
      alert("Please upload a .txt file.");
      return;
    }

    const existingList = document.getElementById("chunksList");
    if (existingList) {
      existingList.remove();
    }

    const text = data.selectedFileText;
    const textChunks = splitText(text);
    const list = createTextChunksList(textChunks);
    document.body.appendChild(list);
  });
});

async function sendTextToChatGPT(text) {
  const queryInfo = {
    active: true,
    currentWindow: true
  };

  try {
    const tabs = await chrome.tabs.query(queryInfo);
    const activeTab = tabs[0];

    if (activeTab.url.includes(chatGPTUrl)) {
      chrome.tabs.sendMessage(activeTab.id, { action: 'sendText', text });
    } else {
      alert('Por favor, abre ChatGPT en una pestaña activa para enviar el texto automáticamente.');
    }

    await navigator.clipboard.writeText(text);

    await chrome.scripting.executeScript({
      target: { tabId: activeTab.id },
      function: () => {
        const input = document.querySelector('textarea[placeholder="Send a message."]');
        if (input) {
          input.focus();
          input.select();
          document.execCommand('paste');
        }
      },
    });
  } catch (error) {
    console.error('Error al enviar el texto a ChatGPT:', error);
  }
}

