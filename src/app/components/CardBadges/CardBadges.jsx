import React, { Component } from "react";
import PropTypes from "prop-types";
import format from "date-fns/format";
import differenceInCalendarDays from "date-fns/difference_in_calendar_days";
import MdAlarm from "react-icons/lib/md/access-alarm";
import MdDoneAll from "react-icons/lib/fa/check-square-o";
import MdDone from "react-icons/lib/fa/check"; //check-circle -o
import {MONTHS} from '../const';
import "./CardBadges.scss";

class CardBadges extends Component {
  static propTypes = {
    date: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),    
    checkboxes: PropTypes.shape({
      total: PropTypes.number.isRequired,
      checked: PropTypes.number.isRequired
    }).isRequired,
    rate: PropTypes.number
  };

  formatDay(day,month) {
    return `${day} ${MONTHS[month].substr(0,3)}` ;
  }

  renderDueDate = () => {
    const { date } = this.props;
    if (!date) {
      return null;
    }
    const CalendarDate = new Date(date);
    const dueDateFromToday = differenceInCalendarDays(CalendarDate, new Date());

    let dueDateString;
    if (dueDateFromToday < -1) {
      dueDateString = `${Math.abs(dueDateFromToday)} дні тому`;
    } else if (dueDateFromToday === -1) {
      dueDateString = "Вчора";
    } else if (dueDateFromToday === 0) {
      dueDateString = "Сьогодні";
    } else if (dueDateFromToday === 1) {
      dueDateString = "Завтра";
    } else {
      dueDateString = this.formatDay(CalendarDate.getDate(), CalendarDate.getMonth());
    }

    let dueDateColor;
    if (dueDateFromToday < 0) {
      dueDateColor = "red";
    } else if (dueDateFromToday === 0) {
      dueDateColor = "#d60";
    } else {
      dueDateColor = "green";
    }

    return (
      <div className="badge" style={{ background: dueDateColor }}>
        <MdAlarm className="badge-icon" />&nbsp;
        {dueDateString}
      </div>
    );
  };

  
  renderTaskProgress = () => {
    const { total, checked } = this.props.checkboxes;
    if (total === 0) {
      return null;
    }
    return (
      <div
        className="badge"
        style={{ background: checked === total ? "green" : "#444" }}
      >
        <MdDoneAll className="badge-icon" />&nbsp;
        {checked}/{total}
      </div>
    );
  };


  renderRate = () => {
    const { rate } = this.props;
    if (!rate) {
      return null;
    }
    return (
      <div
        className="badge"
        style={{ background: rate<0? 'red' : 'green' }}
      >
      <MdDone className="badge-icon" />&nbsp;
        Оцінка {rate}
      </div>
    );
  };

  render() {
    return (
      <div className="card-badges">
        {this.renderDueDate()}
        {this.renderRate()}
        {this.renderTaskProgress()}
      </div>
    );
  }
}

export default CardBadges;
