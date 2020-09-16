const reactRedux = jest.genMockFromModule("react-redux");

reactRedux.useDispatch.mockReturnValue(jest.fn());

module.exports = reactRedux;
