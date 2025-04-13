'use client'

import React, { useState } from 'react';
import { Form, Input, Button, Card, Typography, Divider, Space, Checkbox, message } from 'antd';
import { UserOutlined, LockOutlined, GoogleOutlined, GithubOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

const { Title, Text } = Typography;

export const LoginPage: React.FC = () => {
  const router = useRouter();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const onFinish = async (values: any) => {
    try {
      setLoading(true);
      
      const response = await fetch('http://localhost:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }
      
      // Check the actual structure of the response
      console.log('Login response:', data);
      
      // Use the correct token field from the response
      const token = data.access_token || data.token;
      
      if (!token) {
        throw new Error('No token received from server');
      }
      
      // Store the token in localStorage and update auth state
      login(token);
      
      message.success('Login successful!');
      router.push('/');
    } catch (error: any) {
      message.error(error.message || 'An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md shadow-lg rounded-lg overflow-hidden">
        <div className="text-center mb-8">
          <Title level={2} className="mb-2">Welcome Back</Title>
          <Text type="secondary">Sign in to your account to continue</Text>
        </div>
        
        <Form
          form={form}
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          layout="vertical"
          size="large"
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input 
              prefix={<UserOutlined className="text-gray-400" />} 
              placeholder="Email" 
              className="rounded-md"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password
              prefix={<LockOutlined className="text-gray-400" />}
              placeholder="Password"
              className="rounded-md"
            />
          </Form.Item>

          <div className="flex justify-between items-center mb-4">
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <a href="#" className="text-blue-500 hover:text-blue-700">
              Forgot password?
            </a>
          </div>

          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              className="w-full rounded-md h-10"
              loading={loading}
            >
              Sign in
            </Button>
          </Form.Item>
        </Form>

        <Divider plain>Or continue with</Divider>

        <Space className="w-full justify-center mb-6">
          <Button shape="circle" icon={<GoogleOutlined />} size="large" />
          <Button shape="circle" icon={<GithubOutlined />} size="large" />
        </Space>

        <div className="text-center">
          <Text type="secondary">Don't have an account? </Text>
          <a href="/signup" className="text-blue-500 hover:text-blue-700">
            Sign up
          </a>
        </div>
      </Card>
    </div>
  );
};