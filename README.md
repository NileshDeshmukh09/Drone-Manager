# Drone-Manager-BACKEND

## SETUP

To get started and run the app:

- Clone the project using command

` git clone https://github.com/NileshDeshmukh09/Drone-Manager.git `

- Run ` npm install ` to install the corresponding node packages

- Give the env variable  
    - ` PORT` , 
    - ` DB_URL : mongodb+srv://nileshdeshmukh0908:Nilesh@cluster0.6ewz8ys.mongodb.net/droneDB?retryWrites=true&w=majority ,  ` 
    - ` SECRET-KEY : `enter-your-secret-key`

- Run ` npm start ` to run the app on http://localhost:8000

## DB TABLES

#### USERS

- id (Primary Key)
- username
- password
- createdAt
- updatedAt

#### SITES

- id (Primary Key)
- site_name
- position {
    - latitude
    - longitude
}

#### MISSION

- id (Primary Key)
- alt
- speed
- name
- waypoints {
    - alt
    - latitude
    - longitude  
    }
- createdBy
- createdAt
- updatedAt
- categoryID (Foreign Key referencing the id column of the categories table)
- siteID (Foreign Key referencing the id column of the sites table)

#### DRONES

- id (Primary Key)
- droneType
- makeName
- name
- createdAt
- updatedAt
- createdBy
- siteID (Foreign Key referencing the id column of the sites table)

#### categories

- id (Primary Key)
- name
- color
- tagName
- createdAt
- updatedAt

## VIDEO PREVIEW

https://www.veed.io/view/693c56d5-a89b-4a13-b721-85de14f7e049?panel=share

# THANKYOU FOR CHECKING THE PROJECT 
