# Tech-Venturas-Assessment-2
## TV GATEWAY MANAGEMENT PORTAL

### Overview
The TV Gateway Management Portal provides a RESTful API suite for managing gateways and their associated peripheral devices. It enables users to perform CRUD operations on gateways and devices, ensuring validation of fields and adherence to predefined constraints.

### Build With
The project is implemented using the following frameworks and Databases
* [![NestJS](https://img.shields.io/badge/NestJS-Framework-ea2845?logo=nestjs)](https://nestjs.com/)
* ![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=flat&logo=mysql&logoColor=white)

## Getting Started

### Prerequisites
* ![npm version](https://img.shields.io/badge/npm-v10.3.3-blue)
* ![Postman](https://img.shields.io/badge/Postman-FF6C37?style=flat&logo=postman&logoColor=white)

## Implementation
Steps to implement and set up the project:
1. Clone the repo
    ```sh
   git clone https://github.com/pramod-jay/Tech-Venturas-Assessment-2.git
   ```
    
2. Database Implementation
  <br/>The MySQL database server is hosted on Azure flexible server, eliminating the need for database server implementation locally. Details regarding the database configuration can be found in the <b>‘.env’</b> file in the root directory.

3. Open the project with a preferred IDE such as VSCode, IntelliJ IDEA.
   <br/>(Completion of successful opening will result in the project with the following folders and files)
<img width="214" alt="Screenshot 2024-02-29 at 01 32 14" src="https://github.com/pramod-jay/Tech-Venturas-Assessment-2/assets/91390000/fc1c15a6-1b91-482f-ab90-0bd4be76e6bb">

4. Install NPM packages
   ```sh
   npm install
   ```
5. Run the servers
    ```sh
    # develpoment
   npm run start
   ```

    ```sh
    # watch mode
   npm run start:dev
   ```

_P.S.: Installation of node modules will be necessary at the initial stage, and it will only require ‘npm start’ command for the rest of the testing._

6. Import <b>TechVenturas.postman_collection.json</b> to the Postman which is in the root folder.
<img width="327" alt="Screenshot 2024-02-29 at 01 39 49" src="https://github.com/pramod-jay/Tech-Venturas-Assessment-2/assets/91390000/784efaff-482b-456b-b819-8a07a078b9cc">

   
7. Now the environment is ready for testing via Postman.👏<br/>
<img width="260" alt="Screenshot 2024-02-29 at 01 42 25" src="https://github.com/pramod-jay/Tech-Venturas-Assessment-2/assets/91390000/db50ad8d-159f-4e7a-9e63-654801e3b3a2">

## Assumptions
* A gateway requires a name and an IP address.
* Peripheral devices are not mandatory for a gateway; they can exist independently.
* Peripheral devices can also exist without being associated with a gateway.
* If a gateway is deleted, the connected peripheral devices may not be deleted; instead, the foreign keys indicating the devices' connection to the gateway will become null.
