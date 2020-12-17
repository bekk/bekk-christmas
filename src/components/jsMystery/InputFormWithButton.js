import React, { useEffect } from 'react';
import { BorderButton, InputField } from './styles';

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