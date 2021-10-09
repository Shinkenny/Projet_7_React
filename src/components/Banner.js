import '../styles/banner.css'

function Banner({ children }) {
	return (
		<div className='gpm-banner'>
			{children}
		</div>
	);
}

export default Banner