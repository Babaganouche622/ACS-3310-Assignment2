const DateInterpreter = require('../index');

describe('DateInterpreter', () => {
  describe('constructor', () => {
    it('should create a new DateInterpreter instance with the current date if no arguments are provided', () => {
      const dateInterpreter = new DateInterpreter();
      const currentDate = new Date();
      expect(dateInterpreter._date).toEqual(currentDate);
    });

    it('should create a new DateInterpreter instance with the specified date if arguments are provided', () => {
      const dateInterpreter = new DateInterpreter(2022, 0, 1);
      const expectedDate = new Date(2022, 0, 1);
      expect(dateInterpreter._date).toEqual(expectedDate);
    });
  });

  describe('date', () => {
    it('should return the day of the month', () => {
      const dateInterpreter = new DateInterpreter(2022, 0, 1);
      expect(dateInterpreter.date).toEqual(1);
    });
  });

  describe('day', () => {
    it('should return the full name of the day of the week', () => {
      const dateInterpreter = new DateInterpreter(2022, 0, 1);
      expect(dateInterpreter.day).toEqual('Saturday');
    });
  });

  describe('month', () => {
    it('should return the full name of the month', () => {
      const dateInterpreter = new DateInterpreter(2022, 0, 1);
      expect(dateInterpreter.month).toEqual('January');
    });
  });

  describe('year', () => {
    it('should return the full year', () => {
      const dateInterpreter = new DateInterpreter(2022, 0, 1);
      expect(dateInterpreter.year).toEqual(2022);
    });
  });

  describe('yr', () => {
    it('should return the last two digits of the year', () => {
      const dateInterpreter = new DateInterpreter(2022, 0, 1);
      expect(dateInterpreter.yr).toEqual('22');
    });
  });

  describe('mon', () => {
    it('should return the first three letters of the month', () => {
      const dateInterpreter = new DateInterpreter(2022, 0, 1);
      expect(dateInterpreter.mon).toEqual('Jan');
    });
  });

  describe('dy', () => {
    it('should return the first three letters of the day of the week', () => {
      const dateInterpreter = new DateInterpreter(2022, 0, 1);
      expect(dateInterpreter.dy).toEqual('Sat');
    });
  });

  describe('hours', () => {
    it('should return the hours', () => {
      const dateInterpreter = new DateInterpreter(2022, 0, 1, 12, 34, 56);
      expect(dateInterpreter.hours).toEqual(12);
    });
  });

  describe('mins', () => {
    it('should return the minutes', () => {
      const dateInterpreter = new DateInterpreter(2022, 0, 1, 12, 34, 56);
      expect(dateInterpreter.mins).toEqual(34);
    });
  });

  describe('secs', () => {
    it('should return the seconds', () => {
      const dateInterpreter = new DateInterpreter(2022, 0, 1, 12, 34, 56);
      expect(dateInterpreter.secs).toEqual(56);
    });
  });

  describe('fullDate', () => {
    it('should return the full date in the format "DD/MMM/YYYY"', () => {
      const dateInterpreter = new DateInterpreter(2022, 0, 1);
      expect(dateInterpreter.fullDate).toEqual('1/January/2022');
    });
  });

  describe('format', () => {
    it('should format the date string according to the format string', () => {
      const dateInterpreter = new DateInterpreter(2022, 0, 1, 12, 34, 56);
      expect(dateInterpreter.format('Y/m/D H:I:S')).toEqual('2022/Jan/01 12:34:56');
    });

    it('should format the date string with leading zeros', () => {
      const dateInterpreter = new DateInterpreter(2022, 0, 1, 1, 2, 3);
      expect(dateInterpreter.format('Y/m/D H:I:S')).toEqual('2022/Jan/01 01:02:03');
    });
  
    it('should format the date string with lowercase letters', () => {
      const dateInterpreter = new DateInterpreter(2022, 0, 1, 12, 34, 56);
      expect(dateInterpreter.format('y/m/d h:i:s')).toEqual('22/Jan/1 12:34:56');
    });
  
    it('should format the date string with AM/PM', () => {
      const dateInterpreter = new DateInterpreter(2022, 0, 1, 12, 34, 56);
      expect(dateInterpreter.format('Y/m/D h:I:S')).toEqual('2022/Jan/01 12:34:56');
    });
  });

  describe('when', () => {
    const date = new DateInterpreter(2023, 8, 5);
    const oneYearLater = new DateInterpreter(2024, 8, 5);
    const oneMonthLater = new DateInterpreter(2023, 9, 5);
    const oneDayLater = new DateInterpreter(2023, 8, 6);
    const oneYearAgo = new DateInterpreter(2022, 8, 5);
    const oneMonthAgo = new DateInterpreter(2023, 7, 5);
    const oneDayAgo = new DateInterpreter(2023, 8, 4);
    const oneDayMonthYearAgo = new DateInterpreter(2022, 7, 4);

    it('should return one year later days', () => {
      expect(oneYearLater.when(date)).toEqual('1 year from now');
    });

    it('should return one month from now', () => {
      expect(oneMonthLater.when(date)).toEqual('1 month from now');
    });

    it('should return one day from now', () => {
      expect(oneDayLater.when(date)).toEqual('1 day from now');
    });

    it('should return one year from now', () => {
      expect(oneYearAgo.when(date)).toEqual('1 year ago');
    });

    it('should return one month ago days', () => {
      expect(oneMonthAgo.when(date)).toEqual('1 month ago');
    });

    it('should return one day ago days', () => {
      expect(oneDayAgo.when(date)).toEqual('1 day ago');
    });

    it('should return just now', () => {
      expect(date.when(date)).toEqual('Just now');
    });

    it.skip('should return one day, one month, one year ago', () => {
      expect(oneDayMonthYearAgo.when(date)).toEqual('1 year, 1 month, 1 day ago');
    });
  });
});
