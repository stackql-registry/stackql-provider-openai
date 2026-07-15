--- 
title: file_batches
hide_title: false
hide_table_of_contents: false
keywords:
  - file_batches
  - vector_stores
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

Creates, updates, deletes, gets or lists a <code>file_batches</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="file_batches" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="openai.vector_stores.file_batches" /></td></tr>
</tbody></table>

## Fields

The following fields are returned by `SELECT` queries:

<Tabs
    defaultValue="get"
    values={[
        { label: 'get', value: 'get' }
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
    <td><CopyableCode code="vector_store_id" /></td>
    <td><code>string</code></td>
    <td>The ID of the [vector store](/docs/api-reference/vector-stores/object) that the [File](/docs/api-reference/files) is attached to.</td>
</tr>
<tr>
    <td><CopyableCode code="created_at" /></td>
    <td><code>integer (unixtime)</code></td>
    <td>The Unix timestamp (in seconds) for when the vector store files batch was created.</td>
</tr>
<tr>
    <td><CopyableCode code="file_counts" /></td>
    <td><code>object</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="object" /></td>
    <td><code>string</code></td>
    <td>The object type, which is always `vector_store.file_batch`. (vector_store.files_batch)</td>
</tr>
<tr>
    <td><CopyableCode code="status" /></td>
    <td><code>string</code></td>
    <td>The status of the vector store files batch, which can be either `in_progress`, `completed`, `cancelled` or `failed`. (in_progress, completed, cancelled, failed)</td>
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
    <td><a href="#parameter-vector_store_id"><code>vector_store_id</code></a>, <a href="#parameter-batch_id"><code>batch_id</code></a></td>
    <td><a href="#parameter-OpenAI-Organization"><code>OpenAI-Organization</code></a>, <a href="#parameter-OpenAI-Project"><code>OpenAI-Project</code></a></td>
    <td></td>
</tr>
<tr>
    <td><a href="#create"><CopyableCode code="create" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-vector_store_id"><code>vector_store_id</code></a>, <a href="#parameter-file_ids"><code>file_ids</code></a>, <a href="#parameter-files"><code>files</code></a></td>
    <td><a href="#parameter-OpenAI-Organization"><code>OpenAI-Organization</code></a>, <a href="#parameter-OpenAI-Project"><code>OpenAI-Project</code></a></td>
    <td>The maximum number of files in a single batch request is 2000.<br />Vector store file attach requests are rate limited per vector store (300 requests per minute across both this endpoint and `/vector_stores/&#123;vector_store_id&#125;/files`).<br />For ingesting multiple files into the same vector store, this batch endpoint is recommended.<br /></td>
</tr>
<tr>
    <td><a href="#cancel"><CopyableCode code="cancel" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-vector_store_id"><code>vector_store_id</code></a>, <a href="#parameter-batch_id"><code>batch_id</code></a></td>
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
    <td>The ID of the file batch to cancel.</td>
</tr>
<tr id="parameter-vector_store_id">
    <td><CopyableCode code="vector_store_id" /></td>
    <td><code>string</code></td>
    <td>The ID of the vector store that the file batch belongs to.</td>
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
</tbody>
</table>

## `SELECT` examples

<Tabs
    defaultValue="get"
    values={[
        { label: 'get', value: 'get' }
    ]}
>
<TabItem value="get">

OK

```sql
SELECT
id,
vector_store_id,
created_at,
file_counts,
object,
status
FROM openai.vector_stores.file_batches
WHERE vector_store_id = '{{ vector_store_id }}' -- required
AND batch_id = '{{ batch_id }}' -- required
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

The maximum number of files in a single batch request is 2000.<br />Vector store file attach requests are rate limited per vector store (300 requests per minute across both this endpoint and `/vector_stores/&#123;vector_store_id&#125;/files`).<br />For ingesting multiple files into the same vector store, this batch endpoint is recommended.<br />

```sql
INSERT INTO openai.vector_stores.file_batches (
file_ids,
files,
chunking_strategy,
attributes,
vector_store_id,
OpenAI-Organization,
OpenAI-Project
)
SELECT 
'{{ file_ids }}' /* required */,
'{{ files }}' /* required */,
'{{ chunking_strategy }}',
'{{ attributes }}',
'{{ vector_store_id }}',
'{{ OpenAI-Organization }}',
'{{ OpenAI-Project }}'
RETURNING
id,
vector_store_id,
created_at,
file_counts,
object,
status
;
```
</TabItem>
<TabItem value="manifest">

<CodeBlock language="yaml">{`# Description fields are for documentation purposes
- name: file_batches
  props:
    - name: vector_store_id
      value: "{{ vector_store_id }}"
      description: Required parameter for the file_batches resource.
    - name: file_ids
      value:
        - "{{ file_ids }}"
      description: |
        A list of [File](/docs/api-reference/files) IDs that the vector store should use. Useful for tools like \`file_search\` that can access files.  If \`attributes\` or \`chunking_strategy\` are provided, they will be  applied to all files in the batch. The maximum batch size is 2000 files. This endpoint is recommended for multi-file ingestion and helps reduce per-vector-store write request pressure. Mutually exclusive with \`files\`.
    - name: files
      description: |
        A list of objects that each include a \`file_id\` plus optional \`attributes\` or \`chunking_strategy\`. Use this when you need to override metadata for specific files. The global \`attributes\` or \`chunking_strategy\` will be ignored and must be specified for each file. The maximum batch size is 2000 files. This endpoint is recommended for multi-file ingestion and helps reduce per-vector-store write request pressure. Mutually exclusive with \`file_ids\`.
      value:
        - file_id: "{{ file_id }}"
          chunking_strategy:
            type: "{{ type }}"
            static:
              max_chunk_size_tokens: {{ max_chunk_size_tokens }}
              chunk_overlap_tokens: {{ chunk_overlap_tokens }}
          attributes: "{{ attributes }}"
    - name: chunking_strategy
      description: |
        The chunking strategy used to chunk the file(s). If not set, will use the \`auto\` strategy.
      value:
        type: "{{ type }}"
        static:
          max_chunk_size_tokens: {{ max_chunk_size_tokens }}
          chunk_overlap_tokens: {{ chunk_overlap_tokens }}
    - name: attributes
      value: "{{ attributes }}"
      description: |
        Set of 16 key-value pairs that can be attached to an object. This can be
        useful for storing additional information about the object in a structured
        format, and querying for objects via API or the dashboard. Keys are strings
        with a maximum length of 64 characters. Values are strings with a maximum
        length of 512 characters, booleans, or numbers.
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

OK

```sql
EXEC openai.vector_stores.file_batches.cancel 
@vector_store_id='{{ vector_store_id }}' --required, 
@batch_id='{{ batch_id }}' --required, 
@OpenAI-Organization='{{ OpenAI-Organization }}', 
@OpenAI-Project='{{ OpenAI-Project }}'
;
```
</TabItem>
</Tabs>
