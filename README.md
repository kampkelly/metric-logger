# App
_Metric Logger_

The hosted app can be found here: [Google](google.com).
The pivotal tracker used for this app can be found here: [https://www.pivotaltracker.com/projects/2452590](https://www.pivotaltracker.com/projects/2452590).

# About
A metric logging and reporting service that sums metrics by time window for the most recent hour.

#### Technologies used at a glance
- 1 Nodejs
- 2 AWS Serverless

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
}```
