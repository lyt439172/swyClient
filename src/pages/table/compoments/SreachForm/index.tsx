import React from 'react';
import { Form, Row, Col, Select, Button } from 'antd';
import { representList } from '../../../../common/commonData';
import './style.scss';

const { Item } = Form;
const { Option } = Select;

const SearchForm = () => {
    const [form] = Form.useForm();
  
    const onFinish = (values: any) => {
      console.log('Received values of form: ', values);
    };

    const handleChange = (value: any) => {
        console.log(`selected ${value}`);
      }

    // const representList = [
    //     {value: 1, label: "5V灯不亮"},
    //     {value: 2, label: "12V灯不亮"},
    //     {value: 3, label: "15V灯不亮"},
    //     {value: 4, label: "无任何显示"},
    //     {value: 5, label: "输入电压为0"},
    //     {value: 6, label: "输入电压超量程"},
    //     {value: 7, label: "状态等常亮"},
    //     {value: 8, label: "时钟不准"},
    //     {value: 9, label: "时钟时走时停"},
    //     {value: 10, label: "无数据"},
    //     {value: 11, label: "网络不通"},
    //     {value: 12, label: "网页打不开"},
    //     {value: 13, label: "数据无法下载"},
    //     {value: 0, label: "其他"}
    // ]

    const children = [];
    for (let i = 0; i < representList.length; i++) {
    children.push(<Option key={representList[i].value} value={representList[i].value}>{representList[i].label}</Option>);
    }

    return (
      <Form
        form={form}
        name="search"
        className="search-form"
        onFinish={onFinish}
      >

        <Row>
            <Col span={16}>
                <Item name="selects" label="故障现象：" required={true} style={{marginBottom: 12}}>
                    <Select
                        mode="multiple"
                        allowClear
                        style={{ width: '100%' }}
                        placeholder="请选择故障现象"
                        onChange={handleChange}
                        options={representList}
                        >
                    </Select>
                </Item>
            </Col>
            <Col span={2} />
            <Col span={6} >
                <Item name="status" label="处理状态：" style={{marginBottom: 12}}>
                    <Select style={{width: '100%'}} onChange={handleChange}>
                        <Option value="all">全部</Option>
                        <Option value={0}>未处理</Option>
                        <Option value={1}>已处理</Option>
                    </Select>
                </Item>
            </Col>
        </Row>
        <Row>
          <Col span={24} style={{ textAlign: 'right' }}>
            <Button type="primary" htmlType="submit" >
              查询
            </Button>
            <Button
              style={{ marginLeft: '8px' }}
              onClick={() => {
                form.resetFields();
              }}
            >
              清除
            </Button>
          </Col>
        </Row>
      </Form>
    );
  };

  export default SearchForm;