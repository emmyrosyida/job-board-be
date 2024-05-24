# Job Board Platform BE (Scenario 1)

This project provides a GraphQL API for managing job listings, built using AWS AppSync, MongoDB, and Lambda functions. The API is designed to be scalable, serverless, and easy to use.

## Features
- Create, update, delete, and retrieve job listings.
- Update the status of a job (e.g., open, closed, in progress).
- Simple, yet powerful GraphQL interface.
- Serverless architecture for cost-efficiency and scalability.

## Getting Started
### Prerequisites
- AWS Account
- AWS CLI installed and configured
- Node.js and npm (or yarn) installed

### Installation
1. Clone this repository.
2. Install dependencies: `yarn install`.
3. Configure your AWS credentials (e.g., using environment variables or AWS profiles).
4. Deploy the project: `yarn deploy` (or `yarn deploy:prod` for production).
5. Test the project: `yarn dev` (local).

## Usage
Once deployed, you can interact with the API using any GraphQL client (e.g., GraphiQL, Altair, Insomnia). The API endpoint will be provided in the deployment output.

## API Endpoints
| Operation      | Endpoint      | Description                             |
|----------------|---------------|-----------------------------------------|
| Mutation       | createJob     | Create a new job.                       |
| Mutation       | updateJob     | Update an existing job.                 |
| Mutation       | deleteJob     | Delete a job.                           |
| Mutation       | updateJobStatus  | Update the status of a job.          |
| Query          | listJobs      | Retrieve a list of all jobs.            |
| Query          | getJobDetail  | Retrieve details of a specific job.     |

GraphQL example can be found in the `Insomnia_2024-05-24` to be run on Insomnia_2024 API Client.