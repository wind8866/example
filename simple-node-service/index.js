const content = document.getElementById('content')
document.getElementById('btn').addEventListener('click', (event) => {
  content.innerText = content.innerText.replace('docker', 'nodejs')
})