import { TextNode } from "@/components/nodes";
import { Edge, Node } from "reactflow";




export const nodesConfig = {
  initialNodes: [
    {
      id: "1",
      type: "textWithButtonNode",
      data: {
        label: "Text with Button",
        isInitial: true,
        button: {
          label: "Start",
        },
      },
      position: { x: 300, y: 400 },
    },
  ] as Node[],
  initialEdges: [{ id: "e1-1", source: "1", target: "2" }] as Edge[],
  nodeTypes: {
    textNode: TextNode,
    textWithButtonNode: TextNode,
    textWithmedia: TextNode,
    list: TextNode,
    menu: TextNode,
    poll: TextNode,
    richcard: TextNode,
    richcardcarousel: TextNode,
  } as any,
};
