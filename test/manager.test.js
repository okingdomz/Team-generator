const manager = require('../team/manager');
const employee = require('../team/employee');

test('can set office number via constructor argument', () => {
    const testValue = 100;
    const e = new manager('leslie', 2, "leslie@yahoo.com", testValue);
    expect(e.officeNumber).toBe(testValue);
});

test('getRole() should return \"manager"', () => {
    const testValue = 'manager';
    const e = new manager('rob', 4, "rob@gmail.com", 100);
    expect(e.getRole()).toBe(testValue);
});
test('gets office number by getOffice()', ()=> {
    const testValue = 100;
    const e = new manager("john", 1, "john@test.com", testValue);
    expect(e.getOfficeNumber()).toBe(testValue);
});
