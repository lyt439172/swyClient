import React from 'react';
import { RouteComponentProps } from 'react-router';
import { Tag, Table, Space, Button } from 'antd';
import SearchForm from './compoments/SreachForm';
import './style.scss';

export default class Tables extends React.Component<RouteComponentProps> {
  
  columns = [
    {
      title: '序号',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: '故障原因',
      dataIndex: 'reason',
      key: 'reason',
    },
    {
      title: '故障位置',
      dataIndex: 'position',
      key: 'position',
    },
    {
      title: '解决方案',
      dataIndex: 'solution',
      key: 'solution',
    },
    {
      title: '处理状态',
      key: 'status',
      dataIndex: 'status',
      render: (status: any) => (
        <Tag color={status === 0 ? 'volcano' : 'green'}>
          {status === 0 ? '未处理' : '已处理'}
        </Tag>
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: (text: any, record: any) => (
        <Space size="middle">
          {record.status === 0 && <Button type="link">去处理</Button>}
          <Button type="link">查看</Button>
        </Space>
      ),
    },
  ];

  state = {
    data: [
      { id: 10001, key: 10001, reason: '虚连', position: 'xx模块', solution: '', status: 0 },
      { id: 10002, key: 10002, reason: '电源模块故障', position: 'xx模块', solution: '已更换电源模块', status: 1 },
      { id: 10003, key: 10003, reason: '网络接口板故障', position: 'xx模块', solution: '', status: 0 },
      { id: 10004, key: 10004, reason: '虚连', position: 'xx模块', solution: '', status: 0 },
      { id: 10005, key: 10005, reason: '电源模块故障', position: 'xx模块', solution: '已更换电源模块', status: 1 },
      { id: 10006, key: 10006, reason: '网络接口板故障', position: 'xx模块', solution: '', status: 0 },
      { id: 10007, key: 10007, reason: '虚连', position: 'xx模块', solution: '', status: 0 },
      { id: 10008, key: 10008, reason: '电源模块故障', position: 'xx模块', solution: '已更换电源模块', status: 1 },
      { id: 10009, key: 10009, reason: '网络接口板故障', position: 'xx模块', solution: '', status: 0 },
      { id: 10010, key: 10010, reason: '虚连', position: 'xx模块', solution: '', status: 0 },
      { id: 10012, key: 10012, reason: '电源模块故障', position: 'xx模块', solution: '已更换电源模块', status: 1 },
      { id: 10013, key: 10013, reason: '网络接口板故障', position: 'xx模块', solution: '', status: 0 },
      { id: 10011, key: 10011, reason: '虚连', position: 'xx模块', solution: '', status: 0 },
      { id: 10014, key: 10014, reason: '电源模块故障', position: 'xx模块', solution: '已更换电源模块', status: 1 },
      { id: 10015, key: 10015, reason: '网络接口板故障', position: 'xx模块', solution: '', status: 0 }
    ]
  }
  
  render() {
    return (
      <div className="tables">
        <SearchForm />
        <Table 
          columns={this.columns} 
          size={'small'}
          scroll={{ y: 240 }}
          dataSource={this.state.data}  />
      </div>
    )
  }
}