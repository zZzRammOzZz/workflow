"use client"

import type React from "react"
import { useCallback } from "react"
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  type Connection,
  type Edge,
  type Node,
  useReactFlow,
  type EdgeChange,
} from "@xyflow/react"
import { useStore } from "../store/useStore"
import { TriggerNode, ActionNode, ConditionNode } from "./CustomNodes"
import Sidebar from "./Sidebar"
import { isValidConnection, validateNodeData } from "../utils/validation"

import "@xyflow/react/dist/style.css"

const nodeTypes = {
  trigger: TriggerNode,
  action: ActionNode,
  condition: ConditionNode,
}

const WorkflowEditor = () => {
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect, addNode, updateNode } = useStore()
  const reactFlowInstance = useReactFlow()

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = "move"
  }, [])

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault()

      const type = event.dataTransfer.getData("application/reactflow")

      if (typeof type === "undefined" || !type) {
        return
      }

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      })

      const newNode: Node = {
        id: `${type}-${Date.now()}`,
        type,
        position,
        data: {
          label: `New ${type} node`,
          onLabelChange: (newLabel: string) => {
            updateNode(newNode.id, { label: newLabel })
          },
        },
      }

      if (validateNodeData(newNode)) {
        addNode(newNode)
      } else {
        alert("Invalid node data. Please check the node label and try again.")
      }
    },
    [addNode, updateNode, reactFlowInstance],
  )

  const onEdgeUpdateStart = useCallback(() => {
    // You can add custom logic here if needed
  }, [])

  const onEdgeUpdate = useCallback(
    (oldEdge: Edge, newConnection: Connection) => {
      const sourceNode = nodes.find((node) => node.id === newConnection.source)
      const targetNode = nodes.find((node) => node.id === newConnection.target)

      if (sourceNode && targetNode && isValidConnection(sourceNode, targetNode)) {
        onEdgesChange([
          { id: oldEdge.id, type: "remove" } as EdgeChange,
          { item: newConnection, type: "add" } as EdgeChange,
        ])
      } else {
        alert("Invalid connection. Please check the node types and try again.")
      }
    },
    [nodes, onEdgesChange],
  )

  const onEdgeUpdateEnd = useCallback(() => {
    // You can add custom logic here if needed
  }, [])

  return (
    <div style={{ width: "100vw", height: "100vh", display: "flex" }}>
      <Sidebar />
      <div style={{ flex: 1 }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDragOver={onDragOver}
          onDrop={onDrop}
          nodeTypes={nodeTypes}
          onEdgeUpdateStart={onEdgeUpdateStart}
          onEdgeUpdate={onEdgeUpdate}
          onEdgeUpdateEnd={onEdgeUpdateEnd}
          fitView
        >
          <Controls />
          <MiniMap />
          <Background variant="dots" gap={12} size={1} />
        </ReactFlow>
      </div>
    </div>
  )
}

export default WorkflowEditor

