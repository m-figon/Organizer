"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Home;

var _react = _interopRequireDefault(require("react"));

var _reactNative = require("react-native");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function Home() {
  return null;
}

var styles = _reactNative.StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  backgroundImg: {
    width: 300,
    height: 500
  },
  homeText: {
    position: 'relative',
    marginVertical: -250,
    flexDirection: 'column',
    width: 200,
    flex: 0,
    paddingVertical: 20,
    paddingHorizontal: 5,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    backgroundColor: "rgba(0, 0, 0,0.3)"
  },
  homeText1: {
    flexDirection: "row"
  },
  homeText2: {
    flexDirection: "row"
  },
  text1: {
    color: 'white',
    fontSize: 12
  },
  text2: {
    color: '#04d387',
    fontSize: 12,
    marginHorizontal: 5
  },
  text3: {
    color: 'white',
    fontSize: 12
  },
  text4: {
    color: '#04d387',
    fontSize: 12,
    marginHorizontal: 5
  }
});