import React, { useReducer, useContext } from 'react'
import { DateRangeInput } from '@datepicker-react/styled';
// import DateBooking from 'react-booking-calendar';

import { UserContext } from '../../contexts/UserContext';
import '../../styles/Calendar.scss';
import { Button } from 'react-bootstrap';

const initialState = {
  startDate: null,
  endDate: null,
  focusedInput: null,
}

function reducer(state, action) {
	console.log(action)
  switch (action.type) {
    case 'focusChange':
      return {...state, focusedInput: action.payload}
    case 'dateChange':
      return action.payload
    default:
      throw new Error()
  }
}

const MyAvailabilitySection = () => {
	const [state, dispatch] = useReducer(reducer, initialState)
	const user = useContext(UserContext);

  return (
		<div style={{ 'padding': '15px' }}>
			{/* <h4 style={{ 'marginBottom': '15px' }}>My Current Availability</h4>
			<DateBooking style={{ 'height': '200px' }} bookings={[]} /> */}
			<h5 style={{ 'margin': '15px 0' }}>Set { user.currentUser?.is_part_time ? 'Availability' : 'Leave'}</h5>
			<DateRangeInput
				onDatesChange={ data => dispatch({type: 'dateChange', payload: data })}
				onFocusChange={ focusedInput => dispatch({type: 'focusChange', payload: focusedInput})}
				startDate={ state.startDate } // Date or null
				endDate={ state.endDate } // Date or null
				displayFormat="yyyy-MM-dd"
				focusedInput={ state.focusedInput } // START_DATE, END_DATE or null
			/>
			<Button
				style={{ 'marginTop': '15px' }}
				disabled={ state.startDate === null || state.endDate === null }
				onClick={ () => user.applyLeave(state.startDate, state.endDate) }>
					Apply!
			</Button>
		</div>
  )
}

export default MyAvailabilitySection;