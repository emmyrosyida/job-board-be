# Job Board Platform BE (Scenario 1)

This project provides a GraphQL API for managing job listings, built using AWS AppSync, MongoDB, and Lambda functions. The API is designed to be scalable, serverless, and easy to use.

## Features
- Create, update, delete, and retrieve job listings.
- Update the status of a job (e.g., active, deleted, draft).

## Getting Started
### Prerequisites
- AWS Account
- AWS CLI installed and configured
- Node.js and yarn installed

### Installation
1. Clone this repository.
2. Install dependencies: `yarn install`.
3. Configure your AWS credentials and environment (e.g., using environment variables or AWS profiles).
4. Deploy the project: `yarn deploy` (eg: `yarn deploy:prod` for production).
5. Run the project locally: `yarn dev`.
6. Test the project API: `yarn test`.

## Usage
Once deployed, you can interact with the API using any GraphQL client (e.g., Insomnia). 
The API endpoint can be found in the `Insomnia_2024-05-24.json`. 

Please use environment `develop` for testing the APIs. 

For authentication, need to install Insomnia plugin:
`https://insomnia.rest/plugins/insomnia-plugin-aws-cognito-token`

## API Endpoints
| Operation      | Endpoint      | Description                             |
|----------------|---------------|-----------------------------------------|
| Mutation       | createJob     | Create a new job.                       |
| Mutation       | updateJob     | Update an existing job.                 |
| Mutation       | deleteJob     | Delete a job. (soft delete)                        |
| Mutation       | updateJobStatus  | Update the status of a job. ( active (publisher) , draft         |
| Query          | listJobs      | Retrieve a list of all jobs.            |
| Query          | getJobDetail  | Retrieve details of a specific job.     |

CI/CD Status: 🚧 Under development – manual deployment required.

