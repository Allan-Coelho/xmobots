import { Button, Form, Input } from "antd";
import { Wrapper, Title } from "./styles";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { save } from "./LoginSlice";

export function LoginPage() {
  const navigate = useNavigate();
  const username = useSelector((state) => state.login.username);
  const dispatch = useDispatch();
  const onFinish = (values) => {
    dispatch(save(values));
    navigate("/map");
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  if (username !== "") navigate("/map");

  return (
    <Wrapper>
      <Title>Login</Title>
      <Form
        name="basic"
        initialValues={{
          remember: true,
        }}
        size="large"
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label={<label style={{ color: "white" }}>Nome de Usuário</label>}
          name="username"
          style={{ color: "white" }}
          rules={[
            {
              required: true,
              message: "Por favor, informe um nome de usuário",
            },
            {
              pattern: /^.{10,}$/,
              message: "Insira um nome de usuário com, no mínimo 10 caracteres",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={<label style={{ color: "white" }}>Senha</label>}
          name="password"
          rules={[
            {
              required: true,
              message: "Por favor, informe uma senha",
            },
            {
              pattern: /^.{10,}$/,
              message: "Insira uma senha com, no mínimo 10 caracteres",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Button
            type="primary"
            htmlType="submit"
            style={{ backgroundColor: "#32BF84" }}
          >
            Login
          </Button>
        </Form.Item>
      </Form>
    </Wrapper>
  );
}
