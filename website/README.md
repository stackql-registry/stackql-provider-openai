# `openai` provider for [`stackql`](https://github.com/stackql/stackql)

This repository is used to generate and document the `openai` provider for StackQL, allowing you to query and interact with OpenAI services using SQL-like syntax. The provider is built using the `@stackql/provider-utils` package, which provides tools for converting OpenAPI specifications into StackQL-compatible provider schemas.

## Prerequisites

To use the OpenAI provider with StackQL, you'll need:

1. An OpenAI account with appropriate API credentials
2. An OpenAI API key with sufficient permissions for the resources you want to access
3. StackQL CLI installed on your system (see [StackQL](https://github.com/stackql/stackql))

## 1. Download the Open API Specification

First, download or create the OpenAI API OpenAPI specification:

```bash
mkdir -p provider-dev/downloaded
curl -L https://raw.githubusercontent.com/openai/openai-openapi/master/openapi.yaml \
  -o provider-dev/downloaded/openai-openapi.yaml

# Convert YAML to JSON if needed
python3 provider-dev/scripts/yaml_to_json.py \
  --input provider-dev/downloaded/openai-openapi.yaml \
  --output provider-dev/downloaded/openapi.json
```

## 2. Split into Service Specs

Next, split the OpenAPI specification into service-specific files:

```bash
rm -rf provider-dev/source/*
npm run split -- \
  --provider-name openai \
  --api-doc provider-dev/downloaded/openapi.json \
  --svc-discriminator tag \
  --output-dir provider-dev/source \
  --overwrite \
  --svc-name-overrides "$(cat <<EOF
{
  "models": "models",
  "completions": "completions",
  "chat": "chat",
  "embeddings": "embeddings",
  "fine-tuning": "fine_tuning",
  "files": "files",
  "images": "images",
  "audio": "audio",
  "moderations": "moderations",
  "assistants": "assistants",
  "threads": "threads",
  "batches": "batches"
}
EOF
)"
```

## 3. Generate Mappings

Generate the mapping configuration that connects OpenAPI operations to StackQL resources:

```bash
npm run generate-mappings -- \
  --provider-name openai \
  --input-dir provider-dev/source \
  --output-dir provider-dev/config
```

Update the resultant `provider-dev/config/all_services.csv` to add the `stackql_resource_name`, `stackql_method_name`, `stackql_verb` values for each operation.

## 4. Generate Provider

This step transforms the split OpenAPI service specs into a fully-functional StackQL provider by applying the resource and method mappings defined in your CSV file.

```bash
rm -rf provider-dev/openapi/*
npm run generate-provider -- \
  --provider-name openai \
  --input-dir provider-dev/source \
  --output-dir provider-dev/openapi/src/openai \
  --config-path provider-dev/config/all_services.csv \
  --servers '[{"url": "https://api.openai.com/v1"}]' \
  --provider-config '{"auth": {"credentialsenvvar": "OPENAI_API_KEY", "type": "bearer"}}' \
  --overwrite
```

## 5. Test Provider

### Starting the StackQL Server

Before running tests, start a StackQL server with your provider:

```bash
PROVIDER_REGISTRY_ROOT_DIR="$(pwd)/provider-dev/openapi"
npm run start-server -- --provider openai --registry $PROVIDER_REGISTRY_ROOT_DIR
```

### Test Meta Routes

Test all metadata routes (services, resources, methods) in the provider:

```bash
npm run test-meta-routes -- openai --verbose
```

When you're done testing, stop the StackQL server:

```bash
npm run stop-server
```

Use this command to view the server status:

```bash
npm run server-status
```

### Run test queries

Run some test queries against the provider using the `stackql shell`:

```bash
PROVIDER_REGISTRY_ROOT_DIR="$(pwd)/provider-dev/openapi"
REG_STR='{"url": "file://'${PROVIDER_REGISTRY_ROOT_DIR}'", "localDocRoot": "'${PROVIDER_REGISTRY_ROOT_DIR}'", "verifyConfig": {"nopVerify": true}}'
./stackql shell --registry="${REG_STR}"
```

Example queries to try:

```sql
-- List all available models
SELECT 
id,
object,
created,
owned_by
FROM openai.models.models;

-- Get information about a specific model
SELECT 
id,
object,
created,
owned_by
FROM openai.models.model
WHERE id = 'gpt-4';

-- List uploaded files
SELECT 
id,
object,
bytes,
created_at,
filename,
purpose
FROM openai.files.files;

-- Create a chat completion (text generation)
INSERT INTO openai.chat.completions (
  json_data
) VALUES (
  '{
    "model": "gpt-3.5-turbo",
    "messages": [
      {
        "role": "system",
        "content": "You are a helpful assistant."
      },
      {
        "role": "user",
        "content": "Hello, how are you today?"
      }
    ]
  }'
);

-- Create an embedding
INSERT INTO openai.embeddings.embeddings (
  json_data
) VALUES (
  '{
    "model": "text-embedding-ada-002",
    "input": "The food was delicious and the service was excellent."
  }'
);

-- List fine-tuning jobs
SELECT 
id,
object,
model,
created_at,
finished_at,
fine_tuned_model,
organization_id,
status,
training_file
FROM openai.fine_tuning.jobs;

-- List assistants
SELECT 
id,
object,
created_at,
name,
description,
model,
instructions,
tools,
metadata
FROM openai.assistants.assistants;
```

## 6. Publish the provider

To publish the provider push the `openai` dir to `providers/src` in a feature branch of the [`stackql-provider-registry`](https://github.com/stackql/stackql-provider-registry). Follow the [registry release flow](https://github.com/stackql/stackql-provider-registry/blob/dev/docs/build-and-deployment.md).  

Launch the StackQL shell:

```bash
export DEV_REG="{ \"url\": \"https://registry-dev.stackql.app/providers\" }"
./stackql --registry="${DEV_REG}" shell
```

Pull the latest dev `openai` provider:

```sql
registry pull openai;
```

Run some test queries to verify the provider works as expected.

## 7. Generate web docs

Provider doc microsites are built using Docusaurus and published using GitHub Pages.  

a. Update `headerContent1.txt` and `headerContent2.txt` accordingly in `provider-dev/docgen/provider-data/`  

b. Update the following in `website/docusaurus.config.js`:  

```js
// Provider configuration - change these for different providers
const providerName = "openai";
const providerTitle = "OpenAI Provider";
```

c. Then generate docs using...

```bash
npm run generate-docs -- \
  --provider-name openai \
  --provider-dir ./provider-dev/openapi/src/openai/v00.00.00000 \
  --output-dir ./website \
  --provider-data-dir ./provider-dev/docgen/provider-data
```  

## 8. Test web docs locally

```bash
cd website
# test build
yarn build

# run local dev server
yarn start
```

## 9. Publish web docs to GitHub Pages

Under __Pages__ in the repository, in the __Build and deployment__ section select __GitHub Actions__ as the __Source__. In Netlify DNS create the following records:

| Source Domain | Record Type  | Target |
|---------------|--------------|--------|
| openai-provider.stackql.io | CNAME | stackql.github.io. |

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.