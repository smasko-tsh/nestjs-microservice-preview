# NestJS Microservices Preview

## Setup

- `docker-compose up` - runs the project

## Services

### User:

#### Instance 1:
- port: 3000
- name: service-1
- instance: service-1:instance-1
- queue: user_queue

#### Instance 2:
- port: 3001
- name: service-1
- instance: service-1:instance-2
- queue: user_queue

### Auth:

#### Instance 1:
- port: 3002
- name: service-2
- instance: service-2:instance-1
- queue: auth_queue

### Company:

#### Instance 1:
- port: 3003
- name: service-3
- instance: service-3:instance-1
- queue: company_queue

## Flows

### Request response (single service):

Go to your browser and open http://localhost:3000/user

User service requests and waits for data from auth service then returns it to the browser

### Request response (multiple services):

Go to your browser and open http://localhost:3002/token

Auth service requests and waits for data from user service and then returns it to the browser

**Only one instance from user service is going to process this request due to the nats queue groups. If we remove queue groups all user instances will process this request and auth service will pick the first one**

### Event-based

Go to your browser and open http://localhost:3003/company

Company service will process the request and before returning data to the client will emit an event to all the services that are subscribed for the given event. 

**Only one instance from user service is going to process this event due to nats queue groups. If we remove queue groups all user instances will process this event and auth service will pick the first one**