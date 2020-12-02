import React, { useState } from 'react';
import Steps from './Steps';
import ArticleBody from '../ArticleBody';
import { MaxWidth } from './styles';

const assignmentKeys = [
    '',
    '61c089ac358e43da92bf4a45075c889d',
    'd32a263749524570b74f5b28095b5f63',
    'c2cf1c7119cd4f9f94e332964f9c44c9',
    'eb030af90f3d400da63aeff1b6bdc26e',
    'efsefik12330af90f63aeff1b6bd2d6f',
    '7c0b325fef9942ebb350b9aa5dc50588',
    '7358bc7e0024403f80db682263737d9a',
    'a7cbd9a909a9497cb517b2a61871cedf',
];

const JsMysteryPage = () => {
    const storedStep = Math.max(
        assignmentKeys.indexOf(sessionStorage.getItem('currentStep') || ''),
        0
    );

    const [step, setStep] = useState(storedStep);
    const [lastCompletedAssignment, setLastCompletedAssignment] = useState(
        Math.max(0, storedStep - 1)
    );

    const onCompleteAssignment = () => {
        window.scrollBy({
            top: 100,
            behavior: 'smooth',
        });
        if (step > lastCompletedAssignment) {
            setLastCompletedAssignment(step);
            sessionStorage.setItem(
                'currentStep',
                assignmentKeys[Math.min(assignmentKeys.length - 1, step + 1)]
            );
        }
    };

    return (
        <MaxWidth>
            <ArticleBody>
                <Steps setStep={setStep} onCompleteAssignment={onCompleteAssignment} step={step} />
            </ArticleBody>
        </MaxWidth>
    );
};

export default JsMysteryPage;
