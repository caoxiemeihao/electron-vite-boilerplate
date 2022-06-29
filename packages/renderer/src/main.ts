import './style.css'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
<div class="logo-box">
  <img height="470" src="./logo.svg" />
</div>
`

postMessage({ payload: 'removeLoading' }, '*')
