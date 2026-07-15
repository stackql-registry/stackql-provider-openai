--- 
title: checkpoint_permissions
hide_title: false
hide_table_of_contents: false
keywords:
  - checkpoint_permissions
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

Creates, updates, deletes, gets or lists a <code>checkpoint_permissions</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="checkpoint_permissions" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="openai.fine_tuning.checkpoint_permissions" /></td></tr>
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
    <td>The permission identifier, which can be referenced in the API endpoints.</td>
</tr>
<tr>
    <td><CopyableCode code="project_id" /></td>
    <td><code>string</code></td>
    <td>The project identifier that the permission is for.</td>
</tr>
<tr>
    <td><CopyableCode code="created_at" /></td>
    <td><code>integer (unixtime)</code></td>
    <td>The Unix timestamp (in seconds) for when the permission was created.</td>
</tr>
<tr>
    <td><CopyableCode code="object" /></td>
    <td><code>string</code></td>
    <td>The object type, which is always "checkpoint.permission". (checkpoint.permission)</td>
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
    <td><a href="#parameter-fine_tuned_model_checkpoint"><code>fine_tuned_model_checkpoint</code></a></td>
    <td><a href="#parameter-project_id"><code>project_id</code></a>, <a href="#parameter-after"><code>after</code></a>, <a href="#parameter-limit"><code>limit</code></a>, <a href="#parameter-order"><code>order</code></a>, <a href="#parameter-openai-organization"><code>openai-organization</code></a>, <a href="#parameter-openai-project"><code>openai-project</code></a></td>
    <td></td>
</tr>
<tr>
    <td><a href="#create"><CopyableCode code="create" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-fine_tuned_model_checkpoint"><code>fine_tuned_model_checkpoint</code></a>, <a href="#parameter-project_ids"><code>project_ids</code></a></td>
    <td><a href="#parameter-openai-organization"><code>openai-organization</code></a>, <a href="#parameter-openai-project"><code>openai-project</code></a></td>
    <td></td>
</tr>
<tr>
    <td><a href="#delete"><CopyableCode code="delete" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-fine_tuned_model_checkpoint"><code>fine_tuned_model_checkpoint</code></a>, <a href="#parameter-permission_id"><code>permission_id</code></a></td>
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
<tr id="parameter-fine_tuned_model_checkpoint">
    <td><CopyableCode code="fine_tuned_model_checkpoint" /></td>
    <td><code>string</code></td>
    <td>The ID of the fine-tuned model checkpoint to delete a permission for. </td>
</tr>
<tr id="parameter-permission_id">
    <td><CopyableCode code="permission_id" /></td>
    <td><code>string</code></td>
    <td>The ID of the fine-tuned model checkpoint permission to delete. </td>
</tr>
<tr id="parameter-after">
    <td><CopyableCode code="after" /></td>
    <td><code>string</code></td>
    <td>Identifier for the last permission ID from the previous pagination request.</td>
</tr>
<tr id="parameter-limit">
    <td><CopyableCode code="limit" /></td>
    <td><code>integer</code></td>
    <td>Number of permissions to retrieve.  Automatically applied from a SQL `LIMIT` clause - `SELECT ... LIMIT 10` sends `limit=10` on the wire. Setting it explicitly in a `WHERE` clause is not required.</td>
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
    <td>The order in which to retrieve permissions.</td>
</tr>
<tr id="parameter-project_id">
    <td><CopyableCode code="project_id" /></td>
    <td><code>string</code></td>
    <td>The ID of the project to get permissions for.</td>
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
project_id,
created_at,
object
FROM openai.fine_tuning.checkpoint_permissions
WHERE fine_tuned_model_checkpoint = '{{ fine_tuned_model_checkpoint }}' -- required
AND project_id = '{{ project_id }}'
AND after = '{{ after }}'
AND "order" = '{{ order }}'
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
INSERT INTO openai.fine_tuning.checkpoint_permissions (
project_ids,
fine_tuned_model_checkpoint,
"openai-organization",
"openai-project"
)
SELECT 
'{{ project_ids }}' /* required */,
'{{ fine_tuned_model_checkpoint }}',
'{{ openai-organization }}',
'{{ openai-project }}'
RETURNING
first_id,
last_id,
data,
has_more,
object
;
```
</TabItem>
<TabItem value="manifest">

<CodeBlock language="yaml">{`# Description fields are for documentation purposes
- name: checkpoint_permissions
  props:
    - name: fine_tuned_model_checkpoint
      value: "{{ fine_tuned_model_checkpoint }}"
      description: Required parameter for the checkpoint_permissions resource.
    - name: project_ids
      value:
        - "{{ project_ids }}"
      description: |
        The project identifiers to grant access to.
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
DELETE FROM openai.fine_tuning.checkpoint_permissions
WHERE fine_tuned_model_checkpoint = '{{ fine_tuned_model_checkpoint }}' --required
AND permission_id = '{{ permission_id }}' --required
AND "openai-organization" = '{{ openai-organization }}'
AND "openai-project" = '{{ openai-project }}'
;
```
</TabItem>
</Tabs>
