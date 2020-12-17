import React from 'react';
import AssignmentTemplate from './AssignmentTemplate';
import { BorderButton } from './styles';

const steps = {
    FirstStep: 0,
    Assignment1: 1,
    Assignment2: 2,
    Assignment3: 3,
    Assignment4: 4,
    Assignment5: 5,
    Assignment6: 6,
    LastStep: 7,
};

export const totalAssignments = Object.keys(steps).length / 2 - 2;

const Steps = ({ step, ...assignmentProps }) => {
    switch (step) {
        case steps.FirstStep:
            return <FirstStep {...assignmentProps} />;
        case steps.Assignment1:
            return <Assignment1 {...assignmentProps} />;
        case steps.Assignment2:
            return <Assignment2 {...assignmentProps} />;
        case steps.Assignment3:
            return <Assignment3 {...assignmentProps} />;
        case steps.Assignment4:
            return <Assignment4 {...assignmentProps} />;
        case steps.Assignment5:
            return <Assignment5 {...assignmentProps} />;
        case steps.Assignment6:
            return <Assignment6 {...assignmentProps} />;
        case steps.LastStep:
            return <LastStep />;
        default:
            return null;
    }
};

const LastStep = () => {
    return (
        <>
            <h2>You saved Christmas!</h2>
            <p>Thanks to you, Santa Clause will make it.</p>
            <img
                alt="Rudolph"
                src="https://images.unsplash.com/photo-1605915359741-d89596dc6bdd?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1275&q=80"
            />
            <p>
                Want to learn more about JavaScript? You should check out{' '}
                <a target="_blank" rel="noopener noreferrer" href="https://javascript.christmas">
                    the rest of our articles
                </a>{' '}
                about JavaScript
            </p>
        </>
    );
};
const FirstStep = ({ setStep }) => {
    return <BorderButton onClick={() => setStep(1)}>Start!</BorderButton>;
};

const code1 = `
function hateChristmasMusic() {
    a = 6;
    ruinChristmas();
}

function ruinChristmas() {
    var a = 8;
}

hateChristmasMusic();
console.log(a);

var a;
`;

const Assignment1 = ({ setStep, onCompleteAssignment }) => {
    return (
        <AssignmentTemplate
            validAnswers={['6']}
            intro={
                'Like other programming languages, variables in JavaScript has a scope. Scope refers to the visibility of variables. In other words, which parts of your program can see or use it.'
            }
            title="Puzzle 1: To the top"
            code={code1}
            explanation={
                <p>
                    In JavaScript variable declarations are moved to the top of the current scope.
                    This is called{' '}
                    <a
                        href="https://developer.mozilla.org/en-US/docs/Glossary/Hoisting"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        hoisting
                    </a>
                    . This allows us to access <code>a</code> above where it is declared.
                </p>
            }
            goToNextAssignment={() => setStep(2)}
            onCompleteAssignment={onCompleteAssignment}
        />
    );
};

const code2 = `
const crypticMessage = 1+2+"A"+2+2+[]+"0";

console.log(crypticMessage);
`;

const explanation2 = (
    <div>
        <ol>
            <li>
                First two numbers are added: <i>1 + 2 = 3</i>
            </li>
            <li>
                Then we add a string and a number. This returns a new string: <i>3 + "A" = "3A"</i>
            </li>
            <li>
                Once again, we add a string and a number: <i>"3A" + 2 = "3A2"</i> and{' '}
                <i>"3A2" + 2 = "3A22"</i>
            </li>
            <li>
                The string equivalent of an empty array is an empty string:{' '}
                <i>
                    [].toString() = ""{' '}
                    <span role="img" aria-label="point-right">
                        👉
                    </span>{' '}
                    "3A22" + "" = "3A22""
                </i>
            </li>
            <li>
                Lastly, we add another string: "0". Which leaves us with <i>"3A220"</i>
            </li>
        </ol>
    </div>
);

const Assignment2 = ({ setStep, onCompleteAssignment }) => {
    return (
        <AssignmentTemplate
            validAnswers={['3a220']}
            intro={
                'If you have been working with JavaScript, you have probably seen a lot of usage with the + operator and discovered that the output is not necessarily what you expected.'
            }
            code={code2}
            explanation={explanation2}
            title="Puzzle 2: Add all the things!"
            goToNextAssignment={() => setStep(3)}
            onCompleteAssignment={onCompleteAssignment}
        />
    );
};

const code3 = `
const a = [1, 2, 3];
const b = [4, 5, 6];

console.log(a + b);
`;

const Assignment3 = ({ setStep, onCompleteAssignment }) => {
    return (
        <AssignmentTemplate
            validAnswers={['1,2,34,5,6']}
            intro="You can add almost everything with the + operator. What happens when we add two arrays?"
            title="Puzzle 3: JavaScript doesn’t social distance"
            code={code3}
            explanation={
                <p>
                    When one of the values in an addition is an object, array or function it will
                    try to convert it to a primitive value.
                    <ol>
                        <li>
                            Execute the valueOf()-function and use that value if it is a primitive
                        </li>
                        <li>Execute the toString()-function</li>
                    </ol>
                    <code>[1, 2, 3] + [4, 5, 6] = "1,2,3" + "3,4,5" = "1,2,34,5,6"</code>
                </p>
            }
            goToNextAssignment={() => setStep(4)}
            onCompleteAssignment={onCompleteAssignment}
        />
    );
};

const code4 = `
if ("123" === 123) {
    if ("ABC" == "abc") {
        console.log("ABCabc");
    } else {
        console.log("123123");
    }      
} else if ("123" == 123) {
    if (NaN == NaN) {
        console.log("NaN");
    } else if ({a: 1} == {a: 1}) {
        console.log("a1");
    } else if (Infinity === Infinity) {
        console.log("Infinity");
    } else {
        console.log("Truthy");
    }   
} else {
    console.log("Falsy");
}   
`;

const explanation4 = (
    <p>
        First of all, JavaScript has two operators for equality: == and ===. In order to understand
        equality, we have to understand the difference between these two options.{' '}
        <a href="https://javascript.christmas/2020/20">Charlie's article</a> is a good starting
        point.
    </p>
);

const Assignment4 = ({ setStep, onCompleteAssignment }) => {
    return (
        <AssignmentTemplate
            validAnswers={['infinity']}
            intro={
                'As the joke goes, there are two hard problems in computer science: cache invalidation and naming things. I think we should add equality in JavaScript to the list.'
            }
            code={code4}
            explanation={explanation4}
            title="Puzzle 4: Equality is hard"
            goToNextAssignment={() => setStep(5)}
            onCompleteAssignment={onCompleteAssignment}
        />
    );
};

const code5 = `
const a = [1, 2, 3];
const b = [4, 5, 6];

console.log([...b, ...a]);
`;

const explanation5 = (
    <span>
        The <code>...</code> operator that arrived to javascript with ES6 is really handy, and can
        be used in quite a lot of situations. The{' '}
        <a href="https://javascript.christmas/2019/2">spread operator</a> lets us expand elements
        such as objects and arrays.
    </span>
);

const Assignment5 = ({ setStep, onCompleteAssignment }) => {
    return (
        <AssignmentTemplate
            validAnswers={['[4,5,6,1,2,3]']}
            intro="You probably remember the task where we tried to add two arrays with the + operator? The result was not quite what we wanted - so what happens if we do it this way? "
            code={code5}
            explanation={explanation5}
            title="Puzzle 5: Spread out"
            goToNextAssignment={() => setStep(6)}
            onCompleteAssignment={onCompleteAssignment}
        />
    );
};

const code6 = `
const numbers = [1, 3, 5, 7, 9, 11];
const multiplyOrSquare = (number, factor) => {
    if (typeof factor === 'number') {
      return number * factor;
    } else {
      return number * number;
    }
};
const strangeListOfNumbers = numbers.map(multiplyOrSquare);
console.log(strangeListOfNumbers[numbers.length - 1]);
`;

const explanation6 = (
    <div>
        <p>
            The callback function is invoked with three arguments: the value of the element, the
            index of the element, and the array object being mapped.
        </p>
        <p>
            This results in: <code>[1*0, 3*1, 5*2, 7*3, 9*4, 11*5]</code>
        </p>
    </div>
);

const Assignment6 = ({ setStep, onCompleteAssignment }) => {
    return (
        <AssignmentTemplate
            validAnswers={['55']}
            intro={
                'Higher-order functions allow for abstraction of iteration, filtering and value accumulation, and enable developers to instead focus on clean and readable code. Pst! The callback function accepts multiple arguments'
            }
            code={code6}
            explanation={explanation6}
            title="Puzzle 6: Know your arguments"
            goToNextAssignment={() => setStep(7)}
            onCompleteAssignment={onCompleteAssignment}
        />
    );
};

export default Steps;
