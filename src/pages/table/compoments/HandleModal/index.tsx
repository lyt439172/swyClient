import React from 'react';
import { Form, Modal, Input, message } from 'antd';

const HandleModal = (props: any) => {
    const [form] = Form.useForm();
  
    const { 
        visible,
        onOk,
        disVisable
    } = props;

    const handleOkClick = () => {
        const mySolution = form.getFieldValue('mySolution')
        if(typeof(mySolution) === 'undefined') {
            message.error('请填写解决方案');
          } else {
            console.log('----解决结果：', mySolution)
            // todo 请求接口更新数据
            onOk(mySolution)
            // 更新状态为已处理，更新解决方案
            disVisable(false)
          }
    }
    return (
    <Modal 
        title="故障处理"
        visible={visible}
        onOk={handleOkClick} 
        onCancel={disVisable} 
        destroyOnClose={true} >
        <Form form={form} preserve={false} >
            <Form.Item name="mySolution" label="解决方案：" required={true} >
                <Input placeholder="请输入解决方案" />
            </Form.Item>
        </Form>
    </Modal>
);
  };

  export default HandleModal;