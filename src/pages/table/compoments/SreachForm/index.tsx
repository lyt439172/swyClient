import React from 'react';
import { Form, Row, Col, Select, Button } from 'antd';
import { representList } from '../../../../common/commonData';
import './style.scss';

const { Item } = Form;
const { Option } = Select;

const SearchForm = (props: any) => {
    const [form] = Form.useForm();
  
    const onFinish = (values: any) => {
      props.onFinish(values)
    };

    const handleChange = (value: any) => {
      console.log(`selected ${value}`);
    }

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
                <Item name="selects" label="故障现象：" style={{marginBottom: 12}}>
                    <Select
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
                    <Select style={{width: '100%'}} onChange={handleChange} defaultValue={'all'}>
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