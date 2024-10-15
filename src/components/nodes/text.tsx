import useStore from "@/config/store";
import {
  CalendarOutlined,
  CopyOutlined,
  DeleteOutlined,
  EnvironmentOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
  FlagOutlined,
  LinkOutlined,
  MessageOutlined,
  MoreOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import {
  Button,
  Image,
  List,
  Popconfirm,
  PopconfirmProps,
  message,
  Space,
  Typography,
  Flex,
  Card,
  Dropdown,
  Menu,
} from "antd";
import React, { memo, useState } from "react";
import { Edge, Handle, Node, Position, getConnectedEdges } from "reactflow";
import { shallow } from "zustand/shallow";
import { cn } from "@/lib/utils";
const selector = (state: {
  setStartNode: any;
  startNodeId: any;
  removeNode: (id: string) => void;
  setSelectedNode: (node: Node | null) => void;
  selectedNode: Node | null;
  edges: Edge[];
  addNode: (node: Node) => void;
}) => ({
  removeNode: state.removeNode,
  edges: state.edges,
  selectedNode: state.selectedNode,
  setSelectedNode: state.setSelectedNode,
  addNode: state.addNode,
  startNodeId: state.startNodeId,
  setStartNode: state.setStartNode,
});


const getTitleByType = (type: any) => {
  switch (type) {
    case "textWithButtonNode":
      return {
        title: "Send Button Message",
        backgroundColor: "#ADB3E8",
        color: " #222222",
      };
    case "textWithmedia":
      return {
        title: "Send Media",
        backgroundColor: "#C6BBBB",
        color: " #222222",
      };
    case "list":
      return {
        title: "Display List",
        backgroundColor: "rgb(254, 153, 50)",
        color: " #222222",
      };
    case "richcard":
      return { title: "Richcard", backgroundColor: "#ADC0A7", color: "black" };
    case "richcardcarousel":
      return {
        title: "Richcard Carousel",
        backgroundColor: "#F5E5FC",
        color: " #222222",
      };
    default:
      return {
        title: "Send Message",
        backgroundColor: "#D1AFAF",
        color: " #222222",
      };
  }
};

export const TextNode = memo((node: Node) => {
  const { edges, addNode, startNodeId, setStartNode } = useStore(
    selector,
    shallow
  );
  const { setSelectedNode } = useStore(selector, shallow);
  const [disabledNodes, setDisabledNodes] = useState(new Set());
  const [setIsEnabled] = useState(true);
  const [activeNodeId, setActiveNodeId] = useState<string | null>(null);
  const [sourceConnectable, setSourceConnectable] = React.useState(true);
  const { data, selected, id, type } = node;
  console.log("123",data);
  
  const alledges = getConnectedEdges([node], edges);

  React.useEffect(() => {
    const isSourceConnected = alledges.some((edge) => edge.source === id);
    setSourceConnectable(!isSourceConnected);
  }, [alledges, id]);

  const handleSetStartNode = (nodeId: string) => {
    setStartNode(nodeId);
  };

  const handleNodeClick = (nodeId: unknown) => {
    setDisabledNodes((prev) => {
      const updated = new Set(prev);
      if (updated.has(nodeId)) {
        updated.delete(nodeId);
      } else {
        updated.add(nodeId);
      }
      return updated;
    });
  };

  const handleCopy = () => {
    if (data.isInitial) {
      message.error("Initial node cannot be copied.");
      return;
    }

    const newNode = {
      ...node,
      id: `${id}-copy`,
      position: {
        x: (node.position?.x || 0) + 100,
        y: (node.position?.y || 0) + 100,
      },
      data: {
        ...data,
      },
    };

    addNode(newNode);
    setSelectedNode(null);
    message.success("Node copied successfully.");
  };

  const getImageWidth = () => {
    if (data.mediaHeight === "small") {
      return 100;
    } else if (data.mediaHeight === "medium") {
      return 200;
    } else if (data.mediaHeight === "tall") {
      return 250;
    } else {
      return 100;
    }
  };

  const renderNodeContent = () => {
    const defaultButton = {
      id: 0,
      type: "quick",
      title: "Default Button",
      payload: "",
    };

    switch (type) {
      case "textWithButtonNode":
        const buttonsToRender =
          data.buttons && data.buttons.length > 0
            ? data.buttons
            : [defaultButton];
        return (
          <div className="py-2 px-3 min-h-[32px]">
            <div>
              <Typography.Text
                style={{
                  whiteSpace: "pre-wrap",
                }}
              >
                {data.label
                  ? data.label.split("\n").map((line, index) => (
                      <span key={index}>
                        {line}
                        <br />
                      </span>
                    ))
                  : "No description available."}
              </Typography.Text>
              <Typography.Text>{data.discription}</Typography.Text>
              <div className="text-xs whitespace-pre-wrap">
                {buttonsToRender.map((button: any, index: any) => (
                  <React.Fragment key={index}>
                    <Flex justify="space-around">
                      {button.type === "quick" ? (
                        <Button
                          size="small"
                          block
                          style={{ background: "#adafce", color: "black" }}
                          icon={<MessageOutlined />}
                        >
                           {/* {!data.isInitial && !disabledNodes.has(node.id) && ( */}
                          <Handle
                            type="source"
                            id={`button-${index}`}
                            position={Position.Right}
                            isConnectable={true}
                          />
                        {/* )} */}
                          {button.title || "Untitled"}
                        </Button>
                      ) : (
                        <>
                          {button.type === "call" && (
                            <Button
                              size="small"
                              style={{ background: "#adafce", color: "black" }}
                              block
                            >
                              <PhoneOutlined /> {button.title || "Untitled"}
                            </Button>
                          )}
                          {button.type === "url" && (
                            <Button
                              block
                              size="small"
                              style={{ background: "#adafce", color: "black" }}
                            >
                              <LinkOutlined /> {button.title || "Untitled"}
                            </Button>
                          )}
                          {button.type === "location" && (
                            <Button
                              block
                              size="small"
                              style={{ background: "#adafce", color: "black" }}
                            >
                              <EnvironmentOutlined />{" "}
                              {button.title || "Untitled"}
                            </Button>
                          )}
                          {button.type === "calendar" && (
                            <Button
                              block
                              size="small"
                              style={{ background: "#adafce", color: "black" }}
                            >
                              <CalendarOutlined /> {button.title || "Untitled"}
                            </Button>
                          )}
                        </>
                      )}
                    </Flex>
                    {index < buttonsToRender.length - 1 && (
                      <div className="mt-2"></div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        );
      case "richcard":
        return (
          <>
            <div className="py-2 px-3 min-h-[32px]">
              <Card bodyStyle={{ padding: "0px" }}>
                <div style={{ textAlign: "center", alignItems: "center" }}>
                  {data?.media ? (
                    <Image
                      src={data.media}
                      preview={false}
                      width={getImageWidth()}
                    />
                  ) : (
                    <Image
                      width={100}
                      preview={false}
                      src="https://www.trschools.com/templates/imgs/default_placeholder.png"
                    />
                  )}
                </div>
                <Typography.Text strong>{data.label}</Typography.Text>
                <br />
                <Typography.Text>{data.title}</Typography.Text>
                <Typography.Text
                  style={{
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {data.description
                    ? data.description.split("\n").map((line: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined, index: React.Key | null | undefined) => (
                        <span key={index}>
                          {line}
                          <br />
                        </span>
                      ))
                    : "No description available."}{" "}
                </Typography.Text>
                <div>
                  {data.buttons && data.buttons.length > 0 ? (
                    data.buttons.map((button: any, index: any) => (
                      <React.Fragment key={index}>
                        {button.type === "quick" ? (
                          <Button
                            size="small"
                            block
                            style={{ background: "#adafce", color: "black" }}
                            icon={<MessageOutlined />}
                          >
                            <Handle
                              type="source"
                              id={`button-${index}`}
                              position={Position.Right}
                              isConnectable={true}
                            />
                            {button.title || "Untitled"}
                          </Button>
                        ) : (
                          <>
                            {button.type === "call" && (
                              <Button
                                size="small"
                                style={{
                                  background: "#adafce",
                                  color: "black",
                                }}
                                block
                              >
                                <PhoneOutlined /> {button.title || "Untitled"}
                              </Button>
                            )}
                            {button.type === "url" && (
                              <Button
                                block
                                size="small"
                                style={{
                                  background: "#adafce",
                                  color: "black",
                                }}
                              >
                                <LinkOutlined /> {button.title || "Untitled"}
                              </Button>
                            )}
                            {button.type === "location" && (
                              <Button
                                block
                                size="small"
                                style={{
                                  background: "#adafce",
                                  color: "black",
                                }}
                              >
                                <EnvironmentOutlined />{" "}
                                {button.title || "Untitled"}
                              </Button>
                            )}
                            {button.type === "calendar" && (
                              <Button
                                block
                                size="small"
                                style={{
                                  background: "#adafce",
                                  color: "black",
                                }}
                              >
                                <CalendarOutlined />{" "}
                                {button.title || "Untitled"}
                              </Button>
                            )}
                          </>
                        )}
                        {/* </Flex> */}
                        {index < data.buttons.length - 1 && (
                          <div className="mt-2"></div>
                        )}
                      </React.Fragment>
                    ))
                  ) : (
                    <></>
                  )}
                </div>
              </Card>
            </div>
          </>
        );

      case "richcardcarousel":
      {  const richCardCarouselButtons =
          data.buttons && data.buttons.length > 0
            ? data.buttons
            : [defaultButton];}
        return (
          <>
            {Array.isArray(data?.richCardCarousels) &&
            data.richCardCarousels.length > 0 ? (
              <Flex direction="column" align="center">
                {data.richCardCarousels.map((card: any, index: any) => {
                  const imageWidth =
                    card?.mediaHeight === "short"
                      ? 80
                      : card.mediaHeight === "medium"
                      ? 100
                      : 150;

                  return (
                    <div key={index} className="py-2 px-3 min-h-[32px] w-full">
                      <Card>
                        <div style={{ textAlign: "center" }}>
                          {card?.media ? (
                            <Image
                              src={card.media}
                              preview={false}
                              width={imageWidth}
                              alt="Richcard media"
                            />
                          ) : (
                            <Image
                              width={100}
                              preview={false}
                              src="https://www.trschools.com/templates/imgs/default_placeholder.png"
                            />
                          )}
                        </div>
                        <Typography.Text strong>{card.title}</Typography.Text>
                        <br />
                        <Typography.Text
                          style={{
                            whiteSpace: "pre-wrap",
                          }}
                        >
                          {card.description
                            ? card.description
                                .split("\n")
                                .map((line: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined, index: React.Key | null | undefined) => (
                                  <span key={index}>
                                    {line}
                                    <br />
                                  </span>
                                ))
                            : "No description available."}{" "}
                        </Typography.Text>
                        <div className="text-xs whitespace-pre-wrap">
                          {Array.isArray(card.buttons) &&
                          card.buttons.length > 0
                            ? card.buttons.map((button: any, btnIndex: any) => (
                                <React.Fragment key={btnIndex}>
                                  <Flex justify="space-around">
                                    {button.type === "quick" ? (
                                      <Button
                                        size="small"
                                        icon={<MessageOutlined />}
                                        block
                                        style={{
                                          background: "#adafce",
                                          color: "black",
                                        }}
                                      >
                                        <Handle
                                          type="source"
                                          id={`button-${index}-${btnIndex}`}
                                          position={Position.Right}
                                          isConnectable={true}
                                        />
                                        {button.title || "Untitled"}
                                      </Button>
                                    ) : (
                                      <>
                                        {button.type === "call" && (
                                          <Button
                                            size="small"
                                            style={{
                                              background: "#adafce",
                                              color: "black",
                                            }}
                                            block
                                          >
                                            <PhoneOutlined />{" "}
                                            {button.title || "Untitled"}
                                          </Button>
                                        )}
                                        {button.type === "url" && (
                                          <Button
                                            block
                                            size="small"
                                            style={{
                                              background: "#adafce",
                                              color: "black",
                                            }}
                                          >
                                            <LinkOutlined />{" "}
                                            {button.title || "Untitled"}
                                          </Button>
                                        )}
                                        {button.type === "location" && (
                                          <Button
                                            block
                                            size="small"
                                            style={{
                                              background: "#adafce",
                                              color: "black",
                                            }}
                                          >
                                            <EnvironmentOutlined />{" "}
                                            {button.title || "Untitled"}
                                          </Button>
                                        )}
                                        {button.type === "calendar" && (
                                          <Button
                                            block
                                            size="small"
                                            style={{
                                              background: "#adafce",
                                              color: "black",
                                            }}
                                          >
                                            <CalendarOutlined />{" "}
                                            {button.title || "Untitled"}
                                          </Button>
                                        )}
                                      </>
                                    )}
                                  </Flex>
                                  {btnIndex < card.buttons.length - 1 && (
                                    <div className="mt-2"></div>
                                  )}
                                </React.Fragment>
                              ))
                            : null}
                        </div>
                      </Card>
                    </div>
                  );
                })}
              </Flex>
            ) : (
              <div className="py-2 px-3 min-h-[32px]">
                <Flex>
                  <Card>
                    <div style={{ textAlign: "center" }}>
                      <Image
                        width={100}
                        preview={false}
                        src="https://www.trschools.com/templates/imgs/default_placeholder.png"
                      />
                    </div>
                    <Typography.Text>No rich cards available</Typography.Text>
                  </Card>
                  <Card>
                    <div style={{ textAlign: "center" }}>
                      <Image
                        width={100}
                        preview={false}
                        src="https://www.trschools.com/templates/imgs/default_placeholder.png"
                      />
                    </div>
                    <Typography.Text>No rich cards available</Typography.Text>
                  </Card>
                </Flex>
              </div>
            )}
          </>
        );

      case "textWithmedia":
        return (
          <div className="py-2 px-3 min-h-[32px]">
            <Typography.Text strong>{data.label}</Typography.Text>
            <div style={{ textAlign: "center" }}>
              {data?.media ? (
                <Image
                  src={data.media}
                  preview={false}
                  width={100}
                  alt="Media"
                />
              ) : (
                <Image
                  width={100}
                  preview={false}
                  src="https://www.trschools.com/templates/imgs/default_placeholder.png"
                />
              )}
            </div>
          </div>
        );

      case "list":
        return (
          <div className="py-2 px-3 min-h-[32px]">
            <List
              bordered
              dataSource={data.items || []}
              renderItem={(item: any) => <List.Item>{item}</List.Item>}
            />
          </div>
        );

      default:
        return (
          <>
            <div className="py-2 px-3 min-h-[32px]">
              <div>
                <Typography.Text>{data.label}</Typography.Text>
              </div>
            </div>
          </>
        );
    }
  };
  const confirm: PopconfirmProps["onConfirm"] = (id: string) => {
    const { selectedNode, removeNode } = useStore.getState();
    if (selectedNode?.id === id && selectedNode?.data?.isInitial) {
      message.error("Start node cannot be deleted.");
      return;
    }
    removeNode(id);
    message.success("Node deleted successfully");
  };

  const { title, backgroundColor, color } = getTitleByType(type);
  const menu = (
    <Menu>
      <Menu.Item key="copy" onClick={handleCopy}>
        <Space>
          <CopyOutlined style={{  fontSize: "20px" }} />
          Copy
        </Space>
      </Menu.Item>
      <Menu.Item key="delete">
        <Popconfirm
          title="Delete the Node"
          description="Are you sure to delete this Node?"
          onConfirm={() => confirm(id)}
          okText="Yes"
          cancelText="No"
        >
          <Space>
            <DeleteOutlined style={{  fontSize: "20PX" }} />
            Delete
          </Space>
        </Popconfirm>
      </Menu.Item>
      {startNodeId === node.id ? (
        <Menu.Item key="unsetStartNode"
        onClick={()=>setStartNode(null)}
        >
          <span>Unset start node</span>
        </Menu.Item>
      ) : (
        <Menu.Item
          key="setStartNode"
          onClick={() => handleSetStartNode(node.id)}
        >
          <Space>
            <FlagOutlined style={{  fontSize: "20PX" }} />
            Set start node
          </Space>
        </Menu.Item>
      )}
      <Menu.Item key="enable" onClick={() => handleNodeClick(node.id)}>
        <Space>
          {disabledNodes.has(node.id) ? (
            <>
              <EyeOutlined
                style={{  fontSize: "20px" }}
              />
              <span>Enable</span>
            </>
          ) : (
            <>
              <EyeInvisibleOutlined style={{  fontSize: "20px" }} />
              <span>Disable</span>
            </>
          )}
        </Space>
      </Menu.Item>
    </Menu>
  );
  return (
    <>
      {(startNodeId === node.id || (!startNodeId && data.isInitial)) && (
        <Button style={{ background: "#8cb2f8", color: "black" }}>
          Starting Step
        </Button>
      )}
      <div
        className={cn(
          "bg-white border-[1px] shadow-2xl border-transparent rounded-sm min-w-[200px] text-start",
          selected && "border-blue-500",
          disabledNodes.has(node.id) && "opacity-50",
        )}
      >
        <div
          className="py-2 rounded-t-md px-3 text-sm font-semibold text-primary-foreground flex justify-between items-center"
          style={{ backgroundColor }}
        >
          <span style={{ color }}>{data?.name || title}</span>
          <Dropdown overlay={menu} trigger={["click"]} placement="topLeft" >
            <MoreOutlined style={{ color: "#0f0505", fontSize: "18px" }} />
          </Dropdown>
        </div>

        <div
          style={{
            pointerEvents: disabledNodes.has(node.id) ? "none" : "auto",
          }}
        >
          {" "}
          {renderNodeContent()}
        </div>

        {!data.isInitial && !disabledNodes.has(node.id) && (
          <Handle
            type="target"
            position={Position.Left}
            id="left"
            isConnectable={true}
          />
        )}
      </div>
    </>
  );
});

TextNode.displayName = "TextNode";
