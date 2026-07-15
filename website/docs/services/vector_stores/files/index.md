--- 
title: files
hide_title: false
hide_table_of_contents: false
keywords:
  - files
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

Creates, updates, deletes, gets or lists a <code>files</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="files" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="openai.vector_stores.files" /></td></tr>
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
    <td><CopyableCode code="vector_store_id" /></td>
    <td><code>string</code></td>
    <td>The ID of the [vector store](/docs/api-reference/vector-stores/object) that the [File](/docs/api-reference/files) is attached to.</td>
</tr>
<tr>
    <td><CopyableCode code="attributes" /></td>
    <td><code>object</code></td>
    <td>Set of 16 key-value pairs that can be attached to an object. This can be useful for storing additional information about the object in a structured format, and querying for objects via API or the dashboard. Keys are strings with a maximum length of 64 characters. Values are strings with a maximum length of 512 characters, booleans, or numbers.  (x-oaiTypeLabel: map)</td>
</tr>
<tr>
    <td><CopyableCode code="chunking_strategy" /></td>
    <td><code>object</code></td>
    <td>The strategy used to chunk the file. (title: Static Chunking Strategy)</td>
</tr>
<tr>
    <td><CopyableCode code="created_at" /></td>
    <td><code>integer (unixtime)</code></td>
    <td>The Unix timestamp (in seconds) for when the vector store file was created.</td>
</tr>
<tr>
    <td><CopyableCode code="last_error" /></td>
    <td><code>object</code></td>
    <td>The last error associated with this vector store file. Will be `null` if there are no errors.</td>
</tr>
<tr>
    <td><CopyableCode code="object" /></td>
    <td><code>string</code></td>
    <td>The object type, which is always `vector_store.file`. (vector_store.file)</td>
</tr>
<tr>
    <td><CopyableCode code="status" /></td>
    <td><code>string</code></td>
    <td>The status of the vector store file, which can be either `in_progress`, `completed`, `cancelled`, or `failed`. The status `completed` indicates that the vector store file is ready for use. (in_progress, completed, cancelled, failed)</td>
</tr>
<tr>
    <td><CopyableCode code="usage_bytes" /></td>
    <td><code>integer</code></td>
    <td>The total vector store usage in bytes. Note that this may be different from the original file size.</td>
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
    <td><CopyableCode code="vector_store_id" /></td>
    <td><code>string</code></td>
    <td>The ID of the [vector store](/docs/api-reference/vector-stores/object) that the [File](/docs/api-reference/files) is attached to.</td>
</tr>
<tr>
    <td><CopyableCode code="attributes" /></td>
    <td><code>object</code></td>
    <td>Set of 16 key-value pairs that can be attached to an object. This can be useful for storing additional information about the object in a structured format, and querying for objects via API or the dashboard. Keys are strings with a maximum length of 64 characters. Values are strings with a maximum length of 512 characters, booleans, or numbers.  (x-oaiTypeLabel: map)</td>
</tr>
<tr>
    <td><CopyableCode code="chunking_strategy" /></td>
    <td><code>object</code></td>
    <td>The strategy used to chunk the file. (title: Static Chunking Strategy)</td>
</tr>
<tr>
    <td><CopyableCode code="created_at" /></td>
    <td><code>integer (unixtime)</code></td>
    <td>The Unix timestamp (in seconds) for when the vector store file was created.</td>
</tr>
<tr>
    <td><CopyableCode code="last_error" /></td>
    <td><code>object</code></td>
    <td>The last error associated with this vector store file. Will be `null` if there are no errors.</td>
</tr>
<tr>
    <td><CopyableCode code="object" /></td>
    <td><code>string</code></td>
    <td>The object type, which is always `vector_store.file`. (vector_store.file)</td>
</tr>
<tr>
    <td><CopyableCode code="status" /></td>
    <td><code>string</code></td>
    <td>The status of the vector store file, which can be either `in_progress`, `completed`, `cancelled`, or `failed`. The status `completed` indicates that the vector store file is ready for use. (in_progress, completed, cancelled, failed)</td>
</tr>
<tr>
    <td><CopyableCode code="usage_bytes" /></td>
    <td><code>integer</code></td>
    <td>The total vector store usage in bytes. Note that this may be different from the original file size.</td>
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
    <td><a href="#parameter-vector_store_id"><code>vector_store_id</code></a>, <a href="#parameter-file_id"><code>file_id</code></a></td>
    <td><a href="#parameter-OpenAI-Organization"><code>OpenAI-Organization</code></a>, <a href="#parameter-OpenAI-Project"><code>OpenAI-Project</code></a></td>
    <td></td>
</tr>
<tr>
    <td><a href="#list"><CopyableCode code="list" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-vector_store_id"><code>vector_store_id</code></a></td>
    <td><a href="#parameter-limit"><code>limit</code></a>, <a href="#parameter-order"><code>order</code></a>, <a href="#parameter-after"><code>after</code></a>, <a href="#parameter-before"><code>before</code></a>, <a href="#parameter-filter"><code>filter</code></a>, <a href="#parameter-OpenAI-Organization"><code>OpenAI-Organization</code></a>, <a href="#parameter-OpenAI-Project"><code>OpenAI-Project</code></a></td>
    <td></td>
</tr>
<tr>
    <td><a href="#create"><CopyableCode code="create" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-vector_store_id"><code>vector_store_id</code></a>, <a href="#parameter-file_id"><code>file_id</code></a></td>
    <td><a href="#parameter-OpenAI-Organization"><code>OpenAI-Organization</code></a>, <a href="#parameter-OpenAI-Project"><code>OpenAI-Project</code></a></td>
    <td>This endpoint is subject to a per-vector-store write rate limit of 300 requests per minute, shared with `/vector_stores/&#123;vector_store_id&#125;/file_batches`.<br />For uploading multiple files to the same vector store, use the file batches endpoint to reduce request volume.</td>
</tr>
<tr>
    <td><a href="#update"><CopyableCode code="update" /></a></td>
    <td><CopyableCode code="update" /></td>
    <td><a href="#parameter-vector_store_id"><code>vector_store_id</code></a>, <a href="#parameter-file_id"><code>file_id</code></a>, <a href="#parameter-attributes"><code>attributes</code></a></td>
    <td><a href="#parameter-OpenAI-Organization"><code>OpenAI-Organization</code></a>, <a href="#parameter-OpenAI-Project"><code>OpenAI-Project</code></a></td>
    <td></td>
</tr>
<tr>
    <td><a href="#delete"><CopyableCode code="delete" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-vector_store_id"><code>vector_store_id</code></a>, <a href="#parameter-file_id"><code>file_id</code></a></td>
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
<tr id="parameter-file_id">
    <td><CopyableCode code="file_id" /></td>
    <td><code>string</code></td>
    <td>The ID of the file to delete.</td>
</tr>
<tr id="parameter-vector_store_id">
    <td><CopyableCode code="vector_store_id" /></td>
    <td><code>string</code></td>
    <td>The ID of the vector store that the file belongs to.</td>
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
<tr id="parameter-before">
    <td><CopyableCode code="before" /></td>
    <td><code>string</code></td>
    <td>A cursor for use in pagination. `before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with obj_foo, your subsequent call can include before=obj_foo in order to fetch the previous page of the list. </td>
</tr>
<tr id="parameter-filter">
    <td><CopyableCode code="filter" /></td>
    <td><code>string</code></td>
    <td>Filter by file status. One of `in_progress`, `completed`, `failed`, `cancelled`.</td>
</tr>
<tr id="parameter-limit">
    <td><CopyableCode code="limit" /></td>
    <td><code>integer</code></td>
    <td>A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20. </td>
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
vector_store_id,
attributes,
chunking_strategy,
created_at,
last_error,
object,
status,
usage_bytes
FROM openai.vector_stores.files
WHERE vector_store_id = '{{ vector_store_id }}' -- required
AND file_id = '{{ file_id }}' -- required
AND OpenAI-Organization = '{{ OpenAI-Organization }}'
AND OpenAI-Project = '{{ OpenAI-Project }}'
;
```
</TabItem>
<TabItem value="list">

OK

```sql
SELECT
id,
vector_store_id,
attributes,
chunking_strategy,
created_at,
last_error,
object,
status,
usage_bytes
FROM openai.vector_stores.files
WHERE vector_store_id = '{{ vector_store_id }}' -- required
AND limit = '{{ limit }}'
AND order = '{{ order }}'
AND after = '{{ after }}'
AND before = '{{ before }}'
AND filter = '{{ filter }}'
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

This endpoint is subject to a per-vector-store write rate limit of 300 requests per minute, shared with `/vector_stores/&#123;vector_store_id&#125;/file_batches`.<br />For uploading multiple files to the same vector store, use the file batches endpoint to reduce request volume.

```sql
INSERT INTO openai.vector_stores.files (
file_id,
chunking_strategy,
attributes,
vector_store_id,
OpenAI-Organization,
OpenAI-Project
)
SELECT 
'{{ file_id }}' /* required */,
'{{ chunking_strategy }}',
'{{ attributes }}',
'{{ vector_store_id }}',
'{{ OpenAI-Organization }}',
'{{ OpenAI-Project }}'
RETURNING
id,
vector_store_id,
attributes,
chunking_strategy,
created_at,
last_error,
object,
status,
usage_bytes
;
```
</TabItem>
<TabItem value="manifest">

<CodeBlock language="yaml">{`# Description fields are for documentation purposes
- name: files
  props:
    - name: vector_store_id
      value: "{{ vector_store_id }}"
      description: Required parameter for the files resource.
    - name: file_id
      value: "{{ file_id }}"
      description: |
        A [File](/docs/api-reference/files) ID that the vector store should use. Useful for tools like \`file_search\` that can access files. For multi-file ingestion, we recommend [\`file_batches\`](/docs/api-reference/vector-stores-file-batches/createBatch) to minimize per-vector-store write requests.
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
UPDATE openai.vector_stores.files
SET 
attributes = '{{ attributes }}'
WHERE 
vector_store_id = '{{ vector_store_id }}' --required
AND file_id = '{{ file_id }}' --required
AND attributes = '{{ attributes }}' --required
AND OpenAI-Organization = '{{ OpenAI-Organization}}'
AND OpenAI-Project = '{{ OpenAI-Project}}'
RETURNING
id,
vector_store_id,
attributes,
chunking_strategy,
created_at,
last_error,
object,
status,
usage_bytes;
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
DELETE FROM openai.vector_stores.files
WHERE vector_store_id = '{{ vector_store_id }}' --required
AND file_id = '{{ file_id }}' --required
AND OpenAI-Organization = '{{ OpenAI-Organization }}'
AND OpenAI-Project = '{{ OpenAI-Project }}'
;
```
</TabItem>
</Tabs>
