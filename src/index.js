/**
 * A class that interprets a given date and provides various date formats.
 * @class
 */
class DateInterpreter {
  /**
   * Creates an instance of DateInterpreter.
   * @constructor
   * @param {...(number|string)} args - The arguments to create a new Date object.
   */
  constructor(...args) {
    /**
     * The date object.
     * @type {Date}
     * @private
     */
    this._date = new Date(...args)
    /**
     * The list of diffMonths.
     * @type {Object.<string>}
     */
    this.lsitOfMonths = {
      0: "January",
      1: "February",
      2: "March",
      3: "April",
      4: "May",
      5: "June",
      6: "July",
      7: "August",
      8: "September",
      9: "October",
      10: "November",
      11: "December"
    }
    /**
     * The list of diffDays.
     * @type {Object.<string>}
     */
    this.listOfDays = {
      1: 'Monday',
      2: 'Tuesday',
      3: 'Wednesday',
      4: 'Thursday',
      5: 'Friday',
      6: 'Saturday',
      7: 'Sunday'
    }
  }
  
  /**
   * The date of the date object.
   * @type {number}
   * @readonly
   */
  get date() {
    return this._date.getDate();
  }

  /**
   * The day of the date object.
   * @type {string}
   * @readonly
   */
  get day() {
    return this.listOfDays[this._date.getDay()];
  }

  /**
   * The month of the date object.
   * @type {string}
   * @readonly
   */
  get month() {
    return this.lsitOfMonths[this._date.getMonth()];
  }

  /**
   * The year of the date object.
   * @type {number}
   * @readonly
   */
  get year() {
    return this._date.getFullYear();
  }

  /**
   * The short year of the date object.
   * @type {string}
   * @readonly
   */
  get yr() {
    // return just the first 2 digits of the year
    return this._date.getFullYear().toString().slice(2);
  }

  /**
   * The short month of the date object.
   * @type {string}
   * @readonly
   */
  get mon() {
    return this.lsitOfMonths[this._date.getMonth()].slice(0,3);
  }

  /**
   * The short day of the date object.
   * @type {string}
   * @readonly
   */
  get dy() {
    return this.listOfDays[this._date.getDay()].slice(0,3);
  }

  /**
   * The diffHours of the date object.
   * @type {number}
   * @readonly
   */
  get hours() {
    return this._date.getHours();
  }

  /**
   * The diffMinutes of the date object.
   * @type {number}
   * @readonly
   */
  get mins() {
    return this._date.getMinutes();
  }

  /**
   * The seconds of the date object.
   * @type {number}
   * @readonly
   */
  get secs() {
    return this._date.getSeconds();
  }

  /**
   * The full date of the date object.
   * @type {string}
   * @readonly
   */
  get fullDate() {
    return `${this._date.getDate()}/${this.month}/${this.year}`;
  }

  /**
   * Formats the date object according to the given format string.
   * @param {string} formatString - The format string to format the date object.
   * @returns {string} The formatted date string.
   */
  format(formatString) {
    const padZero = (value) => (value < 10 ? `0${value}` : `${value}`);
  
    const replacements = {
      'Y': this.year,
      'y': this.yr,
      'M': this.month,
      'm': this.mon,
      'D': padZero(this.date),
      'd': this.date,
      'L': this.day,
      'l': this.dy,
      '#': this.date,
      'H': padZero(this.hours),
      'h': this.hours,
      'I': padZero(this.mins),
      'i': this.mins,
      'S': padZero(this.secs),
      's': this.secs
    };
  
    let formattedString = formatString.replace(/(Y|y|M|m|D|d|L|l|#|H|h|I|i|S|s)/g, (match) => {
      return `%${match}`;
    });

    for (const [key, value] of Object.entries(replacements)) {
      formattedString = formattedString.replace(`%${key}`, value);
    }  
  
    return formattedString;
  }

  when(now = new DateInterpreter()) {
    const timeUnits = [
      { unit: 'year', ms: 31536000000 },
      { unit: 'month', ms: 2592000000 },
      { unit: 'day', ms: 86400000 },
      { unit: 'hour', ms: 3600000 },
      { unit: 'minute', ms: 60000 },
      { unit: 'second', ms: 1000 },
    ];
    let diff = Math.round(this._date) - Math.round(now._date);
    const timeDirection = diff > 0 ? 'from now' : 'ago';
    let absoluteDiff = Math.abs(diff);
    let result = [];
    
    for (const { unit, ms } of timeUnits) {
      if (absoluteDiff >= ms) {
        const val = absoluteDiff / ms;
        result.push(`${Math.round(val)} ${unit}${Math.round(val) !== 1 ? 's' : ''}`);
        absoluteDiff -= val * ms;
      }
    }
    if (result.length > 0) {
      return result.join(', ') + ' ' + timeDirection
    } else {
      return 'Just now'
    };
  }  
}

module.exports = DateInterpreter;

const date = new DateInterpreter(2022, 7, 4)

console.log(date.when(new DateInterpreter(2022, 8, 5)));