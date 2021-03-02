# job-portal

## DASS assignment 1 (a mern stack app)

## Installations

### Node

* For Linux:
```
curl -sL https://deb.nodesource.com/setup_13.x | sudo -E bash -
sudo apt-get install -y nodejs
```

* For Mac:
```
brew install node
```

### MongoDB

Install the community edition [here](https://docs.mongodb.com/manual/installation/#mongodb-community-edition-installation-tutorials).


### React

```
npm install -g create-react-app
```

## Running the code

* Run Mongo daemon:
```
sudo mongod
```
Mongo will be running on port 27017.


* Run Express Backend:
```
cd backend/
npm install
npm start
```

* Run React Frontend (open a different terminal):
```
cd frontend/
npm install
npm start
```

Navigate to [http://localhost:3000/](http://localhost:3000/) in your browser.

## Contributions:
You are invited to contribute to this project by adding a PR. If genuine, the changes would be approved and added to the master branch.

### can work on:
* rating feature in both applicant and recruiter side.
* login via facebook or google.
* upload cv and profile picture in applicant side.
* download cv button on recruiter side,
* show last updated profile in recruiter's and applicant's side.
* edit job has some minor problems.
* anything else you find intresting, open for suggession.