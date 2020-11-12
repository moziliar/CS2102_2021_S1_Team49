import React, { Component } from 'react';
import { Container, Table, Button, Form, Modal, Dropdown, Col } from 'react-bootstrap';
import _ from 'lodash';

import { CategoryRate, TopCareTaker } from '../../app/models/users';
import API from '../api';

import '../styles/DashboardPage.scss';
import { UserContext } from '../contexts/UserContext';
import { mockTopCareTakers } from '../../app/models/mockUsers';



type IState = {
    categoryList: Array<CategoryRate> | null,
    topCareTaker: Array<TopCareTaker> | null,
    months: number
}

class DashboardPage extends Component<{}, IState> {
    static contextType = UserContext;

    state: IState = {
        categoryList: null,
        topCareTaker: null,
        months: 1,
    }

    _onHandleUpdatePrice = (index: number) => {
        if (!this.state.categoryList) {
            return
        }

        const req = this.state.categoryList[index];
        req.price *= 100;

        API.put('/category/update', req)
            .then(res => {
                const categoryList = res.data.map(category => {
                    category.price = category.price / 100;
                    return category;
                });
                this.setState({ categoryList: categoryList });
            })
            .catch(err => {
                alert(err.response.data.errMessage);
            })
    }

    // Need to check for trigger, create lead to insertion in min_daily_price
    _onHandleAddPrice = (index: number) => {
        const req = this.state.categoryList?.[index];
        req.price *= 100;

        API.post('/category/create', req)
            .then(res => {
                const categoryList = res.data.map(category => {
                    console.log(category);
                    category.price = category.price / 100;
                    console.log(category)
                    return category;
                });
                this.setState({ categoryList: categoryList });
            })
            .catch(err => {
                alert(err.response.data.errMessage);
            })
    }

    _onHandleInputChange = (field: string, value: any) => {
		const categoryListCopy:  Array<CategoryRate> | null = _.cloneDeep(this.state.categoryList);
		_.set(categoryListCopy, field, value);
		this.setState({ categoryList: categoryListCopy });
    }

    _onHandleMonthChange = (value: number) => {
        this.setState({ months: value });
    }
    
    _getTopPerformingCareTaker = () => {
        API.get('/top/caretaker', { params: {months: this.state.months }})
            .then(res => {
                this.setState({ topCareTaker: res.data })
            })
            .catch(err => {
                alert(err.response.data.errMessage);
            })
    }

    componentDidMount = () => {
        API.get('/categories/pricelist')
            .then(res => {
                const categoryList = res.data.map(category => {
                    category.price = category.price / 100;
                    return category;
                });
                this.setState({ categoryList: categoryList });
            })
            .catch(err => {
                alert(err.response.data.errMessage);
            })
    }

    render() {
        const { categoryList, topCareTaker, months } = this.state;
        const categoryListLength = categoryList?.length;
        
        return (
            <div className="dashboard-page">
                <Container>
                    <h2 style={{ 'marginBottom': '20px' }}>Top Performing CareTaker(based on rating) last N months</h2>
                    <small>Input number of months of data to be calculated</small>
                    <Form.Row style={{ 'marginBottom': '20px' }}>
                        <Col>
                            <Form.Control type="number" value={ months } onChange={ (e) => this._onHandleMonthChange(parseInt(e.target.value)) } />
                        </Col>
                        <Col>
                            <Button onClick={ this._getTopPerformingCareTaker }>Get Data</Button>
                        </Col>
                    </Form.Row>
                    { topCareTaker && topCareTaker.length > 0
                        ?   <Table striped bordered hover size="sm">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Fulltime/Partime</th>
                                        <th>Average Rating</th>
                                    </tr>
                                </thead>
                                { topCareTaker.map((taker, index) => {
                                    return (
                                        <tr key={ index }>
                                            <td>{ taker.name }</td>
                                            <td>{ taker.email }</td>
                                            <td>{ taker.is_part_time ? "Parttime" : "Fulltime" }</td>
                                            <td>{ parseInt(taker.avg_rating).toFixed(2) }</td>
                                        </tr>
                                    )
                                  })
                                }
                            </Table>
                        : null
                    }
                    <hr />
                    <h2 style={{ 'marginBottom': '20px' }}>Set Base Rate</h2>
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th>Category Name</th>
                                <th>Parent Category</th>
                                <th>Base Rate(/night)</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            { categoryList 
                                ? categoryList.map((category, index) => {
                                    return (
                                        <tr key={ index }>
                                            { categoryListLength && index !== categoryListLength - 1 
                                                ? this._renderExistingCategoryRow(category, index)
                                                : this._renderNewCategoryRow(category, index)
                                            }
                                        </tr>
                                    );
                                  })
                                : null
                            }
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }

    _renderExistingCategoryRow = (category: CategoryRate, index: number) => {
        return (
            <>
                <td>{ category.name }</td>
                <td>{ category.parent || "N.A"}</td>
                <td><Form.Control type="number" value={ category.price } onChange={ (e) => this._onHandleInputChange(`[${index}].price`, e.target.value) } /></td>
                <td><Button variant="primary" onClick={ () => this._onHandleUpdatePrice(index) }>Update</Button></td>
            </>
        );
    }

    _renderNewCategoryRow = (category: CategoryRate, index: number) => {
        return (
            <>
                <td><Form.Control type="text" value={ category.name } onChange={ (e) => this._onHandleInputChange(`[${index}].name`, e.target.value) } /></td>
                <td><Form.Control type="text" value={ category.parent || "" } onChange={ (e) => this._onHandleInputChange(`[${index}].parent`, e.target.value) } /></td>
                <td><Form.Control type="number" value={ category.price } onChange={ (e) => this._onHandleInputChange(`[${index}].price`, e.target.value) } /></td>
                <td><Button variant="success" onClick={ () => this._onHandleAddPrice(index) }>Add New</Button></td>
            </>
        );
    }
}

export default DashboardPage;