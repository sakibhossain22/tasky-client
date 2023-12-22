
import ReactMarkdown from 'react-markdown';
import Navbar from '../Home/Navbar/Navbar';

const TaskManagementBlog = () => {
    const blogContent = `
    # Boost Your Productivity with Our Task Management Website

    In today's fast-paced world, staying organized is key to productivity. 
    That's where our task management website comes into play. Whether you're a student, 
    professional, or anyone in between, our platform is designed to help you manage 
    your tasks efficiently.

    ## Features

    ### 1. Intuitive Interface

    Our user-friendly interface makes it easy for you to navigate and manage your tasks. 
    With drag-and-drop functionality, organizing your to-do list has never been simpler.

    ### 2. Customizable Categories

    Tailor the platform to your specific needs by creating customizable categories for your tasks. 
    Whether it's work-related, personal, or a special project, our website adapts to your workflow.

    ### 3. Collaboration

    Collaborate seamlessly with team members by sharing task lists and updates. 
    Keep everyone on the same page and enhance teamwork.

    ## Getting Started

    Ready to boost your productivity? Follow these steps to get started:

    1. **Sign Up**: Create an account on our platform.
    2. **Create Tasks**: Start adding tasks to your to-do list.
    3. **Organize**: Arrange tasks into categories for better organization.
    4. **Collaborate**: Invite team members to collaborate on projects.

    ## Conclusion

    Our task management website is designed to simplify your life and increase your efficiency. 
    Say goodbye to scattered to-do lists and hello to a more organized and productive you. 
    Try our platform today and experience the difference.

    Ready to get started? [Sign up now](#) and transform the way you manage your tasks!
  `;

    return (
        <div>
            <Navbar></Navbar>
            <div className='p-8 max-w-2xl mx-auto'>
                <h1 className="text-3xl font-bold mb-6">Boost Your Productivity with Our Task Management Website</h1>
                <ReactMarkdown className="prose">{blogContent}</ReactMarkdown>
            </div>
        </div>
    );
};

export default TaskManagementBlog;
