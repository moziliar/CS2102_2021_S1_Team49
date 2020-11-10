import { mockTakers, mockUsers } from '../models/mockUsers';
import { CareTaker } from '../models/users';
import { db } from '../dbconfig/db';
import {
  loginQuery, createUserQuery, updateUserQuery, searchUserByEmailQuery, searchUserQuery,
  applyLeaveQuery, applyAvailabilityQuery,
  queryPetQuery,
  queryCreditCard,
  getRatesByUserQuery,
  listDoneTnxByOwnerId,
  queryCaretaker, queryAvailabiliies, addCreditCardQuery, deleteCreditCardQuery, applyCareTakerQuery, getHighRatingCaretakerDetailsWithinNmonths, getAllCareTakerDailyPrice, deleteDailyPriceQuery, updateDailyPriceQuery, addDailyPrice
} from '../sql_query/query';

// ================================ USER =========================================

export const LoginHandler = async (req, res) => {
  const usersRet = await db.query({
    text: loginQuery,
    values: [req.body.email, req.body.password],
  })

  if (usersRet.rows.length === 0) {
    res.status(401).json({ errMessage: 'No such user or Username and Password do not match' });
  } else if (usersRet.rows.length > 1) {
    res.status(502).json({ errMessage: 'More than one user found'});
  }

  const user = await GetUserByEmail(usersRet.rows[0].email);
  res.json(user);
};

export const CreateUserHandler = async (req, res) => {
  await db.query({
    text: createUserQuery,
    values: [req.body.email, 
             req.body.password, 
             req.body.name, 
             req.body.phone, 
             req.body.pic_url, 
             req.body.is_admin
            ]
  }).then(async query => {
    // Success creating user
    if (query.rowCount > 0) {
      const user = await GetUserByEmail(req.body.email);
      res.json(user);
    }
  }).catch(err => {
    res.status(404).json({ errMessage: 'Email has been taken. User other email' });
  })
}

export const UpdateUserHandler = async (req, res) => {
  await db.query({
    text: updateUserQuery,
    values: [req.body.email,
             req.body.name,
             req.body.phone,
             req.body.pic_url], 
  }).then(async r => { 
    GetUserByEmail(req.body.email)
      .then(user => {
        res.json(user);
      })
    })
    .catch(err => {
      res.status(404).json({ errMessage: 'Fail updating basic information' });
    })
}

export const ApplyCareTakerHandler = async (req, res) => {
  await db.query({
    text: applyCareTakerQuery,
    values: [req.body.email,
             req.body.is_part_time
            ]
  }).then(async r => {
    await GetUserByEmail(req.body.email)
      .then(user => {
        res.json(user);
      })
  }).catch(err => {
    res.status(404).json({ errMessage: 'Error applying to be Care Taker. Please try again later!' });
  })
}

export const DeleteUserHandler = (req, res) => {
  res.json(mockUsers[0]);
}

// ================================ CREDIT CARD =========================================

export const AddCreditCardHandler = async (req, res) => {
  await db.query({
    text: addCreditCardQuery,
    values: [req.body.email,
             req.body.cc_number,
             req.body.holder_name,
             req.body.expiry_date
            ]
  }).then(async r => {
    GetUserByEmail(req.body.email)
      .then(user => {
        res.json(user);
      })
  })
  .catch(err => {
    res.status(404).json({ errMessage: 'Please ensure all fields are not empty, card number is unique, and expiry date is after today\' date' });
  })

}

export const DeleteCreditCardHandler = async (req, res) => {
  await db.query({
    text: deleteCreditCardQuery,
    values: [req.query.email, req.query.cc_number]
  }).then(async r => {
    GetUserByEmail(req.query.email)
      .then(user => {
        res.json(user);
      })
  })
  .catch(err => {
    console.log(err)
    res.status(404).json({ errMessage: 'Fail removing card. Please try again later.' });
  })
}

// ================================ CARE TAKER ========================================

export const ListCareTakerHandler = async (req, res) => {
  /*
    search requirements:
    category
    rating
    price
    date_begin
    date_end
   */
  console.log(req.body);
  const _users = await db.query({
    text: searchUserQuery,
    values: [
      req.query.category,
      req.query.rating,
      req.query.price,
      req.query.date_begin,
      req.query.date_end,
    ]
  });
  console.log(_users.rows)

  let users: Array<CareTaker> = [];

  for await (const user of _users.rows) {
    const rates = await db.query({
      text: getRatesByUserQuery,
      values: [user.email],
    });

    const bids = await db.query({
      text: listDoneTnxByOwnerId,
      values: [user.email],
    })
    users.push({
      email: user.email,
      name: user.name,
      pic_url: user.pic_url,
      phone: user.phone,
      rating: bids.rows.length === 0 ? 0 : (bids.rows.map(bid => bid.rating)
        .reduce((prev, curr) => prev + curr) / bids.rows.length),
      rate: rates.rows,
      reviews: bids.rows.map(bid => {
        return {
          owner_name: bid.pet_owner,
          rating: bid.rating,
          review: bid.review,
        }
      })
    })
  }

  res.json(users);
}

export const ApplyLeaveHanlder = async (req, res) => {
  db.query({
    text: applyLeaveQuery,
    values: [
      req.body.email,
      req.body.start_date,
      req.body.end_date,
    ],
  }).then(out => {
      console.log(out.rows);
      res.json({
        success: true,
        message: 'applied leave successfully',
      })
  }).catch(err => {
    console.log(err);
  })
}

export const ApplyAvailabilityHanlder = async (req, res) => {
  db.query({
    text: applyAvailabilityQuery,
    values: [
      req.body.email,
      req.body.start_date,
      req.body.end_date,
    ],
  }).then(out => {
    console.log(out.rows);
    res.json({
      success: true,
      message: 'applied leave successfully',
    })
  }).catch(err => {
    console.log(err);
  })
}

export const ListTopPerformingCareTaker = async (req, res) => {
  db.query({
    text: getHighRatingCaretakerDetailsWithinNmonths(req.query.months)
  }).then(query => {
    res.json(query.rows);
  }).catch(err => {
    console.log(err)
    res.status(404).json({ errMessage: 'Something error with the server. Try again later' })
  })
}

export const GetAllCareTakerDailyPriceHandler =  async (req, res) => {
  await db.query({
    text: getAllCareTakerDailyPrice,
    values: [req.query.email]
  }).then(query => {
    res.json(query.rows);
  }).catch(err => {
    res.status(404).json({ errMessage: 'Something error with the server. Try again later' })
  })
}

export const CreateDailyPriceHandler = async (req, res) => {
  await db.query({
    text: addDailyPrice,
    values: [req.body.email, req.body.category, req.body.price]
  }).then(query => {
    
  }).catch(err => {
    res.status(404).json({ errMessage: 'Something error with the server. Try again later' })
  })
}

export const UpdateDailyPriceHandler = async (req, res) => {
  await db.query({
    text: updateDailyPriceQuery,
    values: [req.body.email, req.body.category, req.body.price]
  }).then(query => {
    
  }).catch(err => {
    res.status(404).json({ errMessage: 'Something error with the server. Try again later' })
  })
}

export const DeleteDailyPriceHandler = async (req, res) => {
  await db.query({
    text: deleteDailyPriceQuery,
    values: [req.query.email, req.query.category]
  }).then(query => {

  }).catch(err => {
    res.status(404).json({ errMessage: 'Something error with the server. Try again later' })
  })
}

// ================================== HELPERS ===========================================

export const GetUserByEmail = async (email: string) => {
  const userRet =  await db.query({
    text: searchUserByEmailQuery,
    values: [email],
  });

  const user = userRet.rows[0];

  const petsRet = await db.query({
    text: queryPetQuery,
    values: [email],
  })

  const creditCardRet = await db.query({
    text: queryCreditCard,
    values: [email],
  })

  const isCaretakerRet = await db.query({
    text: queryCaretaker,
    values: [email],
  })

  const isCaretaker = isCaretakerRet.rows.length > 0;

  if (!isCaretaker) {
    return {
      ...user,
      pets_owned: petsRet.rows.concat({}) || [{}],
      credit_card: creditCardRet.rows.concat({}) || [{}],
    };
  }

  if (isCaretakerRet.rows[0].is_part_time) {
    const availabilitiesRet = await db.query({
      text: queryAvailabiliies,
      values: [email],
    })

    return {
      ...user,
      pets_owned: petsRet.rows.concat({}) || [{}],
      credit_card: creditCardRet.rows.concat({}) || [{}],
      is_part_time: isCaretakerRet.rows[0],
      leave_or_avail: availabilitiesRet.rows.map(ret => {
        return {
          start_date: ret.start_date,
          end_date: ret.end_date,
        }
      })
    }
  } else {
    const leavesRet = await db.query({
      text: queryAvailabiliies,
      values: [email],
    });

    return {
      ...user,
      pets_owned: petsRet.rows.concat({}) || [{}],
      credit_card: creditCardRet.rows.concat({}) || [{}],
      is_part_time: isCaretakerRet.rows[0].is_part_time,
      leave_or_avail: leavesRet.rows.map(ret => {
        return {
          start_date: ret.start_date,
          end_date: ret.end_date,
        }
      })
    }
  }
}