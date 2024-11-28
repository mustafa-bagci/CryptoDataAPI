import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "https://api.coinlore.net/api/"

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
    try {
        const response = await axios.get(API_URL + "global");
        const result = response.data;
        const data = {
            coins_count: result[0].coins_count,
            active_markets: result[0].active_markets,
            total_mcap: result[0].total_mcap,
            total_volume: result[0].total_volume,
            btc_d: result[0].btc_d,
            eth_d: result[0].eth_d,
            mcap_change: result[0].mcap_change,
            volume_change: result[0].volume_change,
            avg_change_percent: result[0].avg_change_percent,
            volume_ath: result[0].volume_ath,
            mcap_ath: result[0].mcap_ath,
        }
        res.render("index.ejs", data);
    } catch (error) {
        console.log(error);
    }
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})