import { Transaction, TransactionInfo, Review } from '../protos/transaction_pb';
import { mockUsers, fromUserObject, UserObject, fromCreditCardObject, CreditCardObject } from './mockUsers';
import { mockPets, PetObject, fromPetObject } from './mockPets';

export const mockTransactions = [
  {
    t_id: 1,
    info: {
      owner: mockUsers[0],
      care_taker: mockUsers[0],
      pet: mockPets[0],
      location: 'central',
      start_date: '07.05.2020',
      end_date: '12.05.2020',
      total_price: 7000,
      transfer_method: TransactionInfo.TransferMethod.OWNER_DELIVER,
      use_card: true,
      credit_card: mockUsers[0].credit_card,
    },
    review: {
      description: 'good care taker!',
      rating: 5
    }
  }
]

const fromReviewObject = (r: ReviewObject): Review => {
  let review = new Review();
  review.setDescription(r.description);
  review.setRating(r.rating);

  return review
}

export const mockTxnMsgs: Array<Transaction> = mockTransactions.map(tnx => {
  let transaction = new Transaction();

  transaction.setTId(tnx.t_id);

  let info = new TransactionInfo();
  info.setOwner(fromUserObject(tnx.info.owner));
  info.setCareTaker(fromUserObject(tnx.info.care_taker));
  info.setPet(fromPetObject(tnx.info.pet));
  info.setLocation(tnx.info.location);
  info.setStartDate(tnx.info.start_date);
  info.setEndDate(tnx.info.end_date);
  info.setTotalPrice(tnx.info.total_price);
  info.setTransferMethod(tnx.info.transfer_method);
  info.setUseCard(tnx.info.use_card);
  info.setCreditCard(fromCreditCardObject(tnx.info.credit_card));
  transaction.setInfo(info);

  transaction.setReview(fromReviewObject(tnx.review));

  return transaction;
})

export interface TransactionObject {
  t_id: number;
  info: TransactionInfoObject;
  review: ReviewObject;
}

export interface TransactionInfoObject {
  owner: UserObject;
  care_taker: UserObject;
  pet: PetObject;
  location: string;
  start_date: string;
  end_date: string
  total_price: number
  transfer_method: number;
  use_card: boolean;
  credit_card: CreditCardObject;
}

export interface ReviewObject {
  description: string;
  rating: number;
}
