import Banner from "./Banner/Banner";
import Navbar from "./Navbar/Navbar";
import UserTypesSection from "./UserType/UserType";

const Home = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Banner></Banner>
            <UserTypesSection></UserTypesSection>
        </div>
    );
};

export default Home;