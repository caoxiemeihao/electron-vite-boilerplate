const { ipcRenderer } = window

export default function () {
  setTimeout(async () => {
    const oDiv = document.getElementById('sqlite3')!
    const args = await ipcRenderer.invoke('sqlite3')
    const [error, filename] = JSON.parse(args)

    if (error) {
      oDiv.innerHTML = error as string
    } else {
      oDiv.innerHTML = `<code>
        [sqlite3] connect success.
        <br/>
        ${filename}
      </code>`
    }
  }, 19)

  return `
  <style>
    .sqlite3-box code { display:inline-block; padding:4px 11px; margin:4px 0px; width:770px; text-align:left; border-radius:4px; background:rgb(38 42 55); color:aliceblue; word-wrap:break-word; hyphens:auto; }
  </style>
  <div class="sqlite3-box">
    <h2>SQLite3</h2>
    <div id="sqlite3"></div>
  </div>
  `;
}
