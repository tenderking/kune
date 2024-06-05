# Kune - A service for showing Zimbabwean digital services.

This is a website I created for showing which services that are available is Zimbabwe, my home country.

## Introduction

### Challenge

My initial challenge is that I wanted to created apps to fill a need in Zimbabwe. My assumption was that there aren't many digital services available. This assumption turned out to be the wrong the more I researched this.  However with the research I did I discovered that it's a lot of work to find digital services, especially if you don't know what you're for.

### Solution

My solution was to build a website the basically shows websites that  available in Zimbabwe. In addition I wanted to make core information easily available so that you wont have to look for it.

To sum up kune provides:

- A list of services available
- Core information about the services, like phone numbers and a link to the website.
- Websites manually added and vetted for functionality
- **Future Feature** Users can add services they know or own
- **Future Feature** Users can save favourites as the list of services get bigger.

### Link
- Live Site URL: [Live Site ](https://kune.co.zw)

## Implementation

Certainly! Here's a more detailed set of instructions to help a new person get started with your project:

## Getting Started with Project

### Prerequisites
- [Node.js](https://nodejs.org/) (recommended version)
- [Yarn](https://yarnpkg.com/) (optional, but recommended for this project)
- [Docker](https://www.docker.com/) (for running DynamoDB)

### Step 1: Clone the Repository

```bash
git clone <repository-url>
cd <project-folder>
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Project Configuration

Copy the `.env.example` file to `.env` and configure the environment variables as needed.

### Step 4: Development Server

Run the following command to start the development server:

```bash
npm run dev
```
### Step 5: Set Up DynamoDB

Ensure that Docker is installed and running on your machine. Then run the following command to start a DynamoDB instance in Docker:
Absolutely, if your project involves AWS services, it's crucial to set up AWS configurations. Here's an additional step to include AWS configuration:

[setting up dynamodb in docker](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.DownloadingAndRunning.html)

```bash
aws dynamodb describe-table --table-name Name_of_table --query "Table" > table_schema.json --endpoint-url http://localhost:8000

aws dynamodb describe-table --table-name Services-v0.0.2 --query "Table" > table_schema_v0.0.2.json --endpoint-url http://localhost:8000

```

to view all items in a table

```bash
aws dynamodb scan --table-name Name_of_table --query 'Items[*]' --endpoint-url http://localhost:8000

aws dynamodb list-tables --endpoint-url http://localhost:8000

aws dynamodb get-item --table-name Services --key '{"ServiceID": {"N": "213"}, "ServiceName": {"S": "Classifieds"}}' --endpoint-url http://localhost:8000

aws dynamodb batch-write-item --table-name Services-v0.0.2 --request-items file://data/ddb_data.json --endpoint-url http://localhost:8000

```

Visit `http://localhost:3000` in your browser to view the application.

### Step 6: Linting and Code Formatting

Lint and fix code formatting issues using the following command:

```bash
npm run lint
```

### Step 7: Visual Studio Code Setup

If you're using Visual Studio Code, create a `.vscode/settings.json` file with the following content:

```json
{
  "prettier.enable": false,
  "editor.formatOnSave": false,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
    "source.organizeImports": false
  }
}
```
### Step 8: Building for Production

When you are ready to deploy the project, use the following command to build the production version:

```bash
npm run build
```

### Step 7: Preview Production Build Locally

To preview the production build locally before deployment, run:

```bash
npm run preview
```

Visit `http://localhost:3000` to preview the production build.

### Step 10: Customize Configuration

If further customization is needed, refer to the [Configuration Reference](https://cli.vuejs.org/config/).

Now you should have the project up and running locally. If you encounter any issues or have questions, refer to the project documentation or seek help from the development team.
## Author

- Name - George Mushore
- Website - [Author website](https://www.georgemushore.com/)
