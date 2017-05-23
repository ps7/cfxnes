export function isAncestorOrSelf(node, target) {
  console.log(node, target)
  for (; node != null; node = node.parentNode) {
    if (node === target) {
      return true;
    }
  }
  return false;
}
