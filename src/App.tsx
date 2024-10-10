import React, { useCallback } from "react";
import ReactFlow, {
  Background,
  BackgroundVariant,
  Connection,
  Controls,
  Edge,
  getConnectedEdges,
  getIncomers,
  getOutgoers,
  Node,
  ReactFlowProvider,
} from "reactflow";
import "reactflow/dist/style.css";
import { shallow } from "zustand/shallow";
import { Header, Panel } from "./components";
import { nodesConfig } from "./config/site";
import useStore from "./config/store";
import DownloadButton from "./components/panels/DownloadButton";
import { handleDragOver, handleOnDrop } from "./lib/utils";
import "./App.css";
import image from './assets/freepik-new-project-20241002121122DMfD.png'


interface CustomNode extends Node {
  id: string;
  type?: string;
  data: { label: string };
  position: { x: number; y: number };
}

const selector = (state: {
  nodes: Node[];
  edges: Edge[];
  onNodesChange: any;
  onEdgesChange: any;
  onConnect: any;
  setSelectedNode: (node: Node | null) => void;
  setNodes: (node: Node) => void;
}) => ({
  nodes: state.nodes,
  edges: state.edges,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
  setSelectedNode: state.setSelectedNode,
  setNodes: state.setNodes,
});

export default function App() {
  const reactFlowWrapper = React.useRef<any>(null);
  const [reactFlowInstance, setReactFlowInstance] = React.useState<any>(null);

  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    setSelectedNode,
    setNodes,
  } = useStore(selector, shallow);

  const onDragOver = React.useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      handleDragOver(event);
    },
    []
  );

  const onDrop = React.useCallback(
    (event: any) => {
      handleOnDrop(event, reactFlowWrapper, reactFlowInstance, setNodes);
    },
    [reactFlowInstance, setNodes]
  );

  const onNodesDelete = useCallback(
    (deleted: CustomNode[]) => {
      setEdges((eds:any) =>
        deleted.reduce((acc: Edge[], node) => {
          const incomers = getIncomers(node, nodes, eds);
          const outgoers = getOutgoers(node, nodes, eds);
          const connectedEdges = getConnectedEdges([node], eds);

          const remainingEdges = acc.filter(
            (edge) => !connectedEdges.includes(edge)
          );

          const createdEdges = incomers.flatMap(({ id: source }) =>
            outgoers.map(({ id: target }) => ({
              id: `${source}->${target}`,
              source,
              target,
            }))
          );

          return [...remainingEdges, ...createdEdges];
        }, eds)
      );
    },
    [nodes]
  );
  const isValidConnection = (connection: Connection) => {
    const sourceNode = nodes.find((node) => node.id === connection.source);
    const targetNode = nodes.find((node) => node.id === connection.target);

    if (sourceNode && targetNode) {
      return sourceNode.position.x < targetNode.position.x;
    }

    return false;
  };

  return (
    <ReactFlowProvider>
      <Header />
      <main className="flex overflow-hidden">
        <div
          className="h-[calc(100vh_-_48px)] flex-grow"
          ref={reactFlowWrapper}
        >
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onNodesDelete={onNodesDelete}
            onEdgesChange={onEdgesChange}
            onNodeClick={(event: React.MouseEvent, node: Node) => {
              setSelectedNode(node);
            }}
            isValidConnection={isValidConnection}
            onConnect={onConnect}
            onPaneClick={() => {
              setSelectedNode(null);
            }}
            onDragOver={onDragOver}
            onDrop={onDrop}
            fitView
            fitViewOptions={{ maxZoom: 1 }}
            onInit={setReactFlowInstance}
            snapToGrid={true}
            nodeTypes={nodesConfig.nodeTypes}>
            <Controls />
            {/* <DownloadButton /> */}
            <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
          </ReactFlow>
        </div>
        <div className="w-[303px]" >
          <Panel />
        </div>
      </main>
    </ReactFlowProvider>
  );
}
