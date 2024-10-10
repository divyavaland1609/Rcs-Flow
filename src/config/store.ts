// import {
//   Connection,
//   Edge,
//   EdgeChange,
//   Node,
//   NodeChange,
//   OnConnect,
//   OnEdgesChange,
//   OnNodesChange,
//   addEdge,
//   applyEdgeChanges,
//   applyNodeChanges,
// } from "reactflow";
// import { create } from "zustand";
// import { nodesConfig } from "./site";
// import { UploadFile } from "antd";

// export type NodeData = {
//   label: string;
//   isInitial?: boolean;
//   media?: UploadFile[];
// };
// export type NodeTypes = "textNode";
// type RFState = {
//   richCardData: any;
//   setRichCardData: any;
//   nodes: Node[];
//   edges: Edge[];
//   selectedNode: Node | null;
//   setNodes: (node: Node) => void;
//   onNodesChange: OnNodesChange;
//   onEdgesChange: OnEdgesChange;
//   onConnect: OnConnect;
//   updateNodeLabel: (nodeId: string, nodeVal: any) => void;
//   setSelectedNode: (node: Node | null) => void;
//   updateNodeMedia: (nodeId: string, media: UploadFile[]) => void;
//   removeNode: (id: string) => void;
//   addNode: (node: Node) => void;
//   copyNode: (nodeId: string) => void;
//   updateInitialNodeType: (type: string) => void; // Added here
// };

// const useStore = create<RFState>((set, get) => ({
//   nodes: nodesConfig.initialNodes,
//   edges: nodesConfig.initialEdges,
//   selectedNode: null,

//   setSelectedNode: (node: Node | null) => {
//     set({
//       selectedNode: node,
//     });

//     if (node === null) {
//       const selectedNode = get().nodes.find((n) => n.selected === true);
//       if (selectedNode) {
//         get().onNodesChange([
//           {
//             type: "select",
//             id: selectedNode.id,
//             selected: false,
//           },
//         ]);
//       }
//     }
//   },

//   removeNode: (id) =>
//     set((state) => ({
//       nodes: state.nodes.filter((node) => node.id !== id),
//     })),

//   setNodes: (node: Node) => {
//     set({
//       nodes: [...get().nodes, node],
//     });
//   },

//   addNode: (node: Node) => {
//     set({
//       nodes: [...get().nodes, node],
//     });
//   },

//   copyNode: (nodeId: string) => {
//     const nodeToCopy = get().nodes.find((node) => node.id === nodeId);
//     if (nodeToCopy) {
//       const newNode = {
//         ...nodeToCopy,
//         id: ${nodeToCopy.id}-copy,
//         position: {
//           x: (nodeToCopy.position?.x || 0) + 100,
//           y: (nodeToCopy.position?.y || 0) + 100,
//         },
//       };
//       set((state) => ({
//         nodes: [...state.nodes, newNode],
//       }));
//     }
//   },

//   onNodesChange: (changes: NodeChange[]) => {
//     set({
//       nodes: applyNodeChanges(changes, get().nodes),
//     });
//   },

//   onEdgesChange: (changes: EdgeChange[]) => {
//     set({
//       edges: applyEdgeChanges(changes, get().edges),
//     });
//   },

//   onConnect: (connection: Connection) => {
//     set({
//       edges: addEdge(connection, get().edges),
//     });
//   },

//   updateNodeLabel: (nodeId: string, nodeVal: Partial<NodeData>) => {
//     set((state) => {
//       const nodeExists = state.nodes.some((node) => node.id === nodeId);
//       if (!nodeExists) {
//         console.error(Node with ID ${nodeId} does not exist.);
//         return state; // Early return if the node doesn't exist
//       }
  
//       return {
//         nodes: state.nodes.map((node) => {
//           if (node.id === nodeId) {
//             return {
//               ...node,
//               data: {
//                 ...node.data,
//                 label: nodeVal.label ?? node.data.label,
//                 buttons: nodeVal.buttons ?? node.data.buttons,
//                 media: nodeVal.media ?? node.data.media,
//                 name: nodeVal.name ?? node.data.name,
//                 description: nodeVal.description ?? node.data.description,
//                 mediaHeight: nodeVal.mediaHeight ?? node.data.mediaHeight,
//                 richCardCarousels: nodeVal.richCardCarousels ?? node.data.richCardCarousels,
//               },
//             };
//           }
//           return node;
//         }),
//       };
//     });
//   },
  

//   updateNodeMedia: (nodeId: string, media: UploadFile[]) => {
//     set({
//       nodes: get().nodes.map((node) => {
//         if (node.id === nodeId) {
//           return {
//             ...node,
//             data: {
//               ...node.data,
//               media: media,
//             },
//           };
//         }
//         return node;
//       }),
//     });
//   },

//   updateInitialNodeType: (type: string) => {
//     set((state) => {
//       const updatedNodes = state.nodes.map((node) =>
//         node.data.isInitial ? { ...node, type } : node
//       );
//       return { nodes: updatedNodes };
//     });
//   },
// }));

// export default useStore;



//fddfdffddfdffg




// import {
//   Connection,
//   Edge,
//   EdgeChange,
//   Node,
//   NodeChange,
//   OnConnect,
//   OnEdgesChange,
//   OnNodesChange,
//   addEdge,
//   applyEdgeChanges,
//   applyNodeChanges,
// } from "reactflow";
// import { create } from "zustand";
// import { nodesConfig } from "./site";
// import { UploadFile } from "antd";

// export type NodeData = {
//   label: string;
//   isInitial?: boolean;
//   media?: UploadFile[];
// };
// export type NodeTypes = "textNode";
// type RFState = {
//   nodes: Node[];
//   edges: Edge[];
//   selectedNode: Node | null;
//   setNodes: (node: Node) => void;
//   onNodesChange: OnNodesChange;
//   onEdgesChange: OnEdgesChange;
//   onConnect: OnConnect;
//   updateNodeLabel: (nodeId: string, nodeVal: any) => void;
//   setSelectedNode: (node: Node | null) => void;
//   updateNodeMedia: (nodeId: string, media: UploadFile[]) => void;
//   removeNode: (id: string) => void;
//   addNode: (node: Node) => void;
//   copyNode: (nodeId: string) => void;
//   updateInitialNodeType: (type: string) => void; // Added here
// };

// const useStore = create<RFState>((set, get) => ({
//   nodes: nodesConfig.initialNodes,
//   edges: nodesConfig.initialEdges,
//   selectedNode: null,

//   setSelectedNode: (node: Node | null) => {
//     set({
//       selectedNode: node,
//     });

//     if (node === null) {
//       const selectedNode = get().nodes.find((n) => n.selected === true);
//       if (selectedNode) {
//         get().onNodesChange([
//           {
//             type: "select",
//             id: selectedNode.id,
//             selected: false,
//           },
//         ]);
//       }
//     }
//   },

//   removeNode: (id) => set((state) => ({
//     nodes: state.nodes.filter((node) => node.id !== id),
//   })),

//   setNodes: (node: Node) => {
//     set({
//       nodes: [...get().nodes, node],
//     });
//   },

//   addNode: (node: Node) => {
//     set({
//       nodes: [...get().nodes, node],
//     });
//   },

//   copyNode: (nodeId: string) => {
//     const nodeToCopy = get().nodes.find((node) => node.id === nodeId);
//     if (nodeToCopy) {
//       const newNode = {
//         ...nodeToCopy,
//         id: `${nodeToCopy.id}-copy`,
//         position: {
//           x: (nodeToCopy.position?.x || 0) + 100,
//           y: (nodeToCopy.position?.y || 0) + 100,
//         },
//       };
//       set((state) => ({
//         nodes: [...state.nodes, newNode],
//       }));
//     }
//   },

//   onNodesChange: (changes: NodeChange[]) => {
//     set({
//       nodes: applyNodeChanges(changes, get().nodes),
//     });
//   },

//   onEdgesChange: (changes: EdgeChange[]) => {
//     set({
//       edges: applyEdgeChanges(changes, get().edges),
//     });
//   },

//   onConnect: (connection: Connection) => {
//     set({
//       edges: addEdge(connection, get().edges),
//     });
//   },

//   updateNodeLabel: (nodeId: string, nodeVal: any) => {
//     set((state) => ({
//       nodes: state.nodes.map((node) => {
//         if (node.id === nodeId) {
//           return {
//             ...node,
//             data: {
//               ...node.data,
//               label: nodeVal?.label || '',
//               buttons: nodeVal?.buttons,
//               media: nodeVal?.media || [],
//               name: nodeVal?.name || "",
//               discription
// : nodeVal?.discription || "",
//               mediaHeight: nodeVal?.mediaHeight || "",
//               richCardCarousels: nodeVal?.richCardCarousels || [],
//             },
//           };
//         }
//         return node;
//       }),
//     }));
//   },

//   updateNodeMedia: (nodeId: string, media: UploadFile[]) => {
//     set({
//       nodes: get().nodes.map((node) => {
//         if (node.id === nodeId) {
//           return {
//             ...node,
//             data: {
//               ...node.data,
//               media: media,
//             },
//           };
//         }
//         return node;
//       }),
//     });
//   },


//   updateInitialNodeType: (type: string) => {
//     set((state) => {
//       const updatedNodes = state.nodes.map((node) =>
//         node.data.isInitial ? { ...node, type } : node
//       );
//       return { nodes: updatedNodes };
//     });
//   },
// }));

// export default useStore;








import {
  Connection,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  OnConnect,
  OnEdgesChange,
  OnNodesChange,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
} from "reactflow";
import { create } from "zustand";
import { nodesConfig } from "./site";
import { UploadFile } from "antd";

export type NodeData = {
  label: string;
  isInitial?: boolean;
  media?: UploadFile[];
};
export type NodeTypes = "textNode";

type RFState = {
  nodes: Node[];
  edges: Edge[];
  selectedNode: Node | null;
  startNodeId: string | null; // Ensure to specify the type
  setStartNode: (id: string | null) => void;
  setNodes: (node: Node) => void;
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  updateNodeLabel: (nodeId: string, nodeVal: any) => void;
  setSelectedNode: (node: Node | null) => void;
  updateNodeMedia: (nodeId: string, media: UploadFile[]) => void;
  removeNode: (id: string) => void;
  addNode: (node: Node) => void;
  copyNode: (nodeId: string) => void;
  updateInitialNodeType: (type: string) => void;
};

const useStore = create<RFState>((set, get) => ({
  nodes: nodesConfig.initialNodes,
  edges: nodesConfig.initialEdges,
  selectedNode: null,
  startNodeId: null,

  setSelectedNode: (node: Node | null) => {
    set({ selectedNode: node });
    if (node === null) {
      const selectedNode = get().nodes.find((n) => n.selected === true);
      if (selectedNode) {
        get().onNodesChange([
          {
            type: "select",
            id: selectedNode.id,
            selected: false,
          },
        ]);
      }
    }
  },

  setStartNode: (id: string | null) => {
    set((state) => ({
      startNodeId: id,
      nodes: state.nodes.map((node) =>
        node.id === id
          ? { ...node, data: { ...node.data, isInitial: true } } // Set as starting node
          : { ...node, data: { ...node.data, isInitial: false } } // Reset all other nodes
      ),
    }));
  },

  removeNode: (id) =>
    set((state) => ({
      nodes: state.nodes.filter((node) => node.id !== id),
    })),

  setNodes: (node: Node) => {
    set({
      nodes: [...get().nodes, node],
    });
  },

  addNode: (node: Node) => {
    set({
      nodes: [...get().nodes, node],
    });
  },

  copyNode: (nodeId: string) => {
    const nodeToCopy = get().nodes.find((node) => node.id === nodeId);
    if (nodeToCopy) {
      const newNode = {
        ...nodeToCopy,
        id: `${nodeToCopy.id}-copy`,
        position: {
          x: (nodeToCopy.position?.x || 0) + 100,
          y: (nodeToCopy.position?.y || 0) + 100,
        },
      };
      set((state) => ({
        nodes: [...state.nodes, newNode],
      }));
    }
  },

  onNodesChange: (changes: NodeChange[]) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },

  onEdgesChange: (changes: EdgeChange[]) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },

  onConnect: (connection: Connection) => {
    const { edges } = get();
    const willCreateLoop = (sourceId: string, targetId: string, allEdges: Edge[]): boolean => {
      const findConnection = (nodeId: string, visited: Set<string>): boolean => {
        if (visited.has(nodeId)) return false;
        visited.add(nodeId);  
        const connectedEdges = allEdges.filter(edge => edge.source === nodeId);
        for (const edge of connectedEdges) {
          if (edge.target === sourceId) return true;
          if (findConnection(edge.target, visited)) return true;
        }
        return false;
      };
      return findConnection(targetId, new Set());
    };
    if (!willCreateLoop(connection.source, connection.target, edges)) {
      set({
        edges: addEdge(connection, edges),
      });
    } else {
      console.warn("Connection would create a loop and was prevented.");
    }
  },
  

  updateNodeLabel: (nodeId: string, nodeVal: Partial<NodeData>) => {
    set((state) => {
      const nodeExists = state.nodes.some((node) => node.id === nodeId);
      if (!nodeExists) {
        console.error(`Node with ID ${nodeId} does not exist.`);
        return state; // Early return if the node doesn't exist
      }
  
      return {
        nodes: state.nodes.map((node) => {
          if (node.id === nodeId) {
            return {
              ...node,
              data: {
                ...node.data,
                label: nodeVal.label ?? node.data.label,
                buttons: nodeVal.buttons ?? node.data.buttons,
                media: nodeVal.media ?? node.data.media,
                name: nodeVal.name ?? node.data.name,
                description: nodeVal.description ?? node.data.description,
                mediaHeight: nodeVal.mediaHeight ?? node.data.mediaHeight,
                richCardCarousels: nodeVal.richCardCarousels ?? node.data.richCardCarousels,
              },
            };
          }
          return node;
        }),
      };
    });
  },

  updateNodeMedia: (nodeId: string, media: UploadFile[]) => {
    set({
      nodes: get().nodes.map((node) => {
        if (node.id === nodeId) {
          return {
            ...node,
            data: {
              ...node.data,
              media: media,
            },
          };
        }
        return node;
      }),
    });
  },

  updateInitialNodeType: (type: string) => {
    set((state) => {
      const updatedNodes = state.nodes.map((node) =>
        node.data.isInitial ? { ...node, type } : node
      );
      return { nodes: updatedNodes };
    });
  },
}));

export default useStore;














