import React, { Component } from 'react';
import { Table, Form, Button } from 'react-bootstrap';
import _ from 'lodash';

import { CategoryRate, DailyRate } from '../../../app/models/users';
import API from '../../api';
import { UserContext } from '../../contexts/UserContext';

import '../../styles/MyDailyRate.scss';
import { assert } from 'console';

type IState = {
    categoryList: Array<CategoryRate> | null,
    myRateList: Array<DailyRate> | null,
}

class MyDailyRate extends Component<{}, IState> {
    static contextType = UserContext;

    state: IState = {
        categoryList: null,
        myRateList: null,
    }

    _onHandleInputChange = (field: string, value: any) => {
		const categoryListCopy:  Array<CategoryRate> | null = _.cloneDeep(this.state.categoryList);
		_.set(categoryListCopy, field, value);
		this.setState({ categoryList: categoryListCopy });
    }

    _onHandleUpdateRate = (index: number) => {
        const { categoryList, myRateList } = this.state;
        const { email } = this.context.currentUser;
        const category = categoryList[index].name;

        if (!categoryList[index]["isSelected"]) {
            API.delete('/dailyrate/delete', { params: {email: email, category: category} })
        } else {
            const req = {
                email: email,
                category: category,
                price: categoryList[index]["minPrice"] * 100
            };
            if (myRateList.map(rate => rate.category).includes(category)) {
                API.put('/dailyrate/update', req)
            } else {
                API.post('/dailyrate/create', req)
            }
        }
    }

    componentDidMount = async () => {
        const [ firstRes, secondRes ] = await Promise.all([
            API.get('/categories/pricelist'),
            API.get('/dailyrate/caretaker', { params: {email: this.context.currentUser.email }})
        ]);

        firstRes.data.pop();
        const categoryList = firstRes.data?.map(category => {
            const isChosenCategory = secondRes.data?.map(rate => rate.category).includes(category.name);
            category["isSelected"] = isChosenCategory;
            category["minPrice"] = isChosenCategory ? secondRes.data?.filter(rate => rate.category === category.name)[0].price : '';
            return category;
        });

        this.setState({
            categoryList: categoryList,
            myRateList: secondRes.data
        });
    }

    render() {
        const { categoryList } = this.state;

        console.log(categoryList);

        return (
            <div className="my-daily-rate-page">
                <h2>My Daily Rates</h2>
                <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Category</th>
                                <th>Suggested Min Rate</th>
                                <th>Your Daily Rate</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            { categoryList 
                                ? categoryList.map((category, index) => {
                                    return (
                                        <tr key={ index }>
                                            <td>
                                                <Form.Check 
                                                    checked={ category["isSelected"] }
                                                    onChange={ () => this._onHandleInputChange(`[${index}].isSelected`, !category["isSelected"]) }/>
                                            </td>
                                            <td>{ category.name }</td>
                                            <td>{ category.price / 100 }</td>
                                            <td>
                                                <Form.Control 
                                                    type="number" 
                                                    value={ category["minPrice"] / 100 || ''}
                                                    onChange={ (e) => this._onHandleInputChange(`[${index}].minPrice`, parseInt(e.target.value)) }/>
                                            </td>
                                            <td>
                                                <Button 
                                                    variant="primary"
                                                    onClick={ () => this._onHandleUpdateRate(index) }>
                                                        Update
                                                </Button>
                                            </td>
                                        </tr>
                                    );
                                  })
                                : null
                            }
                        </tbody>
                    </Table>
            </div>
        );
    }
}

export default MyDailyRate;