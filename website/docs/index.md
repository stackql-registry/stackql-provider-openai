---
title: openai
hide_title: false
hide_table_of_contents: false
keywords:
  - openai
  - stackql
  - infrastructure-as-code
  - configuration-as-data
  - cloud inventory
description: Query, deploy and manage OpenAI resources using SQL
custom_edit_url: null
image: /img/stackql-openai-provider-featured-image.png
id: 'provider-intro'
---

import CopyableCode from '@site/src/components/CopyableCode/CopyableCode';

The OpenAI platform surface available to standard API keys - models, files, fine-tuning, batches, vector stores, assistants, evals, conversations, uploads, containers and skills - queried and managed with SQL. The organization/admin surface is the sibling `openai_admin` provider.


:::info[Provider Summary] 

total services: __11__  
total resources: __37__  

:::

See also:
[[` SHOW `]](https://stackql.io/docs/language-spec/show) [[` DESCRIBE `]](https://stackql.io/docs/language-spec/describe)  [[` REGISTRY `]](https://stackql.io/docs/language-spec/registry)
* * *

## Installation

To pull the latest version of the `openai` provider, run the following command:

```bash
REGISTRY PULL openai;
```
> To view previous provider versions or to pull a specific provider version, see [here](https://stackql.io/docs/language-spec/registry).

## Authentication

The following system environment variables are used for authentication by default:

- <CopyableCode code="OPENAI_API_KEY" /> - OpenAI API key (see <a href="https://platform.openai.com/account/api-keys">How to Create an OpenAI API Key</a>)

These variables are sourced at runtime (from the local machine or as CI variables/secrets).

<details>

<summary>Using different environment variables</summary>

To use different environment variables (instead of the defaults), use the `--auth` flag of the `stackql` program.  For example:

```bash

AUTH='{ "openai": { "type": "bearer",  "credentialsenvvar": "OPENAI_API_KEY" }}'
stackql shell --auth="${AUTH}"

```
or using PowerShell:

```powershell

$Auth = "{ 'openai': { 'type': 'bearer',  'credentialsenvvar': 'OPENAI_API_KEY' }}"
stackql.exe shell --auth=$Auth

```
</details>


## Services
<div class="row">
<div class="providerDocColumn">
<a href="/services/assistants/">assistants</a><br />
<a href="/services/batches/">batches</a><br />
<a href="/services/containers/">containers</a><br />
<a href="/services/conversations/">conversations</a><br />
<a href="/services/evals/">evals</a><br />
<a href="/services/files/">files</a><br />
</div>
<div class="providerDocColumn">
<a href="/services/fine_tuning/">fine_tuning</a><br />
<a href="/services/models/">models</a><br />
<a href="/services/skills/">skills</a><br />
<a href="/services/uploads/">uploads</a><br />
<a href="/services/vector_stores/">vector_stores</a><br />
</div>
</div>
