--- 
title: run_steps
hide_title: false
hide_table_of_contents: false
keywords:
  - run_steps
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

Creates, updates, deletes, gets or lists a <code>run_steps</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="run_steps" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="openai.assistants.run_steps" /></td></tr>
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
    <td>The identifier of the run step, which can be referenced in API endpoints.</td>
</tr>
<tr>
    <td><CopyableCode code="assistant_id" /></td>
    <td><code>string</code></td>
    <td>The ID of the [assistant](/docs/api-reference/assistants) associated with the run step.</td>
</tr>
<tr>
    <td><CopyableCode code="run_id" /></td>
    <td><code>string</code></td>
    <td>The ID of the [run](/docs/api-reference/runs) that this run step is a part of.</td>
</tr>
<tr>
    <td><CopyableCode code="thread_id" /></td>
    <td><code>string</code></td>
    <td>The ID of the [thread](/docs/api-reference/threads) that was run.</td>
</tr>
<tr>
    <td><CopyableCode code="cancelled_at" /></td>
    <td><code>integer (unixtime)</code></td>
    <td>The Unix timestamp (in seconds) for when the run step was cancelled.</td>
</tr>
<tr>
    <td><CopyableCode code="completed_at" /></td>
    <td><code>integer (unixtime)</code></td>
    <td>The Unix timestamp (in seconds) for when the run step completed.</td>
</tr>
<tr>
    <td><CopyableCode code="created_at" /></td>
    <td><code>integer (unixtime)</code></td>
    <td>The Unix timestamp (in seconds) for when the run step was created.</td>
</tr>
<tr>
    <td><CopyableCode code="expired_at" /></td>
    <td><code>integer (unixtime)</code></td>
    <td>The Unix timestamp (in seconds) for when the run step expired. A step is considered expired if the parent run is expired.</td>
</tr>
<tr>
    <td><CopyableCode code="failed_at" /></td>
    <td><code>integer (unixtime)</code></td>
    <td>The Unix timestamp (in seconds) for when the run step failed.</td>
</tr>
<tr>
    <td><CopyableCode code="last_error" /></td>
    <td><code>object</code></td>
    <td>The last error associated with this run step. Will be `null` if there are no errors.</td>
</tr>
<tr>
    <td><CopyableCode code="metadata" /></td>
    <td><code>object</code></td>
    <td>Set of 16 key-value pairs that can be attached to an object. This can be useful for storing additional information about the object in a structured format, and querying for objects via API or the dashboard.  Keys are strings with a maximum length of 64 characters. Values are strings with a maximum length of 512 characters.  (x-oaiTypeLabel: map)</td>
</tr>
<tr>
    <td><CopyableCode code="object" /></td>
    <td><code>string</code></td>
    <td>The object type, which is always `thread.run.step`. (thread.run.step)</td>
</tr>
<tr>
    <td><CopyableCode code="status" /></td>
    <td><code>string</code></td>
    <td>The status of the run step, which can be either `in_progress`, `cancelled`, `failed`, `completed`, or `expired`. (in_progress, cancelled, failed, completed, expired)</td>
</tr>
<tr>
    <td><CopyableCode code="step_details" /></td>
    <td><code>object</code></td>
    <td>The details of the run step. (title: Message creation)</td>
</tr>
<tr>
    <td><CopyableCode code="type" /></td>
    <td><code>string</code></td>
    <td>The type of run step, which can be either `message_creation` or `tool_calls`. (message_creation, tool_calls)</td>
</tr>
<tr>
    <td><CopyableCode code="usage" /></td>
    <td><code>object</code></td>
    <td>Usage statistics related to the run step. This value will be `null` while the run step's status is `in_progress`.</td>
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
    <td>The identifier of the run step, which can be referenced in API endpoints.</td>
</tr>
<tr>
    <td><CopyableCode code="assistant_id" /></td>
    <td><code>string</code></td>
    <td>The ID of the [assistant](/docs/api-reference/assistants) associated with the run step.</td>
</tr>
<tr>
    <td><CopyableCode code="run_id" /></td>
    <td><code>string</code></td>
    <td>The ID of the [run](/docs/api-reference/runs) that this run step is a part of.</td>
</tr>
<tr>
    <td><CopyableCode code="thread_id" /></td>
    <td><code>string</code></td>
    <td>The ID of the [thread](/docs/api-reference/threads) that was run.</td>
</tr>
<tr>
    <td><CopyableCode code="cancelled_at" /></td>
    <td><code>integer (unixtime)</code></td>
    <td>The Unix timestamp (in seconds) for when the run step was cancelled.</td>
</tr>
<tr>
    <td><CopyableCode code="completed_at" /></td>
    <td><code>integer (unixtime)</code></td>
    <td>The Unix timestamp (in seconds) for when the run step completed.</td>
</tr>
<tr>
    <td><CopyableCode code="created_at" /></td>
    <td><code>integer (unixtime)</code></td>
    <td>The Unix timestamp (in seconds) for when the run step was created.</td>
</tr>
<tr>
    <td><CopyableCode code="expired_at" /></td>
    <td><code>integer (unixtime)</code></td>
    <td>The Unix timestamp (in seconds) for when the run step expired. A step is considered expired if the parent run is expired.</td>
</tr>
<tr>
    <td><CopyableCode code="failed_at" /></td>
    <td><code>integer (unixtime)</code></td>
    <td>The Unix timestamp (in seconds) for when the run step failed.</td>
</tr>
<tr>
    <td><CopyableCode code="last_error" /></td>
    <td><code>object</code></td>
    <td>The last error associated with this run step. Will be `null` if there are no errors.</td>
</tr>
<tr>
    <td><CopyableCode code="metadata" /></td>
    <td><code>object</code></td>
    <td>Set of 16 key-value pairs that can be attached to an object. This can be useful for storing additional information about the object in a structured format, and querying for objects via API or the dashboard.  Keys are strings with a maximum length of 64 characters. Values are strings with a maximum length of 512 characters.  (x-oaiTypeLabel: map)</td>
</tr>
<tr>
    <td><CopyableCode code="object" /></td>
    <td><code>string</code></td>
    <td>The object type, which is always `thread.run.step`. (thread.run.step)</td>
</tr>
<tr>
    <td><CopyableCode code="status" /></td>
    <td><code>string</code></td>
    <td>The status of the run step, which can be either `in_progress`, `cancelled`, `failed`, `completed`, or `expired`. (in_progress, cancelled, failed, completed, expired)</td>
</tr>
<tr>
    <td><CopyableCode code="step_details" /></td>
    <td><code>object</code></td>
    <td>The details of the run step. (title: Message creation)</td>
</tr>
<tr>
    <td><CopyableCode code="type" /></td>
    <td><code>string</code></td>
    <td>The type of run step, which can be either `message_creation` or `tool_calls`. (message_creation, tool_calls)</td>
</tr>
<tr>
    <td><CopyableCode code="usage" /></td>
    <td><code>object</code></td>
    <td>Usage statistics related to the run step. This value will be `null` while the run step's status is `in_progress`.</td>
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
    <td><a href="#parameter-thread_id"><code>thread_id</code></a>, <a href="#parameter-run_id"><code>run_id</code></a>, <a href="#parameter-step_id"><code>step_id</code></a></td>
    <td><a href="#parameter-include[]"><code>include[]</code></a>, <a href="#parameter-OpenAI-Organization"><code>OpenAI-Organization</code></a>, <a href="#parameter-OpenAI-Project"><code>OpenAI-Project</code></a></td>
    <td></td>
</tr>
<tr>
    <td><a href="#list"><CopyableCode code="list" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-thread_id"><code>thread_id</code></a>, <a href="#parameter-run_id"><code>run_id</code></a></td>
    <td><a href="#parameter-limit"><code>limit</code></a>, <a href="#parameter-order"><code>order</code></a>, <a href="#parameter-after"><code>after</code></a>, <a href="#parameter-before"><code>before</code></a>, <a href="#parameter-include[]"><code>include[]</code></a>, <a href="#parameter-OpenAI-Organization"><code>OpenAI-Organization</code></a>, <a href="#parameter-OpenAI-Project"><code>OpenAI-Project</code></a></td>
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
<tr id="parameter-run_id">
    <td><CopyableCode code="run_id" /></td>
    <td><code>string</code></td>
    <td>The ID of the run the run steps belong to.</td>
</tr>
<tr id="parameter-step_id">
    <td><CopyableCode code="step_id" /></td>
    <td><code>string</code></td>
    <td>The ID of the run step to retrieve.</td>
</tr>
<tr id="parameter-thread_id">
    <td><CopyableCode code="thread_id" /></td>
    <td><code>string</code></td>
    <td>The ID of the thread the run and run steps belong to.</td>
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
<tr id="parameter-include[]">
    <td><CopyableCode code="include[]" /></td>
    <td><code>array</code></td>
    <td>A list of additional fields to include in the response. Currently the only supported value is `step_details.tool_calls[*].file_search.results[*].content` to fetch the file search result content.  See the [file search tool documentation](/docs/assistants/tools/file-search#customizing-file-search-settings) for more information. </td>
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
assistant_id,
run_id,
thread_id,
cancelled_at,
completed_at,
created_at,
expired_at,
failed_at,
last_error,
metadata,
object,
status,
step_details,
type,
usage
FROM openai.assistants.run_steps
WHERE thread_id = '{{ thread_id }}' -- required
AND run_id = '{{ run_id }}' -- required
AND step_id = '{{ step_id }}' -- required
AND include[] = '{{ include[] }}'
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
cancelled_at,
completed_at,
created_at,
expired_at,
failed_at,
last_error,
metadata,
object,
status,
step_details,
type,
usage
FROM openai.assistants.run_steps
WHERE thread_id = '{{ thread_id }}' -- required
AND run_id = '{{ run_id }}' -- required
AND limit = '{{ limit }}'
AND order = '{{ order }}'
AND after = '{{ after }}'
AND before = '{{ before }}'
AND include[] = '{{ include[] }}'
AND OpenAI-Organization = '{{ OpenAI-Organization }}'
AND OpenAI-Project = '{{ OpenAI-Project }}'
;
```
</TabItem>
</Tabs>
