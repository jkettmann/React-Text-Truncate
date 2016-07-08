(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['module', 'exports', 'react'], factory);
    } else if (typeof exports !== "undefined") {
        factory(module, exports, require('react'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod, mod.exports, global.React);
        global.TextTruncate = mod.exports;
    }
})(this, function (module, exports, _react) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react2 = _interopRequireDefault(_react);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    var _extends = Object.assign || function (target) {
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key];
                }
            }
        }

        return target;
    };

    function _objectWithoutProperties(obj, keys) {
        var target = {};

        for (var i in obj) {
            if (keys.indexOf(i) >= 0) continue;
            if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
            target[i] = obj[i];
        }

        return target;
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    var TextTruncate = function (_Component) {
        _inherits(TextTruncate, _Component);

        function TextTruncate() {
            var _Object$getPrototypeO;

            var _temp, _this, _ret;

            _classCallCheck(this, TextTruncate);

            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(TextTruncate)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.onResize = function () {
                window.requestAnimationFrame(_this.update.bind(_this));
            }, _this.update = function () {
                _this.forceUpdate();
            }, _temp), _possibleConstructorReturn(_this, _ret);
        }

        _createClass(TextTruncate, [{
            key: 'componentDidMount',
            value: function componentDidMount() {
                if (this.props.onActualHeight) {
                    var rect = this.refs.content.getBoundingClientRect();
                    var actualHeight = rect.bottom - rect.top;
                    this.props.onActualHeight(actualHeight);
                }

                var canvas = document.createElement('canvas');
                var docFragment = document.createDocumentFragment();
                var style = window.getComputedStyle(this.refs.scope);
                var font = [style['font-weight'], style['font-style'], style['font-size'], style['font-family']].join(' ');
                docFragment.appendChild(canvas);
                this.canvas = canvas.getContext('2d');
                this.canvas.font = font;
                this.forceUpdate();

                window.addEventListener('resize', this.onResize);
            }
        }, {
            key: 'componentWillUnmount',
            value: function componentWillUnmount() {
                window.removeEventListener('resize', this.onResize);
            }
        }, {
            key: 'measureWidth',
            value: function measureWidth(text) {
                return this.canvas.measureText(text).width;
            }
        }, {
            key: 'getRenderText',
            value: function getRenderText() {
                var textWidth = this.measureWidth(this.props.text);
                var scopeWidth = this.refs.scope.getBoundingClientRect().width;
                if (scopeWidth === 0) {
                    return '';
                } else if (scopeWidth >= textWidth) {
                    return this.props.text;
                } else {
                    var currentPos = 1;
                    var maxTextLength = this.props.text.length;
                    var text = '';
                    var splitPos = 0;
                    var startPos = 0;
                    var line = this.props.line;
                    var width = 0;
                    var lastIsEng = false;
                    while (line--) {
                        var ext = line ? '' : this.props.truncateText + '   ' + this.props.showLessText;
                        while (currentPos <= maxTextLength) {
                            text = this.props.text.substr(startPos, currentPos);
                            width = this.measureWidth(text + ext);
                            if (width < scopeWidth) {
                                splitPos = this.props.text.indexOf(' ', currentPos + 1);
                                if (splitPos === -1) {
                                    currentPos += 1;
                                    lastIsEng = false;
                                } else {
                                    lastIsEng = true;
                                    currentPos = splitPos;
                                }
                            } else {
                                do {
                                    currentPos--;
                                    text = this.props.text.substr(startPos, currentPos);
                                    if (text[text.length - 1] === ' ') {
                                        text = this.props.text.substr(startPos, currentPos - 1);
                                    }
                                    if (lastIsEng) {
                                        currentPos = text.lastIndexOf(' ');
                                        text = this.props.text.substr(startPos, currentPos);
                                    }
                                    width = this.measureWidth(text + ext);
                                } while (width >= scopeWidth);
                                startPos += currentPos;
                                break;
                            }
                        }

                        if (currentPos >= maxTextLength) {
                            startPos = maxTextLength;
                            break;
                        }
                    }

                    return startPos === maxTextLength ? this.props.text : this.props.text.substr(0, startPos) + this.props.truncateText;
                }
            }
        }, {
            key: 'render',
            value: function render() {
                var _props = this.props;
                var text = _props.text;
                var truncateText = _props.truncateText;
                var line = _props.line;
                var containerClassName = _props.containerClassName;
                var showMoreText = _props.showMoreText;
                var showLessText = _props.showLessText;
                var showMoreLessClassName = _props.showMoreLessClassName;
                var showAllText = _props.showAllText;
                var onActualHeight = _props.onActualHeight;
                var onShowMoreClick = _props.onShowMoreClick;
                var onShowLessClick = _props.onShowLessClick;

                var props = _objectWithoutProperties(_props, ['text', 'truncateText', 'line', 'containerClassName', 'showMoreText', 'showLessText', 'showMoreLessClassName', 'showAllText', 'onActualHeight', 'onShowMoreClick', 'onShowLessClick']);

                var renderText = text;
                if (!showAllText && this.refs.scope) {
                    renderText = this.getRenderText();
                }

                var showMoreLess = text === renderText && !showAllText ? null : _react2.default.createElement(
                    'span',
                    {
                        className: showMoreLessClassName,
                        onClick: showAllText ? onShowLessClick : onShowMoreClick,
                        style: { textDecoration: 'underline', cursor: 'pointer' }
                    },
                    showAllText ? showLessText : showMoreText
                );

                return _react2.default.createElement(
                    'div',
                    { ref: 'scope', className: containerClassName, style: { overflow: 'hidden' } },
                    _react2.default.createElement(
                        'div',
                        _extends({ ref: 'content' }, props),
                        renderText,
                        '   ',
                        showMoreLess
                    )
                );
            }
        }]);

        return TextTruncate;
    }(_react.Component);

    TextTruncate.propTypes = {
        text: _react2.default.PropTypes.string,
        truncateText: _react2.default.PropTypes.string,
        line: _react2.default.PropTypes.number,
        containerClassName: _react2.default.PropTypes.string,
        showMoreText: _react2.default.PropTypes.string,
        showLessText: _react2.default.PropTypes.string,
        showMoreLessClassName: _react2.default.PropTypes.string,
        showAllText: _react2.default.PropTypes.bool,
        onActualHeight: _react2.default.PropTypes.func,
        onShowMoreClick: _react2.default.PropTypes.func,
        onShowLessClick: _react2.default.PropTypes.func
    };
    TextTruncate.defaultProps = {
        text: '',
        truncateText: '…',
        line: 1,
        showTitle: true,
        showAllText: false
    };
    exports.default = TextTruncate;
    ;
    module.exports = exports['default'];
});
