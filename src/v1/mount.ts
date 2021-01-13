export default function mount($node: HTMLElement | Text, $target: HTMLElement | null) {
  $target?.replaceWith($node)
  return $node
}
