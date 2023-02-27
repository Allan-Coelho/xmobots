import { UploadOutlined, EyeOutlined } from "@ant-design/icons";
import { Button, message, Upload } from "antd";
import { Wrapper } from "./styles";
import { useState } from "react";

export function FileUpload({ content, setContent, setShowTable }) {
  const [isUpload, setIsUpload] = useState(false);
  const props = {
    showUploadList: false,
    disabled: isUpload,
    beforeUpload: (file) => {
      const isJSON = file.type === "application/json";
      if (isJSON === false) {
        message.error(`${file.name} não é um arquivo JSON`);
        return false;
      }

      let fileReader = new FileReader();
      fileReader.onload = () => {
        try {
          let content = JSON.parse(fileReader.result);
          setContent(content);
          setIsUpload(true);
          message.success(`A tabela está disponível!`);
          console.log(content);
        } catch (error) {
          console.error(error);
        }
      };
      fileReader.readAsText(file);
      return false;
    },
    onChange: (info) => {
      console.log(info);
    },
    maxCount: 1,
  };

  if (content !== null)
    return (
      <Wrapper>
        <Button
          type="primary"
          style={{
            marginTop: "30px",
            backgroundColor: "#333",
            borderColor: "#333",
            color: "white",
          }}
          size="large"
          icon={<EyeOutlined />}
          onClick={() => setShowTable(true)}
        >
          Mostrar tabela
        </Button>
      </Wrapper>
    );

  return (
    <Wrapper>
      <Upload {...props}>
        <Button
          style={{
            marginTop: "30px",
            backgroundColor: "#333",
            borderColor: "#333",
            color: "white",
          }}
          size="large"
          icon={<UploadOutlined />}
        >
          Upload JSON
        </Button>
      </Upload>
    </Wrapper>
  );
}
