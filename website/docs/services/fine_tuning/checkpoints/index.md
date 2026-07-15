--- 
title: checkpoints
hide_title: false
hide_table_of_contents: false
keywords:
  - checkpoints
  - fine_tuning
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

Creates, updates, deletes, gets or lists a <code>checkpoints</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="checkpoints" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="openai.fine_tuning.checkpoints" /></td></tr>
</tbody></table>

## Fields

The following fields are returned by `SELECT` queries:

<Tabs
    defaultValue="list"
    values={[
        { label: 'list', value: 'list' }
    ]}
>
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
    <td>The checkpoint identifier, which can be referenced in the API endpoints.</td>
</tr>
<tr>
    <td><CopyableCode code="fine_tuning_job_id" /></td>
    <td><code>string</code></td>
    <td>The name of the fine-tuning job that this checkpoint was created from.</td>
</tr>
<tr>
    <td><CopyableCode code="created_at" /></td>
    <td><code>integer (unixtime)</code></td>
    <td>The Unix timestamp (in seconds) for when the checkpoint was created.</td>
</tr>
<tr>
    <td><CopyableCode code="fine_tuned_model_checkpoint" /></td>
    <td><code>string</code></td>
    <td>The name of the fine-tuned checkpoint model that is created.</td>
</tr>
<tr>
    <td><CopyableCode code="metrics" /></td>
    <td><code>object</code></td>
    <td>Metrics at the step number during the fine-tuning job.</td>
</tr>
<tr>
    <td><CopyableCode code="object" /></td>
    <td><code>string</code></td>
    <td>The object type, which is always "fine_tuning.job.checkpoint". (fine_tuning.job.checkpoint)</td>
</tr>
<tr>
    <td><CopyableCode code="step_number" /></td>
    <td><code>integer</code></td>
    <td>The step number that the checkpoint was created at.</td>
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
    <td><a href="#list"><CopyableCode code="list" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-fine_tuning_job_id"><code>fine_tuning_job_id</code></a></td>
    <td><a href="#parameter-after"><code>after</code></a>, <a href="#parameter-limit"><code>limit</code></a>, <a href="#parameter-openai-organization"><code>openai-organization</code></a>, <a href="#parameter-openai-project"><code>openai-project</code></a></td>
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
<tr id="parameter-fine_tuning_job_id">
    <td><CopyableCode code="fine_tuning_job_id" /></td>
    <td><code>string</code></td>
    <td>The ID of the fine-tuning job to get checkpoints for. </td>
</tr>
<tr id="parameter-after">
    <td><CopyableCode code="after" /></td>
    <td><code>string</code></td>
    <td>Identifier for the last checkpoint ID from the previous pagination request.</td>
</tr>
<tr id="parameter-limit">
    <td><CopyableCode code="limit" /></td>
    <td><code>integer</code></td>
    <td>Number of checkpoints to retrieve.  Automatically applied from a SQL `LIMIT` clause - `SELECT ... LIMIT 10` sends `limit=10` on the wire. Setting it explicitly in a `WHERE` clause is not required.</td>
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
</tbody>
</table>

## `SELECT` examples

<Tabs
    defaultValue="list"
    values={[
        { label: 'list', value: 'list' }
    ]}
>
<TabItem value="list">

OK

```sql
SELECT
id,
fine_tuning_job_id,
created_at,
fine_tuned_model_checkpoint,
metrics,
object,
step_number
FROM openai.fine_tuning.checkpoints
WHERE fine_tuning_job_id = '{{ fine_tuning_job_id }}' -- required
AND after = '{{ after }}'
AND "openai-organization" = '{{ openai-organization }}'
AND "openai-project" = '{{ openai-project }}'
;
```
</TabItem>
</Tabs>
