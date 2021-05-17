describe('Соответствие значений', function () {
    it('Проверка значения переменной a на равенство 10', function () {
        let a = 10;
        expect(a).toBe(10);
        // expect(a).not.toBe(10);
    });
});

describe('Дополнительные функции', function () {
    it('"Сравнение" объектов', function () {
        const myGo = () => {};

        const user1 = {
            name: 'Ann',
            age: 20,
            go: myGo,
        };
        const user2 = {
            name: 'Ann',
            age: 20,
            go: myGo,
        };

        expect(user1).toEqual(user2);
    });

    it('regexp', function () {
        let str = 'Test AbcD Jasmine';
        expect(str).toMatch(/abcd/i);
    });

    it('Arrays', function () {
        const arr = ['black', 'white'];
        const arr2 = ['white', 'black'];

        // expect(arr).toEqual(arr2);
        // expect(arr).not.toEqual(arr2);
        expect(arr).toContain('black');
    });
});

// expect().toBeNull();
// expect().toBeUndefined();
// expect().toBeTrusty();
// expect().toBeFalsy();
// expect().toBeNaN();
// expect().toBeGreaterThan();
// expect().toBeGreaterThanOrEqual();
// expect().toBeLessThan();
// expect().toBeLessThanOrEqual();
// expect().toBeCloseTo();
