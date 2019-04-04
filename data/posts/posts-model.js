const db = require('../dbConfig.js');


// const knex = require('knex');
// const config = require('../knexfile.js');
// const db = knex(config.development);

module.exports = {
  find,
  findById,
  add,
  remove,
  update,
  findPostMessages,
  findMessageById,
  addMessage,
};

function find(query) {
  let { page = 1, limit = 5, sortby = 'id', sortdir = 'asc' } = query;
  // limit = Math.min(limit, 10);
  const offset = limit * (page - 1);

  // const response = {
  //   results: data,
  //   pagination: {
  //     page: 2,
  //     limit: 100,
  //     count: 45,
  //     totalRecords: 145,
  //   },
  // };

  let rows = db('posts')
    .orderBy(sortby, sortdir)
    .limit(limit)
    .offset(offset);

  return rows;
}

function findById(id) {
  return db('posts')
    .where({ id })
    .first();
}

async function add(post) {
  const [id] = await db('posts').insert(post);

  return findById(id);
}

function remove(id) {
  return db('posts')
    .where({ id })
    .del();
}

function update(id, changes) {
  return db('posts')
    .where({ id })
    .update(changes, '*');
}

function findPostMessages(postId) {
  return db('messages as m')
    .join('posts as h', 'm.post_id', 'h.id')
    .select('m.id', 'm.text', 'm.sender', 'h.id as postId', 'h.name as post')
    .where({ post_id: postId });
}

function findMessageById(id) {
  return db('messages')
    .where({ id })
    .first();
}

async function addMessage(message) {
  const [id] = await db('messages').insert(message);

  return findMessageById(id);
}