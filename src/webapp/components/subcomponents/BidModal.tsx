import React, { Component } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { DateRangeInput } from '@datepicker-react/styled';
import _ from 'lodash';

import { CareTaker } from '../../../app/models/users';
import { UserContext } from '../../contexts/UserContext';
import MyPetsSection from './MyPetsSection';

const PET_NAME = 'pet';
const PRICE = 'price'
const CASH = 'cash';
const CREDIT_CARD = 'cc';
const PAYMENT_METHOD = 'payment_method'
const TRANSFER_METHOD = 'transfer_method';
const DELIVERY = 'delivery';
const PICKUP = 'pickup'
const PCS = 'pcs';
const CARD_NUMBER = 'cc_number';
const START_DATE = 'startDate';
const END_DATE = 'endDate';
const FOCUSED_INPUT = 'focusedInput';

interface BidForm {
    [PET_NAME]: string;
    [PRICE]: number;
    [PAYMENT_METHOD]: string;
    [TRANSFER_METHOD]: string;
    [CARD_NUMBER]: number;
    [START_DATE]: Date | null;
    [END_DATE]: Date | null;
    [FOCUSED_INPUT]: 'startDate' | 'endDate' | null;
}

type IState = {
    formData: BidForm,
    modalShow: boolean,
    careTaker: CareTaker | null
}

type IProps = {
    modalShow: boolean,
    careTaker: CareTaker | null,
    setBidModalShow: (setShow: boolean) => void
}

class BidModal extends Component<IProps, IState> {
    static contextType = UserContext;

    state: IState = {
        modalShow: this.props.modalShow,
        careTaker: this.props.careTaker || null,
        formData: {
            [PET_NAME]: '',
            [PRICE]: 0,
            [PAYMENT_METHOD]: '',
            [TRANSFER_METHOD]: '',
            [CARD_NUMBER]: 0,
            [START_DATE]: null,
            [END_DATE]: null,
            [FOCUSED_INPUT]: null,
        }
    }

    _onHandleInputChange = (field: string, value: any) => {
		this.setState({
            formData: {
                ...this.state.formData,
                [field]: value
            }
        })
    }

    _onDateRangeChange = (type: string, data: object | string | null) => {
        switch (type) {
            case 'focusChange':
                this._onHandleInputChange(FOCUSED_INPUT, data);
                break;
            case 'dateChange':
                this.setState({
                    formData: {
                        ...this.state.formData,
                        [START_DATE]: data.startDate,
                        [END_DATE]: data.endDate,
                        [FOCUSED_INPUT]: data.focusedInput
                    }
                })
                break;
            default:
                throw new Error()
        }
    }

    _setBidModalShow = (setShow: boolean) => {
        this.props.setBidModalShow(setShow);
    }

    // Call API for bid.
    _onPlaceBidButtonClicked = () => {

    }

    render() {
        const { careTaker, formData } = this.state;
        const { credit_card, pets_owned } = this.context.currentUser;

        return (
            <Modal
                show={ this.props.modalShow }
                onHide={ () => this._setBidModalShow(false) }
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        <h3>Bid Information</h3>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label><strong>Choose your pet:</strong></Form.Label><br />
                        { pets_owned?.map((pet, index) => {
                            return (
                                <Form.Check 
                                    key={ index }
                                    inline
                                    type="radio"
                                    label={ pet.name + "(" + pet.category + ")" }
                                    checked={ formData[PET_NAME] === pet.name }
                                    onChange={ e => this._onHandleInputChange(PET_NAME, pet.name) }/>
                            );
                        }) }
                    </Form.Group>
                    <Form.Group>
                        <Form.Label><strong>Choose your transfer method:</strong></Form.Label><br />
                        <Form.Check 
                            type="radio"
                            inline
                            label="Pick Up"
                            checked={ formData[TRANSFER_METHOD] === PICKUP }
                            onChange={ () => this._onHandleInputChange(TRANSFER_METHOD, PICKUP) }/>
                        <Form.Check 
                            type="radio"
                            inline
                            label="Delivery"
                            checked={ formData[TRANSFER_METHOD] === DELIVERY }
                            onChange={ () => this._onHandleInputChange(TRANSFER_METHOD, DELIVERY) }/>
                        <Form.Check 
                            type="radio"
                            inline
                            label="Through PCS"
                            checked={ formData[TRANSFER_METHOD] === PCS }
                            onChange={ () => this._onHandleInputChange(TRANSFER_METHOD, PCS) }/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label><strong>Choose your payment method:</strong></Form.Label><br />
                        <Form.Check 
                            type="radio"
                            inline
                            label="Cash"
                            checked={ formData[PAYMENT_METHOD] === CASH }
                            onChange={ () => this._onHandleInputChange(PAYMENT_METHOD, CASH) }/>
                        <Form.Check 
                            type="radio"
                            inline
                            label="Credit Card"
                            checked={ formData[PAYMENT_METHOD] === CREDIT_CARD }
                            onChange={ () => this._onHandleInputChange(PAYMENT_METHOD, CREDIT_CARD) }/>
                    </Form.Group>
                    { formData[PAYMENT_METHOD] === CREDIT_CARD
                        ? <Form.Group>
                            <Form.Label><strong>Choose your card:</strong></Form.Label><br />
                            { credit_card?.filter(cc => !_.isEmpty(cc)).map(cc => {
                                return (
                                    <Form.Check 
                                        key={ cc.cc_number }
                                        inline
                                        type="radio"
                                        label={ cc.cc_number }
                                        checked={ formData[CARD_NUMBER] === cc.cc_number }
                                        onChange={ e => this._onHandleInputChange(CARD_NUMBER, cc.cc_number) } />
                                );
                            }) }
                          </Form.Group>
                        : null
                    }
                    <Form.Group>
                        <Form.Label><strong>Place bid amount(per night):</strong></Form.Label><br />
                        <Form.Control 
                            type="number"
                            value={ formData[PRICE] }
                            onChange={ (e) => this._onHandleInputChange(PRICE, e.target.value) }/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label><strong>Which date you need?</strong></Form.Label><br />
                        <DateRangeInput
                            onDatesChange={ data => this._onDateRangeChange('dateChange', data) }
                            onFocusChange={ focusedInput => this._onDateRangeChange('focusChange', focusedInput) }
                            startDate={ formData[START_DATE] } // Date or null
                            endDate={ formData[END_DATE] } // Date or null
                            displayFormat="yyyy-MM-dd"
                            focusedInput={ formData[FOCUSED_INPUT] } // START_DATE, END_DATE or null
                        />
                    </Form.Group>
                </Form>
                <small><i>*Please ensure the Care Taker can take your pet and you bid the minimum amound shown in the care taker information. Otherwise, bid will be rejected</i></small><br />
                <Button 
                    variant="success" 
                    onClick={ this._onPlaceBidButtonClicked }
                    disabled={ !formData[START_DATE] || !formData[END_DATE] || formData[TRANSFER_METHOD] === '' || formData[PET_NAME] === '' || formData[PAYMENT_METHOD] === '' }>
                        Place Bid
                </Button>
                </Modal.Body>
            </Modal>
        );
    }
}

export default BidModal;