const lists = document.querySelectorAll('.list')

let startX = 0
let endX = 0

for (const list of lists) {
  // Get minimal swiped percent
  const minSwipePercent = 35 // %
  const minSwipeConfirm = minSwipePercent * list.clientWidth / 100

  list.ontouchstart = ({ changedTouches }) => {
    startX = changedTouches[0].screenX
    addition.innerText = 0
    gesture.innerText = 'idle'
  }

  list.ontouchend = ({ changedTouches }) => {
    endX = changedTouches[0].screenX
    // Swipe back abortion
    if (swipeToRight(startX, endX)) {
      if ((endX - startX) <= minSwipeConfirm) {
        list.children[0].style.marginRight = 0
        list.children[1].style.marginLeft = 0
      } else alert('Swipped right!')
    } else {
      if ((startX - endX) <= minSwipeConfirm) {
        list.children[2].style.marginLeft = 0
        list.children[1].style.marginLeft = 0
      } else alert('Swipped left!')
    }
    addition.innerText = 0
    gesture.innerText = 'idle'
  }

  list.ontouchmove = ({ changedTouches }) => {
    const { screenX } = changedTouches[0]
    handleMotion(startX, screenX, list)
    addition.innerText = (screenX - startX)
  }
}

function handleMotion(startX, moveX, list) {
  const movementX = moveX - startX
  const leftAct = list.children[0]
  const rightAct = list.children[2]
  const content = list.children[1]

  if (swipeToRight(startX, moveX)) {
    // moving right
    content.style.marginLeft = `${movementX}px`
    leftAct.style.marginRight = `-${movementX}px` // left-act
    // clear after left
    rightAct.style.marginLeft = 0
    gesture.innerText = 'right'
  } else {
    // moving left
    content.style.marginLeft = `${movementX}px`
    rightAct.style.marginLeft = `${movementX}px` // right-act
    // clear after right
    leftAct.style.marginRight = 0
    gesture.innerText = 'left'
  }
}

function swipeToRight(start, end) {
  return !!(start < end)
}