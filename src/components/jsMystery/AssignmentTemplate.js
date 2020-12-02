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

const AssignmentTemplate = ({ validAnswers, title, intro, code, goToNextAssignment }) => {
    const [formState, setFormState] = React.useState('UNTOUCHED'); // UNTOUCHED | DIRTY | ERROR | SUCCESS

    return (
        <>
            <h1>{title}</h1>
            <p>{intro}</p>
            <Pre className="language-javascript">
                <code className="language-javascript">{code}</code>
                {formState === 'SUCCESS' && <Icon src={CheckmarkInCircle} />}
                {formState === 'ERROR' && <Icon src={CrossInCircle} />}
            </Pre>
            <p>Hva blir skrevet ut av kodeblokken over?</p>
            <InputFormWithButton
                buttonText="Sjekk svaret"
                validAnswers={validAnswers}
                formState={formState}
                setFormState={setFormState}
            />
            {formState === 'SUCCESS' && (
                <BorderButton onClick={() => goToNextAssignment()}>Neste oppgave</BorderButton>
            )}
        </>
    );
};

export default AssignmentTemplate;
