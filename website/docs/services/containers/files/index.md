--- 
title: files
hide_title: false
hide_table_of_contents: false
keywords:
  - files
  - containers
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
<tr><td><b>Id</b></td><td><CopyableCode code="openai.containers.files" /></td></tr>
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
    <td>Unique identifier for the file.</td>
</tr>
<tr>
    <td><CopyableCode code="container_id" /></td>
    <td><code>string</code></td>
    <td>The container this file belongs to.</td>
</tr>
<tr>
    <td><CopyableCode code="bytes" /></td>
    <td><code>integer</code></td>
    <td>Size of the file in bytes.</td>
</tr>
<tr>
    <td><CopyableCode code="created_at" /></td>
    <td><code>integer (unixtime)</code></td>
    <td>Unix timestamp (in seconds) when the file was created.</td>
</tr>
<tr>
    <td><CopyableCode code="object" /></td>
    <td><code>string</code></td>
    <td>The type of this object (`container.file`).</td>
</tr>
<tr>
    <td><CopyableCode code="path" /></td>
    <td><code>string</code></td>
    <td>Path of the file in the container.</td>
</tr>
<tr>
    <td><CopyableCode code="source" /></td>
    <td><code>string</code></td>
    <td>Source of the file (e.g., `user`, `assistant`).</td>
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
    <td>Unique identifier for the file.</td>
</tr>
<tr>
    <td><CopyableCode code="container_id" /></td>
    <td><code>string</code></td>
    <td>The container this file belongs to.</td>
</tr>
<tr>
    <td><CopyableCode code="bytes" /></td>
    <td><code>integer</code></td>
    <td>Size of the file in bytes.</td>
</tr>
<tr>
    <td><CopyableCode code="created_at" /></td>
    <td><code>integer (unixtime)</code></td>
    <td>Unix timestamp (in seconds) when the file was created.</td>
</tr>
<tr>
    <td><CopyableCode code="object" /></td>
    <td><code>string</code></td>
    <td>The type of this object (`container.file`).</td>
</tr>
<tr>
    <td><CopyableCode code="path" /></td>
    <td><code>string</code></td>
    <td>Path of the file in the container.</td>
</tr>
<tr>
    <td><CopyableCode code="source" /></td>
    <td><code>string</code></td>
    <td>Source of the file (e.g., `user`, `assistant`).</td>
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
    <td><a href="#parameter-container_id"><code>container_id</code></a>, <a href="#parameter-file_id"><code>file_id</code></a></td>
    <td><a href="#parameter-OpenAI-Organization"><code>OpenAI-Organization</code></a>, <a href="#parameter-OpenAI-Project"><code>OpenAI-Project</code></a></td>
    <td>Retrieves a container file.</td>
</tr>
<tr>
    <td><a href="#list"><CopyableCode code="list" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-container_id"><code>container_id</code></a></td>
    <td><a href="#parameter-limit"><code>limit</code></a>, <a href="#parameter-order"><code>order</code></a>, <a href="#parameter-after"><code>after</code></a>, <a href="#parameter-OpenAI-Organization"><code>OpenAI-Organization</code></a>, <a href="#parameter-OpenAI-Project"><code>OpenAI-Project</code></a></td>
    <td>Lists container files.</td>
</tr>
<tr>
    <td><a href="#create"><CopyableCode code="create" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-container_id"><code>container_id</code></a></td>
    <td><a href="#parameter-OpenAI-Organization"><code>OpenAI-Organization</code></a>, <a href="#parameter-OpenAI-Project"><code>OpenAI-Project</code></a></td>
    <td>Creates a container file.<br /></td>
</tr>
<tr>
    <td><a href="#delete"><CopyableCode code="delete" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-container_id"><code>container_id</code></a>, <a href="#parameter-file_id"><code>file_id</code></a></td>
    <td><a href="#parameter-OpenAI-Organization"><code>OpenAI-Organization</code></a>, <a href="#parameter-OpenAI-Project"><code>OpenAI-Project</code></a></td>
    <td>Delete a container file.</td>
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
<tr id="parameter-container_id">
    <td><CopyableCode code="container_id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr id="parameter-file_id">
    <td><CopyableCode code="file_id" /></td>
    <td><code>string</code></td>
    <td></td>
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

Retrieves a container file.

```sql
SELECT
id,
container_id,
bytes,
created_at,
object,
path,
source
FROM openai.containers.files
WHERE container_id = '{{ container_id }}' -- required
AND file_id = '{{ file_id }}' -- required
AND OpenAI-Organization = '{{ OpenAI-Organization }}'
AND OpenAI-Project = '{{ OpenAI-Project }}'
;
```
</TabItem>
<TabItem value="list">

Lists container files.

```sql
SELECT
id,
container_id,
bytes,
created_at,
object,
path,
source
FROM openai.containers.files
WHERE container_id = '{{ container_id }}' -- required
AND limit = '{{ limit }}'
AND order = '{{ order }}'
AND after = '{{ after }}'
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

Creates a container file.<br />

```sql
INSERT INTO openai.containers.files (
file_id,
file,
container_id,
OpenAI-Organization,
OpenAI-Project
)
SELECT 
'{{ file_id }}',
'{{ file }}',
'{{ container_id }}',
'{{ OpenAI-Organization }}',
'{{ OpenAI-Project }}'
RETURNING
id,
container_id,
bytes,
created_at,
object,
path,
source
;
```
</TabItem>
<TabItem value="manifest">

<CodeBlock language="yaml">{`# Description fields are for documentation purposes
- name: files
  props:
    - name: container_id
      value: "{{ container_id }}"
      description: Required parameter for the files resource.
    - name: file_id
      value: "{{ file_id }}"
      description: |
        Name of the file to create.
    - name: file
      value: "{{ file }}"
      description: |
        The File object (not file name) to be uploaded.
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


## `DELETE` examples

<Tabs
    defaultValue="delete"
    values={[
        { label: 'delete', value: 'delete' }
    ]}
>
<TabItem value="delete">

Delete a container file.

```sql
DELETE FROM openai.containers.files
WHERE container_id = '{{ container_id }}' --required
AND file_id = '{{ file_id }}' --required
AND OpenAI-Organization = '{{ OpenAI-Organization }}'
AND OpenAI-Project = '{{ OpenAI-Project }}'
;
```
</TabItem>
</Tabs>
