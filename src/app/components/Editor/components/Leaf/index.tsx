type TLeafProps = {}

const Leaf = props => {
  return (
    <span
      {...props.attributes}
      style={{ 
        fontWeight: props.leaf.bold ? 'bold' : 'normal',
        fontStyle: props.leaf.italic ? 'italic' : 'normal'
      }}
      contentEditable={!props.leaf.isVoid}
    >
      {props.children}
    </span>
  )
}

export default Leaf;