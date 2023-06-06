const randomNames = [
    "John", "Jane", "Jack", "Jill", "Joe", "Jenny", "Jesse", "Jasmine", "Jared", "Jocelyn", "Javier", "Jade",
];

const getRandomName = () => randomNames[Math.floor(Math.random() * randomNames.length)];

const useNumberAndObject = () => {
    return [1, { object: true }];
};

export {
    getRandomName,
    useNumberAndObject,
};
