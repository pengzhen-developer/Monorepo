function diffByKey(source, target, keyName = 'id') {
  const removed = target.concat()
  const added = source.concat()
  const seen = {}

  let removedIndex = removed.length - 1
  let addedIndex = added.length - 1

  while (removedIndex >= 0 || addedIndex >= 0) {
    if (addedIndex >= 0) {
      const a = added[addedIndex]
      if (seen[a[keyName]] !== undefined) {
        removed.splice(seen[a[keyName]], 1)
        added.splice(addedIndex, 1)
      } else {
        seen[a[keyName]] = addedIndex
      }

      addedIndex--
    }
    if (removedIndex >= 0) {
      const r = removed[removedIndex]
      if (seen[r[keyName]] !== undefined) {
        added.splice(seen[r[keyName]], 1)
        removed.splice(removedIndex, 1)
      } else {
        seen[r[keyName]] = removedIndex
      }
    }

    removedIndex--
  }
  return {
    added,
    removed,
  }
}

function actionAnimation(el, animationClassName, afterAnimationCallback) {
  const eventName = 'animationend'

  function onLeaveAnimationEnd(event) {
    console.log('animation stopped', event)

    this.removeEventListener(eventName, onLeaveAnimationEnd)
    this.classList.remove(animationClassName)
    if (afterAnimationCallback !== undefined) {
      afterAnimationCallback()
    }
  }

  el.addEventListener(eventName, onLeaveAnimationEnd)
  el.classList.add(animationClassName)
}

export { diffByKey, actionAnimation }
