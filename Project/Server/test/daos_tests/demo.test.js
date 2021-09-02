describe("Testing đây", () => {
  test("Một cộng một", () => {
    expect(1 + 1).toEqual(2);
    expect(1 == "01").toBeTruthy();
    expect(undefined).toBe(undefined);
  });

  test("Nhân 2 số", () => {
    expect(2 * 3).toEqual(6);
  });
});
