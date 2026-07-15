--- 
title: files
hide_title: false
hide_table_of_contents: false
keywords:
  - files
  - files
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

Creates, updates, deletes, gets or lists a <code>files</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="files" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="openai.files.files" /></td></tr>
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
    <td>The file identifier, which can be referenced in the API endpoints.</td>
</tr>
<tr>
    <td><CopyableCode code="bytes" /></td>
    <td><code>integer</code></td>
    <td>The size of the file, in bytes.</td>
</tr>
<tr>
    <td><CopyableCode code="created_at" /></td>
    <td><code>integer (unixtime)</code></td>
    <td>The Unix timestamp (in seconds) for when the file was created.</td>
</tr>
<tr>
    <td><CopyableCode code="expires_at" /></td>
    <td><code>integer (unixtime)</code></td>
    <td>The Unix timestamp (in seconds) for when the file will expire.</td>
</tr>
<tr>
    <td><CopyableCode code="filename" /></td>
    <td><code>string</code></td>
    <td>The name of the file.</td>
</tr>
<tr>
    <td><CopyableCode code="object" /></td>
    <td><code>string</code></td>
    <td>The object type, which is always `file`. (file)</td>
</tr>
<tr>
    <td><CopyableCode code="purpose" /></td>
    <td><code>string</code></td>
    <td>The intended purpose of the file. Supported values are `assistants`, `assistants_output`, `batch`, `batch_output`, `fine-tune`, `fine-tune-results`, `vision`, and `user_data`. (assistants, assistants_output, batch, batch_output, fine-tune, fine-tune-results, vision, user_data)</td>
</tr>
<tr>
    <td><CopyableCode code="status" /></td>
    <td><code>string</code></td>
    <td>Deprecated. The current status of the file, which can be either `uploaded`, `processed`, or `error`. (uploaded, processed, error)</td>
</tr>
<tr>
    <td><CopyableCode code="status_details" /></td>
    <td><code>string</code></td>
    <td>Deprecated. For details on why a fine-tuning training file failed validation, see the `error` field on `fine_tuning.job`.</td>
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
    <td>The file identifier, which can be referenced in the API endpoints.</td>
</tr>
<tr>
    <td><CopyableCode code="bytes" /></td>
    <td><code>integer</code></td>
    <td>The size of the file, in bytes.</td>
</tr>
<tr>
    <td><CopyableCode code="created_at" /></td>
    <td><code>integer (unixtime)</code></td>
    <td>The Unix timestamp (in seconds) for when the file was created.</td>
</tr>
<tr>
    <td><CopyableCode code="expires_at" /></td>
    <td><code>integer (unixtime)</code></td>
    <td>The Unix timestamp (in seconds) for when the file will expire.</td>
</tr>
<tr>
    <td><CopyableCode code="filename" /></td>
    <td><code>string</code></td>
    <td>The name of the file.</td>
</tr>
<tr>
    <td><CopyableCode code="object" /></td>
    <td><code>string</code></td>
    <td>The object type, which is always `file`. (file)</td>
</tr>
<tr>
    <td><CopyableCode code="purpose" /></td>
    <td><code>string</code></td>
    <td>The intended purpose of the file. Supported values are `assistants`, `assistants_output`, `batch`, `batch_output`, `fine-tune`, `fine-tune-results`, `vision`, and `user_data`. (assistants, assistants_output, batch, batch_output, fine-tune, fine-tune-results, vision, user_data)</td>
</tr>
<tr>
    <td><CopyableCode code="status" /></td>
    <td><code>string</code></td>
    <td>Deprecated. The current status of the file, which can be either `uploaded`, `processed`, or `error`. (uploaded, processed, error)</td>
</tr>
<tr>
    <td><CopyableCode code="status_details" /></td>
    <td><code>string</code></td>
    <td>Deprecated. For details on why a fine-tuning training file failed validation, see the `error` field on `fine_tuning.job`.</td>
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
    <td><a href="#parameter-file_id"><code>file_id</code></a></td>
    <td><a href="#parameter-openai-organization"><code>openai-organization</code></a>, <a href="#parameter-openai-project"><code>openai-project</code></a></td>
    <td></td>
</tr>
<tr>
    <td><a href="#list"><CopyableCode code="list" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td></td>
    <td><a href="#parameter-purpose"><code>purpose</code></a>, <a href="#parameter-limit"><code>limit</code></a>, <a href="#parameter-order"><code>order</code></a>, <a href="#parameter-after"><code>after</code></a>, <a href="#parameter-openai-organization"><code>openai-organization</code></a>, <a href="#parameter-openai-project"><code>openai-project</code></a></td>
    <td></td>
</tr>
<tr>
    <td><a href="#delete"><CopyableCode code="delete" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-file_id"><code>file_id</code></a></td>
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
<tr id="parameter-file_id">
    <td><CopyableCode code="file_id" /></td>
    <td><code>string</code></td>
    <td>The ID of the file to use for this request.</td>
</tr>
<tr id="parameter-after">
    <td><CopyableCode code="after" /></td>
    <td><code>string</code></td>
    <td>A cursor for use in pagination. `after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list. </td>
</tr>
<tr id="parameter-limit">
    <td><CopyableCode code="limit" /></td>
    <td><code>integer</code></td>
    <td>A limit on the number of objects to be returned. Limit can range between 1 and 10,000, and the default is 10,000.  Automatically applied from a SQL `LIMIT` clause - `SELECT ... LIMIT 10` sends `limit=10` on the wire. Setting it explicitly in a `WHERE` clause is not required.</td>
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
    <td>Sort order by the `created_at` timestamp of the objects. `asc` for ascending order and `desc` for descending order. </td>
</tr>
<tr id="parameter-purpose">
    <td><CopyableCode code="purpose" /></td>
    <td><code>string</code></td>
    <td>Only return files with the given purpose.</td>
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
bytes,
created_at,
expires_at,
filename,
object,
purpose,
status,
status_details
FROM openai.files.files
WHERE file_id = '{{ file_id }}' -- required
AND "openai-organization" = '{{ openai-organization }}'
AND "openai-project" = '{{ openai-project }}'
;
```
</TabItem>
<TabItem value="list">

OK

```sql
SELECT
id,
bytes,
created_at,
expires_at,
filename,
object,
purpose,
status,
status_details
FROM openai.files.files
WHERE purpose = '{{ purpose }}'
AND "order" = '{{ order }}'
AND after = '{{ after }}'
AND "openai-organization" = '{{ openai-organization }}'
AND "openai-project" = '{{ openai-project }}'
;
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
DELETE FROM openai.files.files
WHERE file_id = '{{ file_id }}' --required
AND "openai-organization" = '{{ openai-organization }}'
AND "openai-project" = '{{ openai-project }}'
;
```
</TabItem>
</Tabs>
