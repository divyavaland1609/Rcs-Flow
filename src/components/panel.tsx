import { Node } from "reactflow";
import { shallow } from "zustand/shallow";
import useStore from "@/config/store";
import {
  AddNodePanel,
  TextPanel,
  TextWithPanel,
  TextWithMedia,
  list,
  menu,
  poll,
  richcard,
  richcardcarousel,
} from "./panels";
import image from "../assets/footer-bg-1.png";

const selector = (state: { selectedNode: Node | null }) => ({
  selectedNode: state.selectedNode,
});

export const Panel = () => {
  const { selectedNode } = useStore(selector, shallow);
  const CurrentPanel = getPanel(selectedNode?.type || "");
  return (
    <div
      className=" bg-white  border-gray-200 border overflow-auto h-[95vh]  "
      style={{ backgroundImage: `url(${image})` }}
    >
      <CurrentPanel />
    </div>
  );
};

const getPanel = (type: string) => {
  if (type === "textNode") {
    return TextPanel;
  } else if (type === "textWithButtonNode") {
    return TextWithPanel;
  } else if (type === "textWithmedia") {
    return TextWithMedia;
  } else if (type === "list") {
    return list;
  } else if (type === "menu") {
    return menu;
  } else if (type === "poll") {
    return poll;
  } else if (type === "richcard") {
    return richcard;
  } else if (type === "richcardcarousel") {
    return richcardcarousel;
  } else if (type === "text") {
    return TextPanel;
  } else {
    return AddNodePanel;
  }
};
