'use client';
import { Button } from '@components/ui/button';
import {Input} from '@components/ui/input';
import {InputLabelled} from '@components/ui/input-labelled';
import {useAuth} from '@hooks/useAuth';
import React from 'react';
import {useForm} from 'react-hook-form';
import LoginForm from '../_components/login-form';

export default function LoginPage() {



	return (
		<div className="w-full h-fit flex flex-col gap-8">
			<div className='flex flex-col gap-1'>
        <h1 className="text-4xl font-medium tracking-tight">Welcome back</h1>
        <p className="text-base text-gray-500">We're hungry too, lets find somewhere to eat</p>
      </div>
			<LoginForm/>
		</div>
	);
}
