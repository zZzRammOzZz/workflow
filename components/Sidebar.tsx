import type React from "react"
import { useStore } from "../store/useStore"

const Sidebar = () => {
  const addNode = useStore((state) => state.addNode)

  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData("application/reactflow", nodeType)
    event.dataTransfer.effectAllowed = "move"
  }

  return (
    <aside style={{ padding: "15px", borderRight: "1px solid #eee", width: "200px" }}>
      <div className="description">You can drag these nodes to the pane on the right.</div>
      <div
        className="dndnode trigger"
        onDragStart={(event) => onDragStart(event, "trigger")}
        draggable
        style={{ marginBottom: "10px", padding: "10px", border: "1px solid #ddd", cursor: "grab" }}
      >
        Trigger Node
      </div>
      <div
        className="dndnode action"
        onDragStart={(event) => onDragStart(event, "action")}
        draggable
        style={{ marginBottom: "10px", padding: "10px", border: "1px solid #ddd", cursor: "grab" }}
      >
        Action Node
      </div>
      <div
        className="dndnode condition"
        onDragStart={(event) => onDragStart(event, "condition")}
        draggable
        style={{ padding: "10px", border: "1px solid #ddd", cursor: "grab" }}
      >
        Condition Node
      </div>
    </aside>
  )
}

export default Sidebar

