--- 
title: runs
hide_title: false
hide_table_of_contents: false
keywords:
  - runs
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

Creates, updates, deletes, gets or lists a <code>runs</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="runs" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="openai.assistants.runs" /></td></tr>
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
    <td>The ID of the [assistant](/docs/api-reference/assistants) used for execution of this run.</td>
</tr>
<tr>
    <td><CopyableCode code="thread_id" /></td>
    <td><code>string</code></td>
    <td>The ID of the [thread](/docs/api-reference/threads) that was executed on as a part of this run.</td>
</tr>
<tr>
    <td><CopyableCode code="cancelled_at" /></td>
    <td><code>integer (unixtime)</code></td>
    <td>The Unix timestamp (in seconds) for when the run was cancelled.</td>
</tr>
<tr>
    <td><CopyableCode code="completed_at" /></td>
    <td><code>integer (unixtime)</code></td>
    <td>The Unix timestamp (in seconds) for when the run was completed.</td>
</tr>
<tr>
    <td><CopyableCode code="created_at" /></td>
    <td><code>integer (unixtime)</code></td>
    <td>The Unix timestamp (in seconds) for when the run was created.</td>
</tr>
<tr>
    <td><CopyableCode code="expires_at" /></td>
    <td><code>integer (unixtime)</code></td>
    <td>The Unix timestamp (in seconds) for when the run will expire.</td>
</tr>
<tr>
    <td><CopyableCode code="failed_at" /></td>
    <td><code>integer (unixtime)</code></td>
    <td>The Unix timestamp (in seconds) for when the run failed.</td>
</tr>
<tr>
    <td><CopyableCode code="incomplete_details" /></td>
    <td><code>object</code></td>
    <td>Details on why the run is incomplete. Will be `null` if the run is not incomplete.</td>
</tr>
<tr>
    <td><CopyableCode code="instructions" /></td>
    <td><code>string</code></td>
    <td>The instructions that the [assistant](/docs/api-reference/assistants) used for this run.</td>
</tr>
<tr>
    <td><CopyableCode code="last_error" /></td>
    <td><code>object</code></td>
    <td>The last error associated with this run. Will be `null` if there are no errors.</td>
</tr>
<tr>
    <td><CopyableCode code="max_completion_tokens" /></td>
    <td><code>integer</code></td>
    <td>The maximum number of completion tokens specified to have been used over the course of the run. </td>
</tr>
<tr>
    <td><CopyableCode code="max_prompt_tokens" /></td>
    <td><code>integer</code></td>
    <td>The maximum number of prompt tokens specified to have been used over the course of the run. </td>
</tr>
<tr>
    <td><CopyableCode code="metadata" /></td>
    <td><code>object</code></td>
    <td>Set of 16 key-value pairs that can be attached to an object. This can be useful for storing additional information about the object in a structured format, and querying for objects via API or the dashboard.  Keys are strings with a maximum length of 64 characters. Values are strings with a maximum length of 512 characters.  (x-oaiTypeLabel: map)</td>
</tr>
<tr>
    <td><CopyableCode code="model" /></td>
    <td><code>string</code></td>
    <td>The model that the [assistant](/docs/api-reference/assistants) used for this run.</td>
</tr>
<tr>
    <td><CopyableCode code="object" /></td>
    <td><code>string</code></td>
    <td>The object type, which is always `thread.run`. (thread.run)</td>
</tr>
<tr>
    <td><CopyableCode code="parallel_tool_calls" /></td>
    <td><code>boolean</code></td>
    <td>Whether to enable [parallel function calling](/docs/guides/function-calling#configuring-parallel-function-calling) during tool use.</td>
</tr>
<tr>
    <td><CopyableCode code="required_action" /></td>
    <td><code>object</code></td>
    <td>Details on the action required to continue the run. Will be `null` if no action is required.</td>
</tr>
<tr>
    <td><CopyableCode code="response_format" /></td>
    <td><code>string</code></td>
    <td>Specifies the format that the model must output. Compatible with [GPT-4o](/docs/models#gpt-4o), [GPT-4 Turbo](/docs/models#gpt-4-turbo-and-gpt-4), and all GPT-3.5 Turbo models since `gpt-3.5-turbo-1106`.  Setting to `&#123; "type": "json_schema", "json_schema": &#123;...&#125; &#125;` enables Structured Outputs which ensures the model will match your supplied JSON schema. Learn more in the [Structured Outputs guide](/docs/guides/structured-outputs).  Setting to `&#123; "type": "json_object" &#125;` enables JSON mode, which ensures the message the model generates is valid JSON.  **Important:** when using JSON mode, you **must** also instruct the model to produce JSON yourself via a system or user message. Without this, the model may generate an unending stream of whitespace until the generation reaches the token limit, resulting in a long-running and seemingly "stuck" request. Also note that the message content may be partially cut off if `finish_reason="length"`, which indicates the generation exceeded `max_tokens` or the conversation exceeded the max context length.  (auto) (title: Text)</td>
</tr>
<tr>
    <td><CopyableCode code="started_at" /></td>
    <td><code>integer (unixtime)</code></td>
    <td>The Unix timestamp (in seconds) for when the run was started.</td>
</tr>
<tr>
    <td><CopyableCode code="status" /></td>
    <td><code>string</code></td>
    <td>The status of the run, which can be either `queued`, `in_progress`, `requires_action`, `cancelling`, `cancelled`, `failed`, `completed`, `incomplete`, or `expired`. (queued, in_progress, requires_action, cancelling, cancelled, failed, completed, incomplete, expired)</td>
</tr>
<tr>
    <td><CopyableCode code="temperature" /></td>
    <td><code>number</code></td>
    <td>The sampling temperature used for this run. If not set, defaults to 1.</td>
</tr>
<tr>
    <td><CopyableCode code="tool_choice" /></td>
    <td><code>string</code></td>
    <td>Controls which (if any) tool is called by the model. `none` means the model will not call any tools and instead generates a message. `auto` is the default value and means the model can pick between generating a message or calling one or more tools. `required` means the model must call one or more tools before responding to the user. Specifying a particular tool like `&#123;"type": "file_search"&#125;` or `&#123;"type": "function", "function": &#123;"name": "my_function"&#125;&#125;` forces the model to call that tool.  (none, auto, required)</td>
</tr>
<tr>
    <td><CopyableCode code="tools" /></td>
    <td><code>array</code></td>
    <td>The list of tools that the [assistant](/docs/api-reference/assistants) used for this run.</td>
</tr>
<tr>
    <td><CopyableCode code="top_p" /></td>
    <td><code>number</code></td>
    <td>The nucleus sampling value used for this run. If not set, defaults to 1.</td>
</tr>
<tr>
    <td><CopyableCode code="truncation_strategy" /></td>
    <td><code>object</code></td>
    <td>Controls for how a thread will be truncated prior to the run. Use this to control the initial context window of the run. (title: Thread Truncation Controls)</td>
</tr>
<tr>
    <td><CopyableCode code="usage" /></td>
    <td><code>object</code></td>
    <td>Usage statistics related to the run. This value will be `null` if the run is not in a terminal state (i.e. `in_progress`, `queued`, etc.).</td>
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
    <td>The ID of the [assistant](/docs/api-reference/assistants) used for execution of this run.</td>
</tr>
<tr>
    <td><CopyableCode code="thread_id" /></td>
    <td><code>string</code></td>
    <td>The ID of the [thread](/docs/api-reference/threads) that was executed on as a part of this run.</td>
</tr>
<tr>
    <td><CopyableCode code="cancelled_at" /></td>
    <td><code>integer (unixtime)</code></td>
    <td>The Unix timestamp (in seconds) for when the run was cancelled.</td>
</tr>
<tr>
    <td><CopyableCode code="completed_at" /></td>
    <td><code>integer (unixtime)</code></td>
    <td>The Unix timestamp (in seconds) for when the run was completed.</td>
</tr>
<tr>
    <td><CopyableCode code="created_at" /></td>
    <td><code>integer (unixtime)</code></td>
    <td>The Unix timestamp (in seconds) for when the run was created.</td>
</tr>
<tr>
    <td><CopyableCode code="expires_at" /></td>
    <td><code>integer (unixtime)</code></td>
    <td>The Unix timestamp (in seconds) for when the run will expire.</td>
</tr>
<tr>
    <td><CopyableCode code="failed_at" /></td>
    <td><code>integer (unixtime)</code></td>
    <td>The Unix timestamp (in seconds) for when the run failed.</td>
</tr>
<tr>
    <td><CopyableCode code="incomplete_details" /></td>
    <td><code>object</code></td>
    <td>Details on why the run is incomplete. Will be `null` if the run is not incomplete.</td>
</tr>
<tr>
    <td><CopyableCode code="instructions" /></td>
    <td><code>string</code></td>
    <td>The instructions that the [assistant](/docs/api-reference/assistants) used for this run.</td>
</tr>
<tr>
    <td><CopyableCode code="last_error" /></td>
    <td><code>object</code></td>
    <td>The last error associated with this run. Will be `null` if there are no errors.</td>
</tr>
<tr>
    <td><CopyableCode code="max_completion_tokens" /></td>
    <td><code>integer</code></td>
    <td>The maximum number of completion tokens specified to have been used over the course of the run. </td>
</tr>
<tr>
    <td><CopyableCode code="max_prompt_tokens" /></td>
    <td><code>integer</code></td>
    <td>The maximum number of prompt tokens specified to have been used over the course of the run. </td>
</tr>
<tr>
    <td><CopyableCode code="metadata" /></td>
    <td><code>object</code></td>
    <td>Set of 16 key-value pairs that can be attached to an object. This can be useful for storing additional information about the object in a structured format, and querying for objects via API or the dashboard.  Keys are strings with a maximum length of 64 characters. Values are strings with a maximum length of 512 characters.  (x-oaiTypeLabel: map)</td>
</tr>
<tr>
    <td><CopyableCode code="model" /></td>
    <td><code>string</code></td>
    <td>The model that the [assistant](/docs/api-reference/assistants) used for this run.</td>
</tr>
<tr>
    <td><CopyableCode code="object" /></td>
    <td><code>string</code></td>
    <td>The object type, which is always `thread.run`. (thread.run)</td>
</tr>
<tr>
    <td><CopyableCode code="parallel_tool_calls" /></td>
    <td><code>boolean</code></td>
    <td>Whether to enable [parallel function calling](/docs/guides/function-calling#configuring-parallel-function-calling) during tool use.</td>
</tr>
<tr>
    <td><CopyableCode code="required_action" /></td>
    <td><code>object</code></td>
    <td>Details on the action required to continue the run. Will be `null` if no action is required.</td>
</tr>
<tr>
    <td><CopyableCode code="response_format" /></td>
    <td><code>string</code></td>
    <td>Specifies the format that the model must output. Compatible with [GPT-4o](/docs/models#gpt-4o), [GPT-4 Turbo](/docs/models#gpt-4-turbo-and-gpt-4), and all GPT-3.5 Turbo models since `gpt-3.5-turbo-1106`.  Setting to `&#123; "type": "json_schema", "json_schema": &#123;...&#125; &#125;` enables Structured Outputs which ensures the model will match your supplied JSON schema. Learn more in the [Structured Outputs guide](/docs/guides/structured-outputs).  Setting to `&#123; "type": "json_object" &#125;` enables JSON mode, which ensures the message the model generates is valid JSON.  **Important:** when using JSON mode, you **must** also instruct the model to produce JSON yourself via a system or user message. Without this, the model may generate an unending stream of whitespace until the generation reaches the token limit, resulting in a long-running and seemingly "stuck" request. Also note that the message content may be partially cut off if `finish_reason="length"`, which indicates the generation exceeded `max_tokens` or the conversation exceeded the max context length.  (auto) (title: Text)</td>
</tr>
<tr>
    <td><CopyableCode code="started_at" /></td>
    <td><code>integer (unixtime)</code></td>
    <td>The Unix timestamp (in seconds) for when the run was started.</td>
</tr>
<tr>
    <td><CopyableCode code="status" /></td>
    <td><code>string</code></td>
    <td>The status of the run, which can be either `queued`, `in_progress`, `requires_action`, `cancelling`, `cancelled`, `failed`, `completed`, `incomplete`, or `expired`. (queued, in_progress, requires_action, cancelling, cancelled, failed, completed, incomplete, expired)</td>
</tr>
<tr>
    <td><CopyableCode code="temperature" /></td>
    <td><code>number</code></td>
    <td>The sampling temperature used for this run. If not set, defaults to 1.</td>
</tr>
<tr>
    <td><CopyableCode code="tool_choice" /></td>
    <td><code>string</code></td>
    <td>Controls which (if any) tool is called by the model. `none` means the model will not call any tools and instead generates a message. `auto` is the default value and means the model can pick between generating a message or calling one or more tools. `required` means the model must call one or more tools before responding to the user. Specifying a particular tool like `&#123;"type": "file_search"&#125;` or `&#123;"type": "function", "function": &#123;"name": "my_function"&#125;&#125;` forces the model to call that tool.  (none, auto, required)</td>
</tr>
<tr>
    <td><CopyableCode code="tools" /></td>
    <td><code>array</code></td>
    <td>The list of tools that the [assistant](/docs/api-reference/assistants) used for this run.</td>
</tr>
<tr>
    <td><CopyableCode code="top_p" /></td>
    <td><code>number</code></td>
    <td>The nucleus sampling value used for this run. If not set, defaults to 1.</td>
</tr>
<tr>
    <td><CopyableCode code="truncation_strategy" /></td>
    <td><code>object</code></td>
    <td>Controls for how a thread will be truncated prior to the run. Use this to control the initial context window of the run. (title: Thread Truncation Controls)</td>
</tr>
<tr>
    <td><CopyableCode code="usage" /></td>
    <td><code>object</code></td>
    <td>Usage statistics related to the run. This value will be `null` if the run is not in a terminal state (i.e. `in_progress`, `queued`, etc.).</td>
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
    <td><a href="#parameter-thread_id"><code>thread_id</code></a>, <a href="#parameter-run_id"><code>run_id</code></a></td>
    <td><a href="#parameter-OpenAI-Organization"><code>OpenAI-Organization</code></a>, <a href="#parameter-OpenAI-Project"><code>OpenAI-Project</code></a></td>
    <td></td>
</tr>
<tr>
    <td><a href="#list"><CopyableCode code="list" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-thread_id"><code>thread_id</code></a></td>
    <td><a href="#parameter-limit"><code>limit</code></a>, <a href="#parameter-order"><code>order</code></a>, <a href="#parameter-after"><code>after</code></a>, <a href="#parameter-before"><code>before</code></a>, <a href="#parameter-OpenAI-Organization"><code>OpenAI-Organization</code></a>, <a href="#parameter-OpenAI-Project"><code>OpenAI-Project</code></a></td>
    <td></td>
</tr>
<tr>
    <td><a href="#create"><CopyableCode code="create" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-thread_id"><code>thread_id</code></a>, <a href="#parameter-assistant_id"><code>assistant_id</code></a></td>
    <td><a href="#parameter-include[]"><code>include[]</code></a>, <a href="#parameter-OpenAI-Organization"><code>OpenAI-Organization</code></a>, <a href="#parameter-OpenAI-Project"><code>OpenAI-Project</code></a></td>
    <td></td>
</tr>
<tr>
    <td><a href="#update"><CopyableCode code="update" /></a></td>
    <td><CopyableCode code="update" /></td>
    <td><a href="#parameter-thread_id"><code>thread_id</code></a>, <a href="#parameter-run_id"><code>run_id</code></a></td>
    <td><a href="#parameter-OpenAI-Organization"><code>OpenAI-Organization</code></a>, <a href="#parameter-OpenAI-Project"><code>OpenAI-Project</code></a></td>
    <td></td>
</tr>
<tr>
    <td><a href="#cancel"><CopyableCode code="cancel" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-thread_id"><code>thread_id</code></a>, <a href="#parameter-run_id"><code>run_id</code></a></td>
    <td><a href="#parameter-OpenAI-Organization"><code>OpenAI-Organization</code></a>, <a href="#parameter-OpenAI-Project"><code>OpenAI-Project</code></a></td>
    <td></td>
</tr>
<tr>
    <td><a href="#submit_tool_outputs"><CopyableCode code="submit_tool_outputs" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-thread_id"><code>thread_id</code></a>, <a href="#parameter-run_id"><code>run_id</code></a>, <a href="#parameter-tool_outputs"><code>tool_outputs</code></a></td>
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
<tr id="parameter-run_id">
    <td><CopyableCode code="run_id" /></td>
    <td><code>string</code></td>
    <td>The ID of the run that requires the tool output submission.</td>
</tr>
<tr id="parameter-thread_id">
    <td><CopyableCode code="thread_id" /></td>
    <td><code>string</code></td>
    <td>The ID of the [thread](/docs/api-reference/threads) to which this run belongs.</td>
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
thread_id,
cancelled_at,
completed_at,
created_at,
expires_at,
failed_at,
incomplete_details,
instructions,
last_error,
max_completion_tokens,
max_prompt_tokens,
metadata,
model,
object,
parallel_tool_calls,
required_action,
response_format,
started_at,
status,
temperature,
tool_choice,
tools,
top_p,
truncation_strategy,
usage
FROM openai.assistants.runs
WHERE thread_id = '{{ thread_id }}' -- required
AND run_id = '{{ run_id }}' -- required
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
thread_id,
cancelled_at,
completed_at,
created_at,
expires_at,
failed_at,
incomplete_details,
instructions,
last_error,
max_completion_tokens,
max_prompt_tokens,
metadata,
model,
object,
parallel_tool_calls,
required_action,
response_format,
started_at,
status,
temperature,
tool_choice,
tools,
top_p,
truncation_strategy,
usage
FROM openai.assistants.runs
WHERE thread_id = '{{ thread_id }}' -- required
AND limit = '{{ limit }}'
AND order = '{{ order }}'
AND after = '{{ after }}'
AND before = '{{ before }}'
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
INSERT INTO openai.assistants.runs (
assistant_id,
model,
reasoning_effort,
instructions,
additional_instructions,
additional_messages,
tools,
metadata,
temperature,
top_p,
stream,
max_prompt_tokens,
max_completion_tokens,
truncation_strategy,
tool_choice,
parallel_tool_calls,
response_format,
thread_id,
include[],
OpenAI-Organization,
OpenAI-Project
)
SELECT 
'{{ assistant_id }}' /* required */,
'{{ model }}',
'{{ reasoning_effort }}',
'{{ instructions }}',
'{{ additional_instructions }}',
'{{ additional_messages }}',
'{{ tools }}',
'{{ metadata }}',
{{ temperature }},
{{ top_p }},
{{ stream }},
{{ max_prompt_tokens }},
{{ max_completion_tokens }},
'{{ truncation_strategy }}',
'{{ tool_choice }}',
{{ parallel_tool_calls }},
'{{ response_format }}',
'{{ thread_id }}',
'{{ include[] }}',
'{{ OpenAI-Organization }}',
'{{ OpenAI-Project }}'
RETURNING
id,
assistant_id,
thread_id,
cancelled_at,
completed_at,
created_at,
expires_at,
failed_at,
incomplete_details,
instructions,
last_error,
max_completion_tokens,
max_prompt_tokens,
metadata,
model,
object,
parallel_tool_calls,
required_action,
response_format,
started_at,
status,
temperature,
tool_choice,
tools,
top_p,
truncation_strategy,
usage
;
```
</TabItem>
<TabItem value="manifest">

<CodeBlock language="yaml">{`# Description fields are for documentation purposes
- name: runs
  props:
    - name: thread_id
      value: "{{ thread_id }}"
      description: Required parameter for the runs resource.
    - name: assistant_id
      value: "{{ assistant_id }}"
      description: |
        The ID of the [assistant](/docs/api-reference/assistants) to use to execute this run.
    - name: model
      value: "{{ model }}"
      description: |
        The ID of the [Model](/docs/api-reference/models) to be used to execute this run. If a value is provided here, it will override the model associated with the assistant. If not, the model associated with the assistant will be used.
      valid_values: ['gpt-5', 'gpt-5-mini', 'gpt-5-nano', 'gpt-5-2025-08-07', 'gpt-5-mini-2025-08-07', 'gpt-5-nano-2025-08-07', 'gpt-4.1', 'gpt-4.1-mini', 'gpt-4.1-nano', 'gpt-4.1-2025-04-14', 'gpt-4.1-mini-2025-04-14', 'gpt-4.1-nano-2025-04-14', 'o3-mini', 'o3-mini-2025-01-31', 'o1', 'o1-2024-12-17', 'gpt-4o', 'gpt-4o-2024-11-20', 'gpt-4o-2024-08-06', 'gpt-4o-2024-05-13', 'gpt-4o-mini', 'gpt-4o-mini-2024-07-18', 'gpt-4.5-preview', 'gpt-4.5-preview-2025-02-27', 'gpt-4-turbo', 'gpt-4-turbo-2024-04-09', 'gpt-4-0125-preview', 'gpt-4-turbo-preview', 'gpt-4-1106-preview', 'gpt-4-vision-preview', 'gpt-4', 'gpt-4-0314', 'gpt-4-0613', 'gpt-4-32k', 'gpt-4-32k-0314', 'gpt-4-32k-0613', 'gpt-3.5-turbo', 'gpt-3.5-turbo-16k', 'gpt-3.5-turbo-0613', 'gpt-3.5-turbo-1106', 'gpt-3.5-turbo-0125', 'gpt-3.5-turbo-16k-0613']
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
    - name: instructions
      value: "{{ instructions }}"
      description: |
        Overrides the [instructions](/docs/api-reference/assistants/createAssistant) of the assistant. This is useful for modifying the behavior on a per-run basis.
    - name: additional_instructions
      value: "{{ additional_instructions }}"
      description: |
        Appends additional instructions at the end of the instructions for the run. This is useful for modifying the behavior on a per-run basis without overriding other instructions.
    - name: additional_messages
      description: |
        Adds additional messages to the thread before creating the run.
      value:
        - role: "{{ role }}"
          content: "{{ content }}"
          attachments: "{{ attachments }}"
          metadata: "{{ metadata }}"
    - name: tools
      value: "{{ tools }}"
      description: |
        Override the tools the assistant can use for this run. This is useful for modifying the behavior on a per-run basis.
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
    - name: stream
      value: {{ stream }}
      description: |
        If \`true\`, returns a stream of events that happen during the Run as server-sent events, terminating when the Run enters a terminal state with a \`data: [DONE]\` message.
    - name: max_prompt_tokens
      value: {{ max_prompt_tokens }}
      description: |
        The maximum number of prompt tokens that may be used over the course of the run. The run will make a best effort to use only the number of prompt tokens specified, across multiple turns of the run. If the run exceeds the number of prompt tokens specified, the run will end with status \`incomplete\`. See \`incomplete_details\` for more info.
    - name: max_completion_tokens
      value: {{ max_completion_tokens }}
      description: |
        The maximum number of completion tokens that may be used over the course of the run. The run will make a best effort to use only the number of completion tokens specified, across multiple turns of the run. If the run exceeds the number of completion tokens specified, the run will end with status \`incomplete\`. See \`incomplete_details\` for more info.
    - name: truncation_strategy
      description: |
        Controls for how a thread will be truncated prior to the run. Use this to control the initial context window of the run.
      value:
        type: "{{ type }}"
        last_messages: {{ last_messages }}
    - name: tool_choice
      value: "{{ tool_choice }}"
      description: |
        Controls which (if any) tool is called by the model.
        \`none\` means the model will not call any tools and instead generates a message.
        \`auto\` is the default value and means the model can pick between generating a message or calling one or more tools.
        \`required\` means the model must call one or more tools before responding to the user.
        Specifying a particular tool like \`{"type": "file_search"}\` or \`{"type": "function", "function": {"name": "my_function"}}\` forces the model to call that tool.
      valid_values: ['none', 'auto', 'required']
    - name: parallel_tool_calls
      value: {{ parallel_tool_calls }}
      description: |
        Whether to enable [parallel function calling](/docs/guides/function-calling#configuring-parallel-function-calling) during tool use.
      default: true
    - name: response_format
      value: "{{ response_format }}"
      description: |
        Specifies the format that the model must output. Compatible with [GPT-4o](/docs/models#gpt-4o), [GPT-4 Turbo](/docs/models#gpt-4-turbo-and-gpt-4), and all GPT-3.5 Turbo models since \`gpt-3.5-turbo-1106\`.
        Setting to \`{ "type": "json_schema", "json_schema": {...} }\` enables Structured Outputs which ensures the model will match your supplied JSON schema. Learn more in the [Structured Outputs guide](/docs/guides/structured-outputs).
        Setting to \`{ "type": "json_object" }\` enables JSON mode, which ensures the message the model generates is valid JSON.
        **Important:** when using JSON mode, you **must** also instruct the model to produce JSON yourself via a system or user message. Without this, the model may generate an unending stream of whitespace until the generation reaches the token limit, resulting in a long-running and seemingly "stuck" request. Also note that the message content may be partially cut off if \`finish_reason="length"\`, which indicates the generation exceeded \`max_tokens\` or the conversation exceeded the max context length.
      valid_values: ['auto']
    - name: include[]
      value: "{{ include[] }}"
      description: A list of additional fields to include in the response. Currently the only supported value is \`step_details.tool_calls[*].file_search.results[*].content\` to fetch the file search result content.  See the [file search tool documentation](/docs/assistants/tools/file-search#customizing-file-search-settings) for more information. 
      description: A list of additional fields to include in the response. Currently the only supported value is \`step_details.tool_calls[*].file_search.results[*].content\` to fetch the file search result content.  See the [file search tool documentation](/docs/assistants/tools/file-search#customizing-file-search-settings) for more information. 
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
UPDATE openai.assistants.runs
SET 
metadata = '{{ metadata }}'
WHERE 
thread_id = '{{ thread_id }}' --required
AND run_id = '{{ run_id }}' --required
AND OpenAI-Organization = '{{ OpenAI-Organization}}'
AND OpenAI-Project = '{{ OpenAI-Project}}'
RETURNING
id,
assistant_id,
thread_id,
cancelled_at,
completed_at,
created_at,
expires_at,
failed_at,
incomplete_details,
instructions,
last_error,
max_completion_tokens,
max_prompt_tokens,
metadata,
model,
object,
parallel_tool_calls,
required_action,
response_format,
started_at,
status,
temperature,
tool_choice,
tools,
top_p,
truncation_strategy,
usage;
```
</TabItem>
</Tabs>


## Lifecycle Methods

<Tabs
    defaultValue="cancel"
    values={[
        { label: 'cancel', value: 'cancel' },
        { label: 'submit_tool_outputs', value: 'submit_tool_outputs' }
    ]}
>
<TabItem value="cancel">

OK

```sql
EXEC openai.assistants.runs.cancel 
@thread_id='{{ thread_id }}' --required, 
@run_id='{{ run_id }}' --required, 
@OpenAI-Organization='{{ OpenAI-Organization }}', 
@OpenAI-Project='{{ OpenAI-Project }}'
;
```
</TabItem>
<TabItem value="submit_tool_outputs">

OK

```sql
EXEC openai.assistants.runs.submit_tool_outputs 
@thread_id='{{ thread_id }}' --required, 
@run_id='{{ run_id }}' --required, 
@OpenAI-Organization='{{ OpenAI-Organization }}', 
@OpenAI-Project='{{ OpenAI-Project }}' 
@@json=
'{
"tool_outputs": "{{ tool_outputs }}", 
"stream": {{ stream }}
}'
;
```
</TabItem>
</Tabs>
