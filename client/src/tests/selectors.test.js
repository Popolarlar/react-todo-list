import { expect } from "chai";
import { getCompletedTodos } from "./../selectors/selectors";

describe("The getCompletedTodos seletor", () => {
  it("Return only completed todos", () => {
    const fakeTodos = [
      {
        text: "completed todo",
        isCompleted: true,
      },
      {
        text: "imcompelted todo",
        isCompleted: false,
      },
    ];

    const expected = [
      {
        text: "completed todo",
        isCompleted: true,
      },
    ];

    const actual = getCompletedTodos.resultFunc(fakeTodos);

    expect(actual).to.deep.equal(expected);
  });
});
