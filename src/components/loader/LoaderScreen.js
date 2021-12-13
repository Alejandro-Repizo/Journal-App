import React from 'react'
import Loader from 'react-loader-spinner'

export const LoaderScreen = () => {
    return (
		<div className='loader'>
			<Loader type='Rings' color='#5C62C5' height={150} width={150} />
		</div>
	);
}
