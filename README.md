
# GlideBike Rentals Server

GlideBike Rentals is a Bike Rental Reservation System Backend project. In this project a user can sign up / login and rent a bike and there is admin who can maintain rentals.

User: 
- can sign up with name, email, password, phone, and address
- can sign up as admin by adding "role": "admin"
- can login with email and password
- after login will get a token
- can get and update the profile information's by authorization with the token


Bike:
- An admin can create/update/delete bikes

Rental:
- An user can create a rental with bike id and start time
- An admin can mark a rental completed / bike returned
- An user or admin can get all rentals

Live: https://glide-bike-rentals-server.vercel.app/


## Tech Stack

**Client:** Next.js, TypeScript

**Server:** Node, Express, Mongoose, TypeScript


## Run Locally

Clone the project

```bash
  git clone https://github.com/NabinIslam/GlideBikeRentals-Server.git
```

Go to the project directory

```bash
  cd GlideBikeRentals-Server
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`NODE_ENV` development 

`PORT` 5000 

`DATABASE_URL` mongodb+srv://GlideBikeRentalsDBUser:faqmr1JXtOiOE7Ld@cluster0.lqyancf.mongodb.net/GlideBikeRentals?retryWrites=true&w=majority&appName=Cluster0 

`SALT_ROUND` 10 

`JWT_ACCESS_SECRET` 60e293b8467e97160670d73356bdaf971080e1d875804e421033b7071934cbf5 

`JWT_ACCESS_EXPIRES_IN` 1d 

`JWT_REFRESH_SECRET` 282d3e07af31b013614fd7bb7e9753a5baac9431ecff2e5a2a29cfa976c5c4e9 

`JWT_REFRESH_EXPIRES_IN` 30d 

