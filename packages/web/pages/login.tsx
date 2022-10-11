import React from 'react';
import Form from '../components/Form';
import { FormStatus } from '../utils/enum';

export default function login() {
  return <Form status={FormStatus.LOGIN} />;
}
