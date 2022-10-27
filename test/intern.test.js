const intern = require('../team/intern');

test('can set school by constructor', () => {
    const testValue = "Texas";
    const e = new intern("lion", 6, "lion@lion.com", testValue);
    expect(e.school).toBe(testValue);
});

test('getRole() should return \"intern\"', () => {
    const testValue = 'intern';
    const e = new intern('lion', 6, "lion@lion.com", "Texas");
    expect(e.getRole()).toBe(testValue);
});

test('Can get school via getSchool command()', () => {
    const testValue = "Texas";
    const e = new intern('lion', 6, "lion@lion.com", testValue);
    expect(e.getSchool()).toBe(testValue);
});
