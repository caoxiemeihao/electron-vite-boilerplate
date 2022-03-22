const {
  ipcRenderer,
  fs,
  path,
} = window;

export default function () {
  // Use ipcRenderer.on
  ipcRenderer.on('main-process-message', (_event, message) => {
    const oDiv = document.getElementById('nodejs-api');
    // console.log('[Receive Main-process message]:', message)
    if (oDiv) {
      oDiv.innerHTML = `
      <code>
        [IpcRenderer receive a Main-process message] ${message}
        <br/>
        <br/>
        [path module] ${Object.keys(path)}
      </code>
      `;
    }
  })

  return `
  <style>
    .nodejs-api-box code { display:inline-block; padding:4px 11px; margin:4px 0px; width:770px; text-align:left; border-radius:4px; background:rgb(38 42 55); color:aliceblue; word-wrap:break-word; hyphens:auto; }
  </style>
  <div class="nodejs-api-box">
    <h2>Node.js Api</h2>
    <div id="nodejs-api"></div>
  </div>
  `;
}
