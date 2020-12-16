---
calendar: thecloud
post_year: 2020
post_day: 10
title: Terraform managed monitoring and alerting in GCP Stackdriver
image: https://images.unsplash.com/photo-1505139229755-18651479b8be?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3450&q=80
ingress: >-
  You've got a Kubernetes cluster running your application on Google Cloud
  Platform (GCP), managed by Terraform.

  Metrics from your cluster, from your app or any other instance in our cluster - what to do with them? Sure, you've got `Metrics Explorer` in GCP that lets you play around with the metrics. Another option is to create a monitoring dashboard by manually selecting the metrics, aggregations, alignments, etc. to be shown. However, this can also be managed with Terraform, allowing a lot more control over your monitoring.
links: []
authors:
  - Ole Magnus Lie
---
## Defining a Stackdriver monitoring dashboard

While Terraform has a lot of thoroughly documented resources - the resource defining a dashboard in GCP is really basic.
The [`google_monitoring_dashboard`](https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/monitoring_dashboard) resource takes only one argument - the dashboard configuration defined as JSON.

```json
resource "google_monitoring_dashboard" "dashboard" {
  dashboard_json = file("${path.module}/dashboard-config.json")
}
```

In this example we'll create a dashboard that displays the restarts of the pods in our cluster. There are two pods - one frontend pod and one backend pod. We want to display a graph for each - showing the restart count of each one.
Thus, two widgets have to be created. Both pods are correspondingly labelled with `app=backend` and `app=frontend`. For each widget to display the desired metric, the correct `filter` have to be applied.


```json
{
  "displayName": "My Christmas dashboard",
  "gridLayout": {
    "columns": "2",
    "widgets": [
      {
        "title": "Backend pod restarts",
        "xyChart": {
          "dataSets": [
            {
              "timeSeriesQuery": {
                "timeSeriesFilter": {
                  "filter": "resource.type=\"k8s_container\" AND metric.type=\"kubernetes.io/container/restart_count\" AND metadata.user_labels.app=\"backend\"",
                  "aggregation": {
                    "perSeriesAligner": "ALIGN_RATE"
                  }
                },
                "unitOverride": "1"
              },
              "plotType": "LINE"
            }
          ],
          "timeshiftDuration": "0s"
        }
      },
      {
        "title": "Frontend pod restarts",
        "xyChart": {
          "dataSets": [
            {
              "timeSeriesQuery": {
                "timeSeriesFilter": {
                  "filter": "resource.type=\"k8s_container\" AND metric.type=\"kubernetes.io/container/restart_count\" AND metadata.user_labels.app=\"frontend\"",
                  "aggregation": {
                    "perSeriesAligner": "ALIGN_RATE"
                  }
                },
                "unitOverride": "1"
              },
              "plotType": "LINE"
            }
          ],
          "timeshiftDuration": "0s"
        }
      }
    ]
  }
}
```

Applying this Terraform module creates your dashboard, `My Christmas dashboard`, where the widgets are shown in a grid. It should look something like this:

![Widgets displaying the restart rate](https://i.ibb.co/vjb2XvR/image.png)

Adding more widgets is as simple as filtering and aggregating the metrics as you wish.

## Something is wrong - alert me!

To set up alerting in GCP Stackdriver, you'll need a notification channel. This can be manually set up in Stackdriver, but Terraform can handle this as well.

The [`google_monitoring_notification_channel`](https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/monitoring_notification_channel) Terraform resource is used to create a notification channel. Notification channels can be channels such as e-mails, SMS' or a Slack channel. For example, a Slack notification channel can be added as follows:

```json
resource "google_monitoring_notification_channel" "slack-channel" {
  display_name = "slack-notifications"
  type         = "slack"
  labels = {
    "channel_name" = "#my-slack-notification-channel"
  }
  sensitive_labels {
    auth_token = <my-auth-token>
  }
}
```

Now, we can use this notification channel when we define our alerting policies. We'll define alerts for the widgets we created in the dashboard.
An alerting policy is created with the [`google_monitoring_alert_policy`](https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/monitoring_alert_policy), like this:

```json
resource "google_monitoring_alert_policy" "backend_restart_count_alert" {
  combiner              = "OR"
  display_name          = "Backend pod keeps restarting"
  notification_channels = [google_monitoring_notification_channel.slack-channel.id]
  conditions {
    display_name = "Restart count"
    condition_threshold {
      filter          = "resource.type=\"k8s_container\" AND metric.type=\"kubernetes.io/container/restart_count\" AND metadata.user_labels.app=\"backend\""
      duration        = "60s"
      comparison      = "COMPARISON_GT"
      threshold_value = 5
      aggregations {
        alignment_period   = "60s"
        per_series_aligner = "ALIGN_RATE"
      }
    }
  }
}

resource "google_monitoring_alert_policy" "frontend_restart_count_alert" {
  combiner              = "OR"
  display_name          = "Frontend pod keeps restarting"
  notification_channels = [google_monitoring_notification_channel.slack-channel.id]
  conditions {
    display_name = "Restart count"
    condition_threshold {
      filter          = "resource.type=\"k8s_container\" AND metric.type=\"kubernetes.io/container/restart_count\" AND metadata.user_labels.app=\"frontend\""
      duration        = "60s"
      comparison      = "COMPARISON_GT"
      threshold_value = 5
      aggregations {
        alignment_period   = "60s"
        per_series_aligner = "ALIGN_RATE"
      }
    }
  }
}
```

These alerts will fire if the threshold defined in `condition` is met. The `condition_threshold` for both pods, in this example, is when the pod restarts more than 5 times over a period of 60 seconds. An alert message is then sent to the selected notification channel, the Slack channel in our case.

## Application specific metrics

This article highlights how to monitor and alert based on metrics from a Kubernetes container. These metrics are automatically exported to Stackdriver. If Prometheus, for example, is scraping metrics from your applications, you'll need the [`Stackdriver Prometheus sidecar`](https://github.com/Stackdriver/stackdriver-prometheus-sidecar) to export the metrics to Stackdriver. The sidecar is added [`here`](https://github.com/prometheus-community/helm-charts/blob/933cfcb/charts/kube-prometheus-stack/values.yaml#L2072).

## Go ahead, do it!

Managing monitoring and alerting with Terraform is super easy, and versioning the monitoring of your cluster is so helpful ~~if~~ *when* you screw up. Instead of messing around in the metrics explorer and creating monitoring resources on-the-fly; mess around in the metrics explorer and Terraform the monitoring! You and your team will not regret it.