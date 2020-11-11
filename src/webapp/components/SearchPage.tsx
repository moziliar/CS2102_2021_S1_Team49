import React, { Component } from "react";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import { DateRangeInput } from "@datepicker-react/styled";

import { Category } from "../../app/models/pets";
import { CareTaker } from "../../app/models/users";
import API from "../api";

import "../styles/SearchPage.scss";
import BidModal, { DateRangeAction } from "./subcomponents/BidModal";
import { mockTakers } from "../../app/models/mockUsers";
import CaretakerCalendar from "./subcomponents/CaretakerCalendar";

const CATEGORY = "category";
const START_DATE = "startDate";
const END_DATE = "endDate";
const PRICE = "price";
const RATING = "rating";
const FOCUSED_INPUT = "focusedInput";

type SearchForm = {
  [CATEGORY]: string;
  [START_DATE]: Date | null;
  [END_DATE]: Date | null;
  [RATING]: number;
  [PRICE]: number;
  [FOCUSED_INPUT]: "startDate" | "endDate" | null;
};

type IState = {
  modalShow: boolean;
  bidModalShow: boolean;
  categories: Array<string> | null;
  careTakers: Array<CareTaker> | null;
  selectedCareTaker: number | null;
  formData: SearchForm;
};

class SearchPage extends Component<{}, IState> {
  state: IState = {
    modalShow: true,
    bidModalShow: false,
    categories: null,
    careTakers: null,
    selectedCareTaker: null,
    formData: {
      [CATEGORY]: "",
      [START_DATE]: null,
      [END_DATE]: null,
      [RATING]: 0,
      [PRICE]: 0,
      [FOCUSED_INPUT]: null,
    },
  };

  _onHandleInputChange = (field: string, value: any) => {
    this.setState({
      formData: {
        ...this.state.formData,
        [field]: value,
      },
    });
  };

  _setBidModalShow = (setShow: boolean) => {
    this.setState({ bidModalShow: setShow });
  };

  _onDateRangeChange = (action: DateRangeAction) => {
    switch (action.type) {
      case "focusChange":
        this._onHandleInputChange(FOCUSED_INPUT, action.data);
        break;
      case "dateChange":
        const { startDate, endDate, focusedInput } = action.data;
        this.setState({
          formData: {
            ...this.state.formData,
            [START_DATE]: startDate,
            [END_DATE]: endDate,
            [FOCUSED_INPUT]: focusedInput,
          },
        });
        break;
      default:
        throw new Error();
    }
  };

  _onSearchButtonClicked = () => {
    const { formData } = this.state;
    const req = {
      category: formData[CATEGORY],
      rating: formData[RATING],
      price: formData[PRICE] * 100,
      date_begin: formData[START_DATE],
      date_end: formData[END_DATE],
    };

    API.get("/search/caretaker", { params: req })
      .then((res) => {
        this.setState({
          careTakers: res.data,
          modalShow: false,
          selectedCareTaker: null,
        });
      })
      .catch((err) => {
        alert('Something is wrong. Please try again later!');
      });
  };

  _selectCareTaker = (index: number) => {
    this.setState({ selectedCareTaker: index });
  };

  _setModalShow = (setShow: boolean) => {
    this.setState({ modalShow: setShow });
  };

  componentDidMount = () => {
    API.get("/categories/list")
      .then((res) => {
        console.log(res.data)
        this.setState({ categories: res.data });
      })
      .catch((err) => {
        alert(err);
      });
  };

  render() {
    const { careTakers, selectedCareTaker, bidModalShow } = this.state;

    return (
      <div className="search-page">
        <Container>
          {this._renderSearchModal()}
          <BidModal
            modalShow={bidModalShow}
            careTaker={
              selectedCareTaker !== null && careTakers !== null
                ? careTakers[selectedCareTaker]
                : null
            }
            setBidModalShow={this._setBidModalShow}
          />
          <Row>
            <Col xs={7} className="section">
              <Button variant="info" onClick={() => this._setModalShow(true)}>
                Search Care Taker
              </Button>
              <hr />
              {careTakers?.length === 0 || careTakers === null ? (
                <h3
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  There is 0 result found.
                </h3>
              ) : (
                <div>
                  {careTakers.map((careTaker, index) =>
                    this._renderCareTakerCard(index, careTaker)
                  )}
                </div>
              )}
            </Col>
            <Col xs={{ span: 5 }} className="section">
              <h3>Care Taker Info</h3>
              {selectedCareTaker === null || careTakers === null ? (
                <small>Click on the care taker to see their information</small>
              ) : (
                this._renderCareTakerInfo(careTakers[selectedCareTaker])
              )}
            </Col>
          </Row>
        </Container>
      </div>
    );
  }

  _renderSearchModal = () => {
    const { categories, formData } = this.state;

    return (
      <Modal
        show={this.state.modalShow}
        onHide={() => this._setModalShow(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <h3>Find the Perfect Match</h3>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>
                <strong>Choose your pet category:</strong>
              </Form.Label>
              <br />
              {categories?.map((c, index) => {
                return (
                  <Form.Check
                    key={index}
                    inline
                    type="radio"
                    label={c}
                    checked={formData[CATEGORY] === c}
                    onChange={(e) =>
                      this._onHandleInputChange(CATEGORY, c)
                    }
                  />
                );
              })}
            </Form.Group>
            <Form.Group>
              <Form.Label>
                <strong>Minimum rating for Care Taker:</strong>
              </Form.Label>
              <br />
              <Form.Control
                type="number"
                min={0}
                max={5}
                value={formData[RATING]}
                onChange={(e) =>
                  this._onHandleInputChange(RATING, e.target.value)
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>
                <strong>What is your maximum budget(per night)</strong>
              </Form.Label>
              <br />
              <Form.Control
                type="number"
                value={formData[PRICE]}
                onChange={(e) =>
                  this._onHandleInputChange(PRICE, e.target.value)
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>
                <strong>Which date you need?</strong>
              </Form.Label>
              <br />
              <DateRangeInput
                onDatesChange={(data) =>
                  this._onDateRangeChange({ type: "dateChange", data: data })
                }
                onFocusChange={(focusedInput) =>
                  this._onDateRangeChange({
                    type: "focusChange",
                    data: focusedInput,
                  })
                }
                startDate={formData[START_DATE]} // Date or null
                endDate={formData[END_DATE]} // Date or null
                displayFormat="yyyy-MM-dd"
                focusedInput={formData[FOCUSED_INPUT]} // START_DATE, END_DATE or null
              />
            </Form.Group>
            <Button
              variant="success"
              onClick={this._onSearchButtonClicked}
              disabled={
                !formData[CATEGORY] ||
                !formData[START_DATE] ||
                !formData[END_DATE]
                // formData[PRICE] === "" ||
                // !formData[RATING] === ""
              }
            >
              Search Now
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  };

  _renderCareTakerCard = (index: number, careTaker: CareTaker) => {
    return (
      <div
        key={careTaker.name}
        className="caretaker-card"
        style={{ 'opacity': index === this.state.selectedCareTaker ? '1' : '0.6' }}
        onClick={() => this._selectCareTaker(index)}
      >
        <Row style={{ margin: "20px" }}>
          <Col xs={3} className="detail">
            <img
              src={careTaker.pic_url}
              style={{ height: "100px", width: "100px", marginRight: "10px" }}
            />
          </Col>
          <Col xs={9} className="detail">
            <h5>
              {index + 1}. {careTaker.name} ({careTaker.rating.toFixed(2)} / 5.0)
            </h5>
            <p>Email: {careTaker.email}</p>
            <p>Contact: {careTaker.phone}</p>
          </Col>
        </Row>
      </div>
    );
  };

  _renderCareTakerInfo = (careTaker: CareTaker) => {
    const reviews = careTaker.reviews;
    const rates = careTaker.rate;

    return (
      <>
        <div>
          <Button
            style={{ margin: "10px 0" }}
            variant="primary"
            onClick={() => this._setBidModalShow(true)}
          >
            Place Bid
          </Button>
          <h4>{careTaker.name}({careTaker.is_part_time ? 'Part Time' : 'Full Time'}</h4>
          <div style={{ 'width': '350px' }}>
            <CaretakerCalendar 
              leave_or_avail={ careTaker.leave_or_avail } 
              is_part_time={ careTaker.is_part_time } />
          </div>
          <h6>Rates:</h6>
          {rates.map((rate, index) => {
            return (
              <p key={`${rate.category}-price`}>
                {rate.category} - ${rate.price / 100}/night
              </p>
            );
          })}
          <h6>Past Reviews:</h6>
          {reviews
            ? reviews.map((review, index) => {
                return (
                  <div key={index}>
                    <p>
                      {index + 1}. {review.owner_name} - {review.review} (
                      {review.rating.toFixed(2)}/5.0)
                    </p>
                  </div>
                );
              })
            : null}
        </div>
      </>
    );
  };
}

export default SearchPage;
