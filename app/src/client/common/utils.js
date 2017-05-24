export function isAncestorOrSelf(node, target) {
  for (; node != null; node = node.parentNode) {
    if (node === target) {
      return true;
    }
  }
  return false;
}
