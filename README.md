# App Name
### _Metric Logger_

The hosted app on AWS EC2 can be found here: [http://ec2-3-134-114-250.us-east-2.compute.amazonaws.com:5000](http://ec2-3-134-114-250.us-east-2.compute.amazonaws.com:5000).

The API documentation can be found here: [https://documenter.getpostman.com/view/7132396/SzzhddtP?version=latest](https://documenter.getpostman.com/view/7132396/SzzhddtP?version=latest).

The pivotal tracker used for this app can be found here: [https://www.pivotaltracker.com/projects/2452590](https://www.pivotaltracker.com/projects/2452590).

A demo of this app can be found here: [demo](https://youtu.be/8mMrYv_DjYM).

# About
A metric logging and reporting service that sums metrics by time window for the most recent hour.
Any metric more than an hour old will be deleted and can't be retrieved.

#### Technologies used
- 1 Nodejs
- 2 AWS EC2

#### Setup
- 1 clone this repo.
- 2 cd `metric-logger` and run `npm install`
- 3 run `npm start`
- 4 view app at http://localhost:5000

#### Available Endpoints

##### Adding a metric
Post request to `/metric/{key}`
Body:
```
{
	"value": "12"
}
```
Sample response:
```
{}
```

##### Retrieving sum of metric values in the last one hour
Get request to `/metric/{key}/sum`

Sample response:
```
{
    "value": 11
}
```

##### Screenshots
Adding a metric

<img src="https://i.imgur.com/8au1RdE.png" alt="drawing" width="600" />

Get sum of a metric

<img src="https://i.imgur.com/eV3s1vB.png" alt="drawing" width="600" />
