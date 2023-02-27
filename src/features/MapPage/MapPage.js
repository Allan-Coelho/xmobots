import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { MapWrapper, Sidebar, User, Username, Wrapper } from "./styles";
import { Avatar, Modal } from "antd";
import { FileUpload } from "../FileUpload/FileUpload";
import { AerodromesTable } from "../FileUpload/AerodromesTable";

export function MapPage() {
  const navigate = useNavigate();
  const { username } = useSelector((state) => state.login);
  const [content, setContent] = useState(null);
  const [showTable, setShowTable] = useState(false);
  const modalProps = {
    title: "Tabela de Aerodromes",
    centered: true,
    closable: false,
    onOk: () => setShowTable(false),
    onCancel: () => setShowTable(false),
    width: 1200,
  };

  useEffect(() => {
    if (username === "") return navigate("/");
  });

  return (
    <Wrapper>
      <Sidebar>
        <User>
          <Avatar size={65} style={{ backgroundColor: "rgb(51, 51, 51)" }}>
            {username === "" ? "usuário" : username[0].toUpperCase()}
          </Avatar>
          <Username>{username}</Username>
        </User>
        <FileUpload
          content={content}
          setContent={setContent}
          setShowTable={setShowTable}
        />
        <Modal {...modalProps} open={showTable}>
          <AerodromesTable content={content} />
        </Modal>
      </Sidebar>
      <MapWrapper>
        <MapContainer
          center={[51.505, -0.09]}
          zoom={13}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[51.505, -0.09]}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
      </MapWrapper>
    </Wrapper>
  );
}
