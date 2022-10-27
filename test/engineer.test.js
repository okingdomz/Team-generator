const engineer = require("../team/engineer");

test("Can set github account via constructor", () => {
    const testValue = "GitHubUser";
    const e = new engineer("Lion", 10, "test@test.com", testValue);
    expect(e.github).toBe(testValue);
});

test('getRole() should return \"engineer\"', () => {
    const testValue = 'engineer';
    const e = new engineer("lion", 10, "test@test.com", "GithubUser");
    expect(e.getRole()).toBe(testValue);

});

test('getting github username via github()', () => {
    const testValue = "GitHubUser";
    const e = new engineer("lion", 10, "test@test.com", testValue);
    expect(e.getGithub()).toBe(testValue);
});

