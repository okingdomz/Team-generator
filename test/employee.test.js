const employee = require("../team/employee");

test("can create employee instance", () => {
    const e = new employee();
    expect(typeof(e)).toBe("object");
});



