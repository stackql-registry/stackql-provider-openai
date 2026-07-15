--- 
title: vector_stores
hide_title: false
hide_table_of_contents: false
keywords:
  - vector_stores
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

Creates, updates, deletes, gets or lists a <code>vector_stores</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="vector_stores" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="openai.vector_stores.vector_stores" /></td></tr>
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
    <td>The name of the vector store.</td>
</tr>
<tr>
    <td><CopyableCode code="created_at" /></td>
    <td><code>integer (unixtime)</code></td>
    <td>The Unix timestamp (in seconds) for when the vector store was created.</td>
</tr>
<tr>
    <td><CopyableCode code="expires_after" /></td>
    <td><code>object</code></td>
    <td>The expiration policy for a vector store. (title: Vector store expiration policy)</td>
</tr>
<tr>
    <td><CopyableCode code="expires_at" /></td>
    <td><code>integer (unixtime)</code></td>
    <td>The Unix timestamp (in seconds) for when the vector store will expire.</td>
</tr>
<tr>
    <td><CopyableCode code="file_counts" /></td>
    <td><code>object</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="last_active_at" /></td>
    <td><code>integer (unixtime)</code></td>
    <td>The Unix timestamp (in seconds) for when the vector store was last active.</td>
</tr>
<tr>
    <td><CopyableCode code="metadata" /></td>
    <td><code>object</code></td>
    <td>Set of 16 key-value pairs that can be attached to an object. This can be useful for storing additional information about the object in a structured format, and querying for objects via API or the dashboard.  Keys are strings with a maximum length of 64 characters. Values are strings with a maximum length of 512 characters.  (x-oaiTypeLabel: map)</td>
</tr>
<tr>
    <td><CopyableCode code="object" /></td>
    <td><code>string</code></td>
    <td>The object type, which is always `vector_store`. (vector_store)</td>
</tr>
<tr>
    <td><CopyableCode code="status" /></td>
    <td><code>string</code></td>
    <td>The status of the vector store, which can be either `expired`, `in_progress`, or `completed`. A status of `completed` indicates that the vector store is ready for use. (expired, in_progress, completed)</td>
</tr>
<tr>
    <td><CopyableCode code="usage_bytes" /></td>
    <td><code>integer</code></td>
    <td>The total number of bytes used by the files in the vector store.</td>
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
    <td>The name of the vector store.</td>
</tr>
<tr>
    <td><CopyableCode code="created_at" /></td>
    <td><code>integer (unixtime)</code></td>
    <td>The Unix timestamp (in seconds) for when the vector store was created.</td>
</tr>
<tr>
    <td><CopyableCode code="expires_after" /></td>
    <td><code>object</code></td>
    <td>The expiration policy for a vector store. (title: Vector store expiration policy)</td>
</tr>
<tr>
    <td><CopyableCode code="expires_at" /></td>
    <td><code>integer (unixtime)</code></td>
    <td>The Unix timestamp (in seconds) for when the vector store will expire.</td>
</tr>
<tr>
    <td><CopyableCode code="file_counts" /></td>
    <td><code>object</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="last_active_at" /></td>
    <td><code>integer (unixtime)</code></td>
    <td>The Unix timestamp (in seconds) for when the vector store was last active.</td>
</tr>
<tr>
    <td><CopyableCode code="metadata" /></td>
    <td><code>object</code></td>
    <td>Set of 16 key-value pairs that can be attached to an object. This can be useful for storing additional information about the object in a structured format, and querying for objects via API or the dashboard.  Keys are strings with a maximum length of 64 characters. Values are strings with a maximum length of 512 characters.  (x-oaiTypeLabel: map)</td>
</tr>
<tr>
    <td><CopyableCode code="object" /></td>
    <td><code>string</code></td>
    <td>The object type, which is always `vector_store`. (vector_store)</td>
</tr>
<tr>
    <td><CopyableCode code="status" /></td>
    <td><code>string</code></td>
    <td>The status of the vector store, which can be either `expired`, `in_progress`, or `completed`. A status of `completed` indicates that the vector store is ready for use. (expired, in_progress, completed)</td>
</tr>
<tr>
    <td><CopyableCode code="usage_bytes" /></td>
    <td><code>integer</code></td>
    <td>The total number of bytes used by the files in the vector store.</td>
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
    <td><a href="#parameter-vector_store_id"><code>vector_store_id</code></a></td>
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
    <td></td>
    <td><a href="#parameter-openai-organization"><code>openai-organization</code></a>, <a href="#parameter-openai-project"><code>openai-project</code></a></td>
    <td></td>
</tr>
<tr>
    <td><a href="#update"><CopyableCode code="update" /></a></td>
    <td><CopyableCode code="update" /></td>
    <td><a href="#parameter-vector_store_id"><code>vector_store_id</code></a></td>
    <td><a href="#parameter-openai-organization"><code>openai-organization</code></a>, <a href="#parameter-openai-project"><code>openai-project</code></a></td>
    <td></td>
</tr>
<tr>
    <td><a href="#delete"><CopyableCode code="delete" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-vector_store_id"><code>vector_store_id</code></a></td>
    <td><a href="#parameter-openai-organization"><code>openai-organization</code></a>, <a href="#parameter-openai-project"><code>openai-project</code></a></td>
    <td></td>
</tr>
<tr>
    <td><a href="#search"><CopyableCode code="search" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-vector_store_id"><code>vector_store_id</code></a>, <a href="#parameter-query"><code>query</code></a></td>
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
<tr id="parameter-vector_store_id">
    <td><CopyableCode code="vector_store_id" /></td>
    <td><code>string</code></td>
    <td>The ID of the vector store to search.</td>
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
expires_after,
expires_at,
file_counts,
last_active_at,
metadata,
object,
status,
usage_bytes
FROM openai.vector_stores.vector_stores
WHERE vector_store_id = '{{ vector_store_id }}' -- required
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
expires_after,
expires_at,
file_counts,
last_active_at,
metadata,
object,
status,
usage_bytes
FROM openai.vector_stores.vector_stores
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
INSERT INTO openai.vector_stores.vector_stores (
file_ids,
name,
description,
expires_after,
chunking_strategy,
metadata,
"openai-organization",
"openai-project"
)
SELECT 
'{{ file_ids }}',
'{{ name }}',
'{{ description }}',
'{{ expires_after }}',
'{{ chunking_strategy }}',
'{{ metadata }}',
'{{ openai-organization }}',
'{{ openai-project }}'
RETURNING
id,
name,
created_at,
expires_after,
expires_at,
file_counts,
last_active_at,
metadata,
object,
status,
usage_bytes
;
```
</TabItem>
<TabItem value="manifest">

<CodeBlock language="yaml">{`# Description fields are for documentation purposes
- name: vector_stores
  props:
    - name: file_ids
      value:
        - "{{ file_ids }}"
      description: |
        A list of [File](https://platform.openai.com/docs/api-reference/files) IDs that the vector store should use. Useful for tools like \`file_search\` that can access files.
    - name: name
      value: "{{ name }}"
      description: |
        The name of the vector store.
    - name: description
      value: "{{ description }}"
      description: |
        A description for the vector store. Can be used to describe the vector store's purpose.
    - name: expires_after
      description: |
        The expiration policy for a vector store.
      value:
        anchor: "{{ anchor }}"
        days: {{ days }}
    - name: chunking_strategy
      description: |
        The chunking strategy used to chunk the file(s). If not set, will use the \`auto\` strategy. Only applicable if \`file_ids\` is non-empty.
      value:
        type: "{{ type }}"
        static:
          max_chunk_size_tokens: {{ max_chunk_size_tokens }}
          chunk_overlap_tokens: {{ chunk_overlap_tokens }}
    - name: metadata
      value: "{{ metadata }}"
      description: |
        Set of 16 key-value pairs that can be attached to an object. This can be
        useful for storing additional information about the object in a structured
        format, and querying for objects via API or the dashboard.
        Keys are strings with a maximum length of 64 characters. Values are strings
        with a maximum length of 512 characters.
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
UPDATE openai.vector_stores.vector_stores
SET 
name = '{{ name }}',
expires_after = '{{ expires_after }}',
metadata = '{{ metadata }}'
WHERE 
vector_store_id = '{{ vector_store_id }}' --required
AND "openai-organization" = '{{ openai-organization}}'
AND "openai-project" = '{{ openai-project}}'
RETURNING
id,
name,
created_at,
expires_after,
expires_at,
file_counts,
last_active_at,
metadata,
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
DELETE FROM openai.vector_stores.vector_stores
WHERE vector_store_id = '{{ vector_store_id }}' --required
AND "openai-organization" = '{{ openai-organization }}'
AND "openai-project" = '{{ openai-project }}'
;
```
</TabItem>
</Tabs>


## Lifecycle Methods

<Tabs
    defaultValue="search"
    values={[
        { label: 'search', value: 'search' }
    ]}
>
<TabItem value="search">

OK

```sql
EXEC openai.vector_stores.vector_stores.search 
@vector_store_id='{{ vector_store_id }}' --required, 
@openai-organization='{{ openai-organization }}', 
@openai-project='{{ openai-project }}' 
@@json=
'{
"query": "{{ query }}", 
"rewrite_query": {{ rewrite_query }}, 
"max_num_results": {{ max_num_results }}, 
"filters": "{{ filters }}", 
"ranking_options": "{{ ranking_options }}"
}'
;
```
</TabItem>
</Tabs>
