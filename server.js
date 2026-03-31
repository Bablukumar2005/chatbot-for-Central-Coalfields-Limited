const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/scrape/:section', async (req, res) => {
    const section = req.params.section;
    const urlMap = {
        management: 'https://www.centralcoalfields.in/cmpny/mngmnt.php',
        // Add other sections as needed
    };
    const url = urlMap[section] || 'https://www.centralcoalfields.in';
    
    try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);
        const content = $('p').text().trim(); // Adjust selector based on website structure
        res.json({ content });
    } catch (error) {
        res.status(500).json({ error: 'Failed to scrape data' });
    }
});

app.listen(3000, () => console.log('Server running on port 3000'));