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
    Assignment7: 7,
    LastStep: 8,
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
        case steps.Assignment7:
            return <Assignment7 {...assignmentProps} />;
        case steps.LastStep:
            return <LastStep />;
        default:
            return null;
    }
};

const LastStep = () => {
    return (
        <>
            <h2>Hurra, du klarte alle oppgavene!</h2>
            <p>
                De fleste utviklere har et elsk-hat-forhold til JavaScript. Til tross for sine mange
                særegenheter, er det et programmeringspråk som er lett å lære seg. Nøkkelen til å
                leve lykkelig med JavaScript er å vite både når og hvordan man skal bruke det. Selv
                om JavaScript kan brukes til alt, betyr det ikke at man burde bruke det til alt.
            </p>
            <p>
                Har du lyst til å lære mer om JavaScript kan du sjekke ut den årlige{' '}
                <a target="_blank" rel="noopener noreferrer" href="https://javascript.christmas">
                    julekalenderen vår
                </a>{' '}
                om JavaScript
            </p>
        </>
    );
};
const FirstStep = ({ setStep }) => {
    return (
        <>
            <h2>JavaScript-mysteriet</h2>
            <p>
                Man lærer for lite om JavaScript under studiet til at det er verdens mest brukte
                programmeringspråk! Derfor har JavaScript-faggruppen snekret sammen noen oppgaver
                som viser hva som gjør JavaScript rart, frustrerende og helt utrolig. Alt på samme
                tid.
            </p>
            <BorderButton onClick={() => setStep(1)}>Start!</BorderButton>
        </>
    );
};

const code1 = `
function oi() {
    a = 6;
    pangea();
}

function pangea() {
    var a = 8;
}

oi();
console.log(a);

var a;
`;

const Assignment1 = ({ setStep, onCompleteAssignment }) => {
    return (
        <AssignmentTemplate
            validAnswers={['6']}
            intro={
                'Likt som i andre programmeringsspråk, har variabler i JavaScript et definert scope – dvs. et området av kildekoden hvor variabelen kan brukes. Det er derimot en ting som er litt spesielt for JavaScript som enklest kan illustreres med et eksempel.'
            }
            title="Helt til toppen"
            code={code1}
            hint={
                <div>
                    <p>
                        I JavaScript blir variabeldeklarasjoner flyttet til toppen av scopet som
                        variabelen er gyldig i.
                    </p>
                    <p>
                        Variabler definert med <code>var</code> gjør verdien tilgjengelig globalt
                        eller begrenser den til en funksjon.
                    </p>
                </div>
            }
            explaination={
                <p>
                    I JavaScript blir variabeldeklarasjoner flyttet til toppen av scopet som
                    variabelen er gyldig i. Dette kalles for{' '}
                    <a
                        href="https://developer.mozilla.org/en-US/docs/Glossary/Hoisting"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        hoisting
                    </a>
                    . Variablene kan da aksesseres selv om de ikke enda er deklarert i koden. Det er
                    derfor vi kan skrive ut variabelen <code>a</code> selv om den er definert lenger
                    ned i koden vår. Ganske stilig?
                </p>
            }
            goToNextAssignment={() => setStep(2)}
            onCompleteAssignment={onCompleteAssignment}
        />
    );
};

const code2 = `
const enStreng = 1+2+"A"+2+2+[]+"0";

console.log(enStreng);
`;

const explanation2 = (
    <div>
        <ol>
            <li>
                Først adderes to tall: <i>1 + 2 = 3</i>
            </li>
            <li>
                Deretter adderes et tall og en streng. Dette returnerer en ny streng:{' '}
                <i>3 + "A" = "3A"</i>
            </li>
            <li>
                Nok en gang streng og tall som adderes: <i>"3A" + 2 = "3A2"</i> og{' '}
                <i>"3A2" + 2 = "3A22"</i>
            </li>
            <li>
                Tomt array gir tom streng:{' '}
                <i>
                    [].toString() = ""{' '}
                    <span role="img" aria-label="point-right">
                        👉
                    </span>{' '}
                    "3A22" + "" = "3A22""
                </i>
            </li>
            <li>
                Til slutt legger vi til strengen "0" og får: <i>"3A220"</i>
            </li>
        </ol>
    </div>
);

const Assignment2 = ({ setStep, onCompleteAssignment }) => {
    return (
        <AssignmentTemplate
            validAnswers={['3a220']}
            intro={
                'Det er mulig å legge sammen det meste med +-operatoren i JavaScript, men det krever ofte litt tankevirksomhet for å forstå hvordan dette utføres.'
            }
            code={code2}
            explaination={explanation2}
            hint={
                <div>
                    Her er det noen ting du bør huske på:
                    <ul>
                        <li>JavaScript kjøres fra venstre til høyre</li>
                        <li>
                            Tall + Tall{' '}
                            <span role="img" aria-label="point-right">
                                👉
                            </span>{' '}
                            et nytt tall.
                        </li>
                        <li>
                            Tall + Streng{' '}
                            <span role="img" aria-label="point-right">
                                👉
                            </span>{' '}
                            en ny streng.
                        </li>
                    </ul>
                </div>
            }
            title="Add all the things!"
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
            intro="Man kan altså legge sammen det meste i JavaScript, men hva skjer egentlig når man plusser to arrays?"
            explaination='JavaScript er, som mange andre programmeringspråk, objektorientert. Arrays har implementert en del funksjoner og "toString()" er en av disse. Den returnerer tekstrepresentasjonen av arrayet. Det er nettopp denne funskjonen som blir kalt når man plusser to arrays. Man får med andre ord "1,2,3" + "4,5,6", altså "1,2,34,5,6".'
            title="Ikke akkurat sosial distansering"
            code={code3}
            hint={
                <span>
                    Når to arrays legges sammen med +-operatoren kalles <code>toString()</code>{' '}
                    metoden først.
                </span>
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
    <div>
        <p>
            === krever at typen på begge verdier er den samme og at det er samme verdi på hver side.
        </p>
        <p>
            == aksepterer en hel del slingringsmonn dersom typene er forskjellige, men verdien anses
            å være "lik".
        </p>
        <p>== på like typer gir (stort sett) samme oppførsel som ===.</p>
        <p>
            Sjekk{' '}
            <a
                href="https://www.ecma-international.org/ecma-262/#sec-abstract-equality-comparison"
                target="_blank"
                rel="noopener noreferrer"
            >
                https://www.ecma-international.org/ecma-262/#sec-abstract-equality-comparison
            </a>{' '}
            (7.2.15 og 7.2.16) for en mer detaljert forklaring
        </p>
    </div>
);

const Assignment4 = ({ setStep, onCompleteAssignment }) => {
    return (
        <AssignmentTemplate
            validAnswers={['infinity']}
            intro={
                'Likhet og ulikhet i JavaScript kan til tider være frustrerende å forholde seg til. Med mindre du har spesielle hensyn å ta så anbefales det å bruke ===, og ikke ==. Uansett, det kan være nyttig å vite hva som skjer under panseret når likhet og ulikhet skal sjekkes.'
            }
            code={code4}
            explaination={explanation4}
            hint={
                <span>
                    Usikker på hvordan likhet oppfører seg i JavaScript? Da kan{' '}
                    <a
                        href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        denne oversikten
                    </a>{' '}
                    være kjekk
                </span>
            }
            title="Ikke like lett"
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
        Syntaksen <code>...a</code> er det vi kaller for{' '}
        <a
            href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax"
            target="_blank"
            rel="noopener noreferrer"
        >
            spreading
        </a>
        . Det som skjer er at hver egenskap i listen blir hentet ut én og én og lagt inn i den nye
        listen. Spreading fungerer ikke bare med lister, men kan også brukes på objekter (f.eks. for
        å kopiere objekter).
    </span>
);

const Assignment5 = ({ setStep, onCompleteAssignment }) => {
    return (
        <AssignmentTemplate
            validAnswers={['[4,5,6,1,2,3]']}
            intro="Du husker sikkert oppgaven hvor vi prøvde å legge sammen to lister med tall ved å addere disse? Resultatet ble ikke helt som vi ønsket – så hva skjer om vi gjør det på denne måten?"
            code={code5}
            explaination={explanation5}
            hint="Denne måten å legge sammen lister funker akkurat som vi ønsker. Vi får en ny liste med innholdet fra begge."
            title="Spre dere utover"
            goToNextAssignment={() => setStep(6)}
            onCompleteAssignment={onCompleteAssignment}
        />
    );
};

const code6 = `
const tall = [1, 3, 5, 7, 9, 11];
const multipliserEllerKvadrat = (tall, faktor) => {
    if (typeof faktor === 'number') {
      return tall * faktor;
    } else {
      return tall * tall;
    }
};
const tallMultiplisert = tall.map(multipliserEllerKvadrat);
console.log(tallMultiplisert[tall.length - 1]);
`;

const explanation6 = (
    <div>
        <p>
            Funksjonen <code>multipliserEllerKvadrat</code> blir utført for hvert enkelt tall i
            listen. Ved første øyekast kan man tenke seg at <code>faktor</code> ikke sendes inn, men{' '}
            <code>map</code> sender faktisk 3 argumenter videre: verdi, indeks og hele listen.
            Faktor vil være det samme som indeks i denne oppgaven.
        </p>
        <p>
            Følgende operasjoner utføres: <code>[1*0, 3*1, 5*2, 7*3, 9*4, 11*5]</code>
        </p>
        <p>Det siste tallet i den nye listen er følgelig 55</p>
    </div>
);

const Assignment6 = ({ setStep, onCompleteAssignment }) => {
    return (
        <AssignmentTemplate
            validAnswers={['55']}
            intro={
                'Ofte ønsker vi å iterere igjennom en liste og utføre operasjoner for hvert enkelt element. map løser dette og returnerer en ny liste. ' +
                'Nedenfor utføres en slik operasjon, men husk på hva argumentene er når funksjoner sendes inn i listefunksjoner som map, filter, reduce!'
            }
            code={code6}
            explaination={explanation6}
            hint={
                'Argumentene som sendes inn til funksjonen i map har "verdien til nåværende index" som første argument, "nåværende index" som andre argument og "hele listen" som tredje argument.'
            }
            title="Hold tunga rett i munnen"
            goToNextAssignment={() => setStep(7)}
            onCompleteAssignment={onCompleteAssignment}
        />
    );
};

const code7 = `
const lørdagshandel = [
    { varenavn: "Potetgull", pris: 25, antall: 2 },
    { varenavn: "Sjokolade", pris: 30, antall: 1 },
    { varenavn: "Brus", pris: 25, antall: 4 },
    { varenavn: "Brun brus", pris: 20, antall: 6 }
];
const sumTotalt = lørdagshandel.reduce((akummulertTotalverdi, vare) => { 
        return akummulertTotalverdi + (vare.pris * vare.antall)
    }, 0);
console.log(sumTotalt);
`;

const explanation7 = (
    <div>
        <p>
            Initiell verdi er 0 og vi itererer igjennom ett og ett element. For hvert element
            multipliserer vi pris og antall - og summerer dette med akummulert totalverdi.
        </p>
        <ol>
            <li>akummulertTotalverdi = 0 og pris * antall = 50.</li>
            <li>akummulertTotalverdi = 50 og pris * antall = 30</li>
            <li>akummulertTotalverdi = 80 og pris * antall = 100</li>
            <li>akummulertTotalverdi = 180 og pris * antall = 120</li>
        </ol>
        <p>Til slutt blir totalverdien 300</p>
        <p>
            <code>reduce</code> er kraftig og kan f.eks. brukes til å bygge opp en gruppert
            objektstruktur av verdiene i listen. Gode eksempler kan du finne her:{' '}
            <a
                href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce"
                target="_blank"
                rel="noopener noreferrer"
            >
                https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
            </a>
        </p>
    </div>
);

const Assignment7 = ({ setStep, onCompleteAssignment }) => {
    return (
        <AssignmentTemplate
            validAnswers={['300']}
            intro={
                'Det er ofte nyttig å iterere igjennom en liste og returnere noe annet enn en ny tilsvarende liste. ' +
                'Da er reduce et godt alternativ.' +
                'Hva er summen å betale for lørdagshandelen nedenfor?'
            }
            code={code7}
            hint={
                <span>
                    <code>reduce</code>-funksjonen tar inn akkumulert verdi som første argument,
                    gjeldende verdi som andre argument, nåværende indeks som tredje argument og hele
                    listen som fjerde argument. I tillegg til selve <code>reduce</code>
                    -funksjonen skal det også sendes med en startverdi - i dette tilfellet 0.
                </span>
            }
            explaination={explanation7}
            title="Endelig lørdag!"
            goToNextAssignment={() => setStep(8)}
            onCompleteAssignment={onCompleteAssignment}
        />
    );
};

export default Steps;
