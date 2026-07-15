--- 
title: containers
hide_title: false
hide_table_of_contents: false
keywords:
  - containers
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

Creates, updates, deletes, gets or lists a <code>containers</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="containers" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="openai.containers.containers" /></td></tr>
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
    <td>Unique identifier for the container.</td>
</tr>
<tr>
    <td><CopyableCode code="name" /></td>
    <td><code>string</code></td>
    <td>Name of the container.</td>
</tr>
<tr>
    <td><CopyableCode code="created_at" /></td>
    <td><code>integer (unixtime)</code></td>
    <td>Unix timestamp (in seconds) when the container was created.</td>
</tr>
<tr>
    <td><CopyableCode code="expires_after" /></td>
    <td><code>object</code></td>
    <td>The container will expire after this time period. The anchor is the reference point for the expiration. The minutes is the number of minutes after the anchor before the container expires. </td>
</tr>
<tr>
    <td><CopyableCode code="last_active_at" /></td>
    <td><code>integer (unixtime)</code></td>
    <td>Unix timestamp (in seconds) when the container was last active.</td>
</tr>
<tr>
    <td><CopyableCode code="memory_limit" /></td>
    <td><code>string</code></td>
    <td>The memory limit configured for the container. (1g, 4g, 16g, 64g)</td>
</tr>
<tr>
    <td><CopyableCode code="network_policy" /></td>
    <td><code>object</code></td>
    <td>Network access policy for the container.</td>
</tr>
<tr>
    <td><CopyableCode code="object" /></td>
    <td><code>string</code></td>
    <td>The type of this object.</td>
</tr>
<tr>
    <td><CopyableCode code="status" /></td>
    <td><code>string</code></td>
    <td>Status of the container (e.g., active, deleted).</td>
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
    <td>Unique identifier for the container.</td>
</tr>
<tr>
    <td><CopyableCode code="name" /></td>
    <td><code>string</code></td>
    <td>Name of the container.</td>
</tr>
<tr>
    <td><CopyableCode code="created_at" /></td>
    <td><code>integer (unixtime)</code></td>
    <td>Unix timestamp (in seconds) when the container was created.</td>
</tr>
<tr>
    <td><CopyableCode code="expires_after" /></td>
    <td><code>object</code></td>
    <td>The container will expire after this time period. The anchor is the reference point for the expiration. The minutes is the number of minutes after the anchor before the container expires. </td>
</tr>
<tr>
    <td><CopyableCode code="last_active_at" /></td>
    <td><code>integer (unixtime)</code></td>
    <td>Unix timestamp (in seconds) when the container was last active.</td>
</tr>
<tr>
    <td><CopyableCode code="memory_limit" /></td>
    <td><code>string</code></td>
    <td>The memory limit configured for the container. (1g, 4g, 16g, 64g)</td>
</tr>
<tr>
    <td><CopyableCode code="network_policy" /></td>
    <td><code>object</code></td>
    <td>Network access policy for the container.</td>
</tr>
<tr>
    <td><CopyableCode code="object" /></td>
    <td><code>string</code></td>
    <td>The type of this object.</td>
</tr>
<tr>
    <td><CopyableCode code="status" /></td>
    <td><code>string</code></td>
    <td>Status of the container (e.g., active, deleted).</td>
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
    <td><a href="#parameter-container_id"><code>container_id</code></a></td>
    <td><a href="#parameter-OpenAI-Organization"><code>OpenAI-Organization</code></a>, <a href="#parameter-OpenAI-Project"><code>OpenAI-Project</code></a></td>
    <td>Retrieves a container.</td>
</tr>
<tr>
    <td><a href="#list"><CopyableCode code="list" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td></td>
    <td><a href="#parameter-limit"><code>limit</code></a>, <a href="#parameter-order"><code>order</code></a>, <a href="#parameter-after"><code>after</code></a>, <a href="#parameter-name"><code>name</code></a>, <a href="#parameter-OpenAI-Organization"><code>OpenAI-Organization</code></a>, <a href="#parameter-OpenAI-Project"><code>OpenAI-Project</code></a></td>
    <td>Lists containers.</td>
</tr>
<tr>
    <td><a href="#create"><CopyableCode code="create" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-name"><code>name</code></a></td>
    <td><a href="#parameter-OpenAI-Organization"><code>OpenAI-Organization</code></a>, <a href="#parameter-OpenAI-Project"><code>OpenAI-Project</code></a></td>
    <td>Creates a container.</td>
</tr>
<tr>
    <td><a href="#delete"><CopyableCode code="delete" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-container_id"><code>container_id</code></a></td>
    <td><a href="#parameter-OpenAI-Organization"><code>OpenAI-Organization</code></a>, <a href="#parameter-OpenAI-Project"><code>OpenAI-Project</code></a></td>
    <td>Delete a container.</td>
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
    <td>The ID of the container to delete.</td>
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
<tr id="parameter-name">
    <td><CopyableCode code="name" /></td>
    <td><code>string</code></td>
    <td>Filter results by container name.</td>
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

Retrieves a container.

```sql
SELECT
id,
name,
created_at,
expires_after,
last_active_at,
memory_limit,
network_policy,
object,
status
FROM openai.containers.containers
WHERE container_id = '{{ container_id }}' -- required
AND OpenAI-Organization = '{{ OpenAI-Organization }}'
AND OpenAI-Project = '{{ OpenAI-Project }}'
;
```
</TabItem>
<TabItem value="list">

Lists containers.

```sql
SELECT
id,
name,
created_at,
expires_after,
last_active_at,
memory_limit,
network_policy,
object,
status
FROM openai.containers.containers
WHERE limit = '{{ limit }}'
AND order = '{{ order }}'
AND after = '{{ after }}'
AND name = '{{ name }}'
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

Creates a container.

```sql
INSERT INTO openai.containers.containers (
name,
file_ids,
expires_after,
skills,
memory_limit,
network_policy,
OpenAI-Organization,
OpenAI-Project
)
SELECT 
'{{ name }}' /* required */,
'{{ file_ids }}',
'{{ expires_after }}',
'{{ skills }}',
'{{ memory_limit }}',
'{{ network_policy }}',
'{{ OpenAI-Organization }}',
'{{ OpenAI-Project }}'
RETURNING
id,
name,
created_at,
expires_after,
last_active_at,
memory_limit,
network_policy,
object,
status
;
```
</TabItem>
<TabItem value="manifest">

<CodeBlock language="yaml">{`# Description fields are for documentation purposes
- name: containers
  props:
    - name: name
      value: "{{ name }}"
      description: |
        Name of the container to create.
    - name: file_ids
      value:
        - "{{ file_ids }}"
      description: |
        IDs of files to copy to the container.
    - name: expires_after
      description: |
        Container expiration time in seconds relative to the 'anchor' time.
      value:
        anchor: "{{ anchor }}"
        minutes: {{ minutes }}
    - name: skills
      value: "{{ skills }}"
      description: |
        An optional list of skills referenced by id or inline data.
    - name: memory_limit
      value: "{{ memory_limit }}"
      description: |
        Optional memory limit for the container. Defaults to "1g".
      valid_values: ['1g', '4g', '16g', '64g']
    - name: network_policy
      description: |
        Network access policy for the container.
      value:
        type: "{{ type }}"
        allowed_domains:
          - "{{ allowed_domains }}"
        domain_secrets:
          - domain: "{{ domain }}"
            name: "{{ name }}"
            value: "{{ value }}"
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

Delete a container.

```sql
DELETE FROM openai.containers.containers
WHERE container_id = '{{ container_id }}' --required
AND OpenAI-Organization = '{{ OpenAI-Organization }}'
AND OpenAI-Project = '{{ OpenAI-Project }}'
;
```
</TabItem>
</Tabs>
