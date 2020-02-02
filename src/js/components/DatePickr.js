import { BaseWidget } from './BaseWidget.js';
import { utils } from '../utils.js';
import { select, settings } from '../settings.js';

export class DatePicker extends BaseWidget{
  constructor(wrapper){
    super(wrapper, utils.dateToStr(new Date()));
    const thisWidget = this;
    thisWidget.dom.input = thisWidget.dom.wrapper.querySelector(select.widgets.datePicker.input);
    thisWidget.initPlugin();
  }

  initPlugin(){
    const thisWidget = this;
    thisWidget.minDate = new Date(thisWidget.value);
    thisWidget.maxDate = utils.addDays(thisWidget.minDate, settings.datePicker.maxDaysInFuture);

    // eslint-disable-next-line no-undef
    flatpickr(thisWidget.dom.input, {
      defaultDate: thisWidget.minDate,
      minDate: thisWidget.minDate,
      maxDate: thisWidget.maxDate,
      altFormat: 'F j, Y',
      dateFormat: 'Y-m-d',
      disable: [
        function(date) {
          return (date.getDay() === 1);}
      ],
      locale: {
        firstDayOfWeek: 1
      },
      onChange: (dateStr)=> {
        thisWidget.value = dateStr;
        thisWidget.value = thisWidget.dom.input.value;
      }
    });

  }


  parseValue(newValue){
    return newValue;
  }
  isValid(){
    return true;
  }

  renderValue(){

  }
}
