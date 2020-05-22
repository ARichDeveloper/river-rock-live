const isString = val => typeof val === 'string' || val instanceof String;

const cssClasses = (...classes) =>
    classes
        .filter(c => c) // allows people to say condition && 'class'
        .filter(isString) // keeps people from doing dumb stuff...
        .map(c => c.trim()) // ...and keeps this from blowing up
        .join(' ')
        .trim();

export {
    cssClasses,
    isString
}
