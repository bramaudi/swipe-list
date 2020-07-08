const lists = document.querySelectorAll('.list')

let startX = 0
let endX = 0

for (const list of lists) {
  // Get minimal swiped percent
  const minSwipePercent = 35 // %
  const minSwipeConfirm = minSwipePercent * list.clientWidth / 100

  list.ontouchstart = ({ changedTouches }) => {
    handleStart(changedTouches[0].screenX)
    list.ontouchmove = ({ changedTouches }) => {
      const { screenX } = changedTouches[0]
      handleMotion(startX, screenX, list)
    }
  }
  list.ontouchend = ({ changedTouches }) => {
    handleCancel(changedTouches[0].screenX, minSwipeConfirm, list)
  }


  list.onmousedown = ({ screenX }) => {
    handleStart(screenX)
    list.style.cursor = 'grabbing'
    list.onmousemove = ({ screenX }) => {
      handleMotion(startX, screenX, list)
    }
  }
  list.onmouseup = ({ screenX }) => {
    list.onmousemove = null
    list.style.cursor = 'grab' 
    handleCancel(screenX, minSwipeConfirm, list)
  }
}

// Set value of startX
function handleStart(val) {
  startX = val
  addition.innerText = 0
  gesture.innerText = 'idle'
}

// Move back element on cancel / not meet minSwipe % requirement
function handleCancel(x, minSwipeConfirm, list) {
  const endX = x
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

// Make element move
function handleMotion(startX, moveX, list) {
  const movementX = moveX - startX
  if (swipeToRight(startX, moveX)) {
    // move right
    list.children[1].style.marginLeft = `${movementX}px`
    list.children[0].style.marginRight = `-${movementX}px` // left-act
    // clear after left
    list.children[2].style.marginLeft = 0
    gesture.innerText = 'right'
  } else {
    // move left
    list.children[1].style.marginLeft = `${movementX}px`
    list.children[2].style.marginLeft = `${movementX}px` // right-act
    // clear after right
    list.children[0].style.marginRight = 0
    gesture.innerText = 'left'
  }
  addition.innerText = (moveX - startX)
}

// Detect swipe direction
function swipeToRight(start, end) {
  return !!(start < end)
}