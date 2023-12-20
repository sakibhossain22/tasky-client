
import { Link } from "react-router-dom";

const ErrorPage = () => {
    return (
        <div className="flex items-center justify-center h-screen">
            <div>
                <title> 404 </title>
                <div className="flex items-center justify-center">
                    <Link className="bg-green-600 px-6 py-2 rounded text-white mx-auto text-center" to='/'>Home</Link>
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;