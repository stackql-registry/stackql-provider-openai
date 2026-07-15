--- 
title: jobs
hide_title: false
hide_table_of_contents: false
keywords:
  - jobs
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

Creates, updates, deletes, gets or lists a <code>jobs</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="jobs" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="openai.fine_tuning.jobs" /></td></tr>
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
    <td>The object identifier, which can be referenced in the API endpoints.</td>
</tr>
<tr>
    <td><CopyableCode code="organization_id" /></td>
    <td><code>string</code></td>
    <td>The organization that owns the fine-tuning job.</td>
</tr>
<tr>
    <td><CopyableCode code="created_at" /></td>
    <td><code>integer (unixtime)</code></td>
    <td>The Unix timestamp (in seconds) for when the fine-tuning job was created.</td>
</tr>
<tr>
    <td><CopyableCode code="error" /></td>
    <td><code>object</code></td>
    <td>For fine-tuning jobs that have `failed`, this will contain more information on the cause of the failure.</td>
</tr>
<tr>
    <td><CopyableCode code="estimated_finish" /></td>
    <td><code>integer (unixtime)</code></td>
    <td>The Unix timestamp (in seconds) for when the fine-tuning job is estimated to finish. The value will be null if the fine-tuning job is not running.</td>
</tr>
<tr>
    <td><CopyableCode code="fine_tuned_model" /></td>
    <td><code>string</code></td>
    <td>The name of the fine-tuned model that is being created. The value will be null if the fine-tuning job is still running.</td>
</tr>
<tr>
    <td><CopyableCode code="finished_at" /></td>
    <td><code>integer (unixtime)</code></td>
    <td>The Unix timestamp (in seconds) for when the fine-tuning job was finished. The value will be null if the fine-tuning job is still running.</td>
</tr>
<tr>
    <td><CopyableCode code="hyperparameters" /></td>
    <td><code>object</code></td>
    <td>The hyperparameters used for the fine-tuning job. This value will only be returned when running `supervised` jobs.</td>
</tr>
<tr>
    <td><CopyableCode code="integrations" /></td>
    <td><code>array</code></td>
    <td>A list of integrations to enable for this fine-tuning job.</td>
</tr>
<tr>
    <td><CopyableCode code="metadata" /></td>
    <td><code>object</code></td>
    <td>Set of 16 key-value pairs that can be attached to an object. This can be useful for storing additional information about the object in a structured format, and querying for objects via API or the dashboard.  Keys are strings with a maximum length of 64 characters. Values are strings with a maximum length of 512 characters.  (x-oaiTypeLabel: map)</td>
</tr>
<tr>
    <td><CopyableCode code="method" /></td>
    <td><code>object</code></td>
    <td>The method used for fine-tuning.</td>
</tr>
<tr>
    <td><CopyableCode code="model" /></td>
    <td><code>string</code></td>
    <td>The base model that is being fine-tuned.</td>
</tr>
<tr>
    <td><CopyableCode code="object" /></td>
    <td><code>string</code></td>
    <td>The object type, which is always "fine_tuning.job". (fine_tuning.job)</td>
</tr>
<tr>
    <td><CopyableCode code="result_files" /></td>
    <td><code>array</code></td>
    <td>The compiled results file ID(s) for the fine-tuning job. You can retrieve the results with the [Files API](/docs/api-reference/files/retrieve-contents).</td>
</tr>
<tr>
    <td><CopyableCode code="seed" /></td>
    <td><code>integer</code></td>
    <td>The seed used for the fine-tuning job.</td>
</tr>
<tr>
    <td><CopyableCode code="status" /></td>
    <td><code>string</code></td>
    <td>The current status of the fine-tuning job, which can be either `validating_files`, `queued`, `running`, `succeeded`, `failed`, or `cancelled`. (validating_files, queued, running, succeeded, failed, cancelled)</td>
</tr>
<tr>
    <td><CopyableCode code="trained_tokens" /></td>
    <td><code>integer</code></td>
    <td>The total number of billable tokens processed by this fine-tuning job. The value will be null if the fine-tuning job is still running.</td>
</tr>
<tr>
    <td><CopyableCode code="training_file" /></td>
    <td><code>string</code></td>
    <td>The file ID used for training. You can retrieve the training data with the [Files API](/docs/api-reference/files/retrieve-contents).</td>
</tr>
<tr>
    <td><CopyableCode code="validation_file" /></td>
    <td><code>string</code></td>
    <td>The file ID used for validation. You can retrieve the validation results with the [Files API](/docs/api-reference/files/retrieve-contents).</td>
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
    <td>The object identifier, which can be referenced in the API endpoints.</td>
</tr>
<tr>
    <td><CopyableCode code="organization_id" /></td>
    <td><code>string</code></td>
    <td>The organization that owns the fine-tuning job.</td>
</tr>
<tr>
    <td><CopyableCode code="created_at" /></td>
    <td><code>integer (unixtime)</code></td>
    <td>The Unix timestamp (in seconds) for when the fine-tuning job was created.</td>
</tr>
<tr>
    <td><CopyableCode code="error" /></td>
    <td><code>object</code></td>
    <td>For fine-tuning jobs that have `failed`, this will contain more information on the cause of the failure.</td>
</tr>
<tr>
    <td><CopyableCode code="estimated_finish" /></td>
    <td><code>integer (unixtime)</code></td>
    <td>The Unix timestamp (in seconds) for when the fine-tuning job is estimated to finish. The value will be null if the fine-tuning job is not running.</td>
</tr>
<tr>
    <td><CopyableCode code="fine_tuned_model" /></td>
    <td><code>string</code></td>
    <td>The name of the fine-tuned model that is being created. The value will be null if the fine-tuning job is still running.</td>
</tr>
<tr>
    <td><CopyableCode code="finished_at" /></td>
    <td><code>integer (unixtime)</code></td>
    <td>The Unix timestamp (in seconds) for when the fine-tuning job was finished. The value will be null if the fine-tuning job is still running.</td>
</tr>
<tr>
    <td><CopyableCode code="hyperparameters" /></td>
    <td><code>object</code></td>
    <td>The hyperparameters used for the fine-tuning job. This value will only be returned when running `supervised` jobs.</td>
</tr>
<tr>
    <td><CopyableCode code="integrations" /></td>
    <td><code>array</code></td>
    <td>A list of integrations to enable for this fine-tuning job.</td>
</tr>
<tr>
    <td><CopyableCode code="metadata" /></td>
    <td><code>object</code></td>
    <td>Set of 16 key-value pairs that can be attached to an object. This can be useful for storing additional information about the object in a structured format, and querying for objects via API or the dashboard.  Keys are strings with a maximum length of 64 characters. Values are strings with a maximum length of 512 characters.  (x-oaiTypeLabel: map)</td>
</tr>
<tr>
    <td><CopyableCode code="method" /></td>
    <td><code>object</code></td>
    <td>The method used for fine-tuning.</td>
</tr>
<tr>
    <td><CopyableCode code="model" /></td>
    <td><code>string</code></td>
    <td>The base model that is being fine-tuned.</td>
</tr>
<tr>
    <td><CopyableCode code="object" /></td>
    <td><code>string</code></td>
    <td>The object type, which is always "fine_tuning.job". (fine_tuning.job)</td>
</tr>
<tr>
    <td><CopyableCode code="result_files" /></td>
    <td><code>array</code></td>
    <td>The compiled results file ID(s) for the fine-tuning job. You can retrieve the results with the [Files API](/docs/api-reference/files/retrieve-contents).</td>
</tr>
<tr>
    <td><CopyableCode code="seed" /></td>
    <td><code>integer</code></td>
    <td>The seed used for the fine-tuning job.</td>
</tr>
<tr>
    <td><CopyableCode code="status" /></td>
    <td><code>string</code></td>
    <td>The current status of the fine-tuning job, which can be either `validating_files`, `queued`, `running`, `succeeded`, `failed`, or `cancelled`. (validating_files, queued, running, succeeded, failed, cancelled)</td>
</tr>
<tr>
    <td><CopyableCode code="trained_tokens" /></td>
    <td><code>integer</code></td>
    <td>The total number of billable tokens processed by this fine-tuning job. The value will be null if the fine-tuning job is still running.</td>
</tr>
<tr>
    <td><CopyableCode code="training_file" /></td>
    <td><code>string</code></td>
    <td>The file ID used for training. You can retrieve the training data with the [Files API](/docs/api-reference/files/retrieve-contents).</td>
</tr>
<tr>
    <td><CopyableCode code="validation_file" /></td>
    <td><code>string</code></td>
    <td>The file ID used for validation. You can retrieve the validation results with the [Files API](/docs/api-reference/files/retrieve-contents).</td>
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
    <td><a href="#parameter-fine_tuning_job_id"><code>fine_tuning_job_id</code></a></td>
    <td><a href="#parameter-OpenAI-Organization"><code>OpenAI-Organization</code></a>, <a href="#parameter-OpenAI-Project"><code>OpenAI-Project</code></a></td>
    <td></td>
</tr>
<tr>
    <td><a href="#list"><CopyableCode code="list" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td></td>
    <td><a href="#parameter-after"><code>after</code></a>, <a href="#parameter-limit"><code>limit</code></a>, <a href="#parameter-metadata"><code>metadata</code></a>, <a href="#parameter-OpenAI-Organization"><code>OpenAI-Organization</code></a>, <a href="#parameter-OpenAI-Project"><code>OpenAI-Project</code></a></td>
    <td></td>
</tr>
<tr>
    <td><a href="#create"><CopyableCode code="create" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-model"><code>model</code></a>, <a href="#parameter-training_file"><code>training_file</code></a></td>
    <td><a href="#parameter-OpenAI-Organization"><code>OpenAI-Organization</code></a>, <a href="#parameter-OpenAI-Project"><code>OpenAI-Project</code></a></td>
    <td></td>
</tr>
<tr>
    <td><a href="#cancel"><CopyableCode code="cancel" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-fine_tuning_job_id"><code>fine_tuning_job_id</code></a></td>
    <td><a href="#parameter-OpenAI-Organization"><code>OpenAI-Organization</code></a>, <a href="#parameter-OpenAI-Project"><code>OpenAI-Project</code></a></td>
    <td></td>
</tr>
<tr>
    <td><a href="#pause"><CopyableCode code="pause" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-fine_tuning_job_id"><code>fine_tuning_job_id</code></a></td>
    <td><a href="#parameter-OpenAI-Organization"><code>OpenAI-Organization</code></a>, <a href="#parameter-OpenAI-Project"><code>OpenAI-Project</code></a></td>
    <td></td>
</tr>
<tr>
    <td><a href="#resume"><CopyableCode code="resume" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-fine_tuning_job_id"><code>fine_tuning_job_id</code></a></td>
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
<tr id="parameter-fine_tuning_job_id">
    <td><CopyableCode code="fine_tuning_job_id" /></td>
    <td><code>string</code></td>
    <td>The ID of the fine-tuning job to resume. </td>
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
    <td>Identifier for the last job from the previous pagination request.</td>
</tr>
<tr id="parameter-limit">
    <td><CopyableCode code="limit" /></td>
    <td><code>integer</code></td>
    <td>Number of fine-tuning jobs to retrieve.</td>
</tr>
<tr id="parameter-metadata">
    <td><CopyableCode code="metadata" /></td>
    <td><code>object</code></td>
    <td>Optional metadata filter. To filter, use the syntax `metadata[k]=v`. Alternatively, set `metadata=null` to indicate no metadata. </td>
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
organization_id,
created_at,
error,
estimated_finish,
fine_tuned_model,
finished_at,
hyperparameters,
integrations,
metadata,
method,
model,
object,
result_files,
seed,
status,
trained_tokens,
training_file,
validation_file
FROM openai.fine_tuning.jobs
WHERE fine_tuning_job_id = '{{ fine_tuning_job_id }}' -- required
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
organization_id,
created_at,
error,
estimated_finish,
fine_tuned_model,
finished_at,
hyperparameters,
integrations,
metadata,
method,
model,
object,
result_files,
seed,
status,
trained_tokens,
training_file,
validation_file
FROM openai.fine_tuning.jobs
WHERE after = '{{ after }}'
AND limit = '{{ limit }}'
AND metadata = '{{ metadata }}'
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
INSERT INTO openai.fine_tuning.jobs (
model,
training_file,
hyperparameters,
suffix,
validation_file,
integrations,
seed,
method,
metadata,
OpenAI-Organization,
OpenAI-Project
)
SELECT 
'{{ model }}' /* required */,
'{{ training_file }}' /* required */,
'{{ hyperparameters }}',
'{{ suffix }}',
'{{ validation_file }}',
'{{ integrations }}',
{{ seed }},
'{{ method }}',
'{{ metadata }}',
'{{ OpenAI-Organization }}',
'{{ OpenAI-Project }}'
RETURNING
id,
organization_id,
created_at,
error,
estimated_finish,
fine_tuned_model,
finished_at,
hyperparameters,
integrations,
metadata,
method,
model,
object,
result_files,
seed,
status,
trained_tokens,
training_file,
validation_file
;
```
</TabItem>
<TabItem value="manifest">

<CodeBlock language="yaml">{`# Description fields are for documentation purposes
- name: jobs
  props:
    - name: model
      value: "{{ model }}"
      description: |
        The name of the model to fine-tune. You can select one of the
        [supported models](/docs/guides/fine-tuning#which-models-can-be-fine-tuned).
      valid_values: ['babbage-002', 'davinci-002', 'gpt-3.5-turbo', 'gpt-4o-mini']
    - name: training_file
      value: "{{ training_file }}"
      description: |
        The ID of an uploaded file that contains training data.
        See [upload file](/docs/api-reference/files/create) for how to upload a file.
        Your dataset must be formatted as a JSONL file. Additionally, you must upload your file with the purpose \`fine-tune\`.
        The contents of the file should differ depending on if the model uses the [chat](/docs/api-reference/fine-tuning/chat-input), [completions](/docs/api-reference/fine-tuning/completions-input) format, or if the fine-tuning method uses the [preference](/docs/api-reference/fine-tuning/preference-input) format.
        See the [fine-tuning guide](/docs/guides/model-optimization) for more details.
    - name: hyperparameters
      description: |
        The hyperparameters used for the fine-tuning job.
        This value is now deprecated in favor of \`method\`, and should be passed in under the \`method\` parameter.
      value:
        batch_size: "{{ batch_size }}"
        learning_rate_multiplier: "{{ learning_rate_multiplier }}"
        n_epochs: "{{ n_epochs }}"
    - name: suffix
      value: "{{ suffix }}"
      description: |
        A string of up to 64 characters that will be added to your fine-tuned model name.
        For example, a \`suffix\` of "custom-model-name" would produce a model name like \`ft:gpt-4o-mini:openai:custom-model-name:7p4lURel\`.
      default: null
    - name: validation_file
      value: "{{ validation_file }}"
      description: |
        The ID of an uploaded file that contains validation data.
        If you provide this file, the data is used to generate validation
        metrics periodically during fine-tuning. These metrics can be viewed in
        the fine-tuning results file.
        The same data should not be present in both train and validation files.
        Your dataset must be formatted as a JSONL file. You must upload your file with the purpose \`fine-tune\`.
        See the [fine-tuning guide](/docs/guides/model-optimization) for more details.
    - name: integrations
      description: |
        A list of integrations to enable for your fine-tuning job.
      value:
        - type: "{{ type }}"
          wandb:
            project: "{{ project }}"
            name: "{{ name }}"
            entity: "{{ entity }}"
            tags:
              - "{{ tags }}"
    - name: seed
      value: {{ seed }}
      description: |
        The seed controls the reproducibility of the job. Passing in the same seed and job parameters should produce the same results, but may differ in rare cases.
        If a seed is not specified, one will be generated for you.
    - name: method
      description: |
        The method used for fine-tuning.
      value:
        type: "{{ type }}"
        supervised:
          hyperparameters:
            batch_size: "{{ batch_size }}"
            learning_rate_multiplier: "{{ learning_rate_multiplier }}"
            n_epochs: "{{ n_epochs }}"
        dpo:
          hyperparameters:
            beta: "{{ beta }}"
            batch_size: "{{ batch_size }}"
            learning_rate_multiplier: "{{ learning_rate_multiplier }}"
            n_epochs: "{{ n_epochs }}"
        reinforcement:
          grader:
            type: "{{ type }}"
            name: "{{ name }}"
            input: "{{ input }}"
            reference: "{{ reference }}"
            operation: "{{ operation }}"
            evaluation_metric: "{{ evaluation_metric }}"
            source: "{{ source }}"
            image_tag: "{{ image_tag }}"
            model: "{{ model }}"
            sampling_params:
              seed: "{{ seed }}"
              top_p: "{{ top_p }}"
              temperature: "{{ temperature }}"
              max_completions_tokens: "{{ max_completions_tokens }}"
              reasoning_effort: "{{ reasoning_effort }}"
            range:
              - {{ range }}
            graders:
              type: "{{ type }}"
              name: "{{ name }}"
              input: "{{ input }}"
              reference: "{{ reference }}"
              operation: "{{ operation }}"
              evaluation_metric: "{{ evaluation_metric }}"
              source: "{{ source }}"
              image_tag: "{{ image_tag }}"
              model: "{{ model }}"
              sampling_params:
                seed: "{{ seed }}"
                top_p: "{{ top_p }}"
                temperature: "{{ temperature }}"
                max_completions_tokens: "{{ max_completions_tokens }}"
                reasoning_effort: "{{ reasoning_effort }}"
              range:
                - {{ range }}
              labels:
                - "{{ labels }}"
              passing_labels:
                - "{{ passing_labels }}"
            calculate_output: "{{ calculate_output }}"
          hyperparameters:
            batch_size: "{{ batch_size }}"
            learning_rate_multiplier: "{{ learning_rate_multiplier }}"
            n_epochs: "{{ n_epochs }}"
            reasoning_effort: "{{ reasoning_effort }}"
            compute_multiplier: "{{ compute_multiplier }}"
            eval_interval: "{{ eval_interval }}"
            eval_samples: "{{ eval_samples }}"
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


## Lifecycle Methods

<Tabs
    defaultValue="cancel"
    values={[
        { label: 'cancel', value: 'cancel' },
        { label: 'pause', value: 'pause' },
        { label: 'resume', value: 'resume' }
    ]}
>
<TabItem value="cancel">

OK

```sql
EXEC openai.fine_tuning.jobs.cancel 
@fine_tuning_job_id='{{ fine_tuning_job_id }}' --required, 
@OpenAI-Organization='{{ OpenAI-Organization }}', 
@OpenAI-Project='{{ OpenAI-Project }}'
;
```
</TabItem>
<TabItem value="pause">

OK

```sql
EXEC openai.fine_tuning.jobs.pause 
@fine_tuning_job_id='{{ fine_tuning_job_id }}' --required, 
@OpenAI-Organization='{{ OpenAI-Organization }}', 
@OpenAI-Project='{{ OpenAI-Project }}'
;
```
</TabItem>
<TabItem value="resume">

OK

```sql
EXEC openai.fine_tuning.jobs.resume 
@fine_tuning_job_id='{{ fine_tuning_job_id }}' --required, 
@OpenAI-Organization='{{ OpenAI-Organization }}', 
@OpenAI-Project='{{ OpenAI-Project }}'
;
```
</TabItem>
</Tabs>
