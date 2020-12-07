---
calendar: thecloud
post_year: 2020
post_day: 9
title: Task Orchestration using Cloud Composer
ingress: "Most organizations eventually encounter the need to automate and
  schedule repetative tasks. A common approach to this is using shell scripts
  and cron jobs. This article is a quick introduction to an alternative way of
  doing this: By writing python code and using Cloud Composer."
description: ""
links:
  - title: Cloud Composer Documentation
    url: https://cloud.google.com/composer/docs/quickstart
  - title: Airflow Home
    url: https://airflow.apache.org/
  - title: AWS Managed Airflow
    url: https://aws.amazon.com/managed-workflows-for-apache-airflow/
authors:
  - Espen Meidell
---
## What is Cloud Composer?

Cloud Composer is a managed Apache Airflow service running on Google Cloud. Apache Airflow was created by Airbnb to manage and monitor their workflows . It has since been added as an Apache Foundation project. Many traditional workflow orchestration systems which rely on XML configuration files. Airflow, on the other hand, lets a user write workflows using normal Python code. This simplifies integrations with other services (you can use normal Python libraries). I also makes it easier for developers to express logic in the workflows.

Using a managed Airflow service eliminates the need for maintenance and operations. We also leverage the benefits of integration with GCP services such as authentication, monitoring, and logging.

### Example use cases

Some use cases where we have successfully used Cloud Composer include:

* Moving files from SFTP servers to Google Cloud Storage.
* Scheduling and monitoring BigQuery queries.
* Monitoring BigQuery tables to ensure that new data is added at the expected rate.

### How workflows are defined

Workflows are defined as directed acyclic graphs (DAGs) witten in Python. The DAG file defines tasks and dependencies between tasks. Tasks can be anything, and are implemented by operators. Here are some examples of operators:

* **BigQuery Operator**: Query tables, export data, etc.
* **Kubernetes Pod Operator**: Execute tasks on a Kubernetes pod.
* **Bash Operator**: Execute bash commands.
* **Python Operator**: Execute python functions.

It is also very simple to define your [own operators](https://airflow.apache.org/docs/apache-airflow/stable/howto/custom-operator.html) if you have custom requirements. To do this, you simply extend the *BaseOperator* class and write your own logic.

A special type of operators called *sensors* are used to monitor for changes. A sensor can for example poll a storage bucket and trigger a DAG if a new file appears.

## Creating an environment

The first step is visiting the [Google Cloud Console ](https://console.cloud.google.com/composer) and create a new environment. You should be fine using the default settings.

> Cloud Composer will create a Kubernetes cluster for your Airflow environment. If you want to avoid any costs, consider running [Airflow locally](https://airflow.apache.org/docs/apache-airflow/stable/start.html).

![Airflow environments](/assets/9-thecloud-airflow-environments.png)

Once the environment is created, you can click the *Airflow* link to visit the Airflow web server. Here you can see all DAGs, previous runs and trigger new runs manually. By default, Cloud Composer includes an `airflow_monitoring` DAG to monitor that the environment is working.

To add new DAGs click the *DAGs* link in the right side of the environments table. This opens a storage bucket. By adding a python script here the DAG will be discovered and run by Cloud Composer.

## A sample DAG

We will deploy this simple DAG to illustrate how Cloud Composer works. The DAG consists of three tasks:

1. A bash operator that prints "Hello World"
2. A bash operator that pings google.com
3. A python operator that prints "Hello from the python operator!"

Task two and three can run in parallel, but they both depend on task one. Airflow uses bit shift operators to describe dependencies between tasks.

```python
import datetime
import airflow
from airflow.operators import bash_operator, python_operator


default_args = {
    'owner': 'Example DAG',
    'start_date': datetime.datetime(2020, 12, 7),
}


def python_hello_world(ds, **kwargs):
    print("Hello from the python operator!")


with airflow.DAG(
        'christmas_dag',
        'catchup=False',
        default_args=default_args,
        schedule_interval=datetime.timedelta(minutes=5)) as dag:

    bash_hello_world = bash_operator.BashOperator(
        task_id='bash_hello_world', bash_command='echo "Hello World"'
    )

    python_task = python_operator.PythonOperator(
        task_id='python_task',
        provide_context=True,
        python_callable=python_hello_world
    )

    ping_task = bash_operator.BashOperator(
        task_id='ping_google', bash_command='ping -c5 google.com'
    )

    bash_hello_world >> [ping_task, python_task]
```

In the DAG constructor we specify the name of the DAG and how often we want it to run (every 5 minutes). After uploading the file to GCS it will appear in the Airflow UI. This may take a few minutes.

![List of DAGs in Airflow UI](/assets/9-thecloud-airflow-dags.png)

Clicking on the name of the DAG shows us more detailed information about the DAG. We can see a visual representation of the graph, historical runs, and even the code that defines the DAG. It is also possible to manually trigger a run from here.

![Graph view of dag](/assets/9-thecloud-airflow-graph.png)

After a short while the borders around the tasks should turn green. This indicates that the task executed successfully. Just above the graph there is a legend explaining the different colors codes.

If we click on a task we can see the parameters passed to the task and access the logs. Below we can see the logs from the task pinging google.com.

![Image of logs](/assets/9-thecloud-airflow-logs.png)

The task sent five pings to google, exactly what we expected it to do. The logs also include some information about the worker that ran the task.

There are a number of advanced features that are out of the scope of this article. Combining them makes it possible to create very powerful workflows. Some of them include:

* [Jinja templating](https://airflow.apache.org/docs/apache-airflow/stable/tutorial.html#templating-with-jinja) to create macros and pass parameters to operators.
* Backfilling which allows us to run a DAG for a specific time range.
* [XCom](https://airflow.apache.org/docs/apache-airflow/stable/concepts.html#xcoms), a key-value store that allows tasks to communicate with each other.

## Pros & Cons

Cloud Composer / Airflow is a very powerful tool, but it might not be the right tool for your use case. Here is a short list of some advantages and disadvantages.

### Pros:

* We can create complex workflows with dependencies and parallel execution of tasks.
* A large set of community operators. Creating your own is easy.
* You can use a familiar language (Python).
* Open source, and you can run Airflow on your own if you want.
* Cloud Composer has great integration with GCP. You do not need to worry about things like authentication.
* With monitoring, retries, etc. Airflow DAGs are far more robust than classical cron jobs.
* Airflow can also monitor external sources (e.g. SQL Databases) for changes, and trigger workflows based on these.

### Cons:

* Airflow is complex. There is a lot of configuration options available.
* Understanding the scheduling may be a challenge.
* Airflow does not version your DAGs.
* Running workflows locally can be challenging.
* Cost. Cloud Composer requires a kubernetes cluster to run. If you only have a few simple tasks you want to schedule this may be overkill.

## Alternatives to Cloud Composer

* AWS just launched a managed Airflow service.
* Self hosting is always an option.
* Combining managed services such as Cloud Scheduler and Cloud Functions (or similar services from other cloud providers)
* Kubernetes CronJobs
