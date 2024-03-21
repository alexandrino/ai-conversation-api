# AI Conversation and Summarization Application

This is a simple Node.js application that uses the OpenAI ChatGPT API to interact with a user, engage in a conversation, and summarize the main points.

### Prerequisites

- Node.js
- NPM
- OpenAI API key

### Installing

1. Install the dependencies

```bash
npm install
```

2. Create a .env file in the root directory of the project and insert your key-value pairs in the following format of OPENAI_API_KEY=VALUE:

```bash
OPENAI_API_KEY=Your-API-Key
```

### Usage

Run the application
This API will run on http://localhost:3001

```bash
npm start
```

Making a request:

```bash
curl --location 'http://localhost:3001/chat' \
--header 'Content-Type: application/json' \
--header 'profile_id: 3' \
--data '{
    "message": "what is a software engineer?"
}'
```

The response body contains an array with user questions and assistant anwsers

```bash
[
    {
        "role": "user",
        "content": "what is a software engineer?"
    },
    {
        "role": "assistant",
        "content": "A software engineer is a professional who applies engineering principles to design, develop, maintain, test, and evaluate software and systems. They typically work with computer programs and application software to create functional and efficient solutions to meet specific needs or requirements. Software engineers often specialize in specific programming languages, technologies, or platforms to deliver high-quality software products. They may work on a variety of projects, including web and mobile applications, operating systems, databases, and more."
    }
]
```

Get the conversation summary:

```bash
curl --location 'http://localhost:3001/chat/summary' \
--header 'profile_id: 3'
```

Lint

```bash
npm run lint
```

### Notes

- For a question of time, I will use a simple hashmap structure profileMessages to store the conversation. I could use a mongoDB database to store this information or a Redis cache. I'm well aware that this is going to create a problem with race conditions, But I don't have enough time to solve this problem using a database or a cache

### Tech Debts:

- Use winston lib to write logs
- Write unit and integration tests
- Create a Docker file to run the app inside a container
- Create a docker-compose file to run all services
- Create hooks to run lint/tests before git commit
- Improve some async calls to try to do it concurrently
- Maybe create a version in TS
