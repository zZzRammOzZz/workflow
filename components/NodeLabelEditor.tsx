"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"

interface NodeLabelEditorProps {
  label: string
  onSave: (newLabel: string) => void
  onCancel: () => void
}

export const NodeLabelEditor: React.FC<NodeLabelEditorProps> = ({ label, onSave, onCancel }) => {
  const [editedLabel, setEditedLabel] = useState(label)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleSave = () => {
    if (editedLabel.trim() !== "") {
      onSave(editedLabel)
    } else {
      onCancel()
    }
  }

  return (
    <div className="node-label-editor">
      <input
        ref={inputRef}
        type="text"
        value={editedLabel}
        onChange={(e) => setEditedLabel(e.target.value)}
        onBlur={handleSave}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            handleSave()
          }
        }}
        className="bg-white border border-gray-300 rounded px-2 py-1 w-full"
      />
    </div>
  )
}

