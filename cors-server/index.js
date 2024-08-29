const { default: axios } = require('axios');
const cors = require('cors')
const express=require('express');
const app=express();
const PORT=5000;

app.use(cors())
app.use(express.json())
app.get('/rent-store/movies', async (req,res)=>{
    const { token, host, page_size, page } = req.query
    try {
        const results = await axios.get(`${host}/rent-store/movies?page=${page}&page_size=${page_size}`, { headers: { 'Authorization': `Bearer ${token}`}});
        res.status(200).json(results.data)
    }
    catch(e) {
        res.status(e.status).send(e)
    }
})
app.post('/rent-store/movies', async (req,res)=>{
    const { token, host } = req.query
    console.log(req.body)
    try {
        const results = await axios.post(`${host}/rent-store/movies/`, req.body, { headers: { 'Authorization': `Bearer ${token}`}});
        res.status(200).json(results.data)
    }
    catch(e) {
        res.status(e.status).send(e)
    }
})
app.get('/rent-store/rentals', async (req,res)=>{
    const { token, host, page_size, page } = req.query
    const currentRented = req.query.hasOwnProperty('only-active') ? `&only-active` : ``
    try {
        const results = await axios.get(`${host}/rent-store/rentals?page=${page}&page_size=${page_size}${currentRented}`, { headers: { 'Authorization': `Bearer ${token}`}});
        res.status(200).json(results.data)
    }
    catch(e) {
        res.status(e.status).send(e)
    }
})
app.post('/rent-store/rentals', async (req,res)=>{
    const { token, host } = req.query
    const { movie } = req.body
    try {
        const results = await axios.post(`${host}/rent-store/rentals/`, { movie }, { headers: { 'Authorization': `Bearer ${token}`}});
        res.status(200).json(results.data)
    }
    catch(e) {
        res.status(e.status).send(e)
    }
})
app.patch('/rent-store/rentals', async (req,res)=>{
    const { token, host } = req.query
    const { uuid } = req.body
    try {
        const results = await axios.patch(`${host}/rent-store/rentals/${uuid}`, {}, { headers: { 'Authorization': `Bearer ${token}`}});
        res.status(200).json(results.data)
    }
    catch(e) {
        res.status(e.status).send(e)
    }
})
app.get('/rent-store/categories', async (req,res)=>{
    const { token, host } = req.query
    try {
        const results = await axios.get(`${host}/rent-store/categories`, { headers: { 'Authorization': `Bearer ${token}`}});
        res.status(200).json(results.data)
    }
    catch(e) {
        res.status(e.status).send(e)
    }
})
app.post('/auth/login',async (req,res)=>{
    const {credentials, host} = req.body
    try {
        const results = await axios.post(`${host}/auth/login/`, credentials);
        res.json(results.data)
    }
    catch(e) {
        res.send(e)
    }
})
app.post('/auth/refresh',async (req,res)=>{
    const {refreshToken, host} = req.body
    try {
        const results = await axios.post(`${host}/auth/refresh/`, refreshToken);
        res.json(results.data)
    }
    catch(e) {
        res.send(e)
    }
})
app.get('/rent-store/profile', async (req,res)=>{
    const { token, host } = req.query
    try {
        const results = await axios.get(`${host}/rent-store/profile`, { headers: { 'Authorization': `Bearer ${token}`}});
        res.json(results.data)
    }
    catch(e) {
        res.send(e)
    }
})
app.listen(PORT,()=>console.log(`server running on port ${PORT}`))