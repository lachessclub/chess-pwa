const reactRedux = jest.genMockFromModule("react-redux");

reactRedux.useDispatch.mockReturnValue(() => {});

module.exports = reactRedux;
