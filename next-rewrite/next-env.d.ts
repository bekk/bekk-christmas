/// <reference types="next" />
/// <reference types="next/types/global" />

/** TypeScript doesn't ship with ListFormat types yet */
type ListFormatOptions = {
    type?: 'conjunction' | 'disjunction' | 'unit';
    style?: 'long' | 'short' | 'narrow';
    localeMatcher?: 'lookup' | 'best fit';
};
declare namespace Intl {
    class ListFormat {
        constructor(locale: string, options?: ListFormatOptions);
        public format: (items: Array<string>) => string;
    }
}
