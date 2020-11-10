import moment from 'moment';
import React, { useMemo } from 'react';
import { AvailabilityCalendar, AvailabilityEvent, defaultComponents, Overrides } from 'react-availability-calendar';

const CaretakerCalendar = (props) => {
    const leave_or_availability = props.leave_or_avail;
    const set = new Set();
    
	for (let i = 0; i < leave_or_availability.length; i++) {
		let start_date = (new Date(leave_or_availability[i].start_date)).getTime();
        const end_date = (new Date(leave_or_availability[i].end_date)).getTime();
		while (start_date <= end_date) {
			set.add(start_date);
			start_date += 86400000 // equivalent of 1 day(in ms)
		}
    }

	const overrides = useMemo<Overrides>(
		() => ({
		  ...defaultComponents,
		  DayCell: {
			className: (p) => {
              console.log(p.date.getTime())
			  const wasSelected = set.has(p.date.getTime());
			  return (
				(props.is_part_time 
				  ? wasSelected
					  ? 'rounded-circle border-success'
					  : 'rounded-circle not-available'
				  : wasSelected
					  ? 'rounded-circle not-available'
					  : 'rounded-circle border-success'
				)
			  );
			},
		  },
		}),
		[[], new Date(Date.now())]
      );
      
    return (
        <AvailabilityCalendar
            moment={ moment }
            bookings={ [] }
            providerTimeZone="America/New_York"
            initialDate={ new Date(Date.now()) }
            onAvailabilitySelected={ (a: AvailabilityEvent) => console.log(a) }
            overrides={ overrides }
        />
    );
}

export default CaretakerCalendar;