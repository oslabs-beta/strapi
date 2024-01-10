# Welcome to StrAPI!

## StrAPI - the free and open-source application for stress-testing RESTful API routes!

---

<div align="center">
  <img src="./public/logo_512.png">
</div>
<div align="center" style="display: flex; justify-content: center; align-items: center; gap: 25px;">
  <!-- Next.js -->
  <img src="https://img.shields.io/badge/-Next.js-black?logo=next.js&logoColor=white&style=flat" alt="Next.js">
  
  <!-- React -->
  <img src="https://img.shields.io/badge/-React_JS-61DAFB?logo=react&logoColor=white&style=flat" alt="React">
  <!-- TypeScript -->
  <img src="https://img.shields.io/badge/-TypeScript-007ACC?logo=typescript&logoColor=white&style=flat" alt="TypeScript">
  <!-- Grafana -->
  <img src="https://img.shields.io/badge/-Grafana-F46800?logo=grafana&logoColor=white&style=flat" alt="Grafana">
  <!-- Docker -->
  <img src="https://img.shields.io/badge/-Docker-2496ED?logo=docker&logoColor=white&style=flat" alt="Docker">
  <!-- Prometheus -->
  <img src="https://img.shields.io/badge/-Prometheus-E6522C?logo=prometheus&logoColor=white&style=flat" alt="Prometheus">
  <!-- Lua -->
  <img src="https://img.shields.io/badge/-Lua-2C2D72?logo=lua&logoColor=white&style=flat" alt="Lua">
  <!-- Tailwind CSS -->
  <img src="https://img.shields.io/badge/-Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white&style=flat" alt="Tailwind CSS">
</div>

---

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
- [Viewing Test Results](#viewing-test-results)
- [Future Plans](#future-plans)
## Features

### Testing:
This section is dedicated to robust HTTP route testing and benchmarking. It offers customizable configurations and employs the Wrk2 benchmarking tool, streamlining performance evaluation. Wrk2 data is extracted and visualized with Plotly, enabling quick assessment of response times and ensuring the application meets service level expectations.

 ![Alt Text](/public/run-first-test.gif)

### Viewing:
Strapi focuses on simplifying the creation and visualization of real-time performance metrics. By seamlessly integrating Grafana with Prometheus data, we harness Grafana's extensive library of templates designed for stress testing metrics and data exporters. Prometheus collects essential metrics, enabling the creation of a performance observability dashboard within Grafana.

![Alt Text](/public/run-multiple-tests.gif)

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
    ```
    - A file named wrk will be generated in that directory, rename wrk to wrk2, and then run
    ```
    sudo cp wrk2 /usr/local/bin
    ```
- Make sure your server is up and running. If you are in development mode, the server URL should be something like `http://localhost:1234`, with the 1-2-3-4 being your server's port number.
- If your application is running in a Docker container, make sure to have your local port exposed or access to the container's ip address, and ensure you are referencing the right port number.
- If you are testing a database, make sure to have it configured to a test environment.

### Instructions:

1. Fork and clone this repository to your local machine.
2. Ensure your server's API endpoints are exposed and your server is running.
3. Within the StrAPI directory, run
   ```
   npm install
   npm run dev
   ```
4. In your browser, go to <a href="http://localhost:3100">http://localhost:3100</a>
5. Click the "Dashboard" link located on the header at the top-right of the page.
6. Input all required testing parameters as shown on the Dashboard page.
   - If you are testing POST requests, format the body of the request in JSON format with key-value pairs.
7. After all required parameters are input, hit "Add Method" to include method on the test.
8. After all desired methods added, hit "Start Test" to begin testing.
  

### Viewing Test Results
![Alt Text](/public/grafana-metrics.png)
1. After the test is complete, a trace will be generated and displayed below on the latency graph.
2. Subsequent tests will be added to the graph, allowing you to compare the performance of different endpoints and tests.
3. Traces can be removed individually or all at once by clicking the Remove Traces button.
4. If the trace is not automatically displayed on the graph after the test is complete, click the "Request Plot Data Manually" button to display the trace.
5. StrAPI supports Grafana integration. To view Grafana panels click on Grafana Metrics in the left panel.
6. In the input field, enter the grafana iframe url and click "Add Panel".
7. To remove a panel, click on the "Remove Panel" button above the panel.
   

### Future Plans

- Customize Grafana and Prometheus containers to work with StrAPI by configuring docker compose.
- Add support for more HTTP methods, such as PUT, PATCH, DELETE, etc.
- Containerize StrAPI alongside Wrk2 to allow for easy deployment.
- Utilize (NoSQL/SQL) database with authentication to store test results and user data.
- Host StrAPI on AWS or other providers.
- Expand testing suite to include more tests
- Add support for Kubernetes & cluster monitoring
- Add support for web servers like Nginx and Apache.
- Add support for message brokers and event streamers like RabbitMQ and Kafka.
