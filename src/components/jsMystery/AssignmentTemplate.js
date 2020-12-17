import React from 'react';
import { BorderButton, Icon } from './styles';
import CheckmarkInCircle from './icons/CheckmarkInCircle.svg';
import CrossInCircle from './icons/CrossInCircle.svg';

import InputFormWithButton from './InputFormWithButton';
import styled from 'styled-components';

const Pre = styled.pre`
    position: relative;
    overflow: visible !important;
`;

const AssignmentTemplate = ({
    validAnswers,
    title,
    intro,
    code,
    explanation,
    goToNextAssignment,
    onCompleteAssignment,
}) => {
    const [formState, setFormState] = React.useState('UNTOUCHED'); // UNTOUCHED | DIRTY | ERROR | SUCCESS

    React.useEffect(() => {
        if (formState === 'SUCCESS') {
            onCompleteAssignment();
        }
    }, [onCompleteAssignment, formState]);

    return (
        <>
            <h1>{title}</h1>
            <p>{intro}</p>
            <Pre className="language-javascript">
                <code className="language-javascript">{code}</code>
                {formState === 'SUCCESS' && <Icon src={CheckmarkInCircle} />}
                {formState === 'ERROR' && <Icon src={CrossInCircle} />}
            </Pre>
            <p>What is the output of the code snippet above?</p>
            <InputFormWithButton
                buttonText="Check answer"
                validAnswers={validAnswers}
                formState={formState}
                setFormState={setFormState}
            />
            {formState === 'SUCCESS' && (
                <>
                    <span role="img" aria-label="tada">
                        🎉
                    </span>
                    <p>Explanation: {explanation}</p>
                    <BorderButton onClick={() => goToNextAssignment()}>Next puzzle</BorderButton>
                </>
            )}
            {formState === 'ERROR' && <p>Wrong answer, try again</p>}
        </>
    );
};

export default AssignmentTemplate;
