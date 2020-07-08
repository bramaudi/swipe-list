const list_data = [
  '[1] Dummy list',
  '[2] Dummy list',
  '[3] Dummy list',
  '[4] Dummy list'
]

list_data.map((val) => {
  const listClass = document.createElement('div', { class: 'list' })
  const leftActClass = document.createElement('div')
  const rightActClass = document.createElement('div', { class: 'right-act' })
  const contentClass = document.createElement('div', { class: 'content' })

  listClass.classList.add('list')
  leftActClass.classList.add('left-act')
  rightActClass.classList.add('right-act')
  contentClass.classList.add('content')

  leftActClass.innerText = 'Left Action'
  rightActClass.innerText = 'Right Action'
  contentClass.innerText = val

  listClass.appendChild(leftActClass)
  listClass.appendChild(contentClass)
  listClass.appendChild(rightActClass)

  list_summoner.appendChild(listClass)
})