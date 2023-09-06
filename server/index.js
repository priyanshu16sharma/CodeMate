const http = require('http');
const axios = require('axios');
const express = require('express');
const cors = require('cors');
// Allow requests from localhost:3000
const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

const app = express();

app.use(cors(corsOptions));
app.use(express.json());
const port = 8080;
const finalResult = async (res, url3, headers, error) => {
    console.log("final");
    const result = await axios.get(url3, { headers });
    console.log(result.data);

    res.status(201).send({ "result": `${result.data}`, "error": `${error}` });
}
const checkSubmissionStatus = async (res, url2, headers) => {
    try {
        console.log("call active");
        const statusResponse = await axios.get(url2, { headers });
        const statusData = statusResponse.data;
        //console.log(statusResponse.data);
        let output;
        if (statusData.result.run_status.status === 'AC' || statusData.result.run_status.status === 'RTE' || statusData.result.run_status.status === 'RE' || statusData.result.run_status.status === 'MLE' || statusData.result.run_status.status === 'TLE') {
            output = statusData.result.run_status.output; // Capture output
            error = statusData.result.run_status.stderr;
            //toget final result
            //console.log(error);
            finalResult(res, output, headers, error);
            return;
        } else {
            setTimeout(checkSubmissionStatus, 1000); // Check status after 1 second
        }
    } catch (e) {
        console.log("Error in response 2" + e);
        // res.status(401).send({ "error": e });
    }
};

app.post("/compile", async (req, res) => {
    console.log(req.body);
    const url = 'https://api.hackerearth.com/v4/partner/code-evaluation/submissions/';
    const headers = {
        'content-type': 'application/json',
        'client-secret': '0480d8beadf3e9d62f0dc4a24c326ecfc5ef77aa'
    };
    const body = {
        "lang": req.body.language,
        "source": req.body.code,
        "input": req.body.input,
        "memory_limit": 243232,
        "time_limit": 5,
        "context": "{'id': 213121}'",
        "callback": "https://client.com/callback/"
    };

    await axios.post(url, body, { headers })
        .then(async (response) => {

            const data = response.data;
            const id = data.he_id;
            const url2 = `https://api.hackerearth.com/v4/partner/code-evaluation/submissions/${id}/`;
            let output = ''; // Initialize variable to capture output


            console.log("call: " + url2);
            checkSubmissionStatus(res, url2, headers); // Start checking submission status
        })
        .catch(error => {
            console.error('Error:', error);
        });
})

app.get("/compiler/languages", async (req, res) => {

    const options = {
        method: 'GET',
        url: 'https://judge0-ce.p.rapidapi.com/languages',
        headers: {
            'X-RapidAPI-Key': '29a16ac804mshbf9274e89c19d98p1c971cjsne93ce84e8944',
            'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
        }
    };

    try {
        const response = await axios.request(options);
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
})

app.post("/compiler/compile", async (req, res) => {

    const options = {
        method: 'POST',
        url: 'https://judge0-ce.p.rapidapi.com/submissions',
        params: {
            base64_encoded: 'true',
            fields: '*'
        },
        headers: {
            'content-type': 'application/json',
            'Content-Type': 'application/json',
            'X-RapidAPI-Key': '29a16ac804mshbf9274e89c19d98p1c971cjsne93ce84e8944',
            'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
        },
        data: {
            language_id: 91,
            source_code: 'public class Main{public static void main(String args[]){System.out.println("Hello Wrold")}}',
            stdin: 'SnVkZ2Uw'
        }
    };

    try {
        const response = await axios.request(options);
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
})
app.get("/compiler/compiled", async (req, res) => {

    const options = {
        method: 'GET',
        url: 'https://judge0-ce.p.rapidapi.com/submissions/49aa5553-48a1-425e-b307-f84981138ebc',
        params: {
            base64_encoded: 'true',
            fields: '*'
        },
        headers: {
            'X-RapidAPI-Key': '29a16ac804mshbf9274e89c19d98p1c971cjsne93ce84e8944',
            'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
        }
    };
    try {
        const response = await axios.request(options);
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }

})

app.get("/compiler/config", async (req, res) => {

    const axios = require('axios');

    const options = {
        method: 'GET',
        url: 'https://judge0-ce.p.rapidapi.com/config_info',
        headers: {
            'X-RapidAPI-Key': '29a16ac804mshbf9274e89c19d98p1c971cjsne93ce84e8944',
            'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
        }
    };

    try {
        const response = await axios.request(options);
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }

})


app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});