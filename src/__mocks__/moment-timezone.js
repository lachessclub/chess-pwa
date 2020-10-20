import moment from "moment-timezone";

// @see https://stackoverflow.com/questions/56261381/how-do-i-set-a-timezone-in-my-jest-config
// @see https://github.com/jest-community/vscode-jest/issues/153#issuecomment-502433850

moment.tz.setDefault("UTC");

module.exports = moment;
