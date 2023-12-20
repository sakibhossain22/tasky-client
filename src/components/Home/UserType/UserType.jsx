
const UserTypesSection = () => {
    const userTypes = [
        {
            title: 'Developers',
            description: 'Manage and organize tasks in a collaborative environment. Track deadlines and priorities.',
            image : 'https://www.simplilearn.com/ice9/free_resources_article_thumb/tester-or-developer-what-suits-you-the-most.jpg'
        },
        {
            title: 'Corporate Professionals',
            description: 'Efficiently handle project tasks, deadlines, and priorities. Stay organized in the workplace.',
            image : 'https://www.ringcentral.com/gb/en/blog/wp-content/uploads/2021/05/business-people-working-in-the-office-scaled.jpg'
        },
        {
            title: 'Bankers',
            description: 'Keep track of important tasks and deadlines. Prioritize and manage work effectively.',
            image : 'https://static.news.bitcoin.com/wp-content/uploads/2016/06/shutterstock_303019673.jpg'
        },
        // Add more user types as needed
    ];

    return (
        <div className="mx-5 my-10">
            <h1 className="text-center text-3xl mb-2 font-bold">Popular <span className="text-[#f1c40f]">Users</span></h1>
            <div className="h-1 w-28 mb-10 bg-[#f1c40f] mx-auto"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-5">
                {userTypes.map((userType, index) => (
                    <div key={index} className="card card-compact  bg-base-100 shadow-xl">
                        <figure><img className="h-48 w-full" src={userType.image} alt="Shoes" /></figure>
                        <div className="card-body">
                            <h2 className="card-title text-2xl">{userType.title}</h2>
                            <p>{userType.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserTypesSection;
