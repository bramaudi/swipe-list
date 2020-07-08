const lists = document.querySelectorAll('.list')

let startX = 0
let endX = 0

for (const list of lists) {
  //* Style
  handleStyle(list)

  // Get minimal swiped percent
  const minSwipePercent = 35 // %
  const minSwipeConfirm = minSwipePercent * list.clientWidth / 100

  //* Touch Event
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

  //* Mouse Event
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

function handleStyle(listElm) {
  // Parent
  listElm.style.overflow = 'hidden'
  listElm.style.position = 'relative'
  listElm.style.cursor = 'grab'
  // Each child
  for (const child of listElm.children) {
    child.style.float = 'left'
    child.style.width = '100%'
  }
  // Left action
  listElm.children[0].style.position = 'absolute'
  listElm.children[0].style.right = '100%'
  listElm.children[0].style.textAlign = 'right'
  listElm.children[0].style.boxShadow = 'inset -3px 0 5px 0px rgba(0, 0, 0, 0.2)'
  // Right action
  listElm.children[2].style.position = 'absolute'
  listElm.children[2].style.left = '100%'
  listElm.children[2].style.boxShadow = 'inset 3px 0 5px 0px rgba(0, 0, 0, 0.2)'
}

// Set value of startX
function handleStart(val) {
  startX = val
  addition.innerText = 0 //? Debug
  gesture.innerText = 'idle' //? Debug
}

// Move back element on cancel / not meet minSwipe % requirement
function handleCancel(x, minSwipeConfirm, listElm) {
  const endX = x
  // Swipe back abortion
  if (swipeToRight(startX, endX)) {
    const isSwippedRight = (endX - startX) <= minSwipeConfirm
    if (isSwippedRight) {
      listElm.children[0].style.marginRight = 0
      listElm.children[1].style.marginLeft = 0
      action.innerText = 'Cancel!' //? Debug
    } else {
      listElm.children[0].style.margin = '0'
      listElm.children[1].style.margin = '0'
      action.innerText = 'Swipped right!' //? Debug
    }
  } else {
    const isSwippedLeft = (startX - endX) <= minSwipeConfirm
    if (isSwippedLeft) {
      listElm.children[0].style.marginRight = 0
      listElm.children[2].style.marginLeft = 0
      listElm.children[1].style.marginLeft = 0
      action.innerText = 'Cancel!' //? Debug
    } else {
      listElm.children[0].style.margin = 0
      listElm.children[2].style.margin = 0
      listElm.children[1].style.margin = 0
      action.innerText = 'Swipped left!' //? Debug
    }
  }
  addition.innerText = 0 //? Debug
  gesture.innerText = 'idle' //? Debug
}

// Make element move
function handleMotion(startX, moveX, listElm) {
  const movementX = moveX - startX
  if (swipeToRight(startX, moveX)) {
    // move right
    listElm.children[1].style.marginLeft = `${movementX}px`
    listElm.children[0].style.marginRight = `-${movementX}px` // left-act
    // clear after left
    listElm.children[2].style.marginLeft = 0
    gesture.innerText = 'right' //? Debug
  } else {
    // move left
    listElm.children[1].style.marginLeft = `${movementX}px`
    listElm.children[2].style.marginLeft = `${movementX}px` // right-act
    // clear after right
    listElm.children[0].style.marginRight = 0
    gesture.innerText = 'left' //? Debug
  }
  addition.innerText = (moveX - startX) //? Debug
}

// Detect swipe direction
function swipeToRight(start, end) {
  return !!(start < end)
}