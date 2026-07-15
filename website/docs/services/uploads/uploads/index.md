--- 
title: uploads
hide_title: false
hide_table_of_contents: false
keywords:
  - uploads
  - uploads
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

Creates, updates, deletes, gets or lists a <code>uploads</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="uploads" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="openai.uploads.uploads" /></td></tr>
</tbody></table>

## Fields

The following fields are returned by `SELECT` queries:

`SELECT` not supported for this resource, use `SHOW METHODS` to view available operations for the resource.


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
    <td><a href="#create"><CopyableCode code="create" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-filename"><code>filename</code></a>, <a href="#parameter-purpose"><code>purpose</code></a>, <a href="#parameter-bytes"><code>bytes</code></a>, <a href="#parameter-mime_type"><code>mime_type</code></a></td>
    <td><a href="#parameter-OpenAI-Organization"><code>OpenAI-Organization</code></a>, <a href="#parameter-OpenAI-Project"><code>OpenAI-Project</code></a></td>
    <td></td>
</tr>
<tr>
    <td><a href="#cancel"><CopyableCode code="cancel" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-upload_id"><code>upload_id</code></a></td>
    <td><a href="#parameter-OpenAI-Organization"><code>OpenAI-Organization</code></a>, <a href="#parameter-OpenAI-Project"><code>OpenAI-Project</code></a></td>
    <td></td>
</tr>
<tr>
    <td><a href="#complete"><CopyableCode code="complete" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-upload_id"><code>upload_id</code></a>, <a href="#parameter-part_ids"><code>part_ids</code></a></td>
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
<tr id="parameter-upload_id">
    <td><CopyableCode code="upload_id" /></td>
    <td><code>string</code></td>
    <td>The ID of the Upload. </td>
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
INSERT INTO openai.uploads.uploads (
filename,
purpose,
bytes,
mime_type,
expires_after,
OpenAI-Organization,
OpenAI-Project
)
SELECT 
'{{ filename }}' /* required */,
'{{ purpose }}' /* required */,
{{ bytes }} /* required */,
'{{ mime_type }}' /* required */,
'{{ expires_after }}',
'{{ OpenAI-Organization }}',
'{{ OpenAI-Project }}'
RETURNING
id,
bytes,
created_at,
expires_at,
file,
filename,
object,
purpose,
status
;
```
</TabItem>
<TabItem value="manifest">

<CodeBlock language="yaml">{`# Description fields are for documentation purposes
- name: uploads
  props:
    - name: filename
      value: "{{ filename }}"
      description: |
        The name of the file to upload.
    - name: purpose
      value: "{{ purpose }}"
      description: |
        The intended purpose of the uploaded file.
        See the [documentation on File
        purposes](/docs/api-reference/files/create#files-create-purpose).
      valid_values: ['assistants', 'batch', 'fine-tune', 'vision']
    - name: bytes
      value: {{ bytes }}
      description: |
        The number of bytes in the file you are uploading.
    - name: mime_type
      value: "{{ mime_type }}"
      description: |
        The MIME type of the file.
        This must fall within the supported MIME types for your file purpose. See
        the supported MIME types for assistants and vision.
    - name: expires_after
      description: |
        The expiration policy for a file. By default, files with \`purpose=batch\` expire after 30 days and all other files are persisted until they are manually deleted.
      value:
        anchor: "{{ anchor }}"
        seconds: {{ seconds }}
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


## Lifecycle Methods

<Tabs
    defaultValue="cancel"
    values={[
        { label: 'cancel', value: 'cancel' },
        { label: 'complete', value: 'complete' }
    ]}
>
<TabItem value="cancel">

OK

```sql
EXEC openai.uploads.uploads.cancel 
@upload_id='{{ upload_id }}' --required, 
@OpenAI-Organization='{{ OpenAI-Organization }}', 
@OpenAI-Project='{{ OpenAI-Project }}'
;
```
</TabItem>
<TabItem value="complete">

OK

```sql
EXEC openai.uploads.uploads.complete 
@upload_id='{{ upload_id }}' --required, 
@OpenAI-Organization='{{ OpenAI-Organization }}', 
@OpenAI-Project='{{ OpenAI-Project }}' 
@@json=
'{
"part_ids": "{{ part_ids }}", 
"md5": "{{ md5 }}"
}'
;
```
</TabItem>
</Tabs>
