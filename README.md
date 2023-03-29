# Welcome to StrAPI!

## StrAPI - the free and open-source application for stress-testing RESTful API routes!

---

<div align="center">
  <img src="./public/logo_512.png">
</div>

---

## Table of Contents

- [Getting Started](#-getting-started)
- [Tests](#-run-tests)
- [Iteration Plans](#-iteration-plans)

## Getting Started

### Prerequisites:

- If you do not have it, install <a href='https://github.com/giltene/wrk2'>Wrk2</a>. This can be installed via <a href='https://brew.sh/'>Homebrew</a> on MacOS.
  - NOTE: Mac devices using the M1 chip may require additional configuration setting up Wrk2.
  - Linux users can install Wrk2 via the following commands:
    ```
    sudo apt-get install -y build-essential libssl-dev git zlib1g-dev
    git clone https://github.com/giltene/wrk2.git
    cd wrk2
    make
    sudo cp wrk /usr/local/bin
    ```
- Make sure your server is up and running on your machine. If you are in development, the server URL should be something like `http://localhost:1234`, with the 1-2-3-4 being your server's port number.
- If your application is running in a Docker container, make sure to have your local port exposed and ensure you are referencing the right port number.
- If you are testing a database, make sure to have it configured to a test environment.

### Instructions:

1. Fork and clone this repository to your local machine.
2. Ensure your server's API endpoints are exposed and your server is running.
3. Within the StrAPI directory, run `npm run dev`
4. In your browser, go to `http://localhost:3100`
5. Click the "Dashboard" link located on the header at the top-right of the page.
6. Input all required testing parameters as shown on the Dashboard page.
   - If you are testing POST requests, format the body of the request in JSON format with key-value pairs.
7. After all required parameters are input, hit "Start Test" to begin the test.

### Viewing Test Results

1.
