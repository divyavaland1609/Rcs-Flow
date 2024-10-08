import React, {  useEffect } from "react";
import useStore from "@/config/store";
import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  message,
  Row,
  Select,
  Space,
} from "antd";
import { Node } from "reactflow";
import { shallow } from "zustand/shallow";

export interface ActionData {
  id: number;
  type: string;
  title: string;
  payload: string;
  phoneNumber?: string;
  latitude?: number;
  longitude?: number;
  startDate?: any;
  endDate?: any;
  name?: any;
}

interface AddButtonProps {
  textareaValue: string;
  templateName: string;
  description: string;
  title: string;
  button: ActionData[];
  setButton: (state: any) => void;
  setRichCardCarousels: (state: any) => void;
  cardIndex: number;
  richCardCarousels: any;
}

const selector = (state: {
  selectedNode: Node | null;
  updateNodeLabel: (nodeId: string, nodeVal: any) => void;
  setSelectedNode: (node: Node | null) => void;
}) => ({
  selectedNode: state.selectedNode,
  updateNodeLabel: state.updateNodeLabel,
  setSelectedNode: state.setSelectedNode,
});

const Addbutton: React.FC<AddButtonProps> = ({
  textareaValue,
  templateName,
  description,
  title,
  setButton,
  cardIndex,
  button = [],
  setRichCardCarousels,
  richCardCarousels,
}) => {
  const { selectedNode, updateNodeLabel } = useStore(selector, shallow);

  useEffect(() => {
    if (selectedNode) {
      const updatedActions = selectedNode.data.buttons || [];
      if (updatedActions.length === 0) {
        setButton((prev: { actions: ActionData[] }) => ({
          ...prev,
          actions: [
            {
              id: 0,
              type: "quick",
              title: "",
              payload: "",
            },
          ],
        }));
      } else {
        setButton({ actions: updatedActions });
      }
    }
    console.log("Updated", selectedNode)
  }, [selectedNode, setButton]);

  const handleChange = (index: number, key: string, value: any) => {
    setButton((prev: { actions: ActionData[] }) => {
      const actions = [...prev.actions];
      actions[index] = { ...actions[index], [key]: value };

      if (key === "type") {
        actions[index] = {
          ...actions[index],
          title: "",
          payload: "",
          phoneNumber: undefined,
          latitude: undefined,
          longitude: undefined,
          startDate: undefined,
          endDate: undefined,
        };
      }

      if (setRichCardCarousels) {
        setRichCardCarousels((prev: any) => {
          const updated = [...prev];
          updated[cardIndex] = {
            ...updated[cardIndex],
            buttons: actions.map((action) => ({
              title: action.title || "Untitled",
              type: action.type || "quick",
            })),
          };

          if (selectedNode) {
            updateNodeLabel(selectedNode.id, {
              label: title || textareaValue,
              name: templateName,
              description: description,
              richCardCarousels: updated,
              buttons: actions.map((action) => ({
                title: action.title || "Untitled",
                type: action.type || "quick",
              })),
            });
          }

          return updated;
        });
      } else {
        if (selectedNode) {
          updateNodeLabel(selectedNode.id, {
            label: title || textareaValue,
            name: templateName,
            description: description,
            buttons: actions.map((action) => ({
              title: action.title || "Untitled",
              type: action.type || "quick",
            })),
          });
        }
      }

      return { ...prev, actions };
    });

    console.log("button? and description", button);
  };



  const addNewCard = () => {
    if (button?.length < 11) {
      const newId = button?.length;
      const newButton: ActionData = {
        id: newId,
        type: "quick",
        title: "",
        payload: "",
      };

      setButton((prev: { actions: ActionData[] }) => {
        const updatedActions = [...prev.actions, newButton];

        if (selectedNode) {
          const buttonData = updatedActions.map((action) => ({
            title: action.title || "Untitled",
            type: action.type || "quick",
          }));

          if (setRichCardCarousels) {
            setRichCardCarousels((prev: any) => {
              const updated = [...prev];
              updated[cardIndex] = {
                ...updated[cardIndex],
                buttons: buttonData,
              };

              if (selectedNode) {
                updateNodeLabel(selectedNode.id, {
                  richCardCarousels: updated,
                  name: templateName,
                  label: title || textareaValue,
                  description: description,
                  buttons: buttonData,
                });
                console.log("dartaa",description)
              }
              return updated;
            });
          } else {
            updateNodeLabel(selectedNode.id, {
              label: title || textareaValue,
              name: templateName,
              description: description,
              buttons: buttonData,
            });
          }
        }
        return { ...prev, actions: updatedActions };
      });
    } else {
      message.warning("Cannot add more than 11 buttons");
    }
  };

 
  const deleteCard = (index: number) => {
    if (button?.length > 1) {
      const filteredData = button?.filter((_, i) => i !== index);
      setButton((prev: { actions: ActionData[] }) => ({
        ...prev,
        actions: filteredData,
      }));

      if (selectedNode) {
        const updatedButtonData = filteredData.map((action) => ({
          title: action.title || "Untitled",
          type: action.type || "quick",
        }));

        if (setRichCardCarousels) {
          setRichCardCarousels((prev: any) => {
            const updated = [...prev];
            updated[cardIndex] = {
              ...updated[cardIndex],
              buttons: updatedButtonData,
            };

            updateNodeLabel(selectedNode.id, {
              richCardCarousels: updated,
              name: templateName,
              label: title,
              description: description,
              buttons: updatedButtonData,
            });

            return updated;
          });
        } else {
          updateNodeLabel(selectedNode.id, {
            label: title,
            name: templateName,
            description: description,
            buttons: updatedButtonData,
          });
        }
      }
    } else {
      message.warning("At least one button is required");
    }
  };

  console.log("index",cardIndex);
  return (
    <div className=" mt-3">
      <Form layout="vertical">
        <Space
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button
            onClick={addNewCard}
            style={{ backgroundColor: "#0F3B48" }}
            type="primary"
          >
            <PlusOutlined /> Add
          </Button>
        </Space>
        {Array.isArray(button) &&
          button.map((btn, index) => (
            <Card
              key={index}
              style={{ marginTop: "10px", position: "relative" }}
            >
              <CloseOutlined
                style={{
                  position: "absolute",
                  top: 10,
                  right: 8,
                  fontSize: "18px",
                }}
                onClick={() => deleteCard(index)}
              />
              <Row gutter={[16, 0]}>
                <Col md={24}>
                  <Form.Item label="Action" style={{ marginBottom: "10px" }}>
                    <Select
                      value={btn.type}
                      onChange={(value) => handleChange(index, "type", value)}
                      style={{ width: "100%", textAlign: "left" }}
                      options={[
                        { value: "quick", label: "Quick Reply" },
                        { value: "call", label: "Call Button" },
                        { value: "url", label: "URL Button" },
                        { value: "location", label: "Location" },
                        { value: "calendar", label: "Calendar" },
                      ]}
                    />
                  </Form.Item>
                </Col>
                <Col md={24}>
                  <Form.Item
                    name={`button_title_${cardIndex}_${index}`}
                    label="Title"
                    style={{ marginBottom: "10px",textAlign: "left"  }}
                    rules={[
                      {
                        required: true,
                        type:"string",
                        message: "Please enter title",
                      },
                      {
                        max: 25,
                        message: "Title must be within 25 characters",
                      },
                    ]}
                  >
                    <Input
                    variant="filled"
                      onChange={(e) =>
                        handleChange(index, "title", e.target.value)
                      }
                      // defaultValue={btn.title}
                      placeholder="Enter Title"
                      value={btn.title}
                      maxLength={25}
                      showCount={true}
                    />
                  </Form.Item>

                </Col>
                {btn.type === "call" && (
                  <Col md={24}>
                    <Form.Item label="Phone Number">
                      <Input
                        variant="filled"
                        value={btn.phoneNumber}
                        onChange={(e) =>
                          handleChange(index, "phoneNumber", e.target.value)
                        }
                        size="large"
                        placeholder="Enter Phone Number"
                      />
                    </Form.Item>
                  </Col>
                )}
                {btn.type === "url" && (
                  <Col md={24}>
                    <Form.Item label="URL">
                      <Input
                        variant="filled"
                        value={btn.payload}
                        onChange={(e) =>
                          handleChange(index, "payload", e.target.value)
                        }
                        size="large"
                        placeholder="Enter URL"
                      />
                    </Form.Item>
                  </Col>
                )}
                {btn.type === "location" && (
                  <>
                    <Col md={24}>
                      <Form.Item label="Label">
                        <Input
                          variant="filled"
                          value={btn.payload}
                          onChange={(e) =>
                            handleChange(index, "payload", e.target.value)
                          }
                          size="large"
                          placeholder="Enter Label"
                        />
                      </Form.Item>
                    </Col>
                    <Col md={12}>
                      <Form.Item label="Latitude">
                        <InputNumber
                          style={{ width: "100%" }}
                          value={btn.latitude}
                          onChange={(value) =>
                            handleChange(index, "latitude", value)
                          }
                          size="large"
                          placeholder="Enter Latitude"
                        />
                      </Form.Item>
                    </Col>
                    <Col md={12}>
                      <Form.Item label="Longitude">
                        <InputNumber
                          style={{ width: "100%" }}
                          value={btn.longitude}
                          onChange={(value) =>
                            handleChange(index, "longitude", value)
                          }
                          size="large"
                          placeholder="Enter Longitude"
                        />
                      </Form.Item>
                    </Col>
                  </>
                )}
                {btn.type === "calendar" && (
                  <>
                    <Col md={24}>
                      <Form.Item label="Label">
                        <Input
                          variant="filled"
                          value={btn.payload}
                          onChange={(e) =>
                            handleChange(index, "payload", e.target.value)
                          }
                          size="large"
                          placeholder="Enter Label"
                        />
                      </Form.Item>
                    </Col>
                    <Col md={12}>
                      <Form.Item label="Start Date">
                        <DatePicker
                          style={{ width: "100%" }}
                          value={btn.startDate}
                          onChange={(date) =>
                            handleChange(index, "startDate", date)
                          }
                          size="large"
                        />
                      </Form.Item>
                    </Col>
                    <Col md={12}>
                      <Form.Item label="End Date">
                        <DatePicker
                          style={{ width: "100%" }}
                          value={btn.endDate}
                          onChange={(date) =>
                            handleChange(index, "endDate", date)
                          }
                          size="large"
                        />
                      </Form.Item>
                    </Col>
                  </>
                )}
              </Row>
            </Card>
          ))}
      </Form>
    </div>
  );
};

export default Addbutton;