import { RotatingLines } from 'react-loader-spinner';

let Loader = () => {
    return (
        <div className='flex w-[100%] h-[100vh] items-center justify-center'>
            <RotatingLines
                visible={true}
                height="96"
                width="96"
                color="grey"
                strokeWidth="5"
                animationDuration="0.75"
                ariaLabel="rotating-lines-loading"
                wrapperStyle={{}}
                wrapperClass=""
            />
        </div>
    )
}

export default Loader;