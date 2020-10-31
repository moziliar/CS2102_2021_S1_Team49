import { mockPets } from '../models/mockPets'
import { GetUserByEmail } from './user';
import { db } from '../dbconfig/db';
import { createPetQuery, deletePetQuery, getAllAvailCategories, updatePetQuery } from '../sql_query/query';

// pet -> {name, owner, description, special_requirements, gender, date_of_birth, category}
export const CreatePetHandler = async (req, res) => {
  await db.query({
    text: createPetQuery,
    values: [req.body.name,
             req.body.owner,
             req.body.description,
             req.body.special_requirements,
             req.body.gender,
             req.body.date_of_birth,
             req.body.category,
            ]
  }).then(async query => {
    if (query.rowCount > 0) {
      const user = await GetUserByEmail(req.body.owner);
      res.json(user);
    }
  }).catch(err => {
    console.log(err);
    res.status(404).json({ errMessage: 'Fail adding new pet. Please ensure pet name and category is not empty!' });
  })
}

export const UpdatePetHandler = async (req, res) => {
  await db.query({
    text: updatePetQuery,
    values: [req.body.name,
             req.body.owner,
             req.body.description,
             req.body.special_requirements,
             req.body.gender,
             req.body.date_of_birth,
             req.body.category,
            ]
  }).then(async query => {
    const user = await GetUserByEmail(req.body.owner);
    res.json(user);
  }).catch(err => {
    console.log(err);
    res.status(404).json({ errMessage: 'Fail updating pet. Please ensure pet name and category is not empty!' });
  })
}

export const DeletePetHandler = async (req, res) => {
  await db.query({
    text: deletePetQuery,
    values: [req.query.name, req.query.owner]
  }).then(async r => {
    console.log(req.query.owner);
    await GetUserByEmail(req.query.owner)
      .then(user => {
        res.json(user);
      })
  })
  .catch(err => {
    console.log(err)
    res.status(404).json({ errMessage: 'Fail removing pet. Please try again later.' });
  })
}

export const GetAllPetCategories = async (req, res) => {
  await db.query({
    text: getAllAvailCategories
  }).then(async query => {
    res.json(query.rows);
  }).catch(err => {
    res.status(404).json({ errMessage: 'Something error with the server. Try again later' })
  })
}
