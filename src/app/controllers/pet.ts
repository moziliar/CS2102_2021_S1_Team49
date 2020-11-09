import { mockPets } from '../models/mockPets'
import { GetUserByEmail } from './user';
import { db } from '../dbconfig/db';
import { addCategoryQuery, createPetQuery, deletePetQuery, getAllCategoriesQuery, updateCategoryQuery, updatePetQuery } from '../sql_query/query';

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
    const user = await GetUserByEmail(req.body.owner);
    res.json(user);
  })
  .catch(err => {
    console.log(err)
    res.status(404).json({ errMessage: 'Fail removing pet. Please try again later.' });
  })
}

export const GetAllPetCategoriesHandler = async (req, res) => {
  await GetAllCategoryHelper()
    .then(async query => {
      const categoryList = query.categoryList.map(q => q.name);
      res.json(categoryList);
    }).catch(err => {
      res.status(404).json({ errMessage: 'Something error with the server. Try again later' })
    })
}

export const CreateCategoryHandler = async (req, res) => {
  await db.query({
    text: addCategoryQuery,
    values: [req.body.name, req.body.price, req.body.parent ? req.body.parent : null]
  }).then(async query => {
    if (query.rowCount > 0) {
      GetAllCategoryHelper()
        .then(query => {
          query.categoryList.push({});
          res.json(query.categoryList);
        })
    }
  }).catch(err => {
    console.log(err)
    res.status(404).json({ errMessage: 'Duplicate category detected/parent category does not exist. Change the category name.' })
  })
}

export const UpdateCategoryHandler = async (req, res) => {
  await db.query({
    text: updateCategoryQuery,
    values: [req.body.name, req.body.price]
  }).then(async q => {
      GetAllCategoryHelper()
        .then(query => {
          query.categoryList.push({});
          res.json(query.categoryList);
        })
  }).catch(err => {
    res.status(404).json({ errMessage: 'Please Check that price is not null and > 0' })
  })
}

export const GetAllCategoryPricesHandler = async (req, res) => {
  await GetAllCategoryHelper()
    .then(query => {
      query.categoryList.push({});
      res.json(query.categoryList);
    }).catch(err => {
      res.status(404).json({ errMessage: 'Something error with the server. Try again later' })
    })
}

export const GetAllCategoryHelper = async () => {
  const categoriesRet = await db.query({
    text: getAllCategoriesQuery
  });
  return { categoryList: categoriesRet.rows }
}
