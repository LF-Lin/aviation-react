import 'antd/dist/antd.css';

import React from 'react';
import { Layout, Menu } from 'antd';
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';

const { Sider, Content } = Layout;

export function Charts() {
  return (
    <Layout>
      <Sider theme="light">
        <Menu mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1" icon={<UserOutlined />}>
            chart 1
          </Menu.Item>
          <Menu.Item key="2" icon={<VideoCameraOutlined />}>
            chart 2
          </Menu.Item>
          <Menu.Item key="3" icon={<UploadOutlined />}>
            chart 3
          </Menu.Item>
        </Menu>
      </Sider>
      <Content>
        <h2>{'Something to represent'}</h2>
      </Content>
    </Layout>
  );
}
