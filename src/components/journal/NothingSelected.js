import React from 'react'

export const NothingSelected = () => {
    return (
		<div className='nothing__main-content animate__animated animate__slideInRight animate__faster'>
			<i className='far fa-star fa-4x mt-5  animate__animated animate__rotateIn animate__delay-1s'></i>
			<p>
				Select something
				<br />
				or create an entry!
			</p>
		</div>
	);
}
