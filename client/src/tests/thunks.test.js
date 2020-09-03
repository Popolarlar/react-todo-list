import { expect } from "chai";
import sinon from "sinon";
import "node-fetch";
import fetchMock from "fetch-mock";
import { loadTodos } from "./../actions/todoThunk";

describe("The loadTodos thunk", () => {
  it("Dispatch correct actions in the success scenario", async () => {
    const fakeDispatch = sinon.spy();

    const fakeTodos = [
      {
        text: "1",
      },
      {
        text: "2",
      },
    ];
    fetchMock.get("/api/todos", fakeTodos);

    const expectedFirstAction = { type: "LOAD_TODOS_IN_PROGRESS" };
    const expectedSecondtAction = {
      type: "LOAD_TODOS_SUCCESS",
      payload: { todos: fakeTodos },
    };

    await loadTodos()(fakeDispatch);

    expect(fakeDispatch.getCall(0).args[0]).to.deep.equal(expectedFirstAction);

    expect(fakeDispatch.getCall(1).args[0]).to.deep.equal(
      expectedSecondtAction
    );

    fetchMock.reset();
  });
});
