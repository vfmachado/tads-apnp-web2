const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

module.exports = () => {
    
    const app = express();

    app.use(helmet());
    app.use(cors());
    app.use(express.json());
    
    const routes = require('../../interface/routes/routes');
    app.use(routes);

    app.listen(3000, () => {
        console.log("Listen at 3000");
    });

}