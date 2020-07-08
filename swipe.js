const lists = document.querySelectorAll('.list')

let startX = 0
let endX = 0

for (const list of lists) {
  //* Style
  handleStyle(list)

  // Get minimal swiped percent
  const minSwipePercent = 25 // %
  const minSwipeConfirm = minSwipePercent * list.clientWidth / 100

  //* Touch Event
  list.ontouchstart = ({ changedTouches }) => {
    handleStart(changedTouches[0].screenX)
    list.ontouchmove = ({ changedTouches }) => {
      const { screenX } = changedTouches[0]
      handleMotion(startX, screenX)
    }
    list.ontouchend = ({ changedTouches }) => {
      handleCancel(changedTouches[0].screenX)
    }
  }

  //* Mouse Event
  list.onmousedown = ({ screenX }) => {
    handleStart(screenX)
    list.style.cursor = 'grabbing'
    list.onmousemove = ({ screenX }) => {
      handleMotion(startX, screenX)
    }
    list.onmouseup = ({ screenX }) => {
      list.onmousemove = null
      list.style.cursor = 'grab' 
      handleCancel(screenX)
    }
  }

  //* Handlers list
  function handleStyle() {
    // Parent
    list.style.overflow = 'hidden'
    list.style.position = 'relative'
    list.style.cursor = 'grab'
    // Each child
    for (const child of list.children) {
      child.style.float = 'left'
      child.style.width = '100%'
    }
    // Left action
    list.children[0].style.position = 'absolute'
    list.children[0].style.right = '100%'
    list.children[0].style.textAlign = 'right'
    list.children[0].style.boxShadow = 'inset -3px 0 5px 0px rgba(0, 0, 0, 0.2)'
    // Right action
    list.children[2].style.position = 'absolute'
    list.children[2].style.left = '100%'
    list.children[2].style.boxShadow = 'inset 3px 0 5px 0px rgba(0, 0, 0, 0.2)'
  }

  // Set value of startX
  function handleStart(val) {
    startX = val
    // Reset transition on event start
    for (const child of list.children) {
      child.style.transition = 'none'
    }
    addition.innerText = 0 //? Debug
    gesture.innerText = 'idle' //? Debug
  }

  // Move back element on cancel / not meet minSwipe % requirement
  function handleCancel(endX) {
    // Add transition on event end
    for (const child of list.children) {
      child.style.transition = 'margin .5s'
    }
    // Swipe back abortion
    if (swipeToRight(startX, endX)) {
      if (swipeConfirmed(startX, endX, 'right')) {
        list.children[0].style.marginRight = 0
        list.children[1].style.marginLeft = 0
        action.innerText = 'Cancel!' //? Debug
      } else {
        list.children[0].style.marginRight = '-100%'
        list.children[1].style.marginLeft = '100%'
        action.innerText = 'Swipped right!' //? Debug
      }
    } else {
      if (swipeConfirmed(startX, endX, 'left')) {
        list.children[0].style.marginRight = 0
        list.children[2].style.marginLeft = 0
        list.children[1].style.marginLeft = 0
        action.innerText = 'Cancel!' //? Debug
      } else {
        list.children[0].style.margin = 0
        list.children[2].style.marginLeft = '-100%'
        list.children[1].style.marginRight = '100%'
        action.innerText = 'Swipped left!' //? Debug
      }
    }
    addition.innerText = 0 //? Debug
    gesture.innerText = 'idle' //? Debug
  }
  
  // Make element move
  function handleMotion(startX, moveX) {
    const movementX = moveX - startX
    // Moving element
    if (swipeToRight(startX, moveX)) {
      // move right
      list.children[1].style.marginLeft = `${movementX}px`
      list.children[0].style.marginRight = `-${movementX}px` // left-act
      // clear after left
      list.children[2].style.marginLeft = 0
      gesture.innerText = 'right' //? Debug
    } else {
      // move left
      list.children[1].style.marginLeft = `${movementX}px`
      list.children[2].style.marginLeft = `${movementX}px` // right-act
      // clear after right
      list.children[0].style.marginRight = 0
      gesture.innerText = 'left' //? Debug
    }
    // Change action color
    swipeConfirmed(startX, moveX, 'right')
      ? list.children[0].classList.remove('left-active')
      : list.children[0].classList.add('left-active')
    swipeConfirmed(startX, moveX, 'left')
      ? list.children[2].classList.remove('right-active')
      : list.children[2].classList.add('right-active')
    addition.innerText = (moveX - startX) //? Debug
  }
  
  // Detect swipe is confirmed / canceled
  function swipeConfirmed(startX, endX, direction) {
    return direction === 'right'
      ? (endX - startX) <= minSwipeConfirm
      : (startX - endX) <= minSwipeConfirm
  }
}

// Detect swipe direction
function swipeToRight(start, end) {
  return !!(start < end)
}