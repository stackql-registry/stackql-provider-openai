--- 
title: run_output_items
hide_title: false
hide_table_of_contents: false
keywords:
  - run_output_items
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

Creates, updates, deletes, gets or lists a <code>run_output_items</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="run_output_items" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="openai.evals.run_output_items" /></td></tr>
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

The evaluation run output item

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
    <td>Unique identifier for the evaluation run output item.</td>
</tr>
<tr>
    <td><CopyableCode code="datasource_item_id" /></td>
    <td><code>integer</code></td>
    <td>The identifier for the data source item.</td>
</tr>
<tr>
    <td><CopyableCode code="eval_id" /></td>
    <td><code>string</code></td>
    <td>The identifier of the evaluation group.</td>
</tr>
<tr>
    <td><CopyableCode code="run_id" /></td>
    <td><code>string</code></td>
    <td>The identifier of the evaluation run associated with this output item.</td>
</tr>
<tr>
    <td><CopyableCode code="created_at" /></td>
    <td><code>integer (unixtime)</code></td>
    <td>Unix timestamp (in seconds) when the evaluation run was created.</td>
</tr>
<tr>
    <td><CopyableCode code="datasource_item" /></td>
    <td><code>object</code></td>
    <td>Details of the input data source item.</td>
</tr>
<tr>
    <td><CopyableCode code="object" /></td>
    <td><code>string</code></td>
    <td>The type of the object. Always "eval.run.output_item". (eval.run.output_item) (default: eval.run.output_item)</td>
</tr>
<tr>
    <td><CopyableCode code="results" /></td>
    <td><code>array</code></td>
    <td>A list of grader results for this output item.</td>
</tr>
<tr>
    <td><CopyableCode code="sample" /></td>
    <td><code>object</code></td>
    <td>A sample containing the input and output of the evaluation run.</td>
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

A list of output items for the evaluation run

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
    <td>Unique identifier for the evaluation run output item.</td>
</tr>
<tr>
    <td><CopyableCode code="datasource_item_id" /></td>
    <td><code>integer</code></td>
    <td>The identifier for the data source item.</td>
</tr>
<tr>
    <td><CopyableCode code="eval_id" /></td>
    <td><code>string</code></td>
    <td>The identifier of the evaluation group.</td>
</tr>
<tr>
    <td><CopyableCode code="run_id" /></td>
    <td><code>string</code></td>
    <td>The identifier of the evaluation run associated with this output item.</td>
</tr>
<tr>
    <td><CopyableCode code="created_at" /></td>
    <td><code>integer (unixtime)</code></td>
    <td>Unix timestamp (in seconds) when the evaluation run was created.</td>
</tr>
<tr>
    <td><CopyableCode code="datasource_item" /></td>
    <td><code>object</code></td>
    <td>Details of the input data source item.</td>
</tr>
<tr>
    <td><CopyableCode code="object" /></td>
    <td><code>string</code></td>
    <td>The type of the object. Always "eval.run.output_item". (eval.run.output_item) (default: eval.run.output_item)</td>
</tr>
<tr>
    <td><CopyableCode code="results" /></td>
    <td><code>array</code></td>
    <td>A list of grader results for this output item.</td>
</tr>
<tr>
    <td><CopyableCode code="sample" /></td>
    <td><code>object</code></td>
    <td>A sample containing the input and output of the evaluation run.</td>
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
    <td><a href="#parameter-eval_id"><code>eval_id</code></a>, <a href="#parameter-run_id"><code>run_id</code></a>, <a href="#parameter-output_item_id"><code>output_item_id</code></a></td>
    <td><a href="#parameter-OpenAI-Organization"><code>OpenAI-Organization</code></a>, <a href="#parameter-OpenAI-Project"><code>OpenAI-Project</code></a></td>
    <td></td>
</tr>
<tr>
    <td><a href="#list"><CopyableCode code="list" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-eval_id"><code>eval_id</code></a>, <a href="#parameter-run_id"><code>run_id</code></a></td>
    <td><a href="#parameter-after"><code>after</code></a>, <a href="#parameter-limit"><code>limit</code></a>, <a href="#parameter-status"><code>status</code></a>, <a href="#parameter-order"><code>order</code></a>, <a href="#parameter-OpenAI-Organization"><code>OpenAI-Organization</code></a>, <a href="#parameter-OpenAI-Project"><code>OpenAI-Project</code></a></td>
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
    <td>The ID of the evaluation to retrieve runs for.</td>
</tr>
<tr id="parameter-output_item_id">
    <td><CopyableCode code="output_item_id" /></td>
    <td><code>string</code></td>
    <td>The ID of the output item to retrieve.</td>
</tr>
<tr id="parameter-run_id">
    <td><CopyableCode code="run_id" /></td>
    <td><code>string</code></td>
    <td>The ID of the run to retrieve output items for.</td>
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
    <td>Identifier for the last output item from the previous pagination request.</td>
</tr>
<tr id="parameter-limit">
    <td><CopyableCode code="limit" /></td>
    <td><code>integer</code></td>
    <td>Number of output items to retrieve.</td>
</tr>
<tr id="parameter-order">
    <td><CopyableCode code="order" /></td>
    <td><code>string</code></td>
    <td>Sort order for output items by timestamp. Use `asc` for ascending order or `desc` for descending order. Defaults to `asc`.</td>
</tr>
<tr id="parameter-status">
    <td><CopyableCode code="status" /></td>
    <td><code>string</code></td>
    <td>Filter output items by status. Use `failed` to filter by failed output items or `pass` to filter by passed output items. </td>
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

The evaluation run output item

```sql
SELECT
id,
datasource_item_id,
eval_id,
run_id,
created_at,
datasource_item,
object,
results,
sample,
status
FROM openai.evals.run_output_items
WHERE eval_id = '{{ eval_id }}' -- required
AND run_id = '{{ run_id }}' -- required
AND output_item_id = '{{ output_item_id }}' -- required
AND OpenAI-Organization = '{{ OpenAI-Organization }}'
AND OpenAI-Project = '{{ OpenAI-Project }}'
;
```
</TabItem>
<TabItem value="list">

A list of output items for the evaluation run

```sql
SELECT
id,
datasource_item_id,
eval_id,
run_id,
created_at,
datasource_item,
object,
results,
sample,
status
FROM openai.evals.run_output_items
WHERE eval_id = '{{ eval_id }}' -- required
AND run_id = '{{ run_id }}' -- required
AND after = '{{ after }}'
AND limit = '{{ limit }}'
AND status = '{{ status }}'
AND order = '{{ order }}'
AND OpenAI-Organization = '{{ OpenAI-Organization }}'
AND OpenAI-Project = '{{ OpenAI-Project }}'
;
```
</TabItem>
</Tabs>
