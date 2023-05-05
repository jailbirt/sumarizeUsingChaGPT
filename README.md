Por supuesto, aquí está el readme en formato markup:

# ChatGPT Summarizer

This Chrome extension allows you to summarize long text files using the [OpenAI ChatGPT](https://beta.openai.com/docs/guides/chat) web application. It automatically splits the text into chunks of 4096 characters (the maximum length allowed by ChatGPT) and provides a list of these chunks for easy copying and pasting into the ChatGPT interface.

## Installation

To install the extension, follow these steps:

1. Clone the repository or download the code as a ZIP file and extract it.
2. Open the Google Chrome browser and go to the Extensions page by clicking the three dots at the top-right corner, selecting "More Tools" and then "Extensions".
3. Turn on Developer mode in the top-right corner.
4. Click the "Load unpacked" button that appears and select the folder where you extracted the code.

## Usage

1. Click the "Choose File" button and select a text file to summarize. The file will be uploaded to the extension.
2. Click the "Summarize" button. The text in the file will be split into chunks of 4096 characters and a list of these chunks will be displayed.
3. Click the "Copy and delete" button next to each chunk you want to use.
4. Open the ChatGPT web application in a new tab by clicking the "Open ChatGPT" button.
5. Paste the text into the input field of the ChatGPT web application.
6. Press the Enter key to send the text to ChatGPT.

## Configuration

If you have an API key for ChatGPT, you can configure the extension to use it instead of copying and pasting the text. To do this:

1. Click the gear icon at the top-right corner of the extension popup.
2. Enter your API key in the input field.
3. Click the "Save" button.
4. The next time you summarize a text file, the extension will automatically send the text to ChatGPT using your API key.

Note that the API key is stored locally in the Chrome browser and is not sent to any servers or third-party applications.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

