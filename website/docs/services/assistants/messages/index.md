--- 
title: messages
hide_title: false
hide_table_of_contents: false
keywords:
  - messages
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

Creates, updates, deletes, gets or lists a <code>messages</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="messages" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="openai.assistants.messages" /></td></tr>
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
    <td><CopyableCode code="assistant_id" /></td>
    <td><code>string</code></td>
    <td>If applicable, the ID of the [assistant](/docs/api-reference/assistants) that authored this message.</td>
</tr>
<tr>
    <td><CopyableCode code="run_id" /></td>
    <td><code>string</code></td>
    <td>The ID of the [run](/docs/api-reference/runs) associated with the creation of this message. Value is `null` when messages are created manually using the create message or create thread endpoints.</td>
</tr>
<tr>
    <td><CopyableCode code="thread_id" /></td>
    <td><code>string</code></td>
    <td>The [thread](/docs/api-reference/threads) ID that this message belongs to.</td>
</tr>
<tr>
    <td><CopyableCode code="attachments" /></td>
    <td><code>array</code></td>
    <td>A list of files attached to the message, and the tools they were added to.</td>
</tr>
<tr>
    <td><CopyableCode code="completed_at" /></td>
    <td><code>integer (unixtime)</code></td>
    <td>The Unix timestamp (in seconds) for when the message was completed.</td>
</tr>
<tr>
    <td><CopyableCode code="content" /></td>
    <td><code>array</code></td>
    <td>The content of the message in array of text and/or images.</td>
</tr>
<tr>
    <td><CopyableCode code="created_at" /></td>
    <td><code>integer (unixtime)</code></td>
    <td>The Unix timestamp (in seconds) for when the message was created.</td>
</tr>
<tr>
    <td><CopyableCode code="incomplete_at" /></td>
    <td><code>integer (unixtime)</code></td>
    <td>The Unix timestamp (in seconds) for when the message was marked as incomplete.</td>
</tr>
<tr>
    <td><CopyableCode code="incomplete_details" /></td>
    <td><code>object</code></td>
    <td>On an incomplete message, details about why the message is incomplete.</td>
</tr>
<tr>
    <td><CopyableCode code="metadata" /></td>
    <td><code>object</code></td>
    <td>Set of 16 key-value pairs that can be attached to an object. This can be useful for storing additional information about the object in a structured format, and querying for objects via API or the dashboard.  Keys are strings with a maximum length of 64 characters. Values are strings with a maximum length of 512 characters.  (x-oaiTypeLabel: map)</td>
</tr>
<tr>
    <td><CopyableCode code="object" /></td>
    <td><code>string</code></td>
    <td>The object type, which is always `thread.message`. (thread.message)</td>
</tr>
<tr>
    <td><CopyableCode code="role" /></td>
    <td><code>string</code></td>
    <td>The entity that produced the message. One of `user` or `assistant`. (user, assistant)</td>
</tr>
<tr>
    <td><CopyableCode code="status" /></td>
    <td><code>string</code></td>
    <td>The status of the message, which can be either `in_progress`, `incomplete`, or `completed`. (in_progress, incomplete, completed)</td>
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
    <td><CopyableCode code="assistant_id" /></td>
    <td><code>string</code></td>
    <td>If applicable, the ID of the [assistant](/docs/api-reference/assistants) that authored this message.</td>
</tr>
<tr>
    <td><CopyableCode code="run_id" /></td>
    <td><code>string</code></td>
    <td>The ID of the [run](/docs/api-reference/runs) associated with the creation of this message. Value is `null` when messages are created manually using the create message or create thread endpoints.</td>
</tr>
<tr>
    <td><CopyableCode code="thread_id" /></td>
    <td><code>string</code></td>
    <td>The [thread](/docs/api-reference/threads) ID that this message belongs to.</td>
</tr>
<tr>
    <td><CopyableCode code="attachments" /></td>
    <td><code>array</code></td>
    <td>A list of files attached to the message, and the tools they were added to.</td>
</tr>
<tr>
    <td><CopyableCode code="completed_at" /></td>
    <td><code>integer (unixtime)</code></td>
    <td>The Unix timestamp (in seconds) for when the message was completed.</td>
</tr>
<tr>
    <td><CopyableCode code="content" /></td>
    <td><code>array</code></td>
    <td>The content of the message in array of text and/or images.</td>
</tr>
<tr>
    <td><CopyableCode code="created_at" /></td>
    <td><code>integer (unixtime)</code></td>
    <td>The Unix timestamp (in seconds) for when the message was created.</td>
</tr>
<tr>
    <td><CopyableCode code="incomplete_at" /></td>
    <td><code>integer (unixtime)</code></td>
    <td>The Unix timestamp (in seconds) for when the message was marked as incomplete.</td>
</tr>
<tr>
    <td><CopyableCode code="incomplete_details" /></td>
    <td><code>object</code></td>
    <td>On an incomplete message, details about why the message is incomplete.</td>
</tr>
<tr>
    <td><CopyableCode code="metadata" /></td>
    <td><code>object</code></td>
    <td>Set of 16 key-value pairs that can be attached to an object. This can be useful for storing additional information about the object in a structured format, and querying for objects via API or the dashboard.  Keys are strings with a maximum length of 64 characters. Values are strings with a maximum length of 512 characters.  (x-oaiTypeLabel: map)</td>
</tr>
<tr>
    <td><CopyableCode code="object" /></td>
    <td><code>string</code></td>
    <td>The object type, which is always `thread.message`. (thread.message)</td>
</tr>
<tr>
    <td><CopyableCode code="role" /></td>
    <td><code>string</code></td>
    <td>The entity that produced the message. One of `user` or `assistant`. (user, assistant)</td>
</tr>
<tr>
    <td><CopyableCode code="status" /></td>
    <td><code>string</code></td>
    <td>The status of the message, which can be either `in_progress`, `incomplete`, or `completed`. (in_progress, incomplete, completed)</td>
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
    <td><a href="#parameter-thread_id"><code>thread_id</code></a>, <a href="#parameter-message_id"><code>message_id</code></a></td>
    <td><a href="#parameter-OpenAI-Organization"><code>OpenAI-Organization</code></a>, <a href="#parameter-OpenAI-Project"><code>OpenAI-Project</code></a></td>
    <td></td>
</tr>
<tr>
    <td><a href="#list"><CopyableCode code="list" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-thread_id"><code>thread_id</code></a></td>
    <td><a href="#parameter-limit"><code>limit</code></a>, <a href="#parameter-order"><code>order</code></a>, <a href="#parameter-after"><code>after</code></a>, <a href="#parameter-before"><code>before</code></a>, <a href="#parameter-run_id"><code>run_id</code></a>, <a href="#parameter-OpenAI-Organization"><code>OpenAI-Organization</code></a>, <a href="#parameter-OpenAI-Project"><code>OpenAI-Project</code></a></td>
    <td></td>
</tr>
<tr>
    <td><a href="#create"><CopyableCode code="create" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-thread_id"><code>thread_id</code></a>, <a href="#parameter-role"><code>role</code></a>, <a href="#parameter-content"><code>content</code></a></td>
    <td><a href="#parameter-OpenAI-Organization"><code>OpenAI-Organization</code></a>, <a href="#parameter-OpenAI-Project"><code>OpenAI-Project</code></a></td>
    <td></td>
</tr>
<tr>
    <td><a href="#update"><CopyableCode code="update" /></a></td>
    <td><CopyableCode code="update" /></td>
    <td><a href="#parameter-thread_id"><code>thread_id</code></a>, <a href="#parameter-message_id"><code>message_id</code></a></td>
    <td><a href="#parameter-OpenAI-Organization"><code>OpenAI-Organization</code></a>, <a href="#parameter-OpenAI-Project"><code>OpenAI-Project</code></a></td>
    <td></td>
</tr>
<tr>
    <td><a href="#delete"><CopyableCode code="delete" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-thread_id"><code>thread_id</code></a>, <a href="#parameter-message_id"><code>message_id</code></a></td>
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
<tr id="parameter-message_id">
    <td><CopyableCode code="message_id" /></td>
    <td><code>string</code></td>
    <td>The ID of the message to delete.</td>
</tr>
<tr id="parameter-thread_id">
    <td><CopyableCode code="thread_id" /></td>
    <td><code>string</code></td>
    <td>The ID of the thread to which this message belongs.</td>
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
<tr id="parameter-run_id">
    <td><CopyableCode code="run_id" /></td>
    <td><code>string</code></td>
    <td>Filter messages by the run ID that generated them. </td>
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
assistant_id,
run_id,
thread_id,
attachments,
completed_at,
content,
created_at,
incomplete_at,
incomplete_details,
metadata,
object,
role,
status
FROM openai.assistants.messages
WHERE thread_id = '{{ thread_id }}' -- required
AND message_id = '{{ message_id }}' -- required
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
assistant_id,
run_id,
thread_id,
attachments,
completed_at,
content,
created_at,
incomplete_at,
incomplete_details,
metadata,
object,
role,
status
FROM openai.assistants.messages
WHERE thread_id = '{{ thread_id }}' -- required
AND limit = '{{ limit }}'
AND order = '{{ order }}'
AND after = '{{ after }}'
AND before = '{{ before }}'
AND run_id = '{{ run_id }}'
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
INSERT INTO openai.assistants.messages (
role,
content,
attachments,
metadata,
thread_id,
OpenAI-Organization,
OpenAI-Project
)
SELECT 
'{{ role }}' /* required */,
'{{ content }}' /* required */,
'{{ attachments }}',
'{{ metadata }}',
'{{ thread_id }}',
'{{ OpenAI-Organization }}',
'{{ OpenAI-Project }}'
RETURNING
id,
assistant_id,
run_id,
thread_id,
attachments,
completed_at,
content,
created_at,
incomplete_at,
incomplete_details,
metadata,
object,
role,
status
;
```
</TabItem>
<TabItem value="manifest">

<CodeBlock language="yaml">{`# Description fields are for documentation purposes
- name: messages
  props:
    - name: thread_id
      value: "{{ thread_id }}"
      description: Required parameter for the messages resource.
    - name: role
      value: "{{ role }}"
      description: |
        The role of the entity that is creating the message. Allowed values include:
        - \`user\`: Indicates the message is sent by an actual user and should be used in most cases to represent user-generated messages.
        - \`assistant\`: Indicates the message is generated by the assistant. Use this value to insert messages from the assistant into the conversation.
      valid_values: ['user', 'assistant']
    - name: content
      value: "{{ content }}"
      description: |
        The text contents of the message.
    - name: attachments
      description: |
        A list of files attached to the message, and the tools they should be added to.
      value:
        - file_id: "{{ file_id }}"
          tools: "{{ tools }}"
    - name: metadata
      value: "{{ metadata }}"
      description: |
        Set of 16 key-value pairs that can be attached to an object. This can be
        useful for storing additional information about the object in a structured
        format, and querying for objects via API or the dashboard.
        Keys are strings with a maximum length of 64 characters. Values are strings
        with a maximum length of 512 characters.
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
UPDATE openai.assistants.messages
SET 
metadata = '{{ metadata }}'
WHERE 
thread_id = '{{ thread_id }}' --required
AND message_id = '{{ message_id }}' --required
AND OpenAI-Organization = '{{ OpenAI-Organization}}'
AND OpenAI-Project = '{{ OpenAI-Project}}'
RETURNING
id,
assistant_id,
run_id,
thread_id,
attachments,
completed_at,
content,
created_at,
incomplete_at,
incomplete_details,
metadata,
object,
role,
status;
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
DELETE FROM openai.assistants.messages
WHERE thread_id = '{{ thread_id }}' --required
AND message_id = '{{ message_id }}' --required
AND OpenAI-Organization = '{{ OpenAI-Organization }}'
AND OpenAI-Project = '{{ OpenAI-Project }}'
;
```
</TabItem>
</Tabs>
