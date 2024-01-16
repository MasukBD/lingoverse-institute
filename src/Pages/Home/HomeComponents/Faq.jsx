import React from 'react';
import SectionTitle from '../../../SharedComponent/SectionTitle';
import Acordian from '../../../SharedComponent/Acordian';

const Faq = () => {
    return (
        <div className='my-10 md:w-11/12 mx-auto p-2'>
            <SectionTitle heading={'FREQUENTLY ASKED QUESTIONS'} subHeading={'Commonly Asked Questions'}></SectionTitle>
            <Acordian
                question={'What languages do you offer courses in?'}
                answer={'Lingoverse Institute offers courses in a wide range of languages, including but not limited to English, Spanish, French, German, Chinese, Japanese, and more. Our goal is to cater to diverse language learning needs.'}>
            </Acordian>
            <Acordian
                question={'Are your courses suitable for beginners?'}
                answer={'Yes, our courses are designed to accommodate learners of all levels, from beginners to advanced. Our experienced instructors tailor the curriculum to meet the specific needs and proficiency levels of each student.'}>
            </Acordian>
            <Acordian
                question={'How are the classes conducted?'}
                answer={'Lingoverse Institute offers both in-person and online classes. In-person classes provide a traditional classroom experience, while online classes offer flexibility for learners to study from anywhere. We use interactive tools and resources to make online learning engaging and effective.'}>
            </Acordian>
            <Acordian
                question={'What is the duration of each course?'}
                answer={'The duration of our courses varies depending on the language and the proficiency level of the student. Typically, courses range from a few weeks to several months. We offer flexible schedules to accommodate different learning paces.'}>
            </Acordian>
            <Acordian
                question={'How qualified are your instructors?'}
                answer={'Our instructors are highly qualified language professionals with extensive teaching experience. They are native speakers or possess near-native proficiency in the language they teach. We ensure that our instructors are not only knowledgeable but also skilled in creating an engaging and effective learning environment.'}>
            </Acordian>
            <Acordian
                question={'Is there a placement test for new students?'}
                answer={'Yes, we conduct placement tests to assess the proficiency level of new students. This helps us place them in the appropriate course, ensuring they receive instruction that aligns with their current skill level.'}>
            </Acordian>
            <Acordian
                question={'What resources and materials are provided with the courses?'}
                answer={'Lingoverse Institute provides a variety of resources and materials, including textbooks, online exercises, multimedia content, and access to language learning apps. These materials are curated to enhance the learning experience and support different learning styles.'}>
            </Acordian>
            <Acordian
                question={'How can I enroll in a course at Lingoverse Institute?'}
                answer={'Enrolling in a course is easy. Simply visit our website, choose the desired course, and follow the online enrollment process. If you have any questions or need assistance, our customer support team is ready to help.'}>
            </Acordian>
            <Acordian
                question={'What is your cancellation and refund policy?'}
                answer={`Lingoverse Institute has a transparent cancellation and refund policy. Please refer to our terms & conditions on the website for detailed information. We strive to provide a fair and flexible approach to accommodate our students' needs.`}>
            </Acordian>
        </div>

    );
};

export default Faq;