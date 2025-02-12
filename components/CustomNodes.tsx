"use client"

import type React from "react"
import { useState } from "react"
import { Handle, Position } from "@xyflow/react"
import { NodeLabelEditor } from "./NodeLabelEditor"

const nodeStyles = {
  padding: "10px",
  borderRadius: "5px",
  border: "1px solid #ddd",
  width: 150,
}

interface NodeData {
  label: string
  onLabelChange: (newLabel: string) => void
}

interface NodeProps {
  data: NodeData
}

const BaseNode: React.FC<NodeProps & { color: string; children: React.ReactNode }> = ({ data, color, children }) => {
  const [isEditing, setIsEditing] = useState(false)

  const handleLabelClick = () => {
    setIsEditing(true)
  }

  const handleLabelSave = (newLabel: string) => {
    data.onLabelChange(newLabel)
    setIsEditing(false)
  }

  const handleLabelCancel = () => {
    setIsEditing(false)
  }

  return (
    <div style={{ ...nodeStyles, background: color }}>
      {children}
      {isEditing ? (
        <NodeLabelEditor label={data.label} onSave={handleLabelSave} onCancel={handleLabelCancel} />
      ) : (
        <div onClick={handleLabelClick}>{data.label}</div>
      )}
    </div>
  )
}

export const TriggerNode: React.FC<NodeProps> = ({ data }) => (
  <BaseNode data={data} color="#ffcccb">
    <Handle type="source" position={Position.Bottom} />
  </BaseNode>
)

export const ActionNode: React.FC<NodeProps> = ({ data }) => (
  <BaseNode data={data} color="#90ee90">
    <Handle type="target" position={Position.Top} />
    <Handle type="source" position={Position.Bottom} />
  </BaseNode>
)

export const ConditionNode: React.FC<NodeProps> = ({ data }) => (
  <BaseNode data={data} color="#add8e6">
    <Handle type="target" position={Position.Top} />
    <Handle type="source" position={Position.Bottom} id="yes" />
    <Handle type="source" position={Position.Right} id="no" />
  </BaseNode>
)

