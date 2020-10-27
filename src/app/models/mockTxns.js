"use strict";
exports.__esModule = true;
var transaction_pb_1 = require("../../protos/transaction_pb");
var mockUsers_1 = require("./mockUsers");
var mockPets_1 = require("./mockPets");
exports.mockTransactions = [
    {
        t_id: 1,
        info: {
            owner: mockUsers_1.mockUsers[0],
            care_taker: mockUsers_1.mockUsers[0],
            pet: mockPets_1.mockPets[0],
            location: 'central',
            start_date: '07.05.2020',
            end_date: '12.05.2020',
            total_price: 7000,
            transfer_method: transaction_pb_1.TransactionInfo.TransferMethod.OWNER_DELIVER,
            use_card: true,
            credit_card: mockUsers_1.mockUsers[0].credit_card
        },
        review: {
            description: 'good care taker!',
            rating: 5
        }
    }
];
exports.mockTxnMsgs = exports.mockTransactions.map(function (tnx) {
    var transaction = new transaction_pb_1.Transaction();
    transaction.setTId(tnx.t_id);
    var info = new transaction_pb_1.TransactionInfo();
    info.setOwner(mockUsers_1.fromUserObject(tnx.info.owner));
    info.setCareTaker(mockUsers_1.fromUserObject(tnx.info.care_taker));
    info.setPet(mockPets_1.fromPetObject(tnx.info.pet));
    info.setLocation(tnx.info.location);
    info.setStartDate(tnx.info.start_date);
    info.setEndDate(tnx.info.end_date);
    info.setTotalPrice(tnx.info.total_price);
    info.setTransferMethod(tnx.info.transfer_method);
    info.setUseCard(tnx.info.use_card);
    info.setCreditCard(mockUsers_1.fromCreditCardObject(tnx.info.credit_card));
    transaction.setInfo(info);
    transaction.setReview(fromReviewObject(tnx.review));
    return transaction;
});
var fromReviewObject = function (r) {
    var review = new transaction_pb_1.Review();
    review.setDescription(r.description);
    review.setRating(r.rating);
    return review;
};
