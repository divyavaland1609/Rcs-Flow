import React, { useEffect, useState } from "react";
import useStore from "@/config/store";
import { CloseOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, message, Row, Upload, UploadFile } from "antd";
import { Node } from "reactflow";
import { shallow } from "zustand/shallow";
import { ArrowLeft } from "lucide-react";

interface RichCardProps {
  isEdit: boolean;
  data?: any;
}

const selector = (state: {
  selectedNode: Node | null;
  updateNodeLabel: (nodeId: string, nodeVal: string) => void;
  setSelectedNode: (node: Node | null) => void;
}) => ({
  selectedNode: state.selectedNode,
  updateNodeLabel: state.updateNodeLabel,
  setSelectedNode: state.setSelectedNode,
});

export const TextWithMedia = ({ isEdit, data }: RichCardProps) => {
  const { selectedNode, updateNodeLabel, setSelectedNode } = useStore(
    selector,
    shallow
  );
  const [templateName, setTemplateName] = useState<string>("");
  const [media, setMedia] = useState<string | null>(null);
  const [setMediaModal] = useState(false);
  const [title, setTitle] = useState<string>("");

  useEffect(() => {
    if (selectedNode) {
      if (selectedNode.data?.media) {
        setMedia(selectedNode.data.media);
      } else {
        setMedia(null);
      }
      setTitle(selectedNode.data.label || "");
    }
  }, [selectedNode]);

  const customRequest = ({ file, onSuccess }: any) => {
    setTimeout(() => {
      onSuccess({}, file);
    }, 1000);
  };

  const handleMediaChange = ({ fileList }: { fileList: UploadFile[] }) => {
    if (fileList.length > 0) {
      const file = fileList[0];
      if (file.status === "done" || file.status === "uploading") {
        const mediaURL = URL.createObjectURL(file.originFileObj as Blob);
        setMedia(mediaURL);
        if (selectedNode) {
          updateNodeLabel(selectedNode.id, {
            media: mediaURL,
            label: "",
          });
        }
      } else if (file.status === "error") {
        message.error("Failed to upload media. Please try again.");
      }
    } else {
      setMedia(null);
      if (selectedNode) {
        updateNodeLabel(selectedNode.id, { media: "" });
      }
    }
  };

  const handleRemoveMedia = () => {
    setMedia(null);
    if (selectedNode) {
      updateNodeLabel(selectedNode.id, { media: "" });
    }
  };


  const handleTemplateNameChange = (value: string) => {
    setTemplateName(value);
    if (selectedNode) {
      updateNodeLabel(selectedNode.id, {
        label: title,
        name: value,
      });
    }
  };
  return (
    <>
      <div className="p-2 font-semibold flex sticky top-0 bg-white z-10">
        <button onClick={() => setSelectedNode(null)}>
          <ArrowLeft />
        </button>
        <h2 className="flex-grow text-center">
          {selectedNode?.type === "textWithButtonNode" ? "Text with Button" : "Media"}
        </h2>
      </div>
      <div className="p-2 mt-3">
        <Row>
          <Col md={24}>
          <Form layout="vertical">
          <Form.Item label="Template Name" style={{ marginBottom: "10px" }}>
            <Input
              variant="filled"
              value={templateName}
              placeholder="Template Name"
              onChange={(e) => handleTemplateNameChange(e.target.value)}
            />
          </Form.Item>
            <Form.Item
              name={"media"}
              label={"Media"}
              layout="vertical"
              rules={[{ required: true, message: "Please select media" }]}
            >
              <div
                style={{
                  position: "relative",
                  backgroundColor: "#eee",
                  borderRadius: "5px",
                  border: "1px dashed",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  padding: media ? "0px" : "50px 0px",
                }}
                onClick={() => setMediaModal(true)}
              >
                {media ? (
                  <div
                    style={{
                      position: "relative",
                      alignItems: "center",
                      height: "120px",
                    }}
                  >
                    <img
                      src={media}
                      alt="media"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                    <Button
                      icon={<CloseOutlined />}
                      onClick={handleRemoveMedia}
                      size="small"
                      style={{
                        position: "absolute",
                        top: 5,
                        right: 5,
                      }}
                    />
                  </div>
                ) : (
                  <Upload
                    name="media"
                    customRequest={customRequest}
                    onChange={handleMediaChange}
                    showUploadList={false}
                    accept="image/*"
                    multiple={false}
                    style={{
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Button icon={<UploadOutlined />}>Upload Image</Button>
                  </Upload>
                )}
              </div>
            </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>
    </>
  );
};
