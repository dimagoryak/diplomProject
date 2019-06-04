import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Modal from "react-modal";
import FaTrash from "react-icons/lib/fa/trash";
import MdDone from "react-icons/lib/fa/check";
import MdAlarm from "react-icons/lib/md/access-alarm";
import Calendar from "./Calendar";
import ClickOutside from "../ClickOutside/ClickOutside";
import colorIcon from "../../../assets/images/color-icon.png";
import "./CardOptions.scss";

class CardOptions extends Component {
  static propTypes = {
    isColorPickerOpen: PropTypes.bool.isRequired,
    isRatePickerOpen: PropTypes.bool.isRequired,
    card: PropTypes.shape({ _id: PropTypes.string.isRequired }).isRequired,
    listId: PropTypes.string.isRequired,
    isCardNearRightBorder: PropTypes.bool.isRequired,
    isThinDisplay: PropTypes.bool.isRequired,
    boundingRect: PropTypes.object.isRequired,
    toggleColorPicker: PropTypes.func.isRequired,
    toggleRatePicker: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired
  };

  constructor() {
    super();
    this.state = { isCalendarOpen: false };
  }

  deleteCard = () => {
    const { dispatch, listId, card } = this.props;
    dispatch({
      type: "DELETE_CARD",
      payload: { cardId: card._id, listId }
    });
  };

  changeColor = color => {
    const { dispatch, card, toggleColorPicker } = this.props;
    if (card.color !== color) {
      dispatch({
        type: "CHANGE_CARD_COLOR",
        payload: { color, cardId: card._id }
      });
    }
    toggleColorPicker();
    this.colorPickerButton.focus();
  };

  changeRate = num => {
    const { dispatch, card, toggleRatePicker } = this.props;
    
      dispatch({
        type: "CHANGE_CARD_RATE",
        payload: {
          rate: num,
          cardId: card._id
        }
      });
    
    toggleRatePicker();
    this.ratePickerButton.focus();
  };

  handleColorKeyDown = event => {
    if (event.keyCode === 27) {
      this.props.toggleColorPicker();
      this.colorPickerButton.focus();
    }
  };
  handleRateKeyDown = event => {
    if (event.keyCode === 27) {
      this.props.toggleRatePicker();
      this.ratePickerButton.focus();
    }
  };

  handleColorClickOutside = () => {
    const { toggleColorPicker } = this.props;
    toggleColorPicker();
    this.colorPickerButton.focus();
  };
  handleRateClickOutside = () => {
    const { toggleRatePicker } = this.props;
    toggleRatePicker();
    this.ratePickerButton.focus();
  };

  toggleCalendar = () => {
    this.setState({ isCalendarOpen: !this.state.isCalendarOpen });
  };


  render() {
    const {
      isCardNearRightBorder,
      isColorPickerOpen,
      isRatePickerOpen,
      toggleColorPicker,
      toggleRatePicker,
      card,
      isThinDisplay,
      boundingRect
    } = this.props;
    const { isCalendarOpen } = this.state;

    const calendarStyle = {
      content: {
        top: Math.min(boundingRect.bottom + 10, window.innerHeight - 300),
        left: boundingRect.left
      }
    };

    const calendarMobileStyle = {
      content: {
        top: 110,
        left: "50%",
        transform: "translateX(-50%)"
      }
    };
    return (
      <div
        className="options-list"
        style={{
          alignItems: isCardNearRightBorder ? "flex-end" : "flex-start"
        }}
      >
        <div>
          <button onClick={this.deleteCard} className="options-list-button">
            <div className="modal-icon">
              <FaTrash />
            </div>&nbsp;Видалити
          </button>
        </div>
        <div className="modal-color-picker-wrapper">
          <button
            className="options-list-button"
            onClick={toggleColorPicker}
            onKeyDown={this.handleColorKeyDown}
            ref={ref => {
              this.colorPickerButton = ref;
            }}
            aria-haspopup
            aria-expanded={isColorPickerOpen}
          >
            <img src={colorIcon} alt="colorwheel" className="modal-icon" />
            &nbsp;Колір
          </button>
          {isColorPickerOpen && (
            <ClickOutside
              eventTypes="click"
              handleClickOutside={this.handleColorClickOutside}
            >
              {/* eslint-disable */}
              <div
                style={{ zIndex: 1 }}
                className="modal-color-picker"
                onKeyDown={this.handleColorKeyDown}
              >
                {/* eslint-enable */}
                {["white", "#6df", "#6f6", "#ff6", "#fa4", "#f66"].map(
                  color => (
                    <button
                      key={color}
                      style={{ background: color }}
                      className="color-picker-color"
                      onClick={() => this.changeColor(color)}
                    />
                  )
                )}
              </div>
            </ClickOutside>
          )}
        </div>
        <div>
          <button onClick={this.toggleCalendar} className="options-list-button">
            <div className="modal-icon">
              <MdAlarm />
            </div>&nbsp;Задати дату
          </button>
        </div>
        <Modal
          isOpen={isCalendarOpen}
          onRequestClose={this.toggleCalendar}
          overlayClassName="calendar-underlay"
          className="calendar-modal"
          style={isThinDisplay ? calendarMobileStyle : calendarStyle}
        >
          <Calendar
            cardId={card._id}
            date={card.date}
            toggleCalendar={this.toggleCalendar}
          />
        </Modal>
        <div className="modal-color-picker-wrapper">
          <button
            className="options-list-button"
            onClick={toggleRatePicker}
            onKeyDown={this.handleRateKeyDown}
            ref={ref => {
              this.ratePickerButton = ref;
            }}
            aria-haspopup
            aria-expanded={isRatePickerOpen}
          >
            <div className="modal-icon">
              <MdDone />
            </div>&nbsp;Оцінити
          </button>
          {isRatePickerOpen && (
            <ClickOutside
              eventTypes="click"
              handleClickOutside={this.handleRateClickOutside}
            >
              {/* eslint-disable */}
              <div
                className="modal-color-picker"
                onKeyDown={this.handleRateKeyDown}
              >
                {/* eslint-enable */}
                {[-4, -3, -2, -1, 0, 1, 2, 3, 4].map(
                  number => (
                    <button
                      key={number}
                      style={{ background: number < 0 ? 'red' : 'green' }}
                      className="color-picker-color"
                      onClick={() => this.changeRate(number)}
                    >{number}</button>
                  )
                )}
              </div>
            </ClickOutside>
          )}
        </div>
      </div>
    );
  }
}

export default connect()(CardOptions);
