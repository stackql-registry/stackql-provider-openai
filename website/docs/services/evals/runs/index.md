--- 
title: runs
hide_title: false
hide_table_of_contents: false
keywords:
  - runs
  - evals
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
<tr><td><b>Id</b></td><td><CopyableCode code="openai.evals.runs" /></td></tr>
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

The evaluation run

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
    <td>Unique identifier for the evaluation run.</td>
</tr>
<tr>
    <td><CopyableCode code="name" /></td>
    <td><code>string</code></td>
    <td>The name of the evaluation run.</td>
</tr>
<tr>
    <td><CopyableCode code="eval_id" /></td>
    <td><code>string</code></td>
    <td>The identifier of the associated evaluation.</td>
</tr>
<tr>
    <td><CopyableCode code="created_at" /></td>
    <td><code>integer (unixtime)</code></td>
    <td>Unix timestamp (in seconds) when the evaluation run was created.</td>
</tr>
<tr>
    <td><CopyableCode code="data_source" /></td>
    <td><code>object</code></td>
    <td>Information about the run's data source. (title: JsonlRunDataSource)</td>
</tr>
<tr>
    <td><CopyableCode code="error" /></td>
    <td><code>object</code></td>
    <td>An object representing an error response from the Eval API.  (title: EvalApiError)</td>
</tr>
<tr>
    <td><CopyableCode code="metadata" /></td>
    <td><code>object</code></td>
    <td>Set of 16 key-value pairs that can be attached to an object. This can be useful for storing additional information about the object in a structured format, and querying for objects via API or the dashboard.  Keys are strings with a maximum length of 64 characters. Values are strings with a maximum length of 512 characters.  (x-oaiTypeLabel: map)</td>
</tr>
<tr>
    <td><CopyableCode code="model" /></td>
    <td><code>string</code></td>
    <td>The model that is evaluated, if applicable.</td>
</tr>
<tr>
    <td><CopyableCode code="object" /></td>
    <td><code>string</code></td>
    <td>The type of the object. Always "eval.run". (eval.run) (default: eval.run)</td>
</tr>
<tr>
    <td><CopyableCode code="per_model_usage" /></td>
    <td><code>array</code></td>
    <td>Usage statistics for each model during the evaluation run.</td>
</tr>
<tr>
    <td><CopyableCode code="per_testing_criteria_results" /></td>
    <td><code>array</code></td>
    <td>Results per testing criteria applied during the evaluation run.</td>
</tr>
<tr>
    <td><CopyableCode code="report_url" /></td>
    <td><code>string (uri)</code></td>
    <td>The URL to the rendered evaluation run report on the UI dashboard.</td>
</tr>
<tr>
    <td><CopyableCode code="result_counts" /></td>
    <td><code>object</code></td>
    <td>Counters summarizing the outcomes of the evaluation run.</td>
</tr>
<tr>
    <td><CopyableCode code="status" /></td>
    <td><code>string</code></td>
    <td>The status of the evaluation run.</td>
</tr>
</tbody>
</table>
</TabItem>
<TabItem value="list">

A list of runs for the evaluation

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
    <td>Unique identifier for the evaluation run.</td>
</tr>
<tr>
    <td><CopyableCode code="name" /></td>
    <td><code>string</code></td>
    <td>The name of the evaluation run.</td>
</tr>
<tr>
    <td><CopyableCode code="eval_id" /></td>
    <td><code>string</code></td>
    <td>The identifier of the associated evaluation.</td>
</tr>
<tr>
    <td><CopyableCode code="created_at" /></td>
    <td><code>integer (unixtime)</code></td>
    <td>Unix timestamp (in seconds) when the evaluation run was created.</td>
</tr>
<tr>
    <td><CopyableCode code="data_source" /></td>
    <td><code>object</code></td>
    <td>Information about the run's data source. (title: JsonlRunDataSource)</td>
</tr>
<tr>
    <td><CopyableCode code="error" /></td>
    <td><code>object</code></td>
    <td>An object representing an error response from the Eval API.  (title: EvalApiError)</td>
</tr>
<tr>
    <td><CopyableCode code="metadata" /></td>
    <td><code>object</code></td>
    <td>Set of 16 key-value pairs that can be attached to an object. This can be useful for storing additional information about the object in a structured format, and querying for objects via API or the dashboard.  Keys are strings with a maximum length of 64 characters. Values are strings with a maximum length of 512 characters.  (x-oaiTypeLabel: map)</td>
</tr>
<tr>
    <td><CopyableCode code="model" /></td>
    <td><code>string</code></td>
    <td>The model that is evaluated, if applicable.</td>
</tr>
<tr>
    <td><CopyableCode code="object" /></td>
    <td><code>string</code></td>
    <td>The type of the object. Always "eval.run". (eval.run) (default: eval.run)</td>
</tr>
<tr>
    <td><CopyableCode code="per_model_usage" /></td>
    <td><code>array</code></td>
    <td>Usage statistics for each model during the evaluation run.</td>
</tr>
<tr>
    <td><CopyableCode code="per_testing_criteria_results" /></td>
    <td><code>array</code></td>
    <td>Results per testing criteria applied during the evaluation run.</td>
</tr>
<tr>
    <td><CopyableCode code="report_url" /></td>
    <td><code>string (uri)</code></td>
    <td>The URL to the rendered evaluation run report on the UI dashboard.</td>
</tr>
<tr>
    <td><CopyableCode code="result_counts" /></td>
    <td><code>object</code></td>
    <td>Counters summarizing the outcomes of the evaluation run.</td>
</tr>
<tr>
    <td><CopyableCode code="status" /></td>
    <td><code>string</code></td>
    <td>The status of the evaluation run.</td>
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
    <td><a href="#parameter-eval_id"><code>eval_id</code></a>, <a href="#parameter-run_id"><code>run_id</code></a></td>
    <td><a href="#parameter-openai-organization"><code>openai-organization</code></a>, <a href="#parameter-openai-project"><code>openai-project</code></a></td>
    <td></td>
</tr>
<tr>
    <td><a href="#list"><CopyableCode code="list" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-eval_id"><code>eval_id</code></a></td>
    <td><a href="#parameter-after"><code>after</code></a>, <a href="#parameter-limit"><code>limit</code></a>, <a href="#parameter-order"><code>order</code></a>, <a href="#parameter-status"><code>status</code></a>, <a href="#parameter-openai-organization"><code>openai-organization</code></a>, <a href="#parameter-openai-project"><code>openai-project</code></a></td>
    <td></td>
</tr>
<tr>
    <td><a href="#create"><CopyableCode code="create" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-eval_id"><code>eval_id</code></a>, <a href="#parameter-data_source"><code>data_source</code></a></td>
    <td><a href="#parameter-openai-organization"><code>openai-organization</code></a>, <a href="#parameter-openai-project"><code>openai-project</code></a></td>
    <td></td>
</tr>
<tr>
    <td><a href="#delete"><CopyableCode code="delete" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-eval_id"><code>eval_id</code></a>, <a href="#parameter-run_id"><code>run_id</code></a></td>
    <td><a href="#parameter-openai-organization"><code>openai-organization</code></a>, <a href="#parameter-openai-project"><code>openai-project</code></a></td>
    <td></td>
</tr>
<tr>
    <td><a href="#cancel"><CopyableCode code="cancel" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-eval_id"><code>eval_id</code></a>, <a href="#parameter-run_id"><code>run_id</code></a></td>
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
<tr id="parameter-eval_id">
    <td><CopyableCode code="eval_id" /></td>
    <td><code>string</code></td>
    <td>The ID of the evaluation whose run you want to cancel.</td>
</tr>
<tr id="parameter-run_id">
    <td><CopyableCode code="run_id" /></td>
    <td><code>string</code></td>
    <td>The ID of the run to cancel.</td>
</tr>
<tr id="parameter-after">
    <td><CopyableCode code="after" /></td>
    <td><code>string</code></td>
    <td>Identifier for the last run from the previous pagination request.</td>
</tr>
<tr id="parameter-limit">
    <td><CopyableCode code="limit" /></td>
    <td><code>integer</code></td>
    <td>Number of runs to retrieve.  Automatically applied from a SQL `LIMIT` clause - `SELECT ... LIMIT 10` sends `limit=10` on the wire. Setting it explicitly in a `WHERE` clause is not required.</td>
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
    <td>Sort order for runs by timestamp. Use `asc` for ascending order or `desc` for descending order. Defaults to `asc`.</td>
</tr>
<tr id="parameter-status">
    <td><CopyableCode code="status" /></td>
    <td><code>string</code></td>
    <td>Filter runs by status. One of `queued` | `in_progress` | `failed` | `completed` | `canceled`.</td>
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

The evaluation run

```sql
SELECT
id,
name,
eval_id,
created_at,
data_source,
error,
metadata,
model,
object,
per_model_usage,
per_testing_criteria_results,
report_url,
result_counts,
status
FROM openai.evals.runs
WHERE eval_id = '{{ eval_id }}' -- required
AND run_id = '{{ run_id }}' -- required
AND "openai-organization" = '{{ openai-organization }}'
AND "openai-project" = '{{ openai-project }}'
;
```
</TabItem>
<TabItem value="list">

A list of runs for the evaluation

```sql
SELECT
id,
name,
eval_id,
created_at,
data_source,
error,
metadata,
model,
object,
per_model_usage,
per_testing_criteria_results,
report_url,
result_counts,
status
FROM openai.evals.runs
WHERE eval_id = '{{ eval_id }}' -- required
AND after = '{{ after }}'
AND "order" = '{{ order }}'
AND status = '{{ status }}'
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
INSERT INTO openai.evals.runs (
name,
metadata,
data_source,
eval_id,
"openai-organization",
"openai-project"
)
SELECT 
'{{ name }}',
'{{ metadata }}',
'{{ data_source }}' /* required */,
'{{ eval_id }}',
'{{ openai-organization }}',
'{{ openai-project }}'
RETURNING
id,
name,
eval_id,
created_at,
data_source,
error,
metadata,
model,
object,
per_model_usage,
per_testing_criteria_results,
report_url,
result_counts,
status
;
```
</TabItem>
<TabItem value="manifest">

<CodeBlock language="yaml">{`# Description fields are for documentation purposes
- name: runs
  props:
    - name: eval_id
      value: "{{ eval_id }}"
      description: Required parameter for the runs resource.
    - name: name
      value: "{{ name }}"
      description: |
        The name of the run.
    - name: metadata
      value: "{{ metadata }}"
      description: |
        Set of 16 key-value pairs that can be attached to an object. This can be
        useful for storing additional information about the object in a structured
        format, and querying for objects via API or the dashboard.
        Keys are strings with a maximum length of 64 characters. Values are strings
        with a maximum length of 512 characters.
    - name: data_source
      description: |
        Details about the run's data source.
      value:
        type: "{{ type }}"
        source:
          type: "{{ type }}"
          content:
            - item: "{{ item }}"
              sample: "{{ sample }}"
          id: "{{ id }}"
        input_messages:
          type: "{{ type }}"
          template: "{{ template }}"
          item_reference: "{{ item_reference }}"
        sampling_params:
          reasoning_effort: "{{ reasoning_effort }}"
          temperature: {{ temperature }}
          max_completion_tokens: {{ max_completion_tokens }}
          top_p: {{ top_p }}
          seed: {{ seed }}
          response_format: "{{ response_format }}"
          tools:
            - type: "{{ type }}"
              function:
                description: "{{ description }}"
                name: "{{ name }}"
                parameters: "{{ parameters }}"
                strict: {{ strict }}
        model: "{{ model }}"
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
DELETE FROM openai.evals.runs
WHERE eval_id = '{{ eval_id }}' --required
AND run_id = '{{ run_id }}' --required
AND "openai-organization" = '{{ openai-organization }}'
AND "openai-project" = '{{ openai-project }}'
;
```
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

The canceled eval run object

```sql
EXEC openai.evals.runs.cancel 
@eval_id='{{ eval_id }}' --required, 
@run_id='{{ run_id }}' --required, 
@openai-organization='{{ openai-organization }}', 
@openai-project='{{ openai-project }}'
;
```
</TabItem>
</Tabs>
