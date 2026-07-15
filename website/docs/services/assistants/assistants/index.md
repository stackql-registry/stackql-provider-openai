--- 
title: assistants
hide_title: false
hide_table_of_contents: false
keywords:
  - assistants
  - assistants
  - openai
  - infrastructure-as-code
  - configuration-as-data
  - cloud inventory
description: Query, deploy and manage openai resources using SQL
custom_edit_url: null
image: /img/stackql-openai-provider-featured-image.png
---

import CopyableCode from '@site/src/components/CopyableCode/CopyableCode';
import CodeBlock from '@theme/CodeBlock';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Creates, updates, deletes, gets or lists an <code>assistants</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="assistants" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="openai.assistants.assistants" /></td></tr>
</tbody></table>

## Fields

The following fields are returned by `SELECT` queries:

<Tabs
    defaultValue="get"
    values={[
        { label: 'get', value: 'get' },
        { label: 'list', value: 'list' }
    ]}
>
<TabItem value="get">

<table>
<thead>
    <tr>
    <th>Name</th>
    <th>Datatype</th>
    <th>Description</th>
    </tr>
</thead>
<tbody>
<tr>
    <td><CopyableCode code="id" /></td>
    <td><code>string</code></td>
    <td>The identifier, which can be referenced in API endpoints.</td>
</tr>
<tr>
    <td><CopyableCode code="name" /></td>
    <td><code>string</code></td>
    <td>The name of the assistant. The maximum length is 256 characters. </td>
</tr>
<tr>
    <td><CopyableCode code="created_at" /></td>
    <td><code>integer (unixtime)</code></td>
    <td>The Unix timestamp (in seconds) for when the assistant was created.</td>
</tr>
<tr>
    <td><CopyableCode code="description" /></td>
    <td><code>string</code></td>
    <td>The description of the assistant. The maximum length is 512 characters. </td>
</tr>
<tr>
    <td><CopyableCode code="instructions" /></td>
    <td><code>string</code></td>
    <td>The system instructions that the assistant uses. The maximum length is 256,000 characters. </td>
</tr>
<tr>
    <td><CopyableCode code="metadata" /></td>
    <td><code>object</code></td>
    <td>Set of 16 key-value pairs that can be attached to an object. This can be useful for storing additional information about the object in a structured format, and querying for objects via API or the dashboard.  Keys are strings with a maximum length of 64 characters. Values are strings with a maximum length of 512 characters.  (x-oaiTypeLabel: map)</td>
</tr>
<tr>
    <td><CopyableCode code="model" /></td>
    <td><code>string</code></td>
    <td>ID of the model to use. You can use the [List models](https://platform.openai.com/docs/api-reference/models/list) API to see all of your available models, or see our [Model overview](https://platform.openai.com/docs/models) for descriptions of them. </td>
</tr>
<tr>
    <td><CopyableCode code="object" /></td>
    <td><code>string</code></td>
    <td>The object type, which is always `assistant`. (assistant)</td>
</tr>
<tr>
    <td><CopyableCode code="response_format" /></td>
    <td><code>string</code></td>
    <td>Specifies the format that the model must output. Compatible with [GPT-4o](https://platform.openai.com/docs/models#gpt-4o), [GPT-4 Turbo](https://platform.openai.com/docs/models#gpt-4-turbo-and-gpt-4), and all GPT-3.5 Turbo models since `gpt-3.5-turbo-1106`.  Setting to `&#123; "type": "json_schema", "json_schema": &#123;...&#125; &#125;` enables Structured Outputs which ensures the model will match your supplied JSON schema. Learn more in the [Structured Outputs guide](https://platform.openai.com/docs/guides/structured-outputs).  Setting to `&#123; "type": "json_object" &#125;` enables JSON mode, which ensures the message the model generates is valid JSON.  **Important:** when using JSON mode, you **must** also instruct the model to produce JSON yourself via a system or user message. Without this, the model may generate an unending stream of whitespace until the generation reaches the token limit, resulting in a long-running and seemingly "stuck" request. Also note that the message content may be partially cut off if `finish_reason="length"`, which indicates the generation exceeded `max_tokens` or the conversation exceeded the max context length.  (auto) (title: Text)</td>
</tr>
<tr>
    <td><CopyableCode code="temperature" /></td>
    <td><code>number</code></td>
    <td>What sampling temperature to use, between 0 and 2. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic. </td>
</tr>
<tr>
    <td><CopyableCode code="tool_resources" /></td>
    <td><code>object</code></td>
    <td>A set of resources that are used by the assistant's tools. The resources are specific to the type of tool. For example, the `code_interpreter` tool requires a list of file IDs, while the `file_search` tool requires a list of vector store IDs. </td>
</tr>
<tr>
    <td><CopyableCode code="tools" /></td>
    <td><code>array</code></td>
    <td>A list of tool enabled on the assistant. There can be a maximum of 128 tools per assistant. Tools can be of types `code_interpreter`, `file_search`, or `function`. </td>
</tr>
<tr>
    <td><CopyableCode code="top_p" /></td>
    <td><code>number</code></td>
    <td>An alternative to sampling with temperature, called nucleus sampling, where the model considers the results of the tokens with top_p probability mass. So 0.1 means only the tokens comprising the top 10% probability mass are considered.  We generally recommend altering this or temperature but not both. </td>
</tr>
</tbody>
</table>
</TabItem>
<TabItem value="list">

<table>
<thead>
    <tr>
    <th>Name</th>
    <th>Datatype</th>
    <th>Description</th>
    </tr>
</thead>
<tbody>
<tr>
    <td><CopyableCode code="id" /></td>
    <td><code>string</code></td>
    <td>The identifier, which can be referenced in API endpoints.</td>
</tr>
<tr>
    <td><CopyableCode code="name" /></td>
    <td><code>string</code></td>
    <td>The name of the assistant. The maximum length is 256 characters. </td>
</tr>
<tr>
    <td><CopyableCode code="created_at" /></td>
    <td><code>integer (unixtime)</code></td>
    <td>The Unix timestamp (in seconds) for when the assistant was created.</td>
</tr>
<tr>
    <td><CopyableCode code="description" /></td>
    <td><code>string</code></td>
    <td>The description of the assistant. The maximum length is 512 characters. </td>
</tr>
<tr>
    <td><CopyableCode code="instructions" /></td>
    <td><code>string</code></td>
    <td>The system instructions that the assistant uses. The maximum length is 256,000 characters. </td>
</tr>
<tr>
    <td><CopyableCode code="metadata" /></td>
    <td><code>object</code></td>
    <td>Set of 16 key-value pairs that can be attached to an object. This can be useful for storing additional information about the object in a structured format, and querying for objects via API or the dashboard.  Keys are strings with a maximum length of 64 characters. Values are strings with a maximum length of 512 characters.  (x-oaiTypeLabel: map)</td>
</tr>
<tr>
    <td><CopyableCode code="model" /></td>
    <td><code>string</code></td>
    <td>ID of the model to use. You can use the [List models](https://platform.openai.com/docs/api-reference/models/list) API to see all of your available models, or see our [Model overview](https://platform.openai.com/docs/models) for descriptions of them. </td>
</tr>
<tr>
    <td><CopyableCode code="object" /></td>
    <td><code>string</code></td>
    <td>The object type, which is always `assistant`. (assistant)</td>
</tr>
<tr>
    <td><CopyableCode code="response_format" /></td>
    <td><code>string</code></td>
    <td>Specifies the format that the model must output. Compatible with [GPT-4o](https://platform.openai.com/docs/models#gpt-4o), [GPT-4 Turbo](https://platform.openai.com/docs/models#gpt-4-turbo-and-gpt-4), and all GPT-3.5 Turbo models since `gpt-3.5-turbo-1106`.  Setting to `&#123; "type": "json_schema", "json_schema": &#123;...&#125; &#125;` enables Structured Outputs which ensures the model will match your supplied JSON schema. Learn more in the [Structured Outputs guide](https://platform.openai.com/docs/guides/structured-outputs).  Setting to `&#123; "type": "json_object" &#125;` enables JSON mode, which ensures the message the model generates is valid JSON.  **Important:** when using JSON mode, you **must** also instruct the model to produce JSON yourself via a system or user message. Without this, the model may generate an unending stream of whitespace until the generation reaches the token limit, resulting in a long-running and seemingly "stuck" request. Also note that the message content may be partially cut off if `finish_reason="length"`, which indicates the generation exceeded `max_tokens` or the conversation exceeded the max context length.  (auto) (title: Text)</td>
</tr>
<tr>
    <td><CopyableCode code="temperature" /></td>
    <td><code>number</code></td>
    <td>What sampling temperature to use, between 0 and 2. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic. </td>
</tr>
<tr>
    <td><CopyableCode code="tool_resources" /></td>
    <td><code>object</code></td>
    <td>A set of resources that are used by the assistant's tools. The resources are specific to the type of tool. For example, the `code_interpreter` tool requires a list of file IDs, while the `file_search` tool requires a list of vector store IDs. </td>
</tr>
<tr>
    <td><CopyableCode code="tools" /></td>
    <td><code>array</code></td>
    <td>A list of tool enabled on the assistant. There can be a maximum of 128 tools per assistant. Tools can be of types `code_interpreter`, `file_search`, or `function`. </td>
</tr>
<tr>
    <td><CopyableCode code="top_p" /></td>
    <td><code>number</code></td>
    <td>An alternative to sampling with temperature, called nucleus sampling, where the model considers the results of the tokens with top_p probability mass. So 0.1 means only the tokens comprising the top 10% probability mass are considered.  We generally recommend altering this or temperature but not both. </td>
</tr>
</tbody>
</table>
</TabItem>
</Tabs>

## Methods

The following methods are available for this resource:

<table>
<thead>
    <tr>
    <th>Name</th>
    <th>Accessible by</th>
    <th>Required Params</th>
    <th>Optional Params</th>
    <th>Description</th>
    </tr>
</thead>
<tbody>
<tr>
    <td><a href="#get"><CopyableCode code="get" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-assistant_id"><code>assistant_id</code></a></td>
    <td><a href="#parameter-openai-organization"><code>openai-organization</code></a>, <a href="#parameter-openai-project"><code>openai-project</code></a></td>
    <td></td>
</tr>
<tr>
    <td><a href="#list"><CopyableCode code="list" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td></td>
    <td><a href="#parameter-limit"><code>limit</code></a>, <a href="#parameter-order"><code>order</code></a>, <a href="#parameter-after"><code>after</code></a>, <a href="#parameter-before"><code>before</code></a>, <a href="#parameter-openai-organization"><code>openai-organization</code></a>, <a href="#parameter-openai-project"><code>openai-project</code></a></td>
    <td></td>
</tr>
<tr>
    <td><a href="#create"><CopyableCode code="create" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-model"><code>model</code></a></td>
    <td><a href="#parameter-openai-organization"><code>openai-organization</code></a>, <a href="#parameter-openai-project"><code>openai-project</code></a></td>
    <td></td>
</tr>
<tr>
    <td><a href="#update"><CopyableCode code="update" /></a></td>
    <td><CopyableCode code="update" /></td>
    <td><a href="#parameter-assistant_id"><code>assistant_id</code></a></td>
    <td><a href="#parameter-openai-organization"><code>openai-organization</code></a>, <a href="#parameter-openai-project"><code>openai-project</code></a></td>
    <td></td>
</tr>
<tr>
    <td><a href="#delete"><CopyableCode code="delete" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-assistant_id"><code>assistant_id</code></a></td>
    <td><a href="#parameter-openai-organization"><code>openai-organization</code></a>, <a href="#parameter-openai-project"><code>openai-project</code></a></td>
    <td></td>
</tr>
</tbody>
</table>

## Parameters

Parameters can be passed in the `WHERE` clause of a query. Check the [Methods](#methods) section to see which parameters are required or optional for each operation.

<table>
<thead>
    <tr>
    <th>Name</th>
    <th>Datatype</th>
    <th>Description</th>
    </tr>
</thead>
<tbody>
<tr id="parameter-assistant_id">
    <td><CopyableCode code="assistant_id" /></td>
    <td><code>string</code></td>
    <td>The ID of the assistant to delete.</td>
</tr>
<tr id="parameter-after">
    <td><CopyableCode code="after" /></td>
    <td><code>string</code></td>
    <td>A cursor for use in pagination. `after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list. </td>
</tr>
<tr id="parameter-before">
    <td><CopyableCode code="before" /></td>
    <td><code>string</code></td>
    <td>A cursor for use in pagination. `before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with obj_foo, your subsequent call can include before=obj_foo in order to fetch the previous page of the list. </td>
</tr>
<tr id="parameter-limit">
    <td><CopyableCode code="limit" /></td>
    <td><code>integer</code></td>
    <td>A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20.  Automatically applied from a SQL `LIMIT` clause - `SELECT ... LIMIT 10` sends `limit=10` on the wire. Setting it explicitly in a `WHERE` clause is not required.</td>
</tr>
<tr id="parameter-openai-organization">
    <td><CopyableCode code="openai-organization" /></td>
    <td><code>string</code></td>
    <td>Optionally scope the request to a specific organization (overrides the default associated with the API key). Addressable in SQL as `openai_organization`.</td>
</tr>
<tr id="parameter-openai-project">
    <td><CopyableCode code="openai-project" /></td>
    <td><code>string</code></td>
    <td>Optionally scope the request to a specific project (overrides the default associated with the API key). Addressable in SQL as `openai_project`.</td>
</tr>
<tr id="parameter-order">
    <td><CopyableCode code="order" /></td>
    <td><code>string</code></td>
    <td>Sort order by the `created_at` timestamp of the objects. `asc` for ascending order and `desc` for descending order. </td>
</tr>
</tbody>
</table>

## `SELECT` examples

<Tabs
    defaultValue="get"
    values={[
        { label: 'get', value: 'get' },
        { label: 'list', value: 'list' }
    ]}
>
<TabItem value="get">

OK

```sql
SELECT
id,
name,
created_at,
description,
instructions,
metadata,
model,
object,
response_format,
temperature,
tool_resources,
tools,
top_p
FROM openai.assistants.assistants
WHERE assistant_id = '{{ assistant_id }}' -- required
AND "openai-organization" = '{{ openai-organization }}'
AND "openai-project" = '{{ openai-project }}'
;
```
</TabItem>
<TabItem value="list">

OK

```sql
SELECT
id,
name,
created_at,
description,
instructions,
metadata,
model,
object,
response_format,
temperature,
tool_resources,
tools,
top_p
FROM openai.assistants.assistants
WHERE "order" = '{{ order }}'
AND after = '{{ after }}'
AND before = '{{ before }}'
AND "openai-organization" = '{{ openai-organization }}'
AND "openai-project" = '{{ openai-project }}'
;
```
</TabItem>
</Tabs>


## `INSERT` examples

<Tabs
    defaultValue="create"
    values={[
        { label: 'create', value: 'create' },
        { label: 'Manifest', value: 'manifest' }
    ]}
>
<TabItem value="create">

No description available.

```sql
INSERT INTO openai.assistants.assistants (
model,
name,
description,
instructions,
reasoning_effort,
tools,
tool_resources,
metadata,
temperature,
top_p,
response_format,
"openai-organization",
"openai-project"
)
SELECT 
'{{ model }}' /* required */,
'{{ name }}',
'{{ description }}',
'{{ instructions }}',
'{{ reasoning_effort }}',
'{{ tools }}',
'{{ tool_resources }}',
'{{ metadata }}',
{{ temperature }},
{{ top_p }},
'{{ response_format }}',
'{{ openai-organization }}',
'{{ openai-project }}'
RETURNING
id,
name,
created_at,
description,
instructions,
metadata,
model,
object,
response_format,
temperature,
tool_resources,
tools,
top_p
;
```
</TabItem>
<TabItem value="manifest">

<CodeBlock language="yaml">{`# Description fields are for documentation purposes
- name: assistants
  props:
    - name: model
      value: "{{ model }}"
      description: |
        ID of the model to use. You can use the [List models](https://platform.openai.com/docs/api-reference/models/list) API to see all of your available models, or see our [Model overview](https://platform.openai.com/docs/models) for descriptions of them.
      valid_values: ['gpt-5', 'gpt-5-mini', 'gpt-5-nano', 'gpt-5-2025-08-07', 'gpt-5-mini-2025-08-07', 'gpt-5-nano-2025-08-07', 'gpt-4.1', 'gpt-4.1-mini', 'gpt-4.1-nano', 'gpt-4.1-2025-04-14', 'gpt-4.1-mini-2025-04-14', 'gpt-4.1-nano-2025-04-14', 'o3-mini', 'o3-mini-2025-01-31', 'o1', 'o1-2024-12-17', 'gpt-4o', 'gpt-4o-2024-11-20', 'gpt-4o-2024-08-06', 'gpt-4o-2024-05-13', 'gpt-4o-mini', 'gpt-4o-mini-2024-07-18', 'gpt-4.5-preview', 'gpt-4.5-preview-2025-02-27', 'gpt-4-turbo', 'gpt-4-turbo-2024-04-09', 'gpt-4-0125-preview', 'gpt-4-turbo-preview', 'gpt-4-1106-preview', 'gpt-4-vision-preview', 'gpt-4', 'gpt-4-0314', 'gpt-4-0613', 'gpt-4-32k', 'gpt-4-32k-0314', 'gpt-4-32k-0613', 'gpt-3.5-turbo', 'gpt-3.5-turbo-16k', 'gpt-3.5-turbo-0613', 'gpt-3.5-turbo-1106', 'gpt-3.5-turbo-0125', 'gpt-3.5-turbo-16k-0613']
    - name: name
      value: "{{ name }}"
      description: |
        The name of the assistant. The maximum length is 256 characters.
    - name: description
      value: "{{ description }}"
      description: |
        The description of the assistant. The maximum length is 512 characters.
    - name: instructions
      value: "{{ instructions }}"
      description: |
        The system instructions that the assistant uses. The maximum length is 256,000 characters.
    - name: reasoning_effort
      value: "{{ reasoning_effort }}"
      description: |
        Constrains effort on reasoning for
        [reasoning models](https://platform.openai.com/docs/guides/reasoning).
        Currently supported values are \`none\`, \`minimal\`, \`low\`, \`medium\`, \`high\`, and \`xhigh\`. Reducing
        reasoning effort can result in faster responses and fewer tokens used
        on reasoning in a response.
        - \`gpt-5.1\` defaults to \`none\`, which does not perform reasoning. The supported reasoning values for \`gpt-5.1\` are \`none\`, \`low\`, \`medium\`, and \`high\`. Tool calls are supported for all reasoning values in gpt-5.1.
        - All models before \`gpt-5.1\` default to \`medium\` reasoning effort, and do not support \`none\`.
        - The \`gpt-5-pro\` model defaults to (and only supports) \`high\` reasoning effort.
        - \`xhigh\` is supported for all models after \`gpt-5.1-codex-max\`.
      valid_values: ['none', 'minimal', 'low', 'medium', 'high', 'xhigh']
      default: medium
    - name: tools
      value: "{{ tools }}"
      description: |
        A list of tool enabled on the assistant. There can be a maximum of 128 tools per assistant. Tools can be of types \`code_interpreter\`, \`file_search\`, or \`function\`.
      default: 
    - name: tool_resources
      description: |
        A set of resources that are used by the assistant's tools. The resources are specific to the type of tool. For example, the \`code_interpreter\` tool requires a list of file IDs, while the \`file_search\` tool requires a list of vector store IDs.
      value:
        code_interpreter:
          file_ids:
            - "{{ file_ids }}"
        file_search:
          vector_store_ids:
            - "{{ vector_store_ids }}"
          vector_stores:
            - file_ids: "{{ file_ids }}"
              chunking_strategy: "{{ chunking_strategy }}"
              metadata: "{{ metadata }}"
    - name: metadata
      value: "{{ metadata }}"
      description: |
        Set of 16 key-value pairs that can be attached to an object. This can be
        useful for storing additional information about the object in a structured
        format, and querying for objects via API or the dashboard.
        Keys are strings with a maximum length of 64 characters. Values are strings
        with a maximum length of 512 characters.
    - name: temperature
      value: {{ temperature }}
      description: |
        What sampling temperature to use, between 0 and 2. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic.
      default: 1
    - name: top_p
      value: {{ top_p }}
      description: |
        An alternative to sampling with temperature, called nucleus sampling, where the model considers the results of the tokens with top_p probability mass. So 0.1 means only the tokens comprising the top 10% probability mass are considered.
        We generally recommend altering this or temperature but not both.
      default: 1
    - name: response_format
      value: "{{ response_format }}"
      description: |
        Specifies the format that the model must output. Compatible with [GPT-4o](https://platform.openai.com/docs/models#gpt-4o), [GPT-4 Turbo](https://platform.openai.com/docs/models#gpt-4-turbo-and-gpt-4), and all GPT-3.5 Turbo models since \`gpt-3.5-turbo-1106\`.
        Setting to \`{ "type": "json_schema", "json_schema": {...} }\` enables Structured Outputs which ensures the model will match your supplied JSON schema. Learn more in the [Structured Outputs guide](https://platform.openai.com/docs/guides/structured-outputs).
        Setting to \`{ "type": "json_object" }\` enables JSON mode, which ensures the message the model generates is valid JSON.
        **Important:** when using JSON mode, you **must** also instruct the model to produce JSON yourself via a system or user message. Without this, the model may generate an unending stream of whitespace until the generation reaches the token limit, resulting in a long-running and seemingly "stuck" request. Also note that the message content may be partially cut off if \`finish_reason="length"\`, which indicates the generation exceeded \`max_tokens\` or the conversation exceeded the max context length.
      valid_values: ['auto']
    - name: openai-organization
      value: "{{ openai-organization }}"
      description: Optionally scope the request to a specific organization (overrides the default associated with the API key). Addressable in SQL as \`openai_organization\`.
      description: Optionally scope the request to a specific organization (overrides the default associated with the API key). Addressable in SQL as \`openai_organization\`.
    - name: openai-project
      value: "{{ openai-project }}"
      description: Optionally scope the request to a specific project (overrides the default associated with the API key). Addressable in SQL as \`openai_project\`.
      description: Optionally scope the request to a specific project (overrides the default associated with the API key). Addressable in SQL as \`openai_project\`.
`}</CodeBlock>

</TabItem>
</Tabs>


## `UPDATE` examples

<Tabs
    defaultValue="update"
    values={[
        { label: 'update', value: 'update' }
    ]}
>
<TabItem value="update">

No description available.

```sql
UPDATE openai.assistants.assistants
SET 
model = '{{ model }}',
reasoning_effort = '{{ reasoning_effort }}',
name = '{{ name }}',
description = '{{ description }}',
instructions = '{{ instructions }}',
tools = '{{ tools }}',
tool_resources = '{{ tool_resources }}',
metadata = '{{ metadata }}',
temperature = {{ temperature }},
top_p = {{ top_p }},
response_format = '{{ response_format }}'
WHERE 
assistant_id = '{{ assistant_id }}' --required
AND "openai-organization" = '{{ openai-organization}}'
AND "openai-project" = '{{ openai-project}}'
RETURNING
id,
name,
created_at,
description,
instructions,
metadata,
model,
object,
response_format,
temperature,
tool_resources,
tools,
top_p;
```
</TabItem>
</Tabs>


## `DELETE` examples

<Tabs
    defaultValue="delete"
    values={[
        { label: 'delete', value: 'delete' }
    ]}
>
<TabItem value="delete">

No description available.

```sql
DELETE FROM openai.assistants.assistants
WHERE assistant_id = '{{ assistant_id }}' --required
AND "openai-organization" = '{{ openai-organization }}'
AND "openai-project" = '{{ openai-project }}'
;
```
</TabItem>
</Tabs>
