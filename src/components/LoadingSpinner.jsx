
const LoadingSpinner = () => {
    return (
        <div className=" border flex justify-center items-center h-screen">
            <div className="w-12 h-12 border-4 border-dashed rounded-full animate-spin border-primary"></div>
        </div>
    );
};

export default LoadingSpinner;