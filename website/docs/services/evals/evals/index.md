--- 
title: evals
hide_title: false
hide_table_of_contents: false
keywords:
  - evals
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

Creates, updates, deletes, gets or lists an <code>evals</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="evals" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="openai.evals.evals" /></td></tr>
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

The evaluation

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
    <td>Unique identifier for the evaluation.</td>
</tr>
<tr>
    <td><CopyableCode code="name" /></td>
    <td><code>string</code></td>
    <td>The name of the evaluation. (example: Chatbot effectiveness Evaluation)</td>
</tr>
<tr>
    <td><CopyableCode code="created_at" /></td>
    <td><code>integer (unixtime)</code></td>
    <td>The Unix timestamp (in seconds) for when the eval was created.</td>
</tr>
<tr>
    <td><CopyableCode code="data_source_config" /></td>
    <td><code>object</code></td>
    <td>Configuration of data sources used in runs of the evaluation. (title: CustomDataSourceConfig)</td>
</tr>
<tr>
    <td><CopyableCode code="metadata" /></td>
    <td><code>object</code></td>
    <td>Set of 16 key-value pairs that can be attached to an object. This can be useful for storing additional information about the object in a structured format, and querying for objects via API or the dashboard.  Keys are strings with a maximum length of 64 characters. Values are strings with a maximum length of 512 characters.  (x-oaiTypeLabel: map)</td>
</tr>
<tr>
    <td><CopyableCode code="object" /></td>
    <td><code>string</code></td>
    <td>The object type. (eval) (default: eval)</td>
</tr>
<tr>
    <td><CopyableCode code="testing_criteria" /></td>
    <td><code>array</code></td>
    <td>A list of testing criteria. (default: eval)</td>
</tr>
</tbody>
</table>
</TabItem>
<TabItem value="list">

A list of evals

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
    <td>Unique identifier for the evaluation.</td>
</tr>
<tr>
    <td><CopyableCode code="name" /></td>
    <td><code>string</code></td>
    <td>The name of the evaluation. (example: Chatbot effectiveness Evaluation)</td>
</tr>
<tr>
    <td><CopyableCode code="created_at" /></td>
    <td><code>integer (unixtime)</code></td>
    <td>The Unix timestamp (in seconds) for when the eval was created.</td>
</tr>
<tr>
    <td><CopyableCode code="data_source_config" /></td>
    <td><code>object</code></td>
    <td>Configuration of data sources used in runs of the evaluation. (title: CustomDataSourceConfig)</td>
</tr>
<tr>
    <td><CopyableCode code="metadata" /></td>
    <td><code>object</code></td>
    <td>Set of 16 key-value pairs that can be attached to an object. This can be useful for storing additional information about the object in a structured format, and querying for objects via API or the dashboard.  Keys are strings with a maximum length of 64 characters. Values are strings with a maximum length of 512 characters.  (x-oaiTypeLabel: map)</td>
</tr>
<tr>
    <td><CopyableCode code="object" /></td>
    <td><code>string</code></td>
    <td>The object type. (eval) (default: eval)</td>
</tr>
<tr>
    <td><CopyableCode code="testing_criteria" /></td>
    <td><code>array</code></td>
    <td>A list of testing criteria. (default: eval)</td>
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
    <td><a href="#parameter-eval_id"><code>eval_id</code></a></td>
    <td><a href="#parameter-OpenAI-Organization"><code>OpenAI-Organization</code></a>, <a href="#parameter-OpenAI-Project"><code>OpenAI-Project</code></a></td>
    <td></td>
</tr>
<tr>
    <td><a href="#list"><CopyableCode code="list" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td></td>
    <td><a href="#parameter-after"><code>after</code></a>, <a href="#parameter-limit"><code>limit</code></a>, <a href="#parameter-order"><code>order</code></a>, <a href="#parameter-order_by"><code>order_by</code></a>, <a href="#parameter-OpenAI-Organization"><code>OpenAI-Organization</code></a>, <a href="#parameter-OpenAI-Project"><code>OpenAI-Project</code></a></td>
    <td></td>
</tr>
<tr>
    <td><a href="#create"><CopyableCode code="create" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-data_source_config"><code>data_source_config</code></a>, <a href="#parameter-testing_criteria"><code>testing_criteria</code></a></td>
    <td><a href="#parameter-OpenAI-Organization"><code>OpenAI-Organization</code></a>, <a href="#parameter-OpenAI-Project"><code>OpenAI-Project</code></a></td>
    <td></td>
</tr>
<tr>
    <td><a href="#update"><CopyableCode code="update" /></a></td>
    <td><CopyableCode code="update" /></td>
    <td><a href="#parameter-eval_id"><code>eval_id</code></a></td>
    <td><a href="#parameter-OpenAI-Organization"><code>OpenAI-Organization</code></a>, <a href="#parameter-OpenAI-Project"><code>OpenAI-Project</code></a></td>
    <td></td>
</tr>
<tr>
    <td><a href="#delete"><CopyableCode code="delete" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-eval_id"><code>eval_id</code></a></td>
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
<tr id="parameter-eval_id">
    <td><CopyableCode code="eval_id" /></td>
    <td><code>string</code></td>
    <td>The ID of the evaluation to delete.</td>
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
    <td>Identifier for the last eval from the previous pagination request.</td>
</tr>
<tr id="parameter-limit">
    <td><CopyableCode code="limit" /></td>
    <td><code>integer</code></td>
    <td>Number of evals to retrieve.</td>
</tr>
<tr id="parameter-order">
    <td><CopyableCode code="order" /></td>
    <td><code>string</code></td>
    <td>Sort order for evals by timestamp. Use `asc` for ascending order or `desc` for descending order.</td>
</tr>
<tr id="parameter-order_by">
    <td><CopyableCode code="order_by" /></td>
    <td><code>string</code></td>
    <td>Evals can be ordered by creation time or last updated time. Use `created_at` for creation time or `updated_at` for last updated time. </td>
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

The evaluation

```sql
SELECT
id,
name,
created_at,
data_source_config,
metadata,
object,
testing_criteria
FROM openai.evals.evals
WHERE eval_id = '{{ eval_id }}' -- required
AND OpenAI-Organization = '{{ OpenAI-Organization }}'
AND OpenAI-Project = '{{ OpenAI-Project }}'
;
```
</TabItem>
<TabItem value="list">

A list of evals

```sql
SELECT
id,
name,
created_at,
data_source_config,
metadata,
object,
testing_criteria
FROM openai.evals.evals
WHERE after = '{{ after }}'
AND limit = '{{ limit }}'
AND order = '{{ order }}'
AND order_by = '{{ order_by }}'
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
INSERT INTO openai.evals.evals (
name,
metadata,
data_source_config,
testing_criteria,
OpenAI-Organization,
OpenAI-Project
)
SELECT 
'{{ name }}',
'{{ metadata }}',
'{{ data_source_config }}' /* required */,
'{{ testing_criteria }}' /* required */,
'{{ OpenAI-Organization }}',
'{{ OpenAI-Project }}'
RETURNING
id,
name,
created_at,
data_source_config,
metadata,
object,
testing_criteria
;
```
</TabItem>
<TabItem value="manifest">

<CodeBlock language="yaml">{`# Description fields are for documentation purposes
- name: evals
  props:
    - name: name
      value: "{{ name }}"
      description: |
        The name of the evaluation.
    - name: metadata
      value: "{{ metadata }}"
      description: |
        Set of 16 key-value pairs that can be attached to an object. This can be
        useful for storing additional information about the object in a structured
        format, and querying for objects via API or the dashboard.
        Keys are strings with a maximum length of 64 characters. Values are strings
        with a maximum length of 512 characters.
    - name: data_source_config
      description: |
        The configuration for the data source used for the evaluation runs. Dictates the schema of the data used in the evaluation.
      value:
        type: "{{ type }}"
        item_schema: "{{ item_schema }}"
        include_sample_schema: {{ include_sample_schema }}
        metadata: "{{ metadata }}"
    - name: testing_criteria
      value: "{{ testing_criteria }}"
      description: |
        A list of graders for all eval runs in this group. Graders can reference variables in the data source using double curly braces notation, like \`{{item.variable_name}}\`. To reference the model's output, use the \`sample\` namespace (ie, \`{{sample.output_text}}\`).
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
UPDATE openai.evals.evals
SET 
name = '{{ name }}',
metadata = '{{ metadata }}'
WHERE 
eval_id = '{{ eval_id }}' --required
AND OpenAI-Organization = '{{ OpenAI-Organization}}'
AND OpenAI-Project = '{{ OpenAI-Project}}'
RETURNING
id,
name,
created_at,
data_source_config,
metadata,
object,
testing_criteria;
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
DELETE FROM openai.evals.evals
WHERE eval_id = '{{ eval_id }}' --required
AND OpenAI-Organization = '{{ OpenAI-Organization }}'
AND OpenAI-Project = '{{ OpenAI-Project }}'
;
```
</TabItem>
</Tabs>
