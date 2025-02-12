import type { Node } from "@xyflow/react"

export const isValidConnection = (source: Node, target: Node): boolean => {
  if (source.type === "trigger" && target.type === "action") return true
  if (source.type === "action" && target.type === "condition") return true
  if (source.type === "condition" && target.type === "action") return true
  return false
}

export const validateNodeData = (node: Node): boolean => {
  if (!node.data.label || node.data.label.trim() === "") return false
  // Add more specific validations here based on node type
  return true
}

