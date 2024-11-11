const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

//Insert MongoDB Connection - Dani Baker



//add mongodb connection logic


try {
    app.listen(PORT, () => console.log(`Server is listening on port: ${PORT}`))
} catch (error) {
    console.log(`something went wrong: ${error.message}`)
}