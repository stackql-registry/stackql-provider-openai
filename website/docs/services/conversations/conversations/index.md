--- 
title: conversations
hide_title: false
hide_table_of_contents: false
keywords:
  - conversations
  - conversations
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

Creates, updates, deletes, gets or lists a <code>conversations</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="conversations" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="openai.conversations.conversations" /></td></tr>
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
    <td>The unique ID of the conversation.</td>
</tr>
<tr>
    <td><CopyableCode code="created_at" /></td>
    <td><code>integer (unixtime)</code></td>
    <td>The time at which the conversation was created, measured in seconds since the Unix epoch.</td>
</tr>
<tr>
    <td><CopyableCode code="metadata" /></td>
    <td><code></code></td>
    <td>Set of 16 key-value pairs that can be attached to an object. This can be         useful for storing additional information about the object in a structured         format, and querying for objects via API or the dashboard.         Keys are strings with a maximum length of 64 characters. Values are strings         with a maximum length of 512 characters.</td>
</tr>
<tr>
    <td><CopyableCode code="object" /></td>
    <td><code>string</code></td>
    <td>The object type, which is always `conversation`. (conversation) (default: conversation)</td>
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
    <td><a href="#parameter-conversation_id"><code>conversation_id</code></a></td>
    <td><a href="#parameter-OpenAI-Organization"><code>OpenAI-Organization</code></a>, <a href="#parameter-OpenAI-Project"><code>OpenAI-Project</code></a></td>
    <td></td>
</tr>
<tr>
    <td><a href="#create"><CopyableCode code="create" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td></td>
    <td><a href="#parameter-OpenAI-Organization"><code>OpenAI-Organization</code></a>, <a href="#parameter-OpenAI-Project"><code>OpenAI-Project</code></a></td>
    <td></td>
</tr>
<tr>
    <td><a href="#update"><CopyableCode code="update" /></a></td>
    <td><CopyableCode code="update" /></td>
    <td><a href="#parameter-conversation_id"><code>conversation_id</code></a>, <a href="#parameter-metadata"><code>metadata</code></a></td>
    <td><a href="#parameter-OpenAI-Organization"><code>OpenAI-Organization</code></a>, <a href="#parameter-OpenAI-Project"><code>OpenAI-Project</code></a></td>
    <td></td>
</tr>
<tr>
    <td><a href="#delete"><CopyableCode code="delete" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-conversation_id"><code>conversation_id</code></a></td>
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
<tr id="parameter-conversation_id">
    <td><CopyableCode code="conversation_id" /></td>
    <td><code>string</code></td>
    <td>The ID of the conversation to delete.</td>
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

Success

```sql
SELECT
id,
created_at,
metadata,
object
FROM openai.conversations.conversations
WHERE conversation_id = '{{ conversation_id }}' -- required
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
INSERT INTO openai.conversations.conversations (
metadata,
items,
OpenAI-Organization,
OpenAI-Project
)
SELECT 
'{{ metadata }}',
'{{ items }}',
'{{ OpenAI-Organization }}',
'{{ OpenAI-Project }}'
RETURNING
id,
created_at,
metadata,
object
;
```
</TabItem>
<TabItem value="manifest">

<CodeBlock language="yaml">{`# Description fields are for documentation purposes
- name: conversations
  props:
    - name: metadata
      value: "{{ metadata }}"
      description: |
        Set of 16 key-value pairs that can be attached to an object. This can be
        useful for storing additional information about the object in a structured
        format, and querying for objects via API or the dashboard.
        Keys are strings with a maximum length of 64 characters. Values are strings
        with a maximum length of 512 characters.
    - name: items
      description: |
        Initial items to include in the conversation context. You may add up to 20 items at a time.
      value:
        - role: "{{ role }}"
          content: "{{ content }}"
          phase: "{{ phase }}"
          type: "{{ type }}"
          status: "{{ status }}"
          id: "{{ id }}"
          queries: "{{ queries }}"
          results: "{{ results }}"
          call_id: "{{ call_id }}"
          action:
            type: "{{ type }}"
            button: "{{ button }}"
            x: {{ x }}
            y: {{ y }}
            keys:
              - "{{ keys }}"
            path:
              - x: {{ x }}
                y: {{ y }}
            scroll_x: {{ scroll_x }}
            scroll_y: {{ scroll_y }}
            text: "{{ text }}"
          actions: "{{ actions }}"
          pending_safety_checks: "{{ pending_safety_checks }}"
          output:
            type: "{{ type }}"
            image_url: "{{ image_url }}"
            file_id: "{{ file_id }}"
          acknowledged_safety_checks: "{{ acknowledged_safety_checks }}"
          namespace: "{{ namespace }}"
          name: "{{ name }}"
          arguments: "{{ arguments }}"
          execution: "{{ execution }}"
          tools: "{{ tools }}"
          encrypted_content: "{{ encrypted_content }}"
          summary: "{{ summary }}"
          result: "{{ result }}"
          container_id: "{{ container_id }}"
          code: "{{ code }}"
          outputs: "{{ outputs }}"
          environment: "{{ environment }}"
          max_output_length: {{ max_output_length }}
          operation:
            type: "{{ type }}"
            path: "{{ path }}"
            diff: "{{ diff }}"
          server_label: "{{ server_label }}"
          error: "{{ error }}"
          approval_request_id: "{{ approval_request_id }}"
          approve: {{ approve }}
          reason: "{{ reason }}"
          input: "{{ input }}"
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
UPDATE openai.conversations.conversations
SET 
metadata = '{{ metadata }}'
WHERE 
conversation_id = '{{ conversation_id }}' --required
AND metadata = '{{ metadata }}' --required
AND OpenAI-Organization = '{{ OpenAI-Organization}}'
AND OpenAI-Project = '{{ OpenAI-Project}}'
RETURNING
id,
created_at,
metadata,
object;
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
DELETE FROM openai.conversations.conversations
WHERE conversation_id = '{{ conversation_id }}' --required
AND OpenAI-Organization = '{{ OpenAI-Organization }}'
AND OpenAI-Project = '{{ OpenAI-Project }}'
;
```
</TabItem>
</Tabs>
