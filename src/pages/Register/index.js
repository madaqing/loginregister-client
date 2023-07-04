import { Card, Form, Input, Checkbox, Button, message } from 'antd'
import { useNavigate } from "react-router-dom"
import { gql } from '@apollo/client'
import { ApolloClient, InMemoryCache } from '@apollo/client'
//导入样式文件
import './index.scss'
//import { useStore } from "../../store"


const Register = () => {
  const navigate = useNavigate()
  const client = new ApolloClient({
    uri: 'http://localhost:3000/graphql',
    cache: new InMemoryCache(),
  })
  async function onFinish (values) {
    console.log(values)
    //values:放置的是所有表单项中用户输入的内容
    const ADD_USERS = gql`
          mutation AddUser($account1: String!,$account2: String!){
            addUser(createUserInput:{username:$account1,password:$account2}) {
                username
                password
                }
            }
            `
    let countvalue = values.username
    let coutpassword = values.password
    console.log(countvalue)
    console.log(coutpassword)
    client
      .mutate({
        mutation: ADD_USERS,
        variables: {
          account1: countvalue,
          account2: coutpassword,
        },
      })
      .then((response) => {
        console.log(response.data)
        navigate('/login')
        message.success("注册成功")
      })
      .catch((error) => {
        console.log("错误")
        message.error("注册失败")
      })
  }
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }
  return (
    <div className="login">
      <Card className="login-container">

        {/* 登录表单 */}
        {/*子项用到的触发事件 需要在Form中都声明一下才可以*/}
        <Form
          validateTrigger={['onBlur', 'onChange']}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: '请输入手机号',
              },
              {
                pattern: /^1[3-9]\d{9}$/,
                message: '请输入正确的手机号',
                validateTrigger: 'onBlur'
              }
            ]}>
            <Input size="large" placeholder="请输入手机号" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: '请输入密码',
              },
              {
                len: 6,
                message: '请输入6位密码',
                validateTrigger: 'onBlur'
              }
            ]}>
            <Input size="large" placeholder="请输入密码" />
          </Form.Item>
          <Form.Item>
            <Checkbox className="login-checkbox-label">
              我已阅读并同意「用户协议」和「隐私条款」
            </Checkbox>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block>
              注册
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Register
