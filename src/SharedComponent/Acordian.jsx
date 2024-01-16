import React from 'react';

const Acordian = ({ question, answer }) => {
    return (
        <div className="collapse collapse-plus mb-3 bg-blue-100">
            <input type="radio" name="my-accordion-3" readOnly />
            <div className="collapse-title text-xl font-medium">{question}</div>
            <div className="collapse-content">
                <p>{answer}</p>
            </div>
        </div>
    );
};

export default Acordian;