import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import DayPicker from "react-day-picker";
import "./ReactDayPicker.css";
import {MONTHS, WEEKDAYS_LONG, WEEKDAYS_SHORT} from '../const';



class Calendar extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    cardId: PropTypes.string.isRequired,
    date: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
    toggleCalendar: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedDay: props.date ? new Date(props.date) : undefined
    };
  }

  handleDayClick = (selectedDay, { selected, disabled }) => {
    if (disabled) {
      return;
    }
    if (selected) {
      this.setState({ selectedDay: undefined });
      return;
    }
    this.setState({ selectedDay });
  };

  handleSave = () => {
    const { selectedDay } = this.state;
    const { dispatch, cardId, toggleCalendar } = this.props;
    dispatch({
      type: "CHANGE_CARD_DATE",
      payload: { date: selectedDay, cardId }
    });
    toggleCalendar();
  };


  render() {
    const { selectedDay } = this.state;
    const { toggleCalendar } = this.props;
    return (
      <div className="calendar">
        <DayPicker
          locale="ua"
          months={MONTHS}
          weekdaysLong={WEEKDAYS_LONG}
          weekdaysShort={WEEKDAYS_SHORT}
          firstDayOfWeek={1}
          onDayClick={this.handleDayClick}
          selectedDays={selectedDay}
          disabledDays={{ before: new Date() }}
        />
        <div className="calendar-buttons">
          <button onClick={this.handleSave} className="calendar-save-button">
            Зберегти
          </button>
          <button onClick={toggleCalendar}>Відмінити</button>
        </div>
      </div>
    );
  }
}

export default connect()(Calendar);
