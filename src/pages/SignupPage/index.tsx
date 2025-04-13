'use client';

import React, { useState } from 'react';
import { Form, Input, Button, Card, Typography, Divider, Space, Checkbox, message } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined, GoogleOutlined, GithubOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

const { Title, Text } = Typography;

export const SignupPage: React.FC = () => {
  const router = useRouter();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const onFinish = async (values: any) => {
    try {
      setLoading(true);
      
      const response = await fetch('http://localhost:8000/api/register', {
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
        throw new Error(data.error || 'Registration failed');
      }
      
      // Check the actual structure of the response
      console.log('Register response:', data);
      
      // If the registration response includes a token, log the user in
      const token = data.access_token || data.token;
      if (token) {
        login(token);
        message.success('Registration successful! You are now logged in.');
        router.push('/');
      } else {
        message.success('Registration successful! Please log in.');
        router.push('/login');
      }
    } catch (error: any) {
      message.error(error.message || 'An error occurred during registration');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md shadow-lg rounded-lg overflow-hidden">
        <div className="text-center mb-8">
          <Title level={2} className="mb-2">Create Account</Title>
          <Text type="secondary">Join our community today</Text>
        </div>
        
        <Form
          form={form}
          name="signup"
          onFinish={onFinish}
          layout="vertical"
          size="large"
        >
          {/* <div className="grid grid-cols-2 gap-4">
            <Form.Item
              name="firstName"
              rules={[{ required: true, message: 'Please input your first name!' }]}
            >
              <Input 
                prefix={<UserOutlined className="text-gray-400" />} 
                placeholder="First Name" 
                className="rounded-md"
              />
            </Form.Item>

            <Form.Item
              name="lastName"
              rules={[{ required: true, message: 'Please input your last name!' }]}
            >
              <Input 
                prefix={<UserOutlined className="text-gray-400" />} 
                placeholder="Last Name" 
                className="rounded-md"
              />
            </Form.Item>
          </div> */}

          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'Please enter a valid email!' }
            ]}
          >
            <Input 
              prefix={<MailOutlined className="text-gray-400" />} 
              placeholder="Email" 
              className="rounded-md"
            />
          </Form.Item>

          {/* <Form.Item
            name="phone"
            rules={[{ required: true, message: 'Please input your phone number!' }]}
          >
            <Input 
              prefix={<PhoneOutlined className="text-gray-400" />} 
              placeholder="Phone Number" 
              className="rounded-md"
            />
          </Form.Item> */}

          <Form.Item
            name="password"
            rules={[
              { required: true, message: 'Please input your password!' },
              { min: 8, message: 'Password must be at least 8 characters!' }
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="text-gray-400" />}
              placeholder="Password"
              className="rounded-md"
            />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            dependencies={['password']}
            rules={[
              { required: true, message: 'Please confirm your password!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The two passwords do not match!'));
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="text-gray-400" />}
              placeholder="Confirm Password"
              className="rounded-md"
            />
          </Form.Item>

          {/* <Form.Item
            name="birthDate"
            rules={[{ required: true, message: 'Please select your birth date!' }]}
          >
            <DatePicker 
              className="w-full rounded-md" 
              placeholder="Birth Date"
            />
          </Form.Item> */}

          {/* <Form.Item
            name="gender"
            rules={[{ required: true, message: 'Please select your gender!' }]}
          >
            <Select placeholder="Select Gender" className="rounded-md">
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
              <Option value="other">Other</Option>
              <Option value="prefer_not_to_say">Prefer not to say</Option>
            </Select>
          </Form.Item> */}

          <Form.Item
            name="agreement"
            valuePropName="checked"
            rules={[
              { validator: (_, value) => value ? Promise.resolve() : Promise.reject(new Error('Please accept the terms and conditions')) }
            ]}
          >
            <Checkbox>
              I agree to the <a href="#" className="text-blue-500 hover:text-blue-700">Terms of Service</a> and <a href="#" className="text-blue-500 hover:text-blue-700">Privacy Policy</a>
            </Checkbox>
          </Form.Item>

          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              className="w-full rounded-md h-10"
              loading={loading}
            >
              Create Account
            </Button>
          </Form.Item>
        </Form>

        <Divider plain>Or sign up with</Divider>

        <Space className="w-full justify-center mb-6">
          <Button shape="circle" icon={<GoogleOutlined />} size="large" />
          <Button shape="circle" icon={<GithubOutlined />} size="large" />
        </Space>

        <div className="text-center">
          <Text type="secondary">Already have an account? </Text>
          <a href="/login" className="text-blue-500 hover:text-blue-700">
            Sign in
          </a>
        </div>
      </Card>
    </div>
  );
}; 