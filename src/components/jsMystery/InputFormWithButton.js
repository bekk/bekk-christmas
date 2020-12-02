import React, { useEffect } from 'react';
import styled from 'styled-components/macro';
import { BorderButton } from './styles';

const InputField = styled.input`
    font-family: inherit;
    font-size: 22px;
    color: black;

    width: 100%;
    background: transparent;
    outline: 0;
    border: 1px solid;
    padding: 15px 30px;
    margin-bottom: 30px;
`;

const InputFormWithButton = ({ buttonText, validAnswers, formState, setFormState }) => {
    const [inputValue, setInputValue] = React.useState('');
    const [submittedValue, setSubmittedValue] = React.useState('');

    useEffect(() => {
        if (formState !== 'SUCCESS' && inputValue !== submittedValue) {
            setFormState('DIRTY');
        }
    }, [formState, inputValue, setFormState, submittedValue]);

    const onSubmit = (e) => {
        e.preventDefault();
        setSubmittedValue(inputValue);

        if (inputValue && validAnswers.includes(inputValue.toLowerCase().replace(/\s/g, ''))) {
            setFormState('SUCCESS');
        } else {
            setFormState('ERROR');
        }
    };

    return (
        <form onSubmit={onSubmit}>
            <InputField
                type="text"
                name="answer"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
            />
            {formState !== 'SUCCESS' && <BorderButton>{buttonText}</BorderButton>}
        </form>
    );
};

export default InputFormWithButton;
