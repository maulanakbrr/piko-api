const app = require('express');
const router = app.Router();
const uuid = require('uuid');

// dummy database
const datas = require('../../Datas');

// get all datas
router.get('/', (req,res) => {
    res.json(datas);
});

// get single data from datas using id
router.get('/:id', (req, res) => {
    const {id} = req.params;
    const isFound = datas.some((data) => data.id === parseInt(id));
    const result = datas.filter((data) => data.id === parseInt(id));

    if (isFound){
        res.json(result); // show the result
    } else {
        res.status(400).json('data not found');
        // res.json('data not found'); // show information
    }
});

// create new data
router.post('/', (req, res) => {
    const newData = {
        id: uuid.v4(),
        name: req.body.name,
        urlCode: req.body.urlCode
    };

    if (!newData.name || !newData.urlCode){
        return res.status(400).json("can't create new data");
    }

    datas.push(newData);
    res.json(datas);
    // res.redirect('/');
});

// update data
router.put('/:id', (req, res) => {
    const {id} = req.params;
    const isFound = datas.some((data) => data.id === parseInt(id));
    const updateData = req.body;
    
    if (isFound){
        datas.forEach((data) => {
            if (data.id === parseInt(id)){
                data.name = updateData.name ? updateData.name : data.name;
                data.urlCode = updateData.urlCode ? updateData.urlCode : data.urlCode;

                res.json({
                    msg: "data updated!",
                    data: data
                });
            }
        });
    } else {
        res.status(400).json("data not found, can't updated");
        // res.json('data not found'); // show information
    }
});

// delete member
router.delete('/:id', (req,res) => {
    const {id} = req.params
    const isFound = datas.some((data) => data.id === parseInt(id));

    if (isFound){
        res.json({
            msg: 'data deleted',
            datas: datas.filter(data => data.id !== parseInt(id))
        })
    } else {
        res.status(400).json("data not found, can't deleted")
    }
});

module.exports = router;