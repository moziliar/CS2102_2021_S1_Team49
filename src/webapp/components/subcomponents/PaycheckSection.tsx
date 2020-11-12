import React, { Component } from 'react';
import { DropdownButton, Dropdown, ButtonGroup, Button, Table } from 'react-bootstrap';
import API from '../../api';
import { UserContext } from '../../contexts/UserContext';

import '../../styles/PaycheckSection.scss';

interface Salary {
    year: string;
    month: string;
    amount: number;
}

type IState = {
    year: string,
    month: number,
    salary: Salary | null
}

class PaycheckSection extends Component<{}, IState> {
    static contextType = UserContext;
    
    state: IState = {
        year: '',
        month: -1,
        salary: null
    }

    _onHandleGetSalary = () => {
        const req = {
            caretaker: this.context.currentUser.email,
            month: this.state.month + 1 + '',
            year: this.state.year
        }
        API.get('/caretaker/salary', {params: req})
            .then(res => {
                this.setState({ salary: res.data });
            })
            .catch(err => {
                alert(err.response.data.errMessage);
            })
    }

    _onHandleDropdownChange = (field:string, value: any) => {
        this.setState({
            ...this.state,
            [field]: value
        })
    }

    render() {
        const monthList = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const currentYear = new Date(Date.now()).getFullYear();
        const yearList = [currentYear - 5, currentYear - 4, currentYear - 3, currentYear - 2, currentYear - 1, currentYear];
        const { year, month, salary } = this.state;
        
        return (
            <div className="paycheck-page">
                <h2>Past Salary</h2>
                <DropdownButton variant="primary" title={ year !== '' ? year : "Select Year" } id="dropdown-year" as={ ButtonGroup }>
                    { yearList.map(year => {
                        return <Dropdown.Item key={ year } onClick={ () => this._onHandleDropdownChange('year', year + '') }>{ year }</Dropdown.Item>
                    })}
                </DropdownButton>
                <DropdownButton variant="primary"  title={ month !== -1 ? monthList[month] : "Select Month" } id="dropdown-month" as={ ButtonGroup }>
                    { monthList.map((m, index) => {
                        return <Dropdown.Item key={ m } onClick={ () => this._onHandleDropdownChange('month', index) }>{ m }</Dropdown.Item>
                    })}
                </DropdownButton>
                <Button variant="success" onClick={ this._onHandleGetSalary } disabled={ year === '' || month === -1 }>Get Salary</Button>
                <Table striped bordered hover size="sm" style={{ 'marginTop': '20px' }}>
                    <thead>
                        <tr>
                            <th>Year</th>
                            <th>Month</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    { salary 
                        ? <tbody>
                            <tr>
                                <th>{ salary.year }</th>
                                <th>{ monthList[parseInt(salary.month) - 1] }</th>
                                <th>{ salary.amount / 100 }</th>
                            </tr>
                         </tbody>
                        : null
                    }
                </Table>
            </div>
        );
    }
}

export default PaycheckSection;