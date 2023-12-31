import { Helmet } from "react-helmet";
import Banner from "./Banner/Banner";
import Download from "./Download/Download";
import Foote from "./Footer/Foote";
import Navbar from "./Navbar/Navbar";
import UserTypesSection from "./UserType/UserType";
import RegisterNow from "./RegisterNow/RegisterNow";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Tasky || Home</title>
            </Helmet>
            <Navbar></Navbar>
            <Banner></Banner>
            <UserTypesSection></UserTypesSection>
            <RegisterNow></RegisterNow>
            <Download></Download>
            <Foote></Foote>
        </div>
    );
};

export default Home;