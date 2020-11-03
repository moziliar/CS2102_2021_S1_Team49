import React, { Component } from 'react';
import { Container, Table, Button, Form, Modal } from 'react-bootstrap';
import _ from 'lodash';

import { CategoryRate } from '../../app/models/users';
import { Category } from '../../app/models/pets';
import API from '../api';

import '../styles/DashboardPage.scss';
import { UserContext } from '../contexts/UserContext';

const CATEGORY_NAME = 'name';
const PARENT_CATEGORY = 'parent_category';

type IState = {
    categoryList: Array<CategoryRate | object> | null,
    formData: Category,
    modalShow: boolean
}

class DashboardPage extends Component<{}, IState> {
    static contextType = UserContext;

    state: IState = {
        categoryList: null,
        modalShow: false,
        formData: {
            [CATEGORY_NAME]: '',
            [PARENT_CATEGORY]: ''
        }
    }

    _setModalShow = (setShow: boolean) => {
        this.setState({ modalShow: setShow });
    }

    _onHandleFormChange = (field: string, value: string) => {
        this.setState({
            formData: {
                ...this.state.formData,
                [field]: value
            }
        })
    }

    _onHandleUpdatePrice = (index: number) => {
        const req = this.state.categoryList[index];

        API.put('/category/update', req)
            .then(res => {
                this.setState({ categoryList: res.data });
            })
            .catch(err => {
                alert(err.response.data.errMessage);
            })
    }

    // Need to check for trigger, create lead to insertion in min_daily_price
    _onHandleAddPrice = () => {
        const req = this.state.formData;

        API.post('/category/create', req)
            .then(res => {
                this.setState({ categoryList: res.data, modalShow: false });
            })
            .catch(err => {
                alert(err.response.data.errMessage);
            })
    }

    _onHandleInputChange = (field: string, value: any) => {
		const categoryListCopy:  Array<CategoryRate | object> | null = _.cloneDeep(this.state.categoryList);
		_.set(categoryListCopy, field, value);
		this.setState({ categoryList: categoryListCopy });
	}

    componentDidMount = () => {
        API.get('/categories/pricelist')
            .then(res => {
                this.setState({ categoryList: res.data });
            })
            .catch(err => {
                alert(err.response.data.errMessage);
            })
    }

    render() {
        const { categoryList } = this.state;
        return (
            <div className="dashboard-page">
                <Container>
                    { this._renderAddCategoryModal() }
                    <h2 style={{ 'marginBottom': '20px' }}>Set Base Rate</h2>
                    <Button style={{ 'marginBottom': '15px', 'marginRight': '15px' }} variant="success" onClick={ () => this._setModalShow(true) }>Add New Category</Button>
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th>Category Name</th>
                                <th>Base Rate(/night)</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            { categoryList 
                                ? categoryList.map((category, index) => {
                                    return (
                                        <tr key={ index }>
                                            <td><Form.Control type="text" disabled={ true } value={ category.category } onChange={ (e) => this._onHandleInputChange(`[${index}].category`, e.target.value) } /></td>
                                            <td><Form.Control type="number" value={ category.price } onChange={ (e) => this._onHandleInputChange(`[${index}].price`, e.target.value) }/></td>
                                            <td><Button variant="primary" onClick={ () => this._onHandleUpdatePrice(index) }>Update</Button></td>
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

    _renderAddCategoryModal = () => {
        const { formData, modalShow } = this.state;

        return (
            <Modal
                show={ modalShow }
                onHide={ () => this._setModalShow(false) }
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        <h3>Add new category</h3>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <small><i>*Category name must be unique and parent category must exist in the list</i></small>
                    <Form.Group>
                        <Form.Label><strong>Category name:</strong></Form.Label><br />
                        <Form.Control 
                            type="text"
                            value={ formData[CATEGORY_NAME] }
                            onChange={ (e) => this._onHandleFormChange(CATEGORY_NAME, e.target.value) } />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label><strong>Parent Category's name:</strong></Form.Label><br />
                        <Form.Control 
                            type="text"
                            value={ formData[PARENT_CATEGORY] }
                            onChange={ (e) => this._onHandleFormChange(PARENT_CATEGORY, e.target.value) } />
                    </Form.Group>
                    <Button 
                        variant="success" 
                        onClick={ this._onHandleAddPrice }
                        disabled={ formData[CATEGORY_NAME] === "" }>
                            Add Category
                    </Button>
                </Modal.Body>
            </Modal>
        )
    }
}

export default DashboardPage;