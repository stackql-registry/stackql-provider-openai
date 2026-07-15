--- 
title: batches
hide_title: false
hide_table_of_contents: false
keywords:
  - batches
  - batches
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

Creates, updates, deletes, gets or lists a <code>batches</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="batches" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="openai.batches.batches" /></td></tr>
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

Batch retrieved successfully.

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
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="error_file_id" /></td>
    <td><code>string</code></td>
    <td>The ID of the file containing the outputs of requests with errors.</td>
</tr>
<tr>
    <td><CopyableCode code="input_file_id" /></td>
    <td><code>string</code></td>
    <td>The ID of the input file for the batch.</td>
</tr>
<tr>
    <td><CopyableCode code="output_file_id" /></td>
    <td><code>string</code></td>
    <td>The ID of the file containing the outputs of successfully executed requests.</td>
</tr>
<tr>
    <td><CopyableCode code="cancelled_at" /></td>
    <td><code>integer (unixtime)</code></td>
    <td>The Unix timestamp (in seconds) for when the batch was cancelled.</td>
</tr>
<tr>
    <td><CopyableCode code="cancelling_at" /></td>
    <td><code>integer (unixtime)</code></td>
    <td>The Unix timestamp (in seconds) for when the batch started cancelling.</td>
</tr>
<tr>
    <td><CopyableCode code="completed_at" /></td>
    <td><code>integer (unixtime)</code></td>
    <td>The Unix timestamp (in seconds) for when the batch was completed.</td>
</tr>
<tr>
    <td><CopyableCode code="completion_window" /></td>
    <td><code>string</code></td>
    <td>The time frame within which the batch should be processed.</td>
</tr>
<tr>
    <td><CopyableCode code="created_at" /></td>
    <td><code>integer (unixtime)</code></td>
    <td>The Unix timestamp (in seconds) for when the batch was created.</td>
</tr>
<tr>
    <td><CopyableCode code="endpoint" /></td>
    <td><code>string</code></td>
    <td>The OpenAI API endpoint used by the batch.</td>
</tr>
<tr>
    <td><CopyableCode code="errors" /></td>
    <td><code>object</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="expired_at" /></td>
    <td><code>integer (unixtime)</code></td>
    <td>The Unix timestamp (in seconds) for when the batch expired.</td>
</tr>
<tr>
    <td><CopyableCode code="expires_at" /></td>
    <td><code>integer (unixtime)</code></td>
    <td>The Unix timestamp (in seconds) for when the batch will expire.</td>
</tr>
<tr>
    <td><CopyableCode code="failed_at" /></td>
    <td><code>integer (unixtime)</code></td>
    <td>The Unix timestamp (in seconds) for when the batch failed.</td>
</tr>
<tr>
    <td><CopyableCode code="finalizing_at" /></td>
    <td><code>integer (unixtime)</code></td>
    <td>The Unix timestamp (in seconds) for when the batch started finalizing.</td>
</tr>
<tr>
    <td><CopyableCode code="in_progress_at" /></td>
    <td><code>integer (unixtime)</code></td>
    <td>The Unix timestamp (in seconds) for when the batch started processing.</td>
</tr>
<tr>
    <td><CopyableCode code="metadata" /></td>
    <td><code>object</code></td>
    <td>Set of 16 key-value pairs that can be attached to an object. This can be useful for storing additional information about the object in a structured format, and querying for objects via API or the dashboard.  Keys are strings with a maximum length of 64 characters. Values are strings with a maximum length of 512 characters.  (x-oaiTypeLabel: map)</td>
</tr>
<tr>
    <td><CopyableCode code="model" /></td>
    <td><code>string</code></td>
    <td>Model ID used to process the batch, like `gpt-5-2025-08-07`. OpenAI offers a wide range of models with different capabilities, performance characteristics, and price points. Refer to the [model guide](https://platform.openai.com/docs/models) to browse and compare available models. </td>
</tr>
<tr>
    <td><CopyableCode code="object" /></td>
    <td><code>string</code></td>
    <td>The object type, which is always `batch`. (batch)</td>
</tr>
<tr>
    <td><CopyableCode code="request_counts" /></td>
    <td><code>object</code></td>
    <td>The request counts for different statuses within the batch.</td>
</tr>
<tr>
    <td><CopyableCode code="status" /></td>
    <td><code>string</code></td>
    <td>The current status of the batch. (validating, failed, in_progress, finalizing, completed, expired, cancelling, cancelled)</td>
</tr>
<tr>
    <td><CopyableCode code="usage" /></td>
    <td><code>object</code></td>
    <td>Represents token usage details including input tokens, output tokens, a breakdown of output tokens, and the total tokens used. Only populated on batches created after September 7, 2025. </td>
</tr>
</tbody>
</table>
</TabItem>
<TabItem value="list">

Batch listed successfully.

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
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="error_file_id" /></td>
    <td><code>string</code></td>
    <td>The ID of the file containing the outputs of requests with errors.</td>
</tr>
<tr>
    <td><CopyableCode code="input_file_id" /></td>
    <td><code>string</code></td>
    <td>The ID of the input file for the batch.</td>
</tr>
<tr>
    <td><CopyableCode code="output_file_id" /></td>
    <td><code>string</code></td>
    <td>The ID of the file containing the outputs of successfully executed requests.</td>
</tr>
<tr>
    <td><CopyableCode code="cancelled_at" /></td>
    <td><code>integer (unixtime)</code></td>
    <td>The Unix timestamp (in seconds) for when the batch was cancelled.</td>
</tr>
<tr>
    <td><CopyableCode code="cancelling_at" /></td>
    <td><code>integer (unixtime)</code></td>
    <td>The Unix timestamp (in seconds) for when the batch started cancelling.</td>
</tr>
<tr>
    <td><CopyableCode code="completed_at" /></td>
    <td><code>integer (unixtime)</code></td>
    <td>The Unix timestamp (in seconds) for when the batch was completed.</td>
</tr>
<tr>
    <td><CopyableCode code="completion_window" /></td>
    <td><code>string</code></td>
    <td>The time frame within which the batch should be processed.</td>
</tr>
<tr>
    <td><CopyableCode code="created_at" /></td>
    <td><code>integer (unixtime)</code></td>
    <td>The Unix timestamp (in seconds) for when the batch was created.</td>
</tr>
<tr>
    <td><CopyableCode code="endpoint" /></td>
    <td><code>string</code></td>
    <td>The OpenAI API endpoint used by the batch.</td>
</tr>
<tr>
    <td><CopyableCode code="errors" /></td>
    <td><code>object</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="expired_at" /></td>
    <td><code>integer (unixtime)</code></td>
    <td>The Unix timestamp (in seconds) for when the batch expired.</td>
</tr>
<tr>
    <td><CopyableCode code="expires_at" /></td>
    <td><code>integer (unixtime)</code></td>
    <td>The Unix timestamp (in seconds) for when the batch will expire.</td>
</tr>
<tr>
    <td><CopyableCode code="failed_at" /></td>
    <td><code>integer (unixtime)</code></td>
    <td>The Unix timestamp (in seconds) for when the batch failed.</td>
</tr>
<tr>
    <td><CopyableCode code="finalizing_at" /></td>
    <td><code>integer (unixtime)</code></td>
    <td>The Unix timestamp (in seconds) for when the batch started finalizing.</td>
</tr>
<tr>
    <td><CopyableCode code="in_progress_at" /></td>
    <td><code>integer (unixtime)</code></td>
    <td>The Unix timestamp (in seconds) for when the batch started processing.</td>
</tr>
<tr>
    <td><CopyableCode code="metadata" /></td>
    <td><code>object</code></td>
    <td>Set of 16 key-value pairs that can be attached to an object. This can be useful for storing additional information about the object in a structured format, and querying for objects via API or the dashboard.  Keys are strings with a maximum length of 64 characters. Values are strings with a maximum length of 512 characters.  (x-oaiTypeLabel: map)</td>
</tr>
<tr>
    <td><CopyableCode code="model" /></td>
    <td><code>string</code></td>
    <td>Model ID used to process the batch, like `gpt-5-2025-08-07`. OpenAI offers a wide range of models with different capabilities, performance characteristics, and price points. Refer to the [model guide](https://platform.openai.com/docs/models) to browse and compare available models. </td>
</tr>
<tr>
    <td><CopyableCode code="object" /></td>
    <td><code>string</code></td>
    <td>The object type, which is always `batch`. (batch)</td>
</tr>
<tr>
    <td><CopyableCode code="request_counts" /></td>
    <td><code>object</code></td>
    <td>The request counts for different statuses within the batch.</td>
</tr>
<tr>
    <td><CopyableCode code="status" /></td>
    <td><code>string</code></td>
    <td>The current status of the batch. (validating, failed, in_progress, finalizing, completed, expired, cancelling, cancelled)</td>
</tr>
<tr>
    <td><CopyableCode code="usage" /></td>
    <td><code>object</code></td>
    <td>Represents token usage details including input tokens, output tokens, a breakdown of output tokens, and the total tokens used. Only populated on batches created after September 7, 2025. </td>
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
    <td><a href="#parameter-batch_id"><code>batch_id</code></a></td>
    <td><a href="#parameter-OpenAI-Organization"><code>OpenAI-Organization</code></a>, <a href="#parameter-OpenAI-Project"><code>OpenAI-Project</code></a></td>
    <td></td>
</tr>
<tr>
    <td><a href="#list"><CopyableCode code="list" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td></td>
    <td><a href="#parameter-after"><code>after</code></a>, <a href="#parameter-limit"><code>limit</code></a>, <a href="#parameter-OpenAI-Organization"><code>OpenAI-Organization</code></a>, <a href="#parameter-OpenAI-Project"><code>OpenAI-Project</code></a></td>
    <td></td>
</tr>
<tr>
    <td><a href="#create"><CopyableCode code="create" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-input_file_id"><code>input_file_id</code></a>, <a href="#parameter-endpoint"><code>endpoint</code></a>, <a href="#parameter-completion_window"><code>completion_window</code></a></td>
    <td><a href="#parameter-OpenAI-Organization"><code>OpenAI-Organization</code></a>, <a href="#parameter-OpenAI-Project"><code>OpenAI-Project</code></a></td>
    <td></td>
</tr>
<tr>
    <td><a href="#cancel"><CopyableCode code="cancel" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-batch_id"><code>batch_id</code></a></td>
    <td><a href="#parameter-OpenAI-Organization"><code>OpenAI-Organization</code></a>, <a href="#parameter-OpenAI-Project"><code>OpenAI-Project</code></a></td>
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
<tr id="parameter-batch_id">
    <td><CopyableCode code="batch_id" /></td>
    <td><code>string</code></td>
    <td>The ID of the batch to cancel.</td>
</tr>
<tr id="parameter-OpenAI-Organization">
    <td><CopyableCode code="OpenAI-Organization" /></td>
    <td><code>string</code></td>
    <td>Optionally scope the request to a specific organization (overrides the default associated with the API key).</td>
</tr>
<tr id="parameter-OpenAI-Project">
    <td><CopyableCode code="OpenAI-Project" /></td>
    <td><code>string</code></td>
    <td>Optionally scope the request to a specific project (overrides the default associated with the API key).</td>
</tr>
<tr id="parameter-after">
    <td><CopyableCode code="after" /></td>
    <td><code>string</code></td>
    <td>A cursor for use in pagination. `after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list. </td>
</tr>
<tr id="parameter-limit">
    <td><CopyableCode code="limit" /></td>
    <td><code>integer</code></td>
    <td>A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20. </td>
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

Batch retrieved successfully.

```sql
SELECT
id,
error_file_id,
input_file_id,
output_file_id,
cancelled_at,
cancelling_at,
completed_at,
completion_window,
created_at,
endpoint,
errors,
expired_at,
expires_at,
failed_at,
finalizing_at,
in_progress_at,
metadata,
model,
object,
request_counts,
status,
usage
FROM openai.batches.batches
WHERE batch_id = '{{ batch_id }}' -- required
AND OpenAI-Organization = '{{ OpenAI-Organization }}'
AND OpenAI-Project = '{{ OpenAI-Project }}'
;
```
</TabItem>
<TabItem value="list">

Batch listed successfully.

```sql
SELECT
id,
error_file_id,
input_file_id,
output_file_id,
cancelled_at,
cancelling_at,
completed_at,
completion_window,
created_at,
endpoint,
errors,
expired_at,
expires_at,
failed_at,
finalizing_at,
in_progress_at,
metadata,
model,
object,
request_counts,
status,
usage
FROM openai.batches.batches
WHERE after = '{{ after }}'
AND limit = '{{ limit }}'
AND OpenAI-Organization = '{{ OpenAI-Organization }}'
AND OpenAI-Project = '{{ OpenAI-Project }}'
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
INSERT INTO openai.batches.batches (
input_file_id,
endpoint,
completion_window,
metadata,
output_expires_after,
OpenAI-Organization,
OpenAI-Project
)
SELECT 
'{{ input_file_id }}' /* required */,
'{{ endpoint }}' /* required */,
'{{ completion_window }}' /* required */,
'{{ metadata }}',
'{{ output_expires_after }}',
'{{ OpenAI-Organization }}',
'{{ OpenAI-Project }}'
RETURNING
id,
error_file_id,
input_file_id,
output_file_id,
cancelled_at,
cancelling_at,
completed_at,
completion_window,
created_at,
endpoint,
errors,
expired_at,
expires_at,
failed_at,
finalizing_at,
in_progress_at,
metadata,
model,
object,
request_counts,
status,
usage
;
```
</TabItem>
<TabItem value="manifest">

<CodeBlock language="yaml">{`# Description fields are for documentation purposes
- name: batches
  props:
    - name: input_file_id
      value: "{{ input_file_id }}"
      description: |
        The ID of an uploaded file that contains requests for the new batch.
        See [upload file](https://platform.openai.com/docs/api-reference/files/create) for how to upload a file.
        Your input file must be formatted as a [JSONL file](https://platform.openai.com/docs/api-reference/batch/request-input), and must be uploaded with the purpose \`batch\`. The file can contain up to 50,000 requests, and can be up to 200 MB in size.
    - name: endpoint
      value: "{{ endpoint }}"
      description: |
        The endpoint to be used for all requests in the batch. Currently \`/v1/responses\`, \`/v1/chat/completions\`, \`/v1/embeddings\`, \`/v1/completions\`, \`/v1/moderations\`, \`/v1/images/generations\`, \`/v1/images/edits\`, and \`/v1/videos\` are supported. Note that \`/v1/embeddings\` batches are also restricted to a maximum of 50,000 embedding inputs across all requests in the batch.
      valid_values: ['/v1/responses', '/v1/chat/completions', '/v1/embeddings', '/v1/completions', '/v1/moderations', '/v1/images/generations', '/v1/images/edits', '/v1/videos']
    - name: completion_window
      value: "{{ completion_window }}"
      description: |
        The time frame within which the batch should be processed. Currently only \`24h\` is supported.
      valid_values: ['24h']
    - name: metadata
      value: "{{ metadata }}"
      description: |
        Set of 16 key-value pairs that can be attached to an object. This can be
        useful for storing additional information about the object in a structured
        format, and querying for objects via API or the dashboard.
        Keys are strings with a maximum length of 64 characters. Values are strings
        with a maximum length of 512 characters.
    - name: output_expires_after
      description: |
        The expiration policy for the output and/or error file that are generated for a batch.
      value:
        anchor: "{{ anchor }}"
        seconds: {{ seconds }}
    - name: OpenAI-Organization
      value: "{{ OpenAI-Organization }}"
      description: Optionally scope the request to a specific organization (overrides the default associated with the API key).
      description: Optionally scope the request to a specific organization (overrides the default associated with the API key).
    - name: OpenAI-Project
      value: "{{ OpenAI-Project }}"
      description: Optionally scope the request to a specific project (overrides the default associated with the API key).
      description: Optionally scope the request to a specific project (overrides the default associated with the API key).
`}</CodeBlock>

</TabItem>
</Tabs>


## Lifecycle Methods

<Tabs
    defaultValue="cancel"
    values={[
        { label: 'cancel', value: 'cancel' }
    ]}
>
<TabItem value="cancel">

Batch is cancelling. Returns the cancelling batch's details.

```sql
EXEC openai.batches.batches.cancel 
@batch_id='{{ batch_id }}' --required, 
@OpenAI-Organization='{{ OpenAI-Organization }}', 
@OpenAI-Project='{{ OpenAI-Project }}'
;
```
</TabItem>
</Tabs>
