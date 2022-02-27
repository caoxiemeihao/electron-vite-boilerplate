import Store from 'electron-store'

export default function () {
  const store = new Store()

  return `
  <style>
    .electron-store-box code { display:inline-block; padding:4px 11px; margin:4px 0px; width:770px; text-align:left; border-radius:4px; background:rgb(38 42 55); color:aliceblue; word-wrap:break-word; hyphens:auto; }
  </style>
  <div class="electron-store-box">
    <h2>Electron Store</h2>
    <div id="electron-store">
    <code>
      [electron-store path]
      <br/>
      ${store.path}
    </code>
    </div>
  </div>
  `;
}

