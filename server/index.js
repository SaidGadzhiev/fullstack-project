const express = require('express');
const morgan = require('morgan');
const getAllItems = require('./endpoints/items/getAllItems');
const getAllCategories = require('./endpoints/categories/getAllCategories');
const deleteItem = require('./endpoints/items/deleteItem');
const createItem = require('./endpoints/items/createItem');
const getSingleItem = require('./endpoints/items/getSingleItem');
const updateItem = require('./endpoints/items/updateItem');
const deleteCategory = require('./endpoints/categories/deleteCategory');
const getSingleCategory = require('./endpoints/categories/getSingleCategory');
const createCategory = require('./endpoints/categories/createCategory');
const updateCategory = require('./endpoints/categories/updateCategory');
const createUser = require('./endpoints/users/createUser');
const getAllRequests = require('./endpoints/requests/getAllRequests');
const createRequest = require('./endpoints/requests/createRequest');
const updateRequest = require('./endpoints/requests/updateRequest');
const getSingleUser = require('./endpoints/users/getSingleUser');
const updateAllItemsByCat = require('./endpoints/items/updateAllItemsByCat');
const newNotification = require('./endpoints/notification/newNotification');
const app = express();
const port = 4000;

app.use(function (req, res, next) {
	res.header(
		'Access-Control-Allow-Methods',
		'OPTIONS, HEAD, GET, PUT, POST, DELETE'
	);
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept'
	);
	next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('tiny'));

app.get('/bacon', (req, res) => res.status(200).json({ data: '🥓' }));

//items endpoints
app.get('/items', getAllItems);
app.get('/items/key/:key/:value', getSingleItem);
app.delete('/items/:id', deleteItem);
app.post('/items', createItem);
app.patch('/items/:id', updateItem);
app.patch('/items/key/:key/:value', updateAllItemsByCat);

//categories endpoints
app.get('/categories', getAllCategories);
app.get('/categories/key/:key/:value', getSingleCategory);
app.delete('/categories/:id', deleteCategory);
app.post('/categories', createCategory);
app.patch('/categories/:id', updateCategory);

//requests endpoints
app.get('/requests', getAllRequests);
app.post('/requests', createRequest);
app.patch('/requests/:id', updateRequest);

//users endpoints
app.post('/user', getSingleUser);
app.post('/users', createUser);

//notification endpoints
app.post('/notification', newNotification);

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
