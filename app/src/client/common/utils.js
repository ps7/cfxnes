export function findAncestorWithId(node, id) {
  for (; node != null; node = node.parentNode) {
    if (node.id === id) {
      return node;
    }
  }
  return null;
}
