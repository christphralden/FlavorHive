'use client';
import * as React from 'react';

import {cn} from '@utils/utils';

export interface InputLabelledProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label: string;
	children?: React.ReactNode;
}

const InputLabelled = React.forwardRef<HTMLInputElement, InputLabelledProps>(
	({className, type, label, children, ...props}, ref) => {
		return (
			<div className={cn("flex flex-col gap-1 w-full",className)}>
				<div className="flex gap-2 items-baseline justify-between">
					<p className="font-medium text-sm lg:text-base">{label}</p>
					<div className="text-gray-500 text-xs lg:text-sm ">{children}</div>
				</div>
				<input
					type={type}
					className={
						'flex w-full rounded-md border border-input bg-background p-3 text-sm lg:text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'}
					ref={ref}
					{...props}
				/>
			</div>
		);
	}
);
InputLabelled.displayName = 'InputLabelled';

export {InputLabelled};
