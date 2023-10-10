`npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

що встановити

npm i react-redux
npm i @reduxjs/toolkit
npm i redux-persist
npm i react-router-dom
npm i axios
npm i notiflix

1. Старт нового проекту:

в консолі
$ npx create-react-app project_name
cd project_name
npm install gh-pages --save-dev
в проекті

відкрити package.json і дописати homepage
"homepage": "https://melvinsz.github.io/project_name",
"name": "project_name",
додати в scripts
"scripts": {
"predeploy": "npm run build",
"deploy": "gh-pages -d build",

через github desktop закидуємо на github

2.Огортаємо в index.js наш App.js в Provider та BrowserRouter
<React.StrictMode>
<Provider store={store}>
<BrowserRouter basename="car-finder">
<App />
</BrowserRouter>
</Provider>
</React.StrictMode>

3. В App.js створюємо нашу навігацію та створюємо роути

. створити в src папку components де будемо зберігати всі файли
якщо маємо якийсь бек і нам потрібен стор то створюємо папку redux, в ній

    .1 selectors.js - щоб було легше звертатись до елеметів стейту, наприклад export const selectContactsList = state => state.contacts.contacts.items;

    .2 operations.js - описуємо всі операції наших запитів:
    .2.1 fetchAll
    export const fetchAll = createAsyncThunk(
    'contacts/fetchAll',
    async (\_, thunkAPI) => {
    try {
    const response = await axios.get('/contacts');
    return { items: response.data };
    } catch (e) {
    return thunkAPI.rejectWithValue(e.message);
    }
    }
    .2.2 add
    export const addContact = createAsyncThunk(
    'contacts/addContact',
    async ({ name, number }, thunkAPI) => {
    try {
    const response = await axios.post('/contacts', { name, phone: number });
    return response.data;
    } catch (e) {
    return thunkAPI.rejectWithValue(e.message);
    }
    }
    );
    .2.3 delete
    export const deleteContact = createAsyncThunk(
    'contacts/deleteTask',
    async (contactId, thunkAPI) => {
    try {
    const response = await axios.delete(`/contacts/${contactId}`);
    return response.data;
    } catch (e) {
    return thunkAPI.rejectWithValue(e.message);
    }
    }
    );

    .3 slice.js - створюємо слайс де описуємо стейт початковий, та що має в ньому змінюватись при відповідних операціях
    const initialState = {
    contacts: {
    items: [],
    isLoading: false,
    error: null,
    },
    filter: '',
    };

    .addCase(fetchAll.fulfilled, (state, action) => {
    state.contacts.isLoading = false;
    state.contacts.error = null;
    state.contacts.items = action.payload.items;
    })

    .4 store.js - налаштовуємо стор відповідним редюсером
